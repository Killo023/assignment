import { jsPDF } from 'jspdf'

export function generatePDF(assignmentText, subject, title = 'Assignment') {
  const doc = new jsPDF()
  
  // Set font and styling
  doc.setFont('helvetica')
  doc.setFontSize(16)
  
  // Title
  doc.setFontSize(20)
  doc.setFont('helvetica', 'bold')
  doc.text(title, 105, 20, { align: 'center' })
  
  // Subject and date
  doc.setFontSize(12)
  doc.setFont('helvetica', 'normal')
  doc.text(`Subject: ${subject}`, 20, 35)
  doc.text(`Date: ${new Date().toLocaleDateString()}`, 20, 42)
  
  // Add line separator
  doc.setDrawColor(200, 200, 200)
  doc.line(20, 50, 190, 50)
  
  // Process the assignment text
  let yPosition = 70
  const leftMargin = 20
  const rightMargin = 190
  const lineHeight = 7
  const maxWidth = rightMargin - leftMargin
  
  // Split text into lines and process
  const lines = assignmentText.split('\n')
  
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim()
    
    if (!line) {
      yPosition += lineHeight / 2
      continue
    }
    
    // Check if this is a heading
    if (line.startsWith('## ')) {
      // Main heading
      if (yPosition > 250) {
        doc.addPage()
        yPosition = 20
      }
      doc.setFontSize(16)
      doc.setFont('helvetica', 'bold')
      doc.text(line.substring(3), leftMargin, yPosition)
      yPosition += lineHeight + 5
      doc.setFontSize(12)
      doc.setFont('helvetica', 'normal')
    } else if (line.startsWith('### ')) {
      // Sub heading
      if (yPosition > 250) {
        doc.addPage()
        yPosition = 20
      }
      doc.setFontSize(14)
      doc.setFont('helvetica', 'bold')
      doc.text(line.substring(4), leftMargin, yPosition)
      yPosition += lineHeight + 3
      doc.setFontSize(12)
      doc.setFont('helvetica', 'normal')
    } else if (line.includes('[DIAGRAM]')) {
      // Handle diagram section with enhanced formatting
      if (yPosition > 180) {
        doc.addPage()
        yPosition = 20
      }
      
      // Find the diagram content
      let diagramContent = ''
      let diagramType = 'Diagram'
      let diagramDescription = ''
      let j = i + 1
      
      // Extract diagram metadata
      const diagramMatch = line.match(/\[DIAGRAM\](.*?)(?:\n|$)/)
      if (diagramMatch) {
        const metadata = diagramMatch[1].trim()
        if (metadata.includes('Type:')) {
          const typeMatch = metadata.match(/Type:\s*([^,\n]+)/)
          if (typeMatch) diagramType = typeMatch[1].trim()
        }
        if (metadata.includes('Description:')) {
          const descMatch = metadata.match(/Description:\s*([^,\n]+)/)
          if (descMatch) diagramDescription = descMatch[1].trim()
        }
      }
      
      // Collect diagram content until closing ```
      while (j < lines.length && !lines[j].includes('```')) {
        diagramContent += lines[j] + '\n'
        j++
      }
      
      // Add diagram header with border
      doc.setFontSize(12)
      doc.setFont('helvetica', 'bold')
      
      // Draw diagram border
      const diagramStartY = yPosition - 5
      const diagramWidth = rightMargin - leftMargin
      const diagramHeight = Math.min(120, diagramContent.split('\n').length * 6 + 30) // Estimate height
      
      // Check if we need a new page for the diagram
      if (yPosition + diagramHeight > 250) {
        doc.addPage()
        yPosition = 20
      }
      
      // Draw border around diagram
      doc.setDrawColor(100, 100, 100)
      doc.setLineWidth(0.5)
      doc.rect(leftMargin, yPosition - 5, diagramWidth, diagramHeight)
      
      // Add diagram title
      doc.setFillColor(240, 240, 240)
      doc.rect(leftMargin, yPosition - 5, diagramWidth, 12)
      doc.text(`📊 ${diagramType}`, leftMargin + 5, yPosition + 2)
      
      // Add description if available
      if (diagramDescription) {
        doc.setFontSize(10)
        doc.setFont('helvetica', 'italic')
        doc.text(diagramDescription, leftMargin + 5, yPosition + 12)
        yPosition += 8
      }
      
      // Add diagram content with monospace font and better formatting
      doc.setFontSize(9)
      doc.setFont('courier', 'normal')
      doc.setFillColor(248, 250, 252) // Light background for diagram
      
      const diagramLines = diagramContent.split('\n')
      let diagramY = yPosition + 8
      
      for (const diagramLine of diagramLines) {
        if (diagramY > 250) {
          doc.addPage()
          diagramY = 20
        }
        
        // Add subtle background for diagram lines
        const lineWidth = doc.getTextWidth(diagramLine)
        if (lineWidth > 0) {
          doc.rect(leftMargin + 2, diagramY - 3, lineWidth + 4, 6)
        }
        
        doc.text(diagramLine, leftMargin + 4, diagramY)
        diagramY += 6
      }
      
      // Reset formatting
      doc.setFontSize(12)
      doc.setFont('helvetica', 'normal')
      doc.setFillColor(255, 255, 255)
      yPosition = diagramY + 10
      
      // Skip the processed diagram lines
      i = j
    } else {
      // Regular text
      if (yPosition > 250) {
        doc.addPage()
        yPosition = 20
      }
      
      // Word wrap for long lines
      const words = line.split(' ')
      let currentLine = ''
      
      for (const word of words) {
        const testLine = currentLine + word + ' '
        const testWidth = doc.getTextWidth(testLine)
        
        if (testWidth > maxWidth && currentLine !== '') {
          doc.text(currentLine, leftMargin, yPosition)
          yPosition += lineHeight
          currentLine = word + ' '
          
          if (yPosition > 250) {
            doc.addPage()
            yPosition = 20
          }
        } else {
          currentLine = testLine
        }
      }
      
      if (currentLine) {
        doc.text(currentLine, leftMargin, yPosition)
        yPosition += lineHeight
      }
    }
  }
  
  // Add page numbers
  const pageCount = doc.internal.getNumberOfPages()
  for (let i = 1; i <= pageCount; i++) {
    doc.setPage(i)
    doc.setFontSize(10)
    doc.text(`Page ${i} of ${pageCount}`, 105, 280, { align: 'center' })
  }
  
  return doc
}

