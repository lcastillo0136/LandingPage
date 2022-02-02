import axios from '@/libs/api.request'

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
    url: `/register`,
    data: data,
    method: 'post'
  })
}
