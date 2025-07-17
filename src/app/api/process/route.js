import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import dbConnect from '../../../lib/db'
import User from '../../../models/User'
import Assignment from '../../../models/Assignment'
import { generateAssignmentResponse, extractTextFromContent } from '../../../lib/huggingface'
import { spawn } from 'child_process';

// Helper function to extract text from PDF using a child process
async function extractTextFromPDF(buffer) {
  return new Promise((resolve, reject) => {
    const child = spawn('node', [require('path').resolve(process.cwd(), 'src/lib/pdfExtract.js')]);
    let output = '';
    let errorOutput = '';
    child.stdout.on('data', (data) => {
      output += data;
    });
    child.stderr.on('data', (data) => {
      errorOutput += data;
    });
    child.on('close', (code) => {
      if (code === 0) {
        try {
          const result = JSON.parse(output);
          resolve(result.text);
        } catch (err) {
          reject(new Error('Failed to parse child process output: ' + err.message));
        }
      } else {
        try {
          const errResult = JSON.parse(errorOutput);
          reject(new Error(errResult.error || 'Unknown error in PDF extraction child process'));
        } catch (err) {
          reject(new Error('PDF extraction child process failed: ' + errorOutput));
        }
      }
    });
    child.stdin.write(buffer.toString('base64'));
    child.stdin.end();
  });
}

// Top-level error handler for unhandled promise rejections
process.on('unhandledRejection', (reason, promise) => {
  console.error('Unhandled Rejection at:', promise, 'reason:', reason);
});

