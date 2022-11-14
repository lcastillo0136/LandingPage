import axios from '@/libs/api.request'
import config from '@/config'
const baseUrl = process.env.NODE_ENV === 'development' ? config.baseUrl.dev : config.baseUrl.pro

export const login = ({ userName, password }) => {
  const data = {
    keep_alive: true,
    password: password,
    username: userName
  }
  return axios.request({
    url: '/auth/login',
    data,
    method: 'post'
  })
}

export const getUserInfo = (token) => {
  return axios.request({
    url: 'get_info',
    data: {
      token
    },
    headers: {
      authorization: `Bearer ${ token }`
    },
    method: 'post'
  })
}

export const logout = (token) => {
  return axios.request({
    url: 'logout',
    method: 'post'
  })
}

export const getUnreadCount = () => {
  return axios.request({
    url: 'message/count',
    method: 'get'
  })
}

export const getMessage = () => {
  return axios.request({
    url: 'message/init',
    method: 'get'
  })
}

export const getContentByMsgId = msg_id => {
  return axios.request({
    url: 'message/content',
    method: 'get',
    params: {
      msg_id
    }
  })
}

export const hasRead = msg_id => {
  return axios.request({
    url: 'message/has_read',
    method: 'post',
    data: {
      msg_id
    }
  })
}

export const removeReaded = msg_id => {
  return axios.request({
    url: 'message/remove_readed',
    method: 'post',
    data: {
      msg_id
    }
  })
}

export const restoreTrash = msg_id => {
  return axios.request({
    url: 'message/restore',
    method: 'post',
    data: {
      msg_id
    }
  })
}

export const updateAppointment = (appointment, token, postFiles = null) => {
  const formData = new FormData()
  if (postFiles !== null) {
    postFiles.forEach(f => {
      formData.append('postedFiles[]', f, f.name);
    })
  }

  if (appointment) {
    Object.keys(appointment).forEach((p) => {
      formData.append(p, appointment[p])
    })
  }

  return axios.request({
    url: `appointments/${appointment.id}/update`,
    data: formData,
    headers: {
      authorization: `Bearer ${ token }`
    },
    method: 'post'
  })
}

export const createAppointment = (appointment, token, postFiles = null) => {
  const formData = new FormData()
  if (postFiles !== null) {
    postFiles.forEach(f => {
      formData.append('postedFiles[]', f, f.name);
    })
  }

  if (appointment) {
    Object.keys(appointment).forEach((p) => {
      formData.append(p, appointment[p])
    })
  }

  return axios.request({
    url: `appointments`,
    data: formData,
    headers: {
      authorization: `Bearer ${ token }`
    },
    method: 'post'
  })
}

export const deleteFile = (user, hash, token) => {
  return axios.request({
    url: `users/${user}/archivo/${hash}`,
    headers: {
      authorization: `Bearer ${ token }`
    },
    method: 'delete'
  })
}

export const uploadFiles = (client, token, postFiles = null) => {
  const formData = new FormData()
  if (postFiles !== null) {
    postFiles.forEach(f => {
      formData.append('files[]', f, f.name);
    })
  }
  
  return axios.request({
    url: `clients/${client.id}/archivo`,
    data: formData,
    headers: {
      authorization: `Bearer ${ token }`
    },
    method: 'post'
  })
}

export const deleteAppointment = (appointment, token) => {
  return axios.request({
    url: `appointments/${appointment.id}`,
    headers: {
      authorization: `Bearer ${ token }`
    },
    method: 'delete'
  })
}

export const updateUser = (user, token) => {
  const formData = new FormData()

  Object.keys(user).forEach((k) => {
    if (user[k] == null) user[k] = ''
    if (typeof user[k] === 'boolean') user[k] = user[k] ? 1 : 0
      
    if (!Array.isArray(user[k])) {
      formData.append(k, user[k]);
    } else {

    }
  });

  try {
    if (user.avatar && user.avatar instanceof File) {
      formData.append('avatar', user.avatar, 'avatar');
    }
  } catch(e) { }
  
  if (user.social_networks?.length > 0) {
    formData.append('social_networks', JSON.stringify(user.social_networks));
  }

  if (user.services?.length > 0) {
    formData.append('services', JSON.stringify(user.services));
  }

  if (user.skills?.length > 0) {
    formData.append('skills_tags', JSON.stringify(user.skills.map(s => s.name)));
  }

  if (user.addresses?.length > 0) {
    formData.append('addresses', JSON.stringify(user.addresses));
  }

  return axios.request({
    url: `users/${user.id}?_method=PUT`,
    data: formData,
    headers: {
      authorization: `Bearer ${ token }`
    },
    method: 'post'
  })
}

export const postReview = (review, token) => {
  const formData = new FormData()

  if (review) {
    Object.keys(review).forEach((p) => {
      formData.append(p, review[p])
    })
  }

  return axios.request({
    url: `appointments/${review.appointment}/review`,
    data: formData,
    headers: {
      authorization: `Bearer ${ token }`
    },
    method: 'post'
  })
}

export const postReply = (reply, token) => {
  const formData = new FormData()

  if (reply) {
    Object.keys(reply).forEach((p) => {
      formData.append(p, reply[p])
    })
  }

  return axios.request({
    url: `comments/${ reply.reply_id }/reply`,
    data: formData,
    headers: {
      authorization: `Bearer ${ token }`
    },
    method: 'post'
  })
}

export const updateReview = (review, token) => {
  return axios.request({
    url: `comments/${ review.id }`,
    data: review,
    headers: {
      authorization: `Bearer ${ token }`
    },
    method: 'put'
  })
}

export const sendInvoice = (order, token, postFiles = null) => {
  const formData = new FormData()
  if (postFiles !== null) {
    postFiles.forEach(f => {
      formData.append('postedFiles[]', f, f.name);
    })
  }
  
  return axios.request({
    url: `orders/${order.uuid_key}/invoice/share`,
    data: formData,
    headers: {
      authorization: `Bearer ${ token }`
    },
    method: 'post'
  })
}

export const getCard = ({ fingerprint, uuid }) => {
  return axios.request({
    baseURL: baseUrl.replace('/api/', '/web/'),
    url: `/profile/${uuid}`,
    params: {
      fingerprint
    },
    method: 'get'
  })
}

export const getClient = (client_id, token) => {
  return axios.request({
    url: `clients/${client_id}`,
    data: {
      token
    },
    headers: {
      authorization: `Bearer ${ token }`
    },
    method: 'get'
  })
}

export const postEHR = (medical_record, token, postFiles = null) => {
  const formData = new FormData()
  if (postFiles !== null) {
    postFiles.forEach(f => {
      formData.append('ehrFiles[]', f, f.name);
    })
  }

  Object.keys(medical_record).forEach((p) => {
    if (medical_record[p] !== null) {
      formData.append(p, medical_record[p])
    }
  })
  
  return axios.request({
    url: `clients/${medical_record.client_id}/ehr`,
    data: formData,
    headers: {
      authorization: `Bearer ${ token }`
    },
    method: 'post'
  })
}
