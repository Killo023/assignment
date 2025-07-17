import { RateLimiterMemory, RateLimiterRedis } from 'rate-limiter-flexible'

// Rate limit configurations
const rateLimitConfigs = {
  // Authentication endpoints
  auth: {
    points: 5, // 5 attempts
    duration: 15 * 60, // 15 minutes
    blockDuration: 60 * 60 // 1 hour block
  },
  
  // Password reset
  passwordReset: {
    points: 3, // 3 attempts
    duration: 60 * 60, // 1 hour
    blockDuration: 24 * 60 * 60 // 24 hour block
  },
  
  // Assignment processing
  assignment: {
    points: 10, // 10 assignments
    duration: 60 * 60, // 1 hour
    blockDuration: 0 // No block, just limit
  },
  
  // Chat API
  chat: {
    points: 20, // 20 messages
    duration: 60 * 60, // 1 hour
    blockDuration: 0
  },
  
  // General API
  api: {
    points: 100, // 100 requests
    duration: 60 * 60, // 1 hour
    blockDuration: 0
  }
}

// Create rate limiters
const createRateLimiter = (type) => {
  const config = rateLimitConfigs[type]
  
  if (process.env.UPSTASH_REDIS_REST_URL) {
    // Use Redis for production
    return new RateLimiterRedis({
      storeClient: {
        host: process.env.UPSTASH_REDIS_REST_URL,
        port: 6379,
        password: process.env.UPSTASH_REDIS_REST_TOKEN,
      },
      keyPrefix: `rl_${type}`,
      points: config.points,
      duration: config.duration,
      blockDuration: config.blockDuration,
    })
  } else {
    // Use memory for development
    return new RateLimiterMemory({
      keyPrefix: `rl_${type}`,
      points: config.points,
      duration: config.duration,
      blockDuration: config.blockDuration,
    })
  }
}

// Rate limiters
const rateLimiters = {
  auth: createRateLimiter('auth'),
  passwordReset: createRateLimiter('passwordReset'),
  assignment: createRateLimiter('assignment'),
  chat: createRateLimiter('chat'),
  api: createRateLimiter('api')
}

// Rate limiting middleware
export const rateLimit = (type = 'api') => {
  return async (req, res, next) => {
    try {
      const limiter = rateLimiters[type]
      if (!limiter) {
        console.warn(`Rate limiter type '${type}' not found`)
        return next()
      }

      // Get client identifier (IP or user ID)
      const key = req.headers['x-forwarded-for'] || 
                  req.connection.remoteAddress || 
                  req.socket.remoteAddress ||
                  req.ip ||
                  'unknown'

      await limiter.consume(key)
      next()
    } catch (error) {
      if (error instanceof Error) {
        // Rate limit exceeded
        const retryAfter = Math.round(error.msBeforeNext / 1000)
        res.setHeader('Retry-After', retryAfter)
        res.setHeader('X-RateLimit-Limit', rateLimitConfigs[type]?.points || 100)
        res.setHeader('X-RateLimit-Remaining', 0)
        res.setHeader('X-RateLimit-Reset', new Date(Date.now() + error.msBeforeNext).toISOString())
        
        return res.status(429).json({
          error: 'Too many requests',
          message: `Rate limit exceeded. Try again in ${retryAfter} seconds.`,
          retryAfter
        })
      }
      next()
    }
  }
}

// Rate limiting for Next.js API routes
export const withRateLimit = (handler, type = 'api') => {
  return async (req, res) => {
    try {
      const limiter = rateLimiters[type]
      if (!limiter) {
        console.warn(`Rate limiter type '${type}' not found`)
        return handler(req, res)
      }

      // Get client identifier
      const key = req.headers['x-forwarded-for'] || 
                  req.connection?.remoteAddress || 
                  req.socket?.remoteAddress ||
                  req.ip ||
                  'unknown'

      await limiter.consume(key)
      return handler(req, res)
    } catch (error) {
      if (error instanceof Error) {
        // Rate limit exceeded
        const retryAfter = Math.round(error.msBeforeNext / 1000)
        res.setHeader('Retry-After', retryAfter)
        res.setHeader('X-RateLimit-Limit', rateLimitConfigs[type]?.points || 100)
        res.setHeader('X-RateLimit-Remaining', 0)
        res.setHeader('X-RateLimit-Reset', new Date(Date.now() + error.msBeforeNext).toISOString())
        
        return res.status(429).json({
          error: 'Too many requests',
          message: `Rate limit exceeded. Try again in ${retryAfter} seconds.`,
          retryAfter
        })
      }
      return handler(req, res)
    }
  }
}

// Helper function to get rate limit info
export const getRateLimitInfo = async (type, key) => {
  try {
    const limiter = rateLimiters[type]
    if (!limiter) return null

    const res = await limiter.get(key)
    return {
      remainingPoints: res.remainingPoints,
      msBeforeNext: res.msBeforeNext,
      isBlocked: res.isBlocked
    }
  } catch (error) {
    return null
  }
}

export default rateLimiters 