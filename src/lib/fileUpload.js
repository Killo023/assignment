import { writeFile, unlink } from 'fs/promises'
import { join } from 'path'
import { v4 as uuidv4 } from 'uuid'

// File upload configuration
const UPLOAD_CONFIG = {
  maxFileSize: parseInt(process.env.MAX_FILE_SIZE) || 10 * 1024 * 1024, // 10MB default
  allowedTypes: (process.env.ALLOWED_FILE_TYPES || 'pdf,docx,txt,jpg,png').split(','),
  uploadDir: process.env.UPLOAD_DIR || './uploads',
  tempDir: process.env.TEMP_DIR || './temp'
}

// MIME type mapping
const MIME_TYPES = {
  'pdf': 'application/pdf',
  'docx': 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  'doc': 'application/msword',
  'txt': 'text/plain',
  'jpg': 'image/jpeg',
  'jpeg': 'image/jpeg',
  'png': 'image/png',
  'gif': 'image/gif'
}

// File extension to MIME type mapping
const EXTENSION_TO_MIME = {
  '.pdf': 'application/pdf',
  '.docx': 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  '.doc': 'application/msword',
  '.txt': 'text/plain',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.png': 'image/png',
  '.gif': 'image/gif'
}

class FileUploadService {
  constructor() {
    this.config = UPLOAD_CONFIG
  }

  // Validate file type
  validateFileType(filename, mimetype) {
    const extension = this.getFileExtension(filename).toLowerCase()
    const allowedExtensions = this.config.allowedTypes.map(type => type.toLowerCase())
    
    // Check extension
    if (!allowedExtensions.includes(extension)) {
      return {
        valid: false,
        error: `File type not allowed. Allowed types: ${allowedExtensions.join(', ')}`
      }
    }

    // Check MIME type
    const expectedMime = EXTENSION_TO_MIME[`.${extension}`]
    if (expectedMime && mimetype !== expectedMime) {
      return {
        valid: false,
        error: 'File type mismatch. File extension does not match MIME type.'
      }
    }

    return { valid: true }
  }

  // Validate file size
  validateFileSize(size) {
    if (size > this.config.maxFileSize) {
      return {
        valid: false,
        error: `File too large. Maximum size: ${this.formatBytes(this.config.maxFileSize)}`
      }
    }
    return { valid: true }
  }

  // Validate filename
  validateFilename(filename) {
    // Check for dangerous characters
    const dangerousChars = /[<>:"/\\|?*\x00-\x1f]/
    if (dangerousChars.test(filename)) {
      return {
        valid: false,
        error: 'Filename contains invalid characters'
      }
    }

    // Check length
    if (filename.length > 255) {
      return {
        valid: false,
        error: 'Filename too long'
      }
    }

    return { valid: true }
  }

  // Scan file for viruses (placeholder - implement with actual virus scanner)
  async scanForViruses(filePath) {
    // TODO: Implement actual virus scanning
    // For now, we'll do basic checks
    try {
      // Basic file integrity check
      const stats = await import('fs').then(fs => fs.promises.stat(filePath))
      
      // Check if file is empty
      if (stats.size === 0) {
        return {
          clean: false,
          error: 'Empty file detected'
        }
      }

      // Check if file is too small to be valid (basic heuristic)
      if (stats.size < 10) {
        return {
          clean: false,
          error: 'File appears to be corrupted or invalid'
        }
      }

      return { clean: true }
    } catch (error) {
      return {
        clean: false,
        error: 'File scan failed'
      }
    }
  }

  // Process uploaded file
  async processUpload(file, userId) {
    try {
      // Validate filename
      const filenameValidation = this.validateFilename(file.name)
      if (!filenameValidation.valid) {
        return {
          success: false,
          error: filenameValidation.error
        }
      }

      // Validate file type
      const typeValidation = this.validateFileType(file.name, file.type)
      if (!typeValidation.valid) {
        return {
          success: false,
          error: typeValidation.error
        }
      }

      // Validate file size
      const sizeValidation = this.validateFileSize(file.size)
      if (!sizeValidation.valid) {
        return {
          success: false,
          error: sizeValidation.error
        }
      }

      // Generate unique filename
      const extension = this.getFileExtension(file.name)
      const uniqueFilename = `${uuidv4()}.${extension}`
      const filePath = join(this.config.uploadDir, uniqueFilename)

      // Convert file to buffer and save
      const bytes = await file.arrayBuffer()
      const buffer = Buffer.from(bytes)

      // Save file
      await writeFile(filePath, buffer)

      // Scan for viruses
      const scanResult = await this.scanForViruses(filePath)
      if (!scanResult.clean) {
        // Clean up file if scan fails
        await this.cleanupFile(filePath)
        return {
          success: false,
          error: scanResult.error
        }
      }

      // Return file info
      return {
        success: true,
        filename: uniqueFilename,
        originalName: file.name,
        size: file.size,
        type: file.type,
        path: filePath,
        uploadedAt: new Date(),
        userId
      }

    } catch (error) {
      console.error('File upload error:', error)
      return {
        success: false,
        error: 'Failed to process uploaded file'
      }
    }
  }

  // Clean up file
  async cleanupFile(filePath) {
    try {
      await unlink(filePath)
    } catch (error) {
      console.error('Failed to cleanup file:', error)
    }
  }

  // Get file extension
  getFileExtension(filename) {
    return filename.split('.').pop().toLowerCase()
  }

  // Format bytes to human readable
  formatBytes(bytes) {
    if (bytes === 0) return '0 Bytes'
    const k = 1024
    const sizes = ['Bytes', 'KB', 'MB', 'GB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
  }

  // Get upload configuration
  getConfig() {
    return {
      maxFileSize: this.config.maxFileSize,
      maxFileSizeFormatted: this.formatBytes(this.config.maxFileSize),
      allowedTypes: this.config.allowedTypes,
      allowedMimeTypes: this.config.allowedTypes.map(type => EXTENSION_TO_MIME[`.${type}`]).filter(Boolean)
    }
  }
}

export default new FileUploadService() 