import axios from 'axios'

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || '/api',
  withCredentials: true,
})

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('royal_token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  try {
    if (typeof window !== 'undefined') {
      window.__apiDebug = window.__apiDebug || []
      window.__apiDebug.push({ type: 'request', url: config.url, method: config.method, data: config.data, headers: config.headers })
    }
  } catch (e) {}
  return config
})

api.interceptors.response.use(
  (res) => {
    try {
      if (typeof window !== 'undefined') {
        window.__apiDebug = window.__apiDebug || []
        window.__apiDebug.push({ type: 'response', url: res.config?.url, status: res.status, data: res.data })
      }
    } catch (e) {}
    return res
  },
  (err) => {
    try {
      if (typeof window !== 'undefined') {
        window.__apiDebug = window.__apiDebug || []
        window.__apiDebug.push({ type: 'error', message: err.message, response: err.response?.data, status: err.response?.status })
      }
    } catch (e) {}
    return Promise.reject(err)
  }
)

export default api
