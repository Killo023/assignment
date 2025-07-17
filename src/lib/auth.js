import jwt from 'jsonwebtoken'

// Get the current user from localStorage token
export const getCurrentUser = () => {
  if (typeof window === 'undefined') return null
  
  const token = localStorage.getItem('authToken')
  if (!token) return null

  try {
    const decoded = jwt.decode(token)
    if (!decoded || decoded.exp * 1000 < Date.now()) {
      localStorage.removeItem('authToken')
      return null
    }
    return decoded
  } catch (error) {
    localStorage.removeItem('authToken')
    return null
  }
}

// Check if user is authenticated
export const isAuthenticated = () => {
  return getCurrentUser() !== null
}

// Get auth token
export const getAuthToken = () => {
  if (typeof window === 'undefined') return null
  return localStorage.getItem('authToken')
}

// Set auth token
export const setAuthToken = (token) => {
  if (typeof window === 'undefined') return
  localStorage.setItem('authToken', token)
}

// Remove auth token
export const removeAuthToken = () => {
  if (typeof window === 'undefined') return
  localStorage.removeItem('authToken')
}

// Logout user
export const logout = () => {
  removeAuthToken()
  window.location.href = '/auth/signin'
}

// Make authenticated API request
export const authenticatedFetch = async (url, options = {}) => {
  const token = getAuthToken()
  
  const headers = {
    'Content-Type': 'application/json',
    ...options.headers,
  }

  if (token) {
    headers.Authorization = `Bearer ${token}`
  }

  const response = await fetch(url, {
    ...options,
    headers,
  })

  if (response.status === 401) {
    removeAuthToken()
    window.location.href = '/auth/signin'
    return null
  }

  return response
}

// Verify token validity
export const verifyToken = (token) => {
  try {
    const decoded = jwt.verify(token, process.env.NEXTAUTH_SECRET || 'your-secret-key-here')
    return decoded
  } catch (error) {
    return null
  }
} 