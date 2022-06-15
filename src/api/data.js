import axios from '@/libs/api.request'
import config from '@/config'
const baseUrl = process.env.NODE_ENV === 'development' ? config.baseUrl.dev : config.baseUrl.pro

export const saveErrorLogger = info => {
  return axios.request({
    url: 'save_error_logger',
    data: info,
    method: 'post'
  })
}

export const getSettings = () => {
  return axios.request({
    baseURL: baseUrl.replace('/api/', '/web/'),
    url: `/settings`,
    method: 'get'
  })
}