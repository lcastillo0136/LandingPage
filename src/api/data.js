import axios from '@/libs/api.request'
import config from '@/config'
const baseUrl = process.env.NODE_ENV === 'development' ? config.baseUrl.dev : config.baseUrl.pro

export const getTypes = () => {
  return axios.request({
    url: 'roles/list',
    method: 'get'
  })
}

export const getSorts = () => {
  return axios.request({
    url: 'sorts',
    method: 'get'
  })
}

export const getDoctorsByFilter = (filter) => {
  return axios.request({
    url: 'doctors/list',
    data: filter,
    method: 'post'
  })
}

export const saveErrorLogger = info => {
  return axios.request({
    url: 'save_error_logger',
    data: info,
    method: 'post'
  })
}

export const getSpecialitiesList = (filter) => {
  return axios.request({
    url: 'specialities/list',
    data: filter,
    method: 'post'
  })
}

export const getCitiesList = (filter) => {
  return axios.request({
    url: 'cities/list',
    data: filter,
    method: 'post'
  })
}

export const getDoctorInfo = (data) => {
  return axios.request({
    url: `/doctors/${data.id}`,
    method: 'get'
  })
}

export const getDoctorBooking = (data) => {
  return axios.request({
    url: `/doctors/${data.id}/booking`,
    data: data,
    method: 'post'
  })
}

export const registerCustomer = (data) => {
  return axios.request({
    url: `clients/register`,
    data: data,
    method: 'post'
  })
}

export const registerProvider = (data) => {
  return axios.request({
    url: `doctors/register`,
    data: data,
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

export const getPaymentMethods = () => {
  return axios.request({
    baseURL: baseUrl.replace('/api/', '/web/'),
    url: `/paymentmethods/list`,
    method: 'get'
  })
}

export const getAppoitmentsStatus = (token) => {
  return axios.request({
    url: `/appointments/status`,
    method: 'get',
    headers: {
      authorization: `Bearer ${ token }`
    },
  })
}

export const postOrder = (data) => {
  return axios.request({
    baseURL: baseUrl.replace('/api/', '/web/'),
    url: `/orders`,
    data,
    method: 'post'
  })
}

export const getOrder = (key) => {
  return axios.request({
    baseURL: baseUrl.replace('/api/', '/web/'),
    url: `/orders/${key}`,
    method: 'get'
  })
}

export const getEvent = () => {
  return axios.request({
    baseURL: baseUrl.replace('/api/', '/web/'),
    url: `/event/1`,
    method: 'get'
  })
}