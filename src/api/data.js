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
    method: 'get',
    params: {
      fingerprint: data.fingerprint
    },
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
  const formData = new FormData()

  if (!data.password || !data.password_confirmation) {
    delete data.password;
    delete data.password_confirmation;
  } 
  
  Object.keys(data).forEach((k) => {
    if (data[k] == null) data[k] = ''
    if (typeof data[k] === 'boolean') data[k] = data[k] ? 1 : 0
      
    if (!Array.isArray(data[k]) && data[k]) {
      formData.append(k, data[k]);
    } else {

    }
  });

  try {
    if (data.avatar && data.avatar instanceof File) {
      formData.append('avatar', data.avatar, 'avatar');
    }
  } catch(e) { }

  try {
    if (data.cover && data.cover instanceof File) {
      formData.append('cover', data.cover, 'cover');
    }
  } catch(e) { }
  
  if (data.social_networks?.length > 0) {
    formData.append('social_networks', JSON.stringify(data.social_networks));
  }

  if (data.services?.length > 0) {
    formData.append('services', JSON.stringify(data.services));
  }

  if (data.skills?.length > 0) {
    formData.append('skills_tags', JSON.stringify(data.skills.map(s => s.name)));
  }

  if (data.addresses?.length > 0) {
    formData.append('addresses', JSON.stringify(data.addresses));
  }
  return axios.request({
    url: `clients/register`,
    data: formData,
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

export const getProduct = (key) => {
  return axios.request({
    baseURL: baseUrl.replace('/api/', '/web/'),
    url: `/products/${key}`,
    method: 'get'
  })    
}

