<template>
  <div class="chat-view-container">
    <a-card :bordered="false">
      <template v-if="messages && messages.length > 0">
        <div class="messages-box">
          <perfect-scrollbar :options="psOptions" ref="scroll">
            <template v-for="(message, i) in MessagesFormated">
              <div class="message-row" :class="{
                'me': message.direction != 'inbound-api',
                'contact': message.direction == 'inbound-api',
                'first-of-group': isFirstMessageOfGroup(message, i),
                'last-of-group': isLastMessageOfGroup(message, i),
                'message-w-file': !!message.media_uri && !!message.body
              }" :key="message.id">
                
                <img v-if="shouldShowContactAvatar(message, i) && contact" :src="contact.avatar" class="avatar" />
                <img v-if="shouldShowContactAvatar(message, i) && !contact" :src="defaultAvatar" class="avatar" />

                <div class="bubble" v-if="message.body">
                  <div class="message-content" :title="message.date_sent" v-html="message.body"></div>
                  <div class="time secondary-text">{{ message.date_sent | moment('DD/MM/YY, hh:mm a') }}</div>
                </div>
                <div class="bubble file" v-if="message.media_uri && message.type != 'other' ">
                  <div class="message-content" :title="message.date_sent">
                    <template v-if="message.type">
                      <template v-if="message.type=='image'">
                        <img class="" :src="message.media_uri">
                      </template>
                      <template v-if="message.type=='audio'">
                        <!-- <ngx-audio-player #musicPlayer [playlist]="[{
                          title: 'Audio file',
                          link: message.media_uri,
                          artist: ''
                        }]" [displayTitle]="false" [autoPlay]="false" [displayPlaylist]="false" [expanded]="false" [displayVolumeControls]="true" [displayRepeatControls]="false"></ngx-audio-player> -->
                      </template>
                      <template v-if="message.type=='video'">
                        <video-player 
                          class="video-player-box"
                          ref="videoPlayer"
                          :options="playerOptions(message)"
                          :playsinline="true"
                          >
                        </video-player>
                      </template>
                      <template v-if="message.type=='document'">
                        <div class="iframe-placeholder">
                          <Icon type="ios-eye"></Icon>
                        </div>
                        <iframe :src="message.pdfUrl"></iframe>
                      </template>
                    </template>
                  </div>
                  <div class="time secondary-text">{{ message.date_sent | moment('DD/MM/YY, hh:mm a') }}</div>
                </div>
                <div class="bubble" v-if="message.media_uri && message.type=='other'">
                  <div class="message-content" :title="message.date_sent" v-html="$options.filters.parseURLs(message.media_uri, true, { target: '__blank' })"></div>
                  <div class="time secondary-text">{{ message.date_sent | moment('DD/MM/YY, hh:mm a') }}</div>
                </div>
              </div>
            </template>
          </perfect-scrollbar>
        </div>
        <div class="message-form">
          <div class="message-input">
            <Icon type="md-happy" @click="$refs.scroll.$el.scrollTop = 999999"></Icon>
            <a-input :placeholder="TypeAMessage" v-model="message" ref="inputmessage" />
            <Icon type="md-attach"></Icon>
          </div>
          <div class="message-action">
            <a-button type="primary" shape="circle">
              <Icon type="md-send"></Icon>
            </a-button>
          </div>
        </div>
      </template>
      <template v-else>
        <a-empty />
      </template>
    </a-card>
  </div>
  <!-- /white_bg -->
</template>
<script>
  import config from '@/config'
  import _ from 'lodash'

  const baseUrl = process.env.NODE_ENV === 'development' ? config.baseUrl.dev : config.baseUrl.pro

  export default {
    name: 'ChatView',
    props: {
      contact: Object,
      phone: String,
      messages: Array
    },
    components: {
      
    },
    data () {
      return {
        psOptions: {
          useBothWheelAxes: false,
          suppressScrollX: true
        },
        message: ''
      }
    },
    watch:{
      messages() {
        this.readyToReply()
      }
    },
    computed: {
      defaultAvatar() {
        return `${baseUrl.replace('/api/', '/')}storage/default.png`
      },
      TypeAMessage() {
        return `Enviar un mensaje a ${ this.contact ? this.contact.full_name : this.PhoneFormated }`
      },
      PhoneFormated() {
        return this.$options.filters.phone(this.$options.filters.waPhone(this.phone))
      },
      MessagesFormated() {
        return _.map(this.messages, (c) => {
          return { 
            ...c,
            type: c.media_uri && (this.isOtherFile(c) ? 'other' : (this.isImage(c) ? 'image' : (this.isAudio(c) ? 'audio' : (this.isVideo(c) ? 'video' : 'document')))),
            pdfUrl: c.media_uri && c.media_uri,
            body: this.$options.filters.parseURLs(c.body, true, { target: '__blank' })
          }
        })
      }
    },
    methods: {
      isFirstMessageOfGroup(message, i) {
        return (i === 0 || this.messages[i - 1] && this.messages[i - 1].from_phone !== (message.from_phone || ''));
      },
      isLastMessageOfGroup(message, i) {
        return (i === this.messages.length - 1 || this.messages[i + 1] && this.messages[i + 1].from_phone !== (message.from_phone || ''));
      },
      shouldShowContactAvatar(message, i) {
        return (
          message.direction == 'inbound-api' &&
          ((this.messages[i + 1] && this.messages[i + 1].from_phone !== (message.from_phone || '')) || !this.messages[i + 1]) &&
          message.from_phone !== null
        );
      },
      readyToReply() {
        setTimeout(() => {
          this.$nextTick(() => {
            this.$refs.scroll.$el.scrollTop = 9999999
            this.$refs.inputmessage.focus()
          })
        },1000)
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
      
    }
  }
</script>
<style lang="scss">
  .chat-view-container {
    .ant-card {
      border-radius: 20px;
      max-height: 100%;
      height: 100%;
      .ant-card-body {
        max-height: 100%;
        overflow: hidden;
        height: 100%;
        display: flex;
        flex-direction: column;
        .ps {
          max-height: 100%;
          padding-bottom: 42px;
        }
        .ant-empty {
          max-height: 100%;
          overflow: hidden;
          height: 100%;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          align-content: center;
        }
        
        .messages-box {
          flex: 1 1 auto;
          overflow: hidden;

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

              .bubble {
                position: relative;
                display: flex;
                align-items: center;
                justify-content: center;
                padding: 12px;
                max-width: 100%;

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
        }

        .message-form {
          display: flex;
          flex-direction: row;
          align-content: center;
          align-items: flex-end;
          .message-input {
            display: flex;
            flex: 1 1 auto;
            flex-direction: row;
            background: #f5f8fa;
            border-radius: 50px;
            padding: 14px 22px;
            .ant-input {
              border: none;
              font-size: 16px;
              background: #0000;
              box-shadow: none;
            }
          }
          .message-action {
            display: flex;
            flex: 0 1 auto;
            flex-direction: row;
            width: 85px;
            text-align: center;
            justify-content: center;
            align-items: center;
            button {
              background: #3ba58b;
              border-color: #3ba58b;
              padding: 13px 10px 13px 16px;
              height: auto;
            }
          }
          .ivu-icon {
            font-size: 30px;
            cursor: pointer;
          }
        }
        &::after, &::before { display: none; }
      }
    }
  }
</style>