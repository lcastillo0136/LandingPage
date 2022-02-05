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
    url: `/register`,
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

export const postOrder = (data) => {
  // return new Promise((resolve, reject) => {
  //   resolve({
  //     data: {
  //       message: [],
  //       success: true,
  //       data : {
  //         auth_code: null,
  //         card: "",
  //         conekta_id: "ord_2rFijaCcPenCuvnXx",
  //         created_at: "2022-02-05T06:13:49.000000Z",
  //         discount: 0,
  //         email: "mail3@mail.com",
  //         expiration: "",
  //         id: 3,
  //         name: "Luis",
  //         payment_method: 2,
  //         phone: 8111533136,
  //         status: 4,
  //         subtotal: 130,
  //         titular: "",
  //         total: 130,
  //         updated_at: "2022-02-05T06:13:49.000000Z",
  //         user_id: 6,
  //         uuid_key: "8a033907-c360-4980-b861-8bbdaa4860bc",
  //       }
  //     },
  //     status: 200
  //   })
  // })
  return axios.request({
    baseURL: baseUrl.replace('/api/', '/web/'),
    url: `/orders`,
    data,
    method: 'post'
  })
}