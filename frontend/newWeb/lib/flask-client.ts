import axios from 'axios'

const FLASK_URL = process.env.NEXT_PUBLIC_FLASK_URL || 'http://localhost:5000'

const flaskApi = axios.create({
  baseURL: FLASK_URL,
  withCredentials: true,
})

// Add token to requests
flaskApi.interceptors.request.use((config) => {
  const token = localStorage.getItem('flask_token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

// Auth endpoints
export const authAPI = {
  signup: async (email: string, password: string, username: string) => {
    const res = await flaskApi.post('/api/auth/signup', {
      email,
      password,
      username,
    })
    if (res.data.token) {
      localStorage.setItem('flask_token', res.data.token)
    }
    return res.data
  },

  login: async (email: string, password: string) => {
    const res = await flaskApi.post('/api/auth/login', {
      email,
      password,
    })
    if (res.data.token) {
      localStorage.setItem('flask_token', res.data.token)
    }
    return res.data
  },

  logout: async () => {
    localStorage.removeItem('flask_token')
    await flaskApi.post('/api/auth/logout')
  },

  getCurrentUser: async () => {
    const res = await flaskApi.get('/api/auth/me')
    return res.data
  },
}

// Prediction endpoints
export const predictAPI = {
  predict: async (answers: Record<string, number>) => {
    const res = await flaskApi.post('/api/predict', answers)
    return res.data
  },

  savePrediction: async (
    testType: string,
    prediction: number,
    confidence: number,
    answers: Record<string, number>
  ) => {
    const res = await flaskApi.post('/api/predictions/save', {
      testType,
      prediction,
      confidence,
      answers,
    })
    return res.data
  },

  getHistory: async () => {
    const res = await flaskApi.get('/api/predictions/history')
    return res.data
  },

  getStats: async () => {
    const res = await flaskApi.get('/api/predictions/stats')
    return res.data
  },
}

// User profile endpoints
export const profileAPI = {
  getProfile: async () => {
    const res = await flaskApi.get('/api/user/profile')
    return res.data
  },

  updateProfile: async (data: { username?: string; email?: string }) => {
    const res = await flaskApi.post('/api/user/profile', data)
    return res.data
  },
}

export default flaskApi
