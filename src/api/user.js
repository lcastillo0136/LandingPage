import axios from '@/libs/api.request'

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
    if (!Array.isArray(user[k]) && user[k] !== '' && user[k] !== null) {
      formData.append(k, user[k]);
    } else {

    }
  });

  try {
    if (user.avatar && user.avatar instanceof File) {
      formData.append('avatar', user.avatar, 'avatar');
    }
  } catch(e) { }
  
  if (user.services?.length > 0) {
    formData.append('services', JSON.stringify(user.services));
  }

  if (user.skills?.length > 0) {
    formData.append('skills_tags', JSON.stringify(user.skills.map(s => s.name)));
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