<template>
  <div class="chat-view-container" :class="{ 'file-open': fileUploadOpen }" @dragover="fileUploadOpen=messages && messages.length > 0">
    <a-card :bordered="false">
      <loading :loading="loadingFiles || loadingChat"></loading>
      <template v-if="messages && messages.length > 0">
        <div slot="title">
          <template v-if="contact">
            <a-avatar :src="contact.avatar" class="mr-2"/>
            {{ contact.full_name }}
          </template>
          <template v-else>
            <a-avatar :src="defaultAvatar" class="mr-2"/>
            {{ phone | waPhone | phone }}
          </template>
          <span class="float-right">
            <a-dropdown>
              <a-button class="chatmenu-options">
                <a-icon type="more"></a-icon>
              </a-button>
              <a-menu slot="overlay">
                <template v-if="contact">
                  <a-menu-item>
                    <a href="javascript:;" @click="profilePreview=true"> Información de contacto </a>
                  </a-menu-item>
                  <a-menu-item v-if="!banned">
                    <a href="javascript:;" @click="fileUploadOpen=!fileUploadOpen"> Enviar archivos </a>
                  </a-menu-item>
                  <a-divider dashed class="my-1"></a-divider>
                  <template v-if="!banned">
                    <a-menu-item v-if="bot_enabled">
                      <a href="javascript:;" @click="disableChatbot"> Desactivar Chatbot </a>
                    </a-menu-item>
                    <a-menu-item v-else>
                      <a href="javascript:;" @click="enableChatbot"> Activar Chatbot </a>
                    </a-menu-item>
                  </template>
                  <a-menu-item>
                    <a href="javascript:;" @click="openGallery(false)"> Ver archivos </a>
                  </a-menu-item>
                </template>
                <template v-else>
                  <a-menu-item>
                    <a href="javascript:;" @click="registerClient"> Registrar cliente </a>
                  </a-menu-item>
                  <a-menu-item v-if="!banned">
                    <a href="javascript:;" @click="fileUploadOpen=!fileUploadOpen"> Enviar archivos </a>
                  </a-menu-item>
                  <a-divider dashed class="my-1"></a-divider>
                  <template v-if="!banned">
                    <a-menu-item v-if="bot_enabled">
                      <a href="javascript:;" @click="disableChatbot"> Desactivar Chatbot </a>
                    </a-menu-item>
                    <a-menu-item v-else>
                      <a href="javascript:;" @click="enableChatbot"> Activar Chatbot </a>
                    </a-menu-item>
                  </template>
                  <a-menu-item>
                    <a href="javascript:;" @click="openGallery(false)"> Ver archivos </a>
                  </a-menu-item>
                </template>
                <a-divider dashed class="my-1"></a-divider>
                <a-menu-item v-if="!banned">
                  <a href="javascript:;" @click="banuser">
                    <a-icon type="lock"></a-icon>
                    Bloquear usuario 
                  </a>
                </a-menu-item>
                <a-menu-item v-else>
                  <a href="javascript:;" @click="unbanuser"> 
                    <a-icon type="unlock"></a-icon>
                    Desbloquear usuario 
                  </a>
                </a-menu-item>
              </a-menu>
            </a-dropdown>
          </span>
        </div>
        <div class="messages-box">
          <MessagesList :messages="messages" :contact="contact" :phone="phone" :sending="sending" :banned="banned" ref="messageListPanel" @fileClick="onFileClick" v-cloak></MessagesList>
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
        <div class="message-form" v-if="!banned">
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
            <a-popover v-model="scheduleModal" title="" trigger="click" placement="topRight">
              <a-form-model ref="scheduleForm" :rules="rulesSchedule" :model="formSchedule" slot="content" class="scheduleForm">
                <div class="row">
                  <div class="col-md-8 col-sm-8">
                    <div class="form-group">
                      <label>Enviar en esta fecha y hora</label>
                      <a-form-model-item prop="scheduleDate">
                        <a-date-picker use12-hours show-time v-model="formSchedule.scheduleDate" size="large" :showTime="{ use12Hours: true }" format="DD/MM/YYYY hh:mm:ss a" />
                      </a-form-model-item>
                    </div>
                  </div>
                  <div class="col-md-4 d-flex align-items-center justify-content-center">
                    <a-button type="primary" @click.stop.prevent="sendSchedule">
                      Enviar <Icon style="margin-left: 5px;" type="md-send"></Icon>
                    </a-button>
                  </div>
                </div>
              </a-form-model>
              <a-button type="primary" shape="circle" class="schedule-button">
                <Icon type="md-calendar"></Icon>
              </a-button>
            </a-popover>
          </div>
          <div class="message-action">
            <a-button type="primary" v-if="!scheduleModal" shape="circle" @click.stop.prevent="reply">
              <Icon type="md-send"></Icon>
            </a-button>
            <a-button type="dashed" v-else shape="circle" ghost disabled >
              <Icon type="md-send"></Icon>
            </a-button>
          </div>
        </div>
        <div class="message-form" v-else>
          <div class="message-input">
            <twemoji-picker
              :emojiData="emojiDataAll"
              :emojiGroups="emojiGroups"
              :skinsSelection="false"
              :searchEmojisFeat="false"
              :emojiPickerDisabled="true"
            ></twemoji-picker>
            <a-input :placeholder="TypeAMessage" ref="inputmessage" :disabled="true" />
            <Icon type="md-attach" :disabled="true"></Icon>
          </div>
          <div class="message-action">
            <a-button type="primary" shape="circle" class="schedule-button" :disabled="true">
              <Icon type="md-calendar"></Icon>
            </a-button>
          </div>
          <div class="message-action">
            <a-button type="primary" shape="circle" :disabled="true">
              <Icon type="md-send"></Icon>
            </a-button>
          </div>
        </div>
        <a-drawer placement="right" :visible="profilePreview" @close="onCloseProfilePreview" :get-container="false"
          :wrap-style="{ position: 'absolute' }">
          <div slot="title">
            Informacion del contacto
          </div>
        </a-drawer>
      </template>
      <template v-else>
        <a-empty image="img/smila-chat.png">
          <template #description>
            <b>Centro de mensajes</b>
            <br>
            ¡Seleccione un contacto para abrir un chat!
          </template>
        </a-empty>
      </template>
    </a-card>
  </div>