export async function POST(request) {
  console.log('DEBUG: process/route.js POST handler called');
  let mammoth;
  try {
    mammoth = (await import('mammoth')).default;
    console.log('DEBUG: mammoth.extractRawText type:', typeof mammoth.extractRawText);
  } catch (e) {
    console.error('Require error:', e);
    return NextResponse.json({ error: 'Failed to load file parsers', details: e.message || e.toString() }, { status: 500 });
  }
  try {
    const session = await getServerSession()
    
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    await dbConnect()
    
    let user = await User.findOne({ email: session.user.email })
    console.log('DEBUG: Found user:', user ? user.email : 'none');
    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 })
    }

    // Check trial status
    const now = new Date();
    const isTrial = user.subscription === 'trial' && user.trialEndDate && new Date(user.trialEndDate) > now;
    if (!isTrial && user.subscription !== 'premium') {
      return NextResponse.json({ error: 'Your free trial has expired. Please upgrade to continue.' }, { status: 403 });
    }

    // Reload user from DB to ensure fresh state
    user = await User.findOne({ email: session.user.email });

    console.log('DEBUG: assignmentsUsed:', user.assignmentsUsed, 'assignmentsLimit:', user.assignmentsLimit);
    console.log('DEBUG: directCheck:', user.assignmentsUsed < user.assignmentsLimit);

    // BYPASS assignment limit check for testing
    /*
    if (!(user.assignmentsUsed < user.assignmentsLimit)) {
      console.log('BLOCKED:', {
        assignmentsUsed: user.assignmentsUsed,
        assignmentsLimit: user.assignmentsLimit
      });
      return NextResponse.json({ 
        error: 'Assignment limit reached. Upgrade to premium for unlimited assignments.' 
      }, { status: 403 })
    }
    */

    const formData = await request.formData()
    const file = formData.get('file')
    const subject = formData.get('subject')
    const fileFormat = formData.get('fileFormat')
    const studentInfoJson = formData.get('studentInfo')
    console.log('DEBUG: file:', file?.name, 'type:', file?.type, 'subject:', subject, 'fileFormat:', fileFormat);

    if (!file || !subject) {
      return NextResponse.json({ error: 'File and subject are required' }, { status: 400 })
    }

    // Parse student information
    let studentInfo = {}
    try {
      if (studentInfoJson) {
        studentInfo = JSON.parse(studentInfoJson)
      }
    } catch (error) {
      console.log('DEBUG: Failed to parse student info, using defaults')
    }

    // Validate file type
    const allowedTypes = ['application/pdf', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'text/plain']
    if (!allowedTypes.includes(file.type)) {
      return NextResponse.json({ error: 'Invalid file type. Only PDF, DOCX, and TXT files are allowed.' }, { status: 400 })
    }

    // Extract text from file
    let extractedText = ''
    let buffer;
    try {
      buffer = Buffer.from(await file.arrayBuffer())
      console.log('DEBUG: buffer created, length:', buffer.length);
    } catch (error) {
      console.error('Error creating buffer:', error);
      return NextResponse.json({ error: 'Failed to read file buffer', details: error.message || error.toString() }, { status: 500 })
    }

    try {
      if (file.type === 'application/pdf') {
        console.log('DEBUG: extracting PDF text');
        extractedText = await extractTextFromPDF(buffer);
      } else if (file.type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document') {
        console.log('DEBUG: extracting DOCX text');
        const result = await mammoth.extractRawText({ buffer })
        extractedText = result.value
      } else if (file.type === 'text/plain') {
        console.log('DEBUG: extracting TXT text');
        extractedText = buffer.toString('utf-8')
      }
      console.log('DEBUG: extractedText length:', extractedText.length);
    } catch (error) {
      console.error('Error extracting text:', error)
      return NextResponse.json({ error: 'Failed to extract text from file', details: error.message || error.toString() }, { status: 500 })
    }

    if (!extractedText.trim()) {
      return NextResponse.json({ error: 'No text content found in file' }, { status: 400 })
    }

    // Sanitize extracted text
    let sanitizedText;
    try {
      sanitizedText = extractTextFromContent(extractedText)
      console.log('DEBUG: sanitizedText length:', sanitizedText.length);
    } catch (error) {
      console.error('Error sanitizing text:', error);
      return NextResponse.json({ error: 'Failed to sanitize text', details: error.message || error.toString() }, { status: 500 })
    }
    
    if (!sanitizedText.trim()) {
      return NextResponse.json({ error: 'No valid content found in file' }, { status: 400 })
    }

    // Create assignment record
    let assignment;
    try {
      assignment = new Assignment({
        userId: user._id,
        title: file.name.replace(/\.[^/.]+$/, ''), // Remove file extension
        subject: subject,
        originalContent: sanitizedText,
        aiResponse: '', // Will be updated after AI processing
        fileFormat: fileFormat,
        status: 'processing',
        studentInfo: studentInfo, // Store student info
      })
      await assignment.save()
      console.log('DEBUG: assignment saved:', assignment._id);
    } catch (error) {
      console.error('Error saving assignment:', error);
      return NextResponse.json({ error: 'Failed to save assignment', details: error.message || error.toString() }, { status: 500 })
    }

    // Increment user's assignment count
    try {
      user.assignmentsUsed += 1;
      await user.save();
      console.log('DEBUG: user assignment count incremented');
    } catch (error) {
      console.error('Error updating user:', error);
      return NextResponse.json({ error: 'Failed to update user', details: error.message || error.toString() }, { status: 500 })
    }

    // Process with AI (async)
    generateAssignmentResponse(sanitizedText, subject)
      .then(async (aiResponse) => {
        try {
          console.log('DEBUG: AI processing successful, updating assignment...');
          // Generate shareable link
          assignment.generateShareableLink()
          
          // Update assignment with AI response
          assignment.aiResponse = aiResponse
          assignment.status = 'completed'
          await assignment.save()
          console.log('DEBUG: assignment completed successfully:', assignment._id);
        } catch (error) {
          console.error('Error updating assignment with AI response:', error)
          assignment.status = 'failed'
          assignment.aiResponse = 'Error: Failed to save AI response'
          await assignment.save()
        }
      })
      .catch(async (error) => {
        console.error('AI processing error:', error)
        assignment.status = 'failed'
        assignment.aiResponse = `Error: ${error.message}`
        await assignment.save()
        console.log('DEBUG: assignment marked as failed:', assignment._id);
      })

    return NextResponse.json({ 
      message: 'Assignment submitted successfully',
      assignmentId: assignment._id 
    })

  } catch (error) {
    console.error('Process assignment error:', error)
    return NextResponse.json({ error: 'Internal server error', details: error.message || error.toString() }, { status: 500 })
  }
} 