<template>
  <div class="message-row" :class="{
    'me': message.direction != 'inbound-api',
    'contact': message.direction == 'inbound-api',
    'first-of-group': isFirstMessageOfGroup(message) || sending,
    'last-of-group': isLastMessageOfGroup(message),
    'message-w-file': !!message.media_uri && !!message.body
  }" v-once v-cloak :id="'message_' + message.id" v-if="message" ref="messageRow">
    
    <img v-if="shouldShowContactAvatar(message) && contact" :src="contact.avatar" class="avatar" />
    <img v-if="shouldShowContactAvatar(message) && !contact" :src="defaultAvatar" class="avatar" />

    <div class="bubble" v-if="message.body">
      <div class="message-content" :title="message.date_sent" v-html="$options.filters.parseURLs(message.body, true, { target: '__blank' })"></div>
      
      <div class="time secondary-text">{{ message.date_sent | moment('DD/MM/YY, hh:mm a') }}</div>
    </div>
    <div class="send-at-content" v-if="message.send_at">
      {{ message.send_at | sendAt }}
    </div>
    <div class="bubble file" v-if="message.media_uri && !isOtherFile(message)">
      <div class="message-content" :title="message.date_sent">
        <template v-if="isImage(message)">
          <img class="" :src="message.media_uri" @click.stop.prevent="$emit('fileClick', { message, type: 'image' })">
        </template>
        <template v-else-if="isAudio(message)">
          <audio-player
            :audio-list="[ message.media_uri ]"
            :show-prev-button="false"
            :show-next-button="false"
            :isLoop="false"
          />
        </template>
        <template v-else-if="isVideo(message)">
          <video-player 
            class="video-player-box"
            ref="videoPlayer"
            :options="playerOptions(message)"
            :playsinline="true"
            >
          </video-player>
        </template>
        <template v-else>
          <div class="iframe-placeholder" @click.stop.prevent="$emit('fileClick', { message, type: 'pdf' })">
            <Icon type="ios-eye"></Icon>
          </div>
          <iframe :src="message.media_uri"></iframe>
        </template>
      </div>
      <div class="time secondary-text">{{ message.date_sent | moment('DD/MM/YY, hh:mm a') }}</div>
    </div>
    <div class="bubble" v-if="message.media_uri && isOtherFile(message)">
      <div class="message-content" :title="message.date_sent" v-html="$options.filters.parseURLs(message.media_uri, true, { target: '__blank' })"></div>
      <div class="time secondary-text">{{ message.date_sent | moment('DD/MM/YY, hh:mm a') }}</div>
    </div>
    <div class="bubble sending" v-if="sending">
      <div class="message-content">
        <div class="dot-flashing"></div>
      </div>
    </div>
  </div>
