import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
// TODO: Implement generateAssignmentResponse and generateDiagram or import from correct module
function generateAssignmentResponse() { throw new Error('generateAssignmentResponse not implemented') }
function generateDiagram() { throw new Error('generateDiagram not implemented') }

export async function POST(request) {
  try {
    const session = await getServerSession()
    
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { prompt, subject = 'General' } = await request.json()

    if (!prompt) {
      return NextResponse.json({ error: 'Prompt is required' }, { status: 400 })
    }

    console.log('DEBUG: Chat API called with:', { prompt: prompt.substring(0, 100) + '...', subject })

    // Generate the main assignment response
    const response = await generateAssignmentResponse(prompt, subject)
    
    console.log('DEBUG: Chat API response generated successfully')

    // Check if the response mentions diagrams and enhance if needed
    let enhancedResponse = response
    
    // Expanded list of subjects that benefit from diagrams
    const diagramSubjects = [
      'Computer Science', 'Engineering', 'Business', 'Physics', 'Chemistry', 'Biology',
      'Mathematics', 'Economics', 'Psychology', 'Sociology', 'Political Science',
      'Education', 'Law', 'Medicine', 'Architecture', 'Design'
    ]
    
    const shouldIncludeDiagrams = diagramSubjects.includes(subject) && !response.includes('[DIAGRAM]')
    
    if (shouldIncludeDiagrams) {
      try {
        // Generate a relevant diagram based on the subject and prompt
        let diagramType = 'flowchart'
        let diagramPrompt = prompt
        
        // Customize diagram type based on subject
        switch (subject) {
          case 'Computer Science':
            diagramType = 'system architecture'
            diagramPrompt = `System architecture or data flow for: ${prompt}`
            break
          case 'Engineering':
            diagramType = 'process flow'
            diagramPrompt = `Engineering process or system design for: ${prompt}`
            break
          case 'Business':
            diagramType = 'business model'
            diagramPrompt = `Business process or organizational structure for: ${prompt}`
            break
          case 'Physics':
          case 'Chemistry':
            diagramType = 'concept map'
            diagramPrompt = `Scientific concept or process for: ${prompt}`
            break
          case 'Biology':
            diagramType = 'biological process'
            diagramPrompt = `Biological system or process for: ${prompt}`
            break
          case 'Mathematics':
            diagramType = 'mathematical model'
            diagramPrompt = `Mathematical concept or algorithm for: ${prompt}`
            break
          case 'Economics':
            diagramType = 'economic model'
            diagramPrompt = `Economic concept or market structure for: ${prompt}`
            break
          case 'Psychology':
            diagramType = 'psychological model'
            diagramPrompt = `Psychological concept or behavioral model for: ${prompt}`
            break
          default:
            diagramType = 'concept map'
            diagramPrompt = `Conceptual framework for: ${prompt}`
        }
        
        const diagram = await generateDiagram(diagramPrompt, diagramType)
        
        // Insert diagram into the response at an appropriate location
        const sections = response.split('## ')
        if (sections.length > 1) {
          // Insert diagram after the introduction or first main section
          const firstSection = sections[0]
          const remainingSections = sections.slice(1)
          
          // Create diagram block with proper formatting
          const diagramBlock = `\n\n\`\`\`
[DIAGRAM]
Type: ${diagramType.charAt(0).toUpperCase() + diagramType.slice(1)}
Description: Visual representation of the key concepts and processes
${diagram}
\`\`\`\n\n`
          
          enhancedResponse = firstSection + diagramBlock + '## ' + remainingSections.join('\n## ')
        } else {
          // If no clear sections, add diagram at the end
          const diagramBlock = `\n\n\`\`\`
[DIAGRAM]
Type: ${diagramType.charAt(0).toUpperCase() + diagramType.slice(1)}
Description: Visual representation of the key concepts
${diagram}
\`\`\`\n\n`
          
          enhancedResponse = response + diagramBlock
        }
        
        console.log('DEBUG: Diagram successfully added to response')
      } catch (diagramError) {
        console.log('DEBUG: Diagram generation failed, continuing with text-only response:', diagramError.message)
      }
    }

    return NextResponse.json({ 
      success: true,
      response: enhancedResponse 
    })

  } catch (error) {
    console.error('DEBUG: Chat API error:', error)
    return NextResponse.json({ 
      error: 'Failed to generate response',
      details: error.message 
    }, { status: 500 })
  }
} 