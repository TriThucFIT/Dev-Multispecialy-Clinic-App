import axios from 'axios'

const AxiosInstance = axios.create({
  baseURL: 'http://localhost:8000',
  headers: {
    'Content-Type': 'application/json'
  }
})

AxiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('access_token')
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
    console.log(`response for url : ${response.config.url} : `, response)

    return response
  },
  (error) => {
    console.error('Error on response', error)
    return Promise.reject(error)
  }
)

export default AxiosInstance