</template>
<script>
  import { mapGetters } from 'vuex'
  import config from '@/config'
  import _ from 'lodash'

  const moment = require('moment')

  const baseUrl = process.env.NODE_ENV === 'development' ? config.baseUrl.dev : config.baseUrl.pro

  export default {
    name: 'MessagesListItem',
    props: {
      contact: Object,
      phone: String,
      message: Object,
      sending: Boolean
    },
    components: {
      
    },
    data () {
      return {
        dataMessage: {}
      }
    },
    filters: {
      sendAt(value) {
        return (moment.utc(value, 'YYYY-MM-DD HH:mm:ss').local().isBefore(moment()) ? 'El mensaje se envió ' : 'El mensaje se enviara ') + moment.utc(value, 'YYYY-MM-DD HH:mm:ss').local().format('DD/MM/YYYY hh:mm a')
      }
    },
    watch:{
      message() {
        this.$nextTick(() => {
          this.dataMessage = { ...this.message }
        })
      }
    },
    computed: {
      ...mapGetters({
        settings: 'settings'
      }),
      defaultAvatar() {
        return `${baseUrl.replace('/api/', '/')}storage/default.png`
      }
    },
    methods: {
      isFirstMessageOfGroup(message) {
        let _prev = document.querySelector(`#message_${message.id}`)?.previousSibling
    
        return (!_prev || (_prev.classList?.contains('me') && message.direction != 'outbound-api') || (_prev.classList?.contains('contact') && message.direction != 'inbound-api'));
      },
      isLastMessageOfGroup(message) {
        let _next = document.querySelector(`#message_${message.id}`)?.nextSibling
        return (!_next || (_next && _next.classList?.contains('me') && message.direction == 'inbound-api') || (_next && _next.classList?.contains('contact') && message.direction == 'outbound-api'));
      },
      shouldShowContactAvatar(message) {
        let _next = document.querySelector(`#message_${message.id}`)?.nextSibling
        return (
          message.direction == 'inbound-api' && (!_next || _next.classList?.contains('me'))
        );
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
          '.m4a': true
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
      playerOptions(message) {
        return {
          muted: true,
          language: 'en',
          playbackRates: [0.7, 1.0, 1.5, 2.0],
          sources: [{
            type: {
                '.webm': 'video/webm',
                '.mkv': 'video/x-matroska',
                '.flv': 'video/x-flv',
                '.vob': 'video/mpeg',
                '.ogg': 'video/ogg',
                '.avi': 'video/x-msvideo',
                '.mov': 'video/quicktime',
                '.rmvb': 'application/vnd.rn-realmedia-vbr',
                '.mp4': 'video/mp4',
                '.3gp': 'video/3gpp',
                '.mpeg': 'video/mpeg'
              }[message.media_uri.slice((message.media_uri.lastIndexOf(".") - 2 >>> 0) + 2)] || 'video/mp4',
            src: message.media_uri
          }]
        }
      }
    },
    mounted() {
      this.$nextTick(() => {
        setTimeout(() => {
          this.$refs.messageRow.classList = ['message-row'];
          if (this.message.direction == 'inbound-api') {
            this.$refs.messageRow.classList.add('contact')
          }
          if (this.message.direction == 'outbound-api') {
            this.$refs.messageRow.classList.add('me')
          }
          if (this.isFirstMessageOfGroup(this.message)) {
            this.$refs.messageRow.classList.add('first-of-group')
          }
          if (this.isLastMessageOfGroup(this.message)) {
            this.$refs.messageRow.classList.add('last-of-group')
          }
          if (!!this.message.media_uri && !!this.message.body) {
            this.$refs.messageRow.classList.add('message-w-file')
          }

          if (!this.shouldShowContactAvatar(this.message) && this.message.direction == 'inbound-api' && this.$refs.messageRow.querySelector('img.avatar')) {
            this.$refs.messageRow.removeChild(this.$refs.messageRow.querySelector('img.avatar'))
          }
        }, 100)
      })
    },
    updated() {
      
    }
  }
</script>
<style lang="scss">
  .message-row {
      position: relative;
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      justify-content: flex-end;
      padding: 0 16px 4px 16px;
      padding-top: 0px;
      margin-top: 0px;
      margin-left: 40px;

      .avatar {
        position: absolute;
        margin: 0;
        left: -32px;
        border-radius: 50%;
        height: 40px;
        width: 40px;
      }

      .send-at-content {
        font-size: 80%;
        font-style: italic;
        color: #808080;
      }

      .bubble {
        position: relative;
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 12px;
        max-width: 100%;
          *::after {
            display: none;
          }
          .message-content {
              white-space: pre-wrap;
              line-height: 1.2;
              overflow: hidden;
              .video-player-box, video {
                max-width: 600px;
                height: auto;
                vertical-align: top;
                border: none;
                position: relative;

                .video-js {
                  height: auto;
                  width: auto;
                }

                .vjs-playing {
                  video { opacity: 1; }
                }

                .video-js.vjs-fullscreen {
                  display: flex;
                  video {
                    width: 100% !important;
                    max-width: 100%;
                  }
                }

                button.vjs-big-play-button {
                  top: 50%;
                  left: 50%;
                  transform: translate(-50%, -50%);
                }
                &::after { display: none; }
              }
              iframe {
                border: 0;
                max-width: 100%;
                width: 700px;
                min-height: 300px;
              }
              img {
                cursor: pointer;
                max-width: 100%;
                height: auto;
                vertical-align: top;
                max-height: 300px;
              }

              .iframe-placeholder {
                position: absolute;
                background: #000;
                opacity: 0.5;
                width: 100%;
                height: 100%;
                display: none;
                cursor: pointer;

                .ivu-icon {
                  position: absolute;
                  top: 50%;
                  left: 50%;
                  color: #e0e0e0;
                  font-size: 5em;
                  transform: translate(-50%, -50%);
                  width: auto;
                  height: auto;
                }
              }

              &:hover .iframe-placeholder {
                display: block;
              }

              .audio-player {
                background: #fff;
                padding: 11px 20px;

                .audio__btn-wrap {
                  align-items: flex-end;
                  .audio__play-rate {
                    font-size: 13px;
                  }
                  .audio__play-volume-icon-wrap {
                    width: 16px;
                    height: 16px;
                    .audio__play-volume-wrap {
                      width: 10px;
                      left: 3px;
                      height: 28px;
                    }
                  }
                }

                .audio__progress-wrap {
                  margin-top: 3px;
                }

                .audio__time-wrap {
                  margin-top: 3px;
                }
              }

              @media only screen and (max-width: 450px) {
                .iframe-placeholder {
                  display: block;
                }
                iframe {
                  min-height: 100px;
                }
              }

              &::after { display: none; }
          }


          .time {
            position: absolute;
            display: none;
            width: 100%;
            font-size: 11px;
            margin-top: 8px;
            top: 100%;
            left: 0;
            white-space: nowrap;
            color: #0000008a;
          }

          &.file {
            padding: 0px;
            border: solid 1px #E0E0E0;
            border-radius: 5px;
            overflow: hidden;
            max-width: 70%;
            &:hover {
              box-shadow: 0px 0px 11px 3px #bdbdbd;
            }
          }

          &::after {
            display: none;
          }

          &.sending {
            .message-content {
              width: 42px;
              display: flex;
              justify-content: center;
              align-items: center;
              position: relative;
              margin: 0 -5%;
              overflow: hidden;
            }
          }
      }

      &.contact {

          .bubble {
              border-top-left-radius: 5px;
              border-bottom-left-radius: 5px;

              border-top-right-radius: 20px;
              border-bottom-right-radius: 20px;
              background-color: #3C4252;
              color: #fff;

              .time {
                  margin-left: 12px;
              }

              &.file {
                padding: 0px;
                border: solid 1px #E0E0E0;
                border-radius: 10px;
                overflow: hidden;
                max-width: 70%;
                &:hover {
                  box-shadow: 0px 0px 11px 3px #bdbdbd;
                }
              }
          }

          &.first-of-group {

              .bubble {
                  border-top-left-radius: 20px;
              }
          }

          &.last-of-group {

              .bubble {
                  border-bottom-left-radius: 20px;
              }
          }

          &.message-w-file {
              .bubble {
                  border-bottom-left-radius: 5px;

                  &.file {
                    border-bottom-left-radius: 20px;
                    border-top-left-radius: 5px;
                  }
              }
          }
      }

      &.me {

        .send-at-content {
          margin-left: auto;
        }
          padding-left: 40px;

          .avatar {
              order: 2;
              margin: 0 0 0 16px;
          }

          .bubble {
              margin-left: auto;

              border-top-left-radius: 20px;
              border-bottom-left-radius: 20px;

              border-top-right-radius: 5px;
              border-bottom-right-radius: 5px;
              color: #000000de;
              background-color: #E0E0E0;
              
              .message-content {

              }
              
              .time {
                  justify-content: flex-end;
                  right: 0;
                  margin-right: 12px;
              }

              &.file {
                padding: 0px;
                border: solid 1px #E0E0E0;
                border-radius: 10px;
                overflow: hidden;
                max-width: 70%;
                &:hover {
                  box-shadow: 0px 0px 11px 3px #bdbdbd;
                }
              }
          }

          &.first-of-group {

              .bubble {
                  border-top-right-radius: 20px;
              }
          }

          &.last-of-group {

              .bubble {
                  border-bottom-right-radius: 20px;

                  &.file {
                    border-top-right-radius: 5px;
                  }
              }
          }
      }

      &.contact + .me,
      &.me + .contact {
          padding-top: 20px;
          margin-top: 20px;
      }

      &.first-of-group {

          .bubble {
              border-top-left-radius: 20px;
              padding-top: 13px;
          }
      }

      &.last-of-group {

          .bubble {
              border-bottom-left-radius: 20px;
              padding-bottom: 13px;

              .time {
                  display: flex;
              }
          }
      }
  }
</style>