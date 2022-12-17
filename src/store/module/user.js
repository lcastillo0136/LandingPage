import {
  login,
  logout,
  getUserInfo,
  getMessage,
  getContentByMsgId,
  hasRead,
  removeReaded,
  restoreTrash,
  getUnreadCount
} from '@/api/user'
import { getAppoitmentsStatus } from '@/api/data'
import { setToken, getToken, removeToken, localSave, localRead } from '@/libs/util'
import _ from 'lodash'

export default {
  state: {
    userName: '',
    userId: '',
    avatarImgPath: '',
    token: getToken(),
    access: '',
    hasGetInfo: false,
    unreadCount: 0,
    messageUnreadList: [],
    messageReadedList: [],
    messageTrashList: [],
    messageContentStore: {},
    favList: [],
    sessionUser: {},
    appointments_status: []
  },
  mutations: {
    setAvatar (state, avatarPath) {
      state.sessionUser.avatar = avatarPath
    },
    setCover (state, coverPath) {
      state.sessionUser.cover = coverPath
    },
    setUserId (state, id) {
      state.userId = id
    },
    setUserName (state, name) {
      state.userName = name
    },
    setUser (state, data) {
      state.sessionUser = {...data}
    },
    setAccess (state, access) {
      state.access = access
    },
    setToken (state, session) {
      state.token = session.token
      setToken(session.token, session.expiration)
    },
    removeToken (state) {
      state.token = null
      removeToken()
    },
    setHasGetInfo (state, status) {
      state.hasGetInfo = status
    },
    setMessageCount (state, count) {
      state.unreadCount = count
    },
    setMessageUnreadList (state, list) {
      state.messageUnreadList = list
    },
    setMessageReadedList (state, list) {
      state.messageReadedList = list
    },
    setMessageTrashList (state, list) {
      state.messageTrashList = list
    },
    updateMessageContentStore (state, { msg_id, content }) {
      state.messageContentStore[msg_id] = content
    },
    moveMsg (state, { from, to, msg_id }) {
      const index = state[from].findIndex(_ => _.msg_id === msg_id)
      const msgItem = state[from].splice(index, 1)[0]
      msgItem.loading = false
      state[to].unshift(msgItem)
    },
    setFav (state, list) {
      state.favList = list

      localSave('favlist', state.favList)
    },
    setAppointmentsStatus(state, status) {
      state.appointments_status = status
    }
  },
  getters: {
    messageUnreadCount: state => state.messageUnreadList.length,
    messageReadedCount: state => state.messageReadedList.length,
    messageTrashCount: state => state.messageTrashList.length,
    hasToken : state => state.token,
    favorites: state => state.favList,
    getUser: state => state.sessionUser,
    appointmentsStatus: state => state.appointments_status,
    avatar: state => state.sessionUser.avatar,
    cover: state => state.sessionUser.cover,
  },
  actions: {
    // 登录
    handleLogin ({ commit, dispatch }, { userName, password, remember }) {
      userName = userName.trim()
      return new Promise((resolve, reject) => {
        login({
          userName,
          password,
          remember
        }).then(res => {
          const data = res.data.data
          const inFifteenMinutes = new Date(new Date().getTime() + (15 * 60 * 1000))
          
          if (data.token_key) {
            commit('setToken', { token: data.token_key, expiration: 360 })
            dispatch('getUserInfo').then((response) => {
              resolve(response)
            })
          } else {
            reject('not_found_user')
          } 
        }).catch(err => {
          reject(err)
        })
      })
    },
    // 退出登录
    handleLogOut ({ state, commit }) {
      return new Promise((resolve, reject) => {
        // logout(state.token).then(() => {
          commit('removeToken', '')
          commit('setUser', {})
          commit('setAccess', [])
          resolve()
        // }).catch(err => {
        //   reject(err)
        // })
        // 如果你的退出登录无需请求接口，则可以直接使用下面三行代码而无需使用logout调用接口
        // commit('setToken', '')
        // commit('setAccess', [])
        // resolve()
      })
    },
    // 获取用户相关信息
    getUserInfo ({ state, commit }) {
      return new Promise((resolve, reject) => {
        try {
          getUserInfo(state.token).then(res => {
            const data = { cover: '', security_code: '', enable_security_code: false, ...res.data.data }
            commit('setUser', data)
            resolve(data)
          }).catch(err => {
            reject(err)
          })
        } catch (error) {
          reject(error)
        }
      })
    },
    // 此方法用来获取未读消息条数，接口只返回数值，不返回消息列表
    getUnreadMessageCount ({ state, commit }) {
      getUnreadCount().then(res => {
        const { data } = res
        commit('setMessageCount', data)
      })
    },
    // 获取消息列表，其中包含未读、已读、回收站三个列表
    getMessageList ({ state, commit }) {
      return new Promise((resolve, reject) => {
        getMessage().then(res => {
          const { unread, readed, trash } = res.data
          commit('setMessageUnreadList', unread.sort((a, b) => new Date(b.create_time) - new Date(a.create_time)))
          commit('setMessageReadedList', readed.map(_ => {
            _.loading = false
            return _
          }).sort((a, b) => new Date(b.create_time) - new Date(a.create_time)))
          commit('setMessageTrashList', trash.map(_ => {
            _.loading = false
            return _
          }).sort((a, b) => new Date(b.create_time) - new Date(a.create_time)))
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },
    // 根据当前点击的消息的id获取内容
    getContentByMsgId ({ state, commit }, { msg_id }) {
      return new Promise((resolve, reject) => {
        let contentItem = state.messageContentStore[msg_id]
        if (contentItem) {
          resolve(contentItem)
        } else {
          getContentByMsgId(msg_id).then(res => {
            const content = res.data
            commit('updateMessageContentStore', { msg_id, content })
            resolve(content)
          })
        }
      })
    },
    // 把一个未读消息标记为已读
    hasRead ({ state, commit }, { msg_id }) {
      return new Promise((resolve, reject) => {
        hasRead(msg_id).then(() => {
          commit('moveMsg', {
            from: 'messageUnreadList',
            to: 'messageReadedList',
            msg_id
          })
          commit('setMessageCount', state.unreadCount - 1)
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },
    // 删除一个已读消息到回收站
    removeReaded ({ commit }, { msg_id }) {
      return new Promise((resolve, reject) => {
        removeReaded(msg_id).then(() => {
          commit('moveMsg', {
            from: 'messageReadedList',
            to: 'messageTrashList',
            msg_id
          })
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },
    // 还原一个已删除消息到已读消息
    restoreTrash ({ commit }, { msg_id }) {
      return new Promise((resolve, reject) => {
        restoreTrash(msg_id).then(() => {
          commit('moveMsg', {
            from: 'messageTrashList',
            to: 'messageReadedList',
            msg_id
          })
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },
    addFavorite ({ state, commit, dispatch }, id) {
      const _f = _.find(state.favList, (f) => id == f);
      if (_f) dispatch('removeFavorite', id)
      else state.favList.push(id)
      commit('setFav', state.favList)
    },
    removeFavorite ({ state, commit }, id) {
      _.remove(state.favList, (f) => id == f);

      commit('setFav', state.favList)
    },
    getAppointmentsStatus({ state, commit }) {
      return new Promise((resolve, reject) => {
        try {
          getAppoitmentsStatus(state.token).then(res => {
            const data = res.data.data
            commit('setAppointmentsStatus', data)
            resolve(data)
          }).catch(err => {
            reject(err)
          })
        } catch (error) {
          reject(error)
        }
      })
    }
  }
}