</template>
<script>
  import { disableChatbot, enableChatbot, registerClient, banUser, unbanUser } from '@/api/user'
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
  
  const errors = {
    'role_clients_not_found': 'No hay definido un rol para clientes'
  }

  export default {
    name: 'ChatView',
    props: {
      contact: Object,
      phone: String,
      messages: Array,
      banned: Boolean,
      bot_enabled: Boolean,
      loadingChat: Boolean
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
        },
        scheduleModal: false,
        rulesSchedule: {
          scheduleDate: [{ validator: (rule, value, callback) => {
            if (value === '' || !value) {
              callback(new Error('Favor de no dejar este campo vacio'));
            } else {
              if (this.$moment().add({ seconds: 3610 }).isAfter(value)) {
                callback(new Error('La agenda minima es de 60 minutos'))
              } else {
                callback();
              }
            }
          }, trigger: 'change' }],
        },
        formSchedule: {
          scheduleDate: this.$moment().add({ seconds: 3710 })
        },
        profilePreview: false
      }
    },
    watch:{
      messages() {
        this.readyToReply()
      }
    },
    computed: {
      ...mapGetters({
        settings: 'settings',
        hasToken: 'hasToken'
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
      },
      defaultAvatar() {
        return `${baseUrl.replace('/api/', '/')}storage/default.png`
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
          to_phone: this.phone
        };

        this.$emit('onReply', { message: _message })

        this.$nextTick(() => {
          this.readyToReply()
          this.message = ''
        })
      },
      sendSchedule() {
        this.$refs.scheduleForm.validate().then(valid => {
          if (valid) {
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
              to_phone: this.contact ? `whtasapp:+52${this.contact.phone}` : this.phone,
              schedule: this.formSchedule.scheduleDate.utc().format('DD/MM/YYYY HH:mm:59')
            };

            this.$emit('onReply', { message: _message })

            this.$nextTick(() => {
              this.readyToReply()
              this.message = ''
              this.formSchedule.scheduleDate = this.$moment().add({ seconds: 3610 })
              this.scheduleModal = false
            })
          }
        }).catch((error) => {

        })
      },
      push(message) {
        // this.$refs.messageListPanel.push(message)
        this.messages.push(message)
        this.message = ''
        this.sending = false
      },
      handleError({ message }) {
        this.message = message
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
            /// console.log('afterInit');
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
      },
      onCloseProfilePreview() {
        this.profilePreview = false
      },
      enableChatbot() {
        enableChatbot(this.hasToken, this.contact, this.phone).then(({ data }) => {
          this.$notification.info({
            message: `Bot Activado`,
            description: `El cliente ${this.contact ? this.contact.full_name : this.PhoneFormated} ya recibirá respuestas del bot nuevamente`
          })
          this.$emit('chatbotStateChange', true)
        })
      },
      disableChatbot() {
        disableChatbot(this.hasToken, this.contact, this.phone).then(({ data }) => {
          // if (this.contact) this.contact.disable_bot = this.$moment().add(60, 'minutes').format('YYYY-MM-DD HH:mm:ss');
          this.$notification.info({
            message: `Bot Desactivado`,
            description: `El cliente ${this.contact ? this.contact.full_name : this.PhoneFormated} ya no recibirá respuestas del bot durante los próximos 60 minutos`
          })

          this.$emit('chatbotStateChange', false)
        })
      },
      banuser() {
        banUser(this.hasToken, this.contact, this.phone).then(({ data }) => {
          this.$notification.info({
            message: `Usuario bloqueado`,
            description: `El cliente ${this.contact ? this.contact.full_name : this.PhoneFormated} ya no podra recibir respuestas del bot`
          })
          this.$emit('banStateChange', true, this.contact || { phone: this.phone })
        })
      },
      unbanuser() {
        unbanUser(this.hasToken, this.contact, this.phone).then(({ data }) => {
          // if (this.contact) this.contact.disable_bot = this.$moment().add(60, 'minutes').format('YYYY-MM-DD HH:mm:ss');
          this.$notification.info({
            message: `Usuario activado`,
            description: `El cliente ${this.contact ? this.contact.full_name : this.PhoneFormated} ya podra recibir respuestas del bot o de usuarios`
          })

          this.$emit('banStateChange', false, this.contact || { phone: this.phone })
        })
      },
      registerClient() {
        registerClient(this.hasToken, {
          phone: this.phone.replace(/[^0-9]+/, ''),
          first_name: this.phone,
        }).then((response) => {
          let { data } = response.data
          this.$emit('onContactUpdated', data);  
        }).catch(({ data }) => {
          this.$notification.error({
            message: 'Error al registrar cliente',
            description: errors[data.message]
          })
        })
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
      display: flex;
      flex-direction: column;
      overflow: hidden;
      .ant-card-body {
        max-height: 100%;
        overflow: hidden;
        height: 100%;
        display: flex;
        flex-direction: column;
        padding-top: 0;
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
          margin-top: 3px;
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
            width: 70px;
            text-align: center;
            justify-content: center;
            align-items: center;
            button {
              background: #3ba58b;
              border-color: #3ba58b;
              padding: 13px 10px 13px 16px;
              height: auto;
              &.schedule-button {
                padding: 13px;
              }
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
      .chatmenu-options {
        border: none;
        font-weight: bold;
        font-size: 24px;
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

  /* Mobile view */
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
                &.schedule-button {
                  padding: 4px 4px 4px 7px;
                }
              }
            }
          }
        }
      }
    }
    .ant-popover  {
      left: 10px !important;
      right: 10px;
      .ant-popover-arrow {
        display: none;
      }
      .ant-popover-inner {
        box-shadow: none;
        border: dashed 1px #e0e0e0;
      }
      .scheduleForm {
        .ant-calendar-picker {
          width: 100%;
        }
        .ant-btn {
          width: 100%;
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

  .scheduleForm {
    max-width: 100%;
    .ant-calendar-picker {
      width: 260px;
    }

    *::after {
      display: none;
    }
  }
</style>