import axios from '@/libs/api.request'
import { getToken } from '@/libs/util'

export const Messages = {
  list: () => {
    return axios.request({
      url: `messages/list`,
      headers: {
        authorization: `Bearer ${ getToken() }`
      },
      method: 'post'
    })
  },
  get(id) {
    return axios.request({
      url: `messages/${id}`,
      headers: {
        authorization: `Bearer ${ getToken() }`
      },
      method: 'get'
    })
  },
  post(text, file= null) {
    const formData = new FormData()
    if (file !== null) {
      formData.append('files[]', file, file.name);
    }

    if (text) {
      Object.keys(text).forEach((p) => {
        formData.append(p, text[p]);
      });
    }


    return axios.request({
      url: `clients/messages`,
      data: formData,
      headers: {
        authorization: `Bearer ${ getToken() }`
      },
      method: 'post'
    })
  }
}