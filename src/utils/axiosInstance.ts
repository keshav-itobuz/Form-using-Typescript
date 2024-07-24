import axios from 'axios'

const axiosInstance = axios.create({
    baseURL: 'http://localhost:4000/',
    timeout: 8000,
})

axiosInstance.interceptors.response.use(
    (response) => {
        return response.data
    },
    (error) => {
        return Promise.reject(error)
    }
)
export default axiosInstance
