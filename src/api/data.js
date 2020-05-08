import axios from '@/libs/api.request'

export const getTypes = () => {
  return axios.request({
    url: 'types',
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
    url: 'doctors',
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
    url: 'specialities',
    data: filter,
    method: 'post'
  })
}

export const getCitiesList = (filter) => {
  return axios.request({
    url: 'cities',
    data: filter,
    method: 'post'
  })
}

export const getDoctorInfo = (data) => {
  return axios.request({
    url: `/doctors/${data.id}`,
    method: 'post'
  })
}

export const getDoctorBooking = (data) => {
  return axios.request({
    url: `/doctors/${data.id}/booking`,
    data: data,
    method: 'get'
  })
}
