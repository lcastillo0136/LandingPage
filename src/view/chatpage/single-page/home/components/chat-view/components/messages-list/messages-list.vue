<template>
  <perfect-scrollbar :options="psOptions" ref="scroll">
    <template v-for="(message, i) in messages">
      <MessageListItem :message="message" :contact="contact" :phone="phone" :key="i" @fileClick="onFileClick"></MessageListItem>
    </template>
    <MessageListItem :sending="sending" :message="{ body: '', direction: 'outbound-api' }" :contact="contact" :phone="phone" v-if="sending"></MessageListItem>
    <MessageListItem :message="{ body: 'Detectado como spam', direction: 'outbound-api', isSpam: true }" :contact="contact" :phone="phone" v-if="banned">
    </MessageListItem>
  </perfect-scrollbar>
</template>
<script>
  import { mapGetters } from 'vuex'
  import config from '@/config'
  import _ from 'lodash'

  const baseUrl = process.env.NODE_ENV === 'development' ? config.baseUrl.dev : config.baseUrl.pro

  import MessageListItem from './components/message-list-item'

  export default {
    name: 'MessagesList',
    props: {
      contact: Object,
      phone: String,
      messages: Array,
      sending: Boolean,
      banned: Boolean
    },
    components: {
      MessageListItem
    },
    data () {
      return {
        psOptions: {
          useBothWheelAxes: false,
          suppressScrollX: true
        },
        ready: false
      }
    },
    watch:{
      messages() {
        this.$nextTick(() => {
          setTimeout(() => {
            this.$refs.scroll.$el.scrollTo({
              top: 9999999,
              left: 0
            })
            setTimeout(() => {
              this.$refs.scroll.$el.scrollTo({
                top: 9999999,
                left: 0
              })
            }, 200)
          }, 1000)
        })
      }
    },
    computed: {
      defaultAvatar() {
        return `${baseUrl.replace('/api/', '/')}storage/default.png`
      }
    },
    methods: {
      push(message) {
        let _messageRow = document.createElement('div');
        let _previousMessage = this.$refs.scroll.$el.querySelector('.ps__rail-x').previousSibling
        
        _messageRow.classList.add('message-row')
        _messageRow.id = `message_${message.id}`

        if (_previousMessage.classList?.contains('last-of-group') && message.direction == 'outbound-api' && _previousMessage.classList?.contains('me')) {
          _previousMessage.classList.remove('last-of-group')
          _messageRow.classList.add('last-of-group')
        } else if (_previousMessage.classList?.contains('last-of-group') && message.direction == 'outbound-api') {
          _messageRow.classList.add('first-of-group')
          _messageRow.classList.add('last-of-group')
        } else if (_previousMessage.classList?.contains('last-of-group') && message.direction == 'inbound-api' && _previousMessage.classList?.contains('contact')) {
          _previousMessage.removeChild(_previousMessage.querySelector('img.avatar'))
          _previousMessage.classList.remove('last-of-group')
          _messageRow.classList.add('last-of-group')
        } else if (_previousMessage.classList?.contains('last-of-group') && message.direction == 'inbound-api') {
          _messageRow.classList.add('first-of-group')
          _messageRow.classList.add('last-of-group')
        } else {
          _messageRow.classList.add('last-of-group')
        }

        if (message.direction != 'inbound-api') _messageRow.classList.add('me')
        else _messageRow.classList.add('contact')

        if (!!message.media_uri && !!message.body) _messageRow.classList.add('message-w-file')

        if (_messageRow.classList.contains('last-of-group') && this.contact && message.direction == 'inbound-api') {
          let _avatar = document.createElement('img')
          _avatar.src = this.contact.avatar
          _avatar.classList.add('avatar')

          _messageRow.append(_avatar)
        } else if (_messageRow.classList.contains('last-of-group') && !this.contact && message.direction == 'inbound-api') {
          let _avatar = document.createElement('img')
          _avatar.src = this.defaultAvatar
          _avatar.classList.add('avatar')

          _messageRow.append(_avatar)
        }

        if (message.body) {
          let _body = document.createElement('div')
          _body.classList.add('bubble')

          let _messageContent = document.createElement('div')
          _messageContent.classList.add('message-content')
          _messageContent.title = this.$moment(message.date_sent).format('DD/MM/YY, hh:mm a')
          _messageContent.innerHTML = this.$options.filters.parseURLs(message.body, true, { target: '__blank' })

          let _messageTime = document.createElement('div')
          _messageTime.classList.add('time')
          _messageTime.classList.add('secondary-text')
          _messageTime.innerHTML = this.$moment(message.date_sent).format('DD/MM/YY, hh:mm a')

          _body.append(_messageContent)
          _body.append(_messageTime)


          _messageRow.append(_body)
        }

        if (message.media_uri) {
          let _body = document.createElement('div')
          _body.classList.add('bubble')

          let _messageContent = document.createElement('div')
          _messageContent.classList.add('message-content')
          _messageContent.title = this.$moment(message.date_sent).format('DD/MM/YY, hh:mm a')

          if (this.isImage(message)) {
            _body.classList.add('file')
            let _img = document.createElement('img')
            _img.src = message.media_uri

            _messageContent.append(_img)

          } else {
            _messageContent.innerHTML = this.$options.filters.parseURLs(message.media_uri, true, { target: '__blank' })

          }
          let _messageTime = document.createElement('div')
          _messageTime.classList.add('time')
          _messageTime.classList.add('secondary-text')
          _messageTime.innerHTML = this.$moment(message.date_sent).format('DD/MM/YY, hh:mm a')

          _body.append(_messageContent)
          _body.append(_messageTime)

          _messageRow.append(_body)
        }

        this.$refs.scroll.$el.insertBefore(_messageRow, this.$refs.scroll.$el.querySelector('.ps__rail-x'))
        this.$refs.scroll.$el.scrollTo({
          top: 9999999,
          left: 0
        })
      },
      isImage({ media_uri }) {
        return {
          '.png': true,
          '.jpg': true,
          '.jpeg': true,
          '.bmp': true,
          '.gif': true,
          '.tiff': true
        }[media_uri.slice((media_uri.lastIndexOf(".") - 2 >>> 0) + 2)] || false;
      },
      isAudio({ media_uri }) {
        return {
          '.mp3': true,
          '.aac': true,
          '.wav': true,
          '.flac': true,
          '.wma': true,
          '.m4a': true,
          '.oga': true
        }[media_uri.slice((media_uri.lastIndexOf(".") - 2 >>> 0) + 2)] || false;
      },
      isVideo({ media_uri }) {
        return {
          '.webm': true,
          '.mkv': true,
          '.flv': true,
          '.vob': true,
          '.ogg': true,
          '.avi': true,
          '.mov': true,
          '.rmvb': true,
          '.mp4': true,
          '.3gp': true,
          '.mpeg': true
        }[media_uri.slice((media_uri.lastIndexOf(".") - 2 >>> 0) + 2)] || false;
      },
      isDocument({ media_uri }) {
        return {
          '.pdf': true
        }[media_uri.slice((media_uri.lastIndexOf(".") - 2 >>> 0) + 2)] || false;
      },
      isOtherFile({ media_uri }) {
        return !this.isImage({ media_uri }) && !this.isAudio({ media_uri }) && !this.isVideo({ media_uri }) && !this.isDocument({ media_uri });
      },
      onFileClick({message, type}) {
        this.$emit('fileClick', { message, type })
      }
    },
    mounted() {
      this.$nextTick(() => {
        setTimeout(() => {
          this.$refs.scroll?.$el.scrollTo({
            top: 9999999,
            left: 0
          })
          setTimeout(() => {
            this.$refs.scroll?.$el.scrollTo({
              top: 9999999,
              left: 0
            })
          }, 1000)
        }, 1000)
      })
    },
    created() {
    }
  }
</script>
<style lang="scss">
  
</style>