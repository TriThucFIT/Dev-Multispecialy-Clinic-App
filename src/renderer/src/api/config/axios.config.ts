import axios from 'axios'

const AxiosInstance = axios.create({
  baseURL: process.env.BASE_URL,
  headers: {
    'Content-Type': 'application/json'
  }
})

AxiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    console.error('Error on request', error)
    return Promise.reject(error)
  }
)

AxiosInstance.interceptors.response.use(
  (response) => {
    return response
  },
  (error) => {
    console.error('Error on response', error)
    return Promise.reject(error)
  }
)

export default AxiosInstance