export function generateUniversityAssignmentPDF(assignmentText, subject, title = 'Assignment', studentInfo = {}) {
  const doc = new jsPDF()
  
  // Page 1: Title Page
  doc.setPage(1)
  
  // University header (if provided)
  if (studentInfo.university) {
    doc.setFontSize(14)
    doc.setFont('helvetica', 'bold')
    doc.text(studentInfo.university, 105, 30, { align: 'center' })
  }
  
  // Assignment title
  doc.setFontSize(24)
  doc.setFont('helvetica', 'bold')
  doc.text(title, 105, 60, { align: 'center' })
  
  // Subject
  doc.setFontSize(16)
  doc.setFont('helvetica', 'normal')
  doc.text(`Subject: ${subject}`, 105, 80, { align: 'center' })
  
  // Student information
  doc.setFontSize(12)
  doc.setFont('helvetica', 'normal')
  let infoY = 120
  
  if (studentInfo.name) {
    doc.text(`Student Name: ${studentInfo.name}`, 105, infoY, { align: 'center' })
    infoY += 15
  }
  
  if (studentInfo.id) {
    doc.text(`Student ID: ${studentInfo.id}`, 105, infoY, { align: 'center' })
    infoY += 15
  }
  
  if (studentInfo.course) {
    doc.text(`Course: ${studentInfo.course}`, 105, infoY, { align: 'center' })
    infoY += 15
  }
  
  if (studentInfo.instructor) {
    doc.text(`Instructor: ${studentInfo.instructor}`, 105, infoY, { align: 'center' })
    infoY += 15
  }
  
  // Date
  doc.text(`Date: ${new Date().toLocaleDateString()}`, 105, infoY + 20, { align: 'center' })
  
  // Page 2: Table of Contents
  doc.addPage()
  doc.setPage(2)
  
  doc.setFontSize(18)
  doc.setFont('helvetica', 'bold')
  doc.text('Table of Contents', 105, 30, { align: 'center' })
  
  // Extract headings for TOC
  const lines = assignmentText.split('\n')
  const headings = []
  let tocY = 60
  
  for (const line of lines) {
    if (line.startsWith('## ')) {
      headings.push({
        title: line.substring(3),
        level: 1,
        page: Math.floor(tocY / 250) + 3 // Estimate page number
      })
      tocY += 15
    } else if (line.startsWith('### ')) {
      headings.push({
        title: line.substring(4),
        level: 2,
        page: Math.floor(tocY / 250) + 3
      })
      tocY += 12
    }
  }
  
  // Add TOC entries
  let currentY = 60
  for (const heading of headings) {
    if (currentY > 250) {
      doc.addPage()
      doc.setPage(doc.internal.getNumberOfPages())
      currentY = 30
    }
    
    doc.setFontSize(heading.level === 1 ? 12 : 10)
    doc.setFont('helvetica', heading.level === 1 ? 'bold' : 'normal')
    
    const indent = heading.level === 1 ? 0 : 10
    doc.text(heading.title, 20 + indent, currentY)
    doc.text(heading.page.toString(), 180, currentY, { align: 'right' })
    
    currentY += heading.level === 1 ? 15 : 12
  }
  
  // Page 3+: Main Content
  doc.addPage()
  doc.setPage(3)
  
  let yPosition = 30
  const leftMargin = 20
  const rightMargin = 190
  const lineHeight = 7
  const maxWidth = rightMargin - leftMargin
  
  // Process the assignment text
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim()
    
    if (!line) {
      yPosition += lineHeight / 2
      continue
    }
    
    // Check if this is a heading
    if (line.startsWith('## ')) {
      // Main heading
      if (yPosition > 250) {
        doc.addPage()
        yPosition = 30
      }
      doc.setFontSize(16)
      doc.setFont('helvetica', 'bold')
      doc.text(line.substring(3), leftMargin, yPosition)
      yPosition += lineHeight + 5
      doc.setFontSize(12)
      doc.setFont('helvetica', 'normal')
    } else if (line.startsWith('### ')) {
      // Sub heading
      if (yPosition > 250) {
        doc.addPage()
        yPosition = 30
      }
      doc.setFontSize(14)
      doc.setFont('helvetica', 'bold')
      doc.text(line.substring(4), leftMargin, yPosition)
      yPosition += lineHeight + 3
      doc.setFontSize(12)
      doc.setFont('helvetica', 'normal')
    } else if (line.includes('[DIAGRAM]')) {
      // Handle diagram section with enhanced formatting
      if (yPosition > 180) {
        doc.addPage()
        yPosition = 30
      }
      
      // Find the diagram content
      let diagramContent = ''
      let diagramType = 'Diagram'
      let diagramDescription = ''
      let j = i + 1
      
      // Extract diagram metadata
      const diagramMatch = line.match(/\[DIAGRAM\](.*?)(?:\n|$)/)
      if (diagramMatch) {
        const metadata = diagramMatch[1].trim()
        if (metadata.includes('Type:')) {
          const typeMatch = metadata.match(/Type:\s*([^,\n]+)/)
          if (typeMatch) diagramType = typeMatch[1].trim()
        }
        if (metadata.includes('Description:')) {
          const descMatch = metadata.match(/Description:\s*([^,\n]+)/)
          if (descMatch) diagramDescription = descMatch[1].trim()
        }
      }
      
      // Collect diagram content until closing ```
      while (j < lines.length && !lines[j].includes('```')) {
        diagramContent += lines[j] + '\n'
        j++
      }
      
      // Add diagram header with border
      doc.setFontSize(12)
      doc.setFont('helvetica', 'bold')
      
      // Draw diagram border
      const diagramWidth = rightMargin - leftMargin
      const diagramHeight = Math.min(120, diagramContent.split('\n').length * 6 + 30)
      
      // Check if we need a new page for the diagram
      if (yPosition + diagramHeight > 250) {
        doc.addPage()
        yPosition = 30
      }
      
      // Draw border around diagram
      doc.setDrawColor(100, 100, 100)
      doc.setLineWidth(0.5)
      doc.rect(leftMargin, yPosition - 5, diagramWidth, diagramHeight)
      
      // Add diagram title
      doc.setFillColor(240, 240, 240)
      doc.rect(leftMargin, yPosition - 5, diagramWidth, 12)
      doc.text(`📊 ${diagramType}`, leftMargin + 5, yPosition + 2)
      
      // Add description if available
      if (diagramDescription) {
        doc.setFontSize(10)
        doc.setFont('helvetica', 'italic')
        doc.text(diagramDescription, leftMargin + 5, yPosition + 12)
        yPosition += 8
      }
      
      // Add diagram content with monospace font and better formatting
      doc.setFontSize(9)
      doc.setFont('courier', 'normal')
      doc.setFillColor(248, 250, 252)
      
      const diagramLines = diagramContent.split('\n')
      let diagramY = yPosition + 8
      
      for (const diagramLine of diagramLines) {
        if (diagramY > 250) {
          doc.addPage()
          diagramY = 30
        }
        
        // Add subtle background for diagram lines
        const lineWidth = doc.getTextWidth(diagramLine)
        if (lineWidth > 0) {
          doc.rect(leftMargin + 2, diagramY - 3, lineWidth + 4, 6)
        }
        
        doc.text(diagramLine, leftMargin + 4, diagramY)
        diagramY += 6
      }
      
      // Reset formatting
      doc.setFontSize(12)
      doc.setFont('helvetica', 'normal')
      doc.setFillColor(255, 255, 255)
      yPosition = diagramY + 10
      
      // Skip the processed diagram lines
      i = j
    } else {
      // Regular text
      if (yPosition > 250) {
        doc.addPage()
        yPosition = 30
      }
      
      // Word wrap for long lines
      const words = line.split(' ')
      let currentLine = ''
      
      for (const word of words) {
        const testLine = currentLine + word + ' '
        const testWidth = doc.getTextWidth(testLine)
        
        if (testWidth > maxWidth && currentLine !== '') {
          doc.text(currentLine, leftMargin, yPosition)
          yPosition += lineHeight
          currentLine = word + ' '
          
          if (yPosition > 250) {
            doc.addPage()
            yPosition = 30
          }
        } else {
          currentLine = testLine
        }
      }
      
      if (currentLine) {
        doc.text(currentLine, leftMargin, yPosition)
        yPosition += lineHeight
      }
    }
  }
  
  // Add References page if not present
  if (!assignmentText.toLowerCase().includes('references') && !assignmentText.toLowerCase().includes('bibliography')) {
    doc.addPage()
    doc.setPage(doc.internal.getNumberOfPages())
    
    doc.setFontSize(18)
    doc.setFont('helvetica', 'bold')
    doc.text('References', 105, 30, { align: 'center' })
    
    doc.setFontSize(12)
    doc.setFont('helvetica', 'normal')
    doc.text('Please add your references here in the appropriate academic format (APA, MLA, Chicago, etc.).', 20, 60)
  }
  
  // Add page numbers
  const pageCount = doc.internal.getNumberOfPages()
  for (let i = 1; i <= pageCount; i++) {
    doc.setPage(i)
    doc.setFontSize(10)
    doc.text(`Page ${i} of ${pageCount}`, 105, 280, { align: 'center' })
  }
  
  return doc
}

export function downloadPDF(assignmentText, subject, title = 'Assignment') {
  try {
    const doc = generatePDF(assignmentText, subject, title)
    const filename = `${subject}_Assignment_${new Date().toISOString().split('T')[0]}.pdf`
    doc.save(filename)
    return { success: true, filename }
  } catch (error) {
    console.error('PDF generation error:', error)
    return { success: false, error: error.message }
  }
}

export function downloadUniversityAssignmentPDF(assignmentText, subject, title = 'Assignment', studentInfo = {}) {
  try {
    const doc = generateUniversityAssignmentPDF(assignmentText, subject, title, studentInfo)
    const filename = `${subject}_University_Assignment_${new Date().toISOString().split('T')[0]}.pdf`
    doc.save(filename)
    return { success: true, filename }
  } catch (error) {
    console.error('University PDF generation error:', error)
    return { success: false, error: error.message }
  }
} 