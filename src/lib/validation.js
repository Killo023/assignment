import { logSecurityEvent } from './logger.js'

// Validation rules and patterns
const PATTERNS = {
  email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  password: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d@$!%*?&]{8,}$/,
  phone: /^\+?[\d\s\-\(\)]{10,}$/,
  url: /^https?:\/\/.+/,
  uuid: /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i,
  alphanumeric: /^[a-zA-Z0-9]+$/,
  filename: /^[a-zA-Z0-9._-]+$/,
  noScript: /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi
}

// Sanitization functions
const sanitizers = {
  // Remove HTML tags and scripts
  html: (value) => {
    if (typeof value !== 'string') return value
    return value
      .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
      .replace(/<[^>]*>/g, '')
      .trim()
  },

  // Remove dangerous characters from filenames
  filename: (value) => {
    if (typeof value !== 'string') return value
    return value.replace(/[<>:"/\\|?*\x00-\x1f]/g, '').trim()
  },

  // Sanitize email
  email: (value) => {
    if (typeof value !== 'string') return value
    return value.toLowerCase().trim()
  },

  // Sanitize phone number
  phone: (value) => {
    if (typeof value !== 'string') return value
    return value.replace(/[^\d\s\-\(\)\+]/g, '').trim()
  },

  // Truncate string to max length
  truncate: (value, maxLength = 255) => {
    if (typeof value !== 'string') return value
    return value.length > maxLength ? value.substring(0, maxLength) : value
  },

  // Remove extra whitespace
  whitespace: (value) => {
    if (typeof value !== 'string') return value
    return value.replace(/\s+/g, ' ').trim()
  }
}

class Validator {
  constructor() {
    this.errors = []
    this.warnings = []
  }

  // Reset validation state
  reset() {
    this.errors = []
    this.warnings = []
  }

  // Add error
  addError(field, message) {
    this.errors.push({ field, message })
    logSecurityEvent('validation_error', { field, message })
  }

  // Add warning
  addWarning(field, message) {
    this.warnings.push({ field, message })
  }

  // Validate required field
  required(value, fieldName) {
    if (value === null || value === undefined || value === '') {
      this.addError(fieldName, `${fieldName} is required`)
      return false
    }
    return true
  }

  // Validate email
  email(value, fieldName = 'email') {
    if (!value) return true // Skip if empty (use required() for mandatory emails)
    
    const sanitized = sanitizers.email(value)
    if (!PATTERNS.email.test(sanitized)) {
      this.addError(fieldName, 'Invalid email format')
      return false
    }
    return true
  }

  // Validate password strength
  password(value, fieldName = 'password') {
    if (!value) return true
    
    if (value.length < 8) {
      this.addError(fieldName, 'Password must be at least 8 characters long')
      return false
    }

    if (!PATTERNS.password.test(value)) {
      this.addError(fieldName, 'Password must contain at least one uppercase letter, one lowercase letter, and one number')
      return false
    }

    return true
  }

  // Validate string length
  length(value, fieldName, min = 0, max = 255) {
    if (!value) return true
    
    const len = value.length
    if (len < min) {
      this.addError(fieldName, `${fieldName} must be at least ${min} characters long`)
      return false
    }
    
    if (len > max) {
      this.addError(fieldName, `${fieldName} must be no more than ${max} characters long`)
      return false
    }
    
    return true
  }

  // Validate numeric range
  range(value, fieldName, min, max) {
    if (value === null || value === undefined) return true
    
    const num = Number(value)
    if (isNaN(num)) {
      this.addError(fieldName, `${fieldName} must be a valid number`)
      return false
    }
    
    if (num < min || num > max) {
      this.addError(fieldName, `${fieldName} must be between ${min} and ${max}`)
      return false
    }
    
    return true
  }

  // Validate file type
  fileType(filename, allowedTypes, fieldName = 'file') {
    if (!filename) return true
    
    const extension = filename.split('.').pop().toLowerCase()
    if (!allowedTypes.includes(extension)) {
      this.addError(fieldName, `File type not allowed. Allowed types: ${allowedTypes.join(', ')}`)
      return false
    }
    
    return true
  }

  // Validate file size
  fileSize(size, maxSize, fieldName = 'file') {
    if (!size) return true
    
    if (size > maxSize) {
      const maxSizeMB = Math.round(maxSize / (1024 * 1024))
      this.addError(fieldName, `File too large. Maximum size: ${maxSizeMB}MB`)
      return false
    }
    
    return true
  }

  // Validate URL
  url(value, fieldName = 'url') {
    if (!value) return true
    
    if (!PATTERNS.url.test(value)) {
      this.addError(fieldName, 'Invalid URL format')
      return false
    }
    
    return true
  }

  // Validate UUID
  uuid(value, fieldName = 'id') {
    if (!value) return true
    
    if (!PATTERNS.uuid.test(value)) {
      this.addError(fieldName, 'Invalid UUID format')
      return false
    }
    
    return true
  }

  // Validate enum values
  enum(value, allowedValues, fieldName) {
    if (!value) return true
    
    if (!allowedValues.includes(value)) {
      this.addError(fieldName, `${fieldName} must be one of: ${allowedValues.join(', ')}`)
      return false
    }
    
    return true
  }

  // Validate date
  date(value, fieldName = 'date') {
    if (!value) return true
    
    const date = new Date(value)
    if (isNaN(date.getTime())) {
      this.addError(fieldName, 'Invalid date format')
      return false
    }
    
    return true
  }

  // Validate future date
  futureDate(value, fieldName = 'date') {
    if (!value) return true
    
    const date = new Date(value)
    const now = new Date()
    
    if (date <= now) {
      this.addError(fieldName, `${fieldName} must be a future date`)
      return false
    }
    
    return true
  }

  // Sanitize input
  sanitize(value, type = 'html') {
    if (typeof value !== 'string') return value
    
    const sanitizer = sanitizers[type]
    if (!sanitizer) {
      this.addWarning('sanitize', `Unknown sanitizer type: ${type}`)
      return value
    }
    
    return sanitizer(value)
  }

  // Validate and sanitize object
  validateObject(obj, schema) {
    const result = {}
    
    for (const [field, rules] of Object.entries(schema)) {
      const value = obj[field]
      
      // Apply sanitization first
      let sanitizedValue = value
      if (rules.sanitize) {
        sanitizedValue = this.sanitize(value, rules.sanitize)
      }
      
      // Apply validations
      let isValid = true
      
      if (rules.required) {
        isValid = this.required(sanitizedValue, field) && isValid
      }
      
      if (rules.email) {
        isValid = this.email(sanitizedValue, field) && isValid
      }
      
      if (rules.password) {
        isValid = this.password(sanitizedValue, field) && isValid
      }
      
      if (rules.length) {
        isValid = this.length(sanitizedValue, field, rules.length.min, rules.length.max) && isValid
      }
      
      if (rules.range) {
        isValid = this.range(sanitizedValue, field, rules.range.min, rules.range.max) && isValid
      }
      
      if (rules.enum) {
        isValid = this.enum(sanitizedValue, rules.enum, field) && isValid
      }
      
      if (rules.date) {
        isValid = this.date(sanitizedValue, field) && isValid
      }
      
      if (rules.futureDate) {
        isValid = this.futureDate(sanitizedValue, field) && isValid
      }
      
      if (isValid) {
        result[field] = sanitizedValue
      }
    }
    
    return result
  }

  // Check if validation passed
  isValid() {
    return this.errors.length === 0
  }

  // Get validation errors
  getErrors() {
    return this.errors
  }

  // Get validation warnings
  getWarnings() {
    return this.warnings
  }

  // Get first error message
  getFirstError() {
    return this.errors.length > 0 ? this.errors[0].message : null
  }
}

// Common validation schemas
export const schemas = {
  user: {
    name: { required: true, length: { min: 2, max: 50 }, sanitize: 'whitespace' },
    email: { required: true, email: true, sanitize: 'email' },
    password: { required: true, password: true },
    role: { required: true, enum: ['student', 'professor', 'admin'] }
  },
  
  assignment: {
    title: { required: true, length: { min: 5, max: 200 }, sanitize: 'html' },
    description: { length: { max: 1000 }, sanitize: 'html' },
    file: { required: true }
  },
  
  contact: {
    name: { required: true, length: { min: 2, max: 100 }, sanitize: 'whitespace' },
    email: { required: true, email: true, sanitize: 'email' },
    message: { required: true, length: { min: 10, max: 2000 }, sanitize: 'html' }
  }
}

export default Validator 