// Logging utility for AssignmentAI
class Logger {
  constructor() {
    this.isProduction = process.env.NODE_ENV === 'production'
    this.logLevel = process.env.LOG_LEVEL || 'info'
    
    // Log levels in order of priority
    this.levels = {
      error: 0,
      warn: 1,
      info: 2,
      debug: 3
    }
  }

  // Check if we should log at this level
  shouldLog(level) {
    return this.levels[level] <= this.levels[this.logLevel]
  }

  // Format log message
  formatMessage(level, message, data = null) {
    const timestamp = new Date().toISOString()
    const logEntry = {
      timestamp,
      level: level.toUpperCase(),
      message,
      ...(data && { data })
    }

    if (this.isProduction) {
      return JSON.stringify(logEntry)
    } else {
      // Pretty print for development
      const color = this.getColor(level)
      return `${color}[${timestamp}] ${level.toUpperCase()}:${color} ${message}${data ? `\n${JSON.stringify(data, null, 2)}` : ''}`
    }
  }

  // Get color for console output
  getColor(level) {
    const colors = {
      error: '\x1b[31m', // Red
      warn: '\x1b[33m',  // Yellow
      info: '\x1b[36m',  // Cyan
      debug: '\x1b[35m'  // Magenta
    }
    return colors[level] || '\x1b[0m'
  }

  // Log error
  error(message, error = null, context = {}) {
    if (!this.shouldLog('error')) return

    const logData = {
      ...context,
      ...(error && {
        error: {
          name: error.name,
          message: error.message,
          stack: error.stack,
          ...(error.code && { code: error.code })
        }
      })
    }

    const formattedMessage = this.formatMessage('error', message, logData)
    
    if (this.isProduction) {
      console.error(formattedMessage)
      // TODO: Send to external logging service (e.g., Sentry, LogRocket)
    } else {
      console.error(formattedMessage)
    }
  }

  // Log warning
  warn(message, data = null) {
    if (!this.shouldLog('warn')) return

    const formattedMessage = this.formatMessage('warn', message, data)
    console.warn(formattedMessage)
  }

  // Log info
  info(message, data = null) {
    if (!this.shouldLog('info')) return

    const formattedMessage = this.formatMessage('info', message, data)
    console.log(formattedMessage)
  }

  // Log debug
  debug(message, data = null) {
    if (!this.shouldLog('debug')) return

    const formattedMessage = this.formatMessage('debug', message, data)
    console.log(formattedMessage)
  }

  // Log API request
  logRequest(req, res, next) {
    const start = Date.now()
    
    res.on('finish', () => {
      const duration = Date.now() - start
      const logData = {
        method: req.method,
        url: req.url,
        statusCode: res.statusCode,
        duration: `${duration}ms`,
        userAgent: req.get('User-Agent'),
        ip: req.ip || req.connection.remoteAddress
      }

      if (res.statusCode >= 400) {
        this.error(`API Request Failed: ${req.method} ${req.url}`, null, logData)
      } else {
        this.info(`API Request: ${req.method} ${req.url}`, logData)
      }
    })

    next()
  }

  // Log user action
  logUserAction(userId, action, details = {}) {
    this.info(`User Action: ${action}`, {
      userId,
      action,
      ...details,
      timestamp: new Date().toISOString()
    })
  }

  // Log security event
  logSecurityEvent(event, details = {}) {
    this.warn(`Security Event: ${event}`, {
      event,
      ...details,
      timestamp: new Date().toISOString()
    })
  }

  // Log performance metric
  logPerformance(operation, duration, details = {}) {
    this.info(`Performance: ${operation}`, {
      operation,
      duration: `${duration}ms`,
      ...details,
      timestamp: new Date().toISOString()
    })
  }

  // Log database operation
  logDatabase(operation, collection, duration, details = {}) {
    this.debug(`Database: ${operation} on ${collection}`, {
      operation,
      collection,
      duration: `${duration}ms`,
      ...details,
      timestamp: new Date().toISOString()
    })
  }
}

// Create singleton instance
const logger = new Logger()

// Export individual methods for convenience
export const logError = (message, error, context) => logger.error(message, error, context)
export const logWarn = (message, data) => logger.warn(message, data)
export const logInfo = (message, data) => logger.info(message, data)
export const logDebug = (message, data) => logger.debug(message, data)
export const logRequest = (req, res, next) => logger.logRequest(req, res, next)
export const logUserAction = (userId, action, details) => logger.logUserAction(userId, action, details)
export const logSecurityEvent = (event, details) => logger.logSecurityEvent(event, details)
export const logPerformance = (operation, duration, details) => logger.logPerformance(operation, duration, details)
export const logDatabase = (operation, collection, duration, details) => logger.logDatabase(operation, collection, duration, details)

export default logger 