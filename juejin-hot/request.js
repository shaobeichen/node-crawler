import axios from 'axios'

const axiosInstance = axios.create({
  baseURL: 'https://api.juejin.cn',
  timeout: 30000,
})

// 添加请求拦截器
axiosInstance.interceptors.request.use(
  (config) => {
    return config
  },
  (error) => {
    // 处理请求错误
    return Promise.reject(error)
  },
)

// 添加响应拦截器
axiosInstance.interceptors.response.use(
  (response) => {
    return response
  },
  (error) => {
    // 处理响应错误
    return Promise.reject(error)
  },
)

export async function get(url, data, config) {
  const response = await axiosInstance.get(url, { ...config, params: data })
  return response.data
}

export async function post(url, data, config) {
  const response = await axiosInstance.post(url, data, config)
  return response.data
}
