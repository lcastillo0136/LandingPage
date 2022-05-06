<template>
  <div class="chat-view-container" :class="{ 'file-open': fileUploadOpen }" @dragover="fileUploadOpen=messages && messages.length > 0">
    <a-card :bordered="false">
      <loading :loading="loadingFiles"></loading>
      <template v-if="messages && messages.length > 0">
        <div class="messages-box">
          <MessagesList :messages="messages" :contact="contact" :phone="phone" :sending="sending" ref="messageListPanel" @fileClick="onFileClick" v-cloak></MessagesList>
        </div>
        <Upload
          multiple
          paste
          :max-size="5242880"
          action="fake_url"
          :before-upload="handleUpload"
          type="drag">
          <Icon type="ios-close" size="50" class="close-file-upload" @click.stop.prevent="fileUploadOpen=false" />

          <div style="padding: 20px 35px" v-if="!sendingFile">
            <a-icon type="download" style="color: #3399ff; font-size: 53px;"/>
            <p>Elija un archivo o arrástrelo y sueltelo aquí.</p>
          </div>
          <div style="padding: 20px 0" v-else>
            <a-icon type="loading" spin 
              style="
                font-size: 53px;
                animation-name: backgroundColorPalette;
                animation-duration: 5s;
                animation-iteration-count: infinite;
                animation-direction: alternate;
                animation-timing-function: linear;
              "
            ></a-icon>
            <p>Enviando Archivo.</p>
          </div>
        </Upload>
        <div class="message-form">
          <div class="message-input">
            <twemoji-picker
              :emojiData="emojiDataAll"
              :emojiGroups="emojiGroups"
              :skinsSelection="false"
              :searchEmojisFeat="true"
              searchEmojiPlaceholder="Busca aqui."
              searchEmojiNotFound="No se encontraron emojis."
              isLoadingLabel="Buscando..."
              @emojiUnicodeAdded="emojiSelected"
            ></twemoji-picker>
            <a-input :placeholder="TypeAMessage" ref="inputmessage" v-model="message" @pressEnter="reply" />
            <Icon type="md-attach" @click.stop.prevent="fileUploadOpen=!fileUploadOpen"></Icon>
          </div>
          <div class="message-action">
            <a-button type="primary" shape="circle" @click.stop.prevent="reply">
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
  import Loading from '@/components/loading'
  import { TwemojiPicker } from '@kevinfaguiar/vue-twemoji-picker';
  import EmojiAllData from '@kevinfaguiar/vue-twemoji-picker/emoji-data/es-mx/emoji-all-groups.json';
  import EmojiDataAnimalsNature from '@kevinfaguiar/vue-twemoji-picker/emoji-data/es-mx/emoji-group-animals-nature.json';
  import EmojiDataFoodDrink from '@kevinfaguiar/vue-twemoji-picker/emoji-data/es-mx/emoji-group-food-drink.json';
  import EmojiGroups from '@kevinfaguiar/vue-twemoji-picker/emoji-data/emoji-groups.json';
  import { mapGetters } from 'vuex'
  import config from '@/config'
  import _ from 'lodash'

  import MessagesList from './components/messages-list'

  import PhotoSwipeLightbox from 'photoswipe/dist/photoswipe-lightbox.esm.js';
  import PhotoSwipe from 'photoswipe/dist/photoswipe.esm.js';

  const baseUrl = process.env.NODE_ENV === 'development' ? config.baseUrl.dev : config.baseUrl.pro

  export default {
    name: 'ChatView',
    props: {
      contact: Object,
      phone: String,
      messages: Array
    },
    components: {
      MessagesList,
      'twemoji-picker': TwemojiPicker,
      Loading
    },
    data () {
      return {
        message: '',
        files: [],
        sending: false,
        sendingFile: false,
        processingFiles: false,
        fileUploadOpen: false,
        loadingFiles: false,
        photoSwipeOptions: {
          dataSource: []
        }
      }
    },
    watch:{
      messages() {
        this.readyToReply()
      }
    },
    computed: {
      ...mapGetters({
        settings: 'settings'
      }),
      TypeAMessage() {
        return `Enviar un mensaje a ${ this.contact ? this.contact.full_name : this.PhoneFormated }`
      },
      PhoneFormated() {
        return this.$options.filters.phone(this.$options.filters.waPhone(this.phone))
      },
      TwilioPhone() {
        return this.settings?.TWILIO_PHONE_FROM;
      },
      emojiDataAll() {
        return EmojiAllData;
      },
      emojiGroups() {
        return EmojiGroups;
      }
    },
    methods: {
      readyToReply() {
        setTimeout(() => {
          this.$nextTick(() => {
            //this.$refs.scroll.$el.scrollTop = 9999999
            this.$refs.inputmessage?.focus()
            this.message = ''
          })
        },1000)
      },
      reply() {
        this.sending = true;

        if (!this.message) {
          this.sending = false;
          this.$notification.error({
            message: `Error: Empty message`,
            description: 'No se pueden enviar mensajes vacios', 
            placement: 'bottomRight',
            duration: 5
          });
          return;
        }

        let _message = {
          body: this.message,
          user_id: this.contact ? (+this.contact.id) : null,
          date_sent: this.$moment().utc().format('YYYY-MM-DD HH:mm:ss'),
          direction: 'outbound-api',
          from_phone: `whatsapp:+${this.TwilioPhone}`,
          status: 'queued',
          to_phone: this.contact ? `whtasapp:+52${this.contact.phone}` : this.phone
        };

        this.$emit('onReply', { message: _message })
        

        this.$nextTick(() => {
          this.readyToReply()
          this.message = ''
        })
      },
      push(message) {
        // this.$refs.messageListPanel.push(message)
        this.messages.push(message)
        this.message = ''
        this.sending = false
      },
      emojiSelected(emoji) {
        if (this.$refs.inputmessage.$el.selectionStart || this.$refs.inputmessage.$el.selectionStart == '0') {
          var startPos = this.$refs.inputmessage.$el.selectionStart;
          var endPos = this.$refs.inputmessage.$el.selectionEnd;
          this.message = this.message.substring(0, startPos) + emoji + this.message.substring(endPos, this.message.length);
        } else {
          this.message += emoji;
        }
      },
      handleUpload (file) {
        this.files.push(file);
        this.processingFiles = true
        this.sendingFile = true;
        this.sending = true
        
        setTimeout(() => {
          if (this.processingFiles) {
            this.processingFiles = false
            this.fileChangeEvent()
          }
        }, 3000)
        return false;
      },
      fileChangeEvent () {
        let _files = [];
        let _haveFiles = false;
    
        for (const file of this.files) {
          this.sendingFile = true;
      
          _files.push(file);
          if (this.validateFileSize(file.size)) {
            let _message = {
              body: '',
              user_id: this.contact ? (+this.contact.id) : null,
              date_sent: this.$moment().utc().add(_files.length, 'seconds').format('YYYY-MM-DD HH:mm:ss'),
              direction: 'outbound-api',
              from_phone: `whatsapp:+${this.TwilioPhone}`,
              status: 'queued',
              to_phone: this.contact ? `whtasapp:+52${this.contact.phone}` : this.phone
            };

            this.$emit('onReply', { message: _message, file })
          } else if (!this.validateFileSize(file.size)) {
            if (this.files.length == _files.length) {
              this.readyToReply();
              this.processingFiles = false;
              this.fileUploadOpen = false
              this.sendingFile = false;
              this.files = []
            }
            this.$notification.error({
              message: `Error: Wrong size`,
              description: 'No se pueden enviar archivos mayores a 5MB', 
              placement: 'bottomRight',
              duration: 5
            });
          }
          
          _haveFiles = true;
          if (this.files.length == _files.length) {
            this.readyToReply();
            this.processingFiles = false;
            this.fileUploadOpen = false
            this.sendingFile = false;
            this.files = []
          }
        }

        if (_haveFiles == false) {
          tthis.readyToReply();
          this.processingFiles = false;
          this.fileUploadOpen = false
          this.sendingFile = false;
          this.files = []
        }
      },
      validateFileType (file) {
        const valid_extensions = ['.docx', '.jpg', '.jpng', '.png', '.pdf', '.doc', '.ppt', '.pptx', '.csv', '.xls', '.xlsx', '.png', '.gif', '.tiff', '.bmp', '.mp3', '.acc', '.wma', '.json', '.avi'];
        const extension = file.name.slice((file.name.lastIndexOf(".") - 2 >>> 0) + 2);
        return file.type.indexOf('application/pdf') != -1 || 
          file.type.indexOf('application/msword') != -1 ||
          file.type.indexOf('application/vnd.ms-powerpoint') != -1 ||
          file.type.indexOf('application/vnd.ms-excel') != -1 ||
          file.type.indexOf('application/vnd.openxmlformats-officedocument.presentationml.presentation') != -1 ||
          file.type.indexOf('application/vnd.openxmlformats-officedocument.spreadsheetml.sheet') != -1 ||
          file.type.indexOf('application/vnd.openxmlformats-officedocument.wordprocessingml.document') != -1 ||
          file.type.indexOf('image/') != -1 ||
          file.type.indexOf('audio/') != -1 ||
          file.type.indexOf('video/') != -1 || 
          file.type.indexOf('text/') != -1 ||
          valid_extensions.includes(extension);
      },
      validateFileSize (size) {
        return size <= 5242880;
      },
      onFileClick({ message, type }) {
        
        this.openGallery(message.media_uri)
      },
      openGallery(url = '') {
        let _dataSource = _.map(_.filter(this.messages, (f) => /\.(jpeg|jpe|jpg|gif|png|pdf)$/i.test(f.media_uri)), (f) => {
          if (/\.(pdf)$/i.test(f.media_uri)) {
            return { 
              html: '<iframe src="' + f.media_uri + '"></iframe>'
            };
          } else {
            return {
              src: f.media_uri,
              alt: ''
            };
          }
        });

        if (url) {
          this.photoSwipeOptions.index = _.findIndex(_dataSource, (d) => {
            return d.html ? d.html.indexOf(url) != -1 : d.src == url;
          });
        } else {
          this.photoSwipeOptions.index = 0;
        }

        this.loadingFiles = true;

        Promise.all([
          ..._.filter(_dataSource, (d) => d.src).map((d) => this.getImageDimensions(d.src)),
          new Promise(resolve => {
            resolve({ width: false, height: false })
          })
        ]).then((result) => {
          this.photoSwipeOptions.dataSource = _.map(_dataSource, (d) => {
            if (d.html) {
              return {
                html: d.html,
              };
            } else {
              let { width , height } = _.find(result, { url: d.src }) || ({ width: false, height: false });

              return {
                src: d.src,
                width,
                height
              };
            }
          });

          const pswp = new PhotoSwipeLightbox({
            ...this.photoSwipeOptions,
            mouseMovePan: true,
            initialZoomLevel: 'fit',
            secondaryZoomLevel: 1.5,
            maxZoomLevel: 1,
            bgOpacity: 0.5,
            loop: false,
            wheelToZoom: true,
            // appendToEl: document.querySelector('.upload-container'),
            pswpModule: PhotoSwipe,
          });
          pswp.init();

          pswp.on('afterInit', () => {
            console.log('afterInit');
          });

          pswp.addFilter('isContentZoomable', (isContentZoomable, content) => {
            return true;
          });

          this.loadingFiles = false
          pswp.loadAndOpen(this.photoSwipeOptions.index);
        }).catch(() => {
          this.loadingFiles = false
        });
      },
      getImageDimensions (url) {
        return new Promise((resolve, reject) => {
          const img = new Image();
          img.onload = () => resolve({
            width: img.width,
            height: img.height,
            url: url
          });
          img.onerror = (error) => reject(error);
          img.src = url;
        });
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
            button#btn-emoji-default {
              margin: 0;
              height: auto;
              width: auto;
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

        div#preloader {
          position: absolute;
          top: 0;
          left: 0;
          opacity: 0.8;
        }
        &::after, &::before { display: none; }
      }
    }
    .ivu-upload {
      position: absolute;
      width: 100%;
      height: 100%;
      top: 0;
      left: 0;
      z-index: 10;
      display: none;
  
      .close-file-upload {
        position: absolute;
        top: 38px;
        right: 40px;
      }
      &.ivu-upload-drag {
        border: none;
        outline: dashed 6px #ededed;
        outline-offset: -30px;
        display: flex !important;
        flex-direction: column;
        align-content: center;
        justify-content: center;
        align-items: center;
        font-size: 25px;
        transition: outline-offset 250ms linear;

        &.ivu-upload-dragOver {
          outline-color: #2d8cf0;
          outline-offset: -40px;
        }
      }
    }
    &.file-enter,
    &.file-open {
      .ivu-upload {
        display: block;
      }
    }
  }

  @media only screen and (max-width: 450px) {
    .chat-view-container {
      .ant-card {
        .ant-card-body {
          .message-form {
            .message-input {
              padding: 6px 15px;
              #popper-button {
                display: none;
              }
            }

            .message-action {
              width: auto;
              margin-left: 6px;
              align-self: center;
              button {
                padding: 4px 4px 4px 7px;
              }
            }
          }
        }
      }
    }
  }

  @keyframes backgroundColorPalette {
    0% {
      color: #ee6055;
    }
    25% {
      color: #60d394;
    }
    50% {
      color: #aaf683;
    }
    75% {
      color: #ffd97d;
    }
    100% {
      color: #ff9b85;
    }
  }
</style>