<template>
  <div class="chat-view-container">
    <a-card :bordered="false">
      <template v-if="messages && messages.length > 0">
        <div class="messages-box">
          <MessagesList :messages="messages" :contact="contact" :phone="phone" ref="messageListPanel" v-cloak></MessagesList>
        </div>
        <div class="message-form">
          <div class="message-input">
            <Icon type="md-happy"></Icon>
            <a-input :placeholder="TypeAMessage" ref="inputmessage" @pressEnter="reply" />
            <Icon type="md-attach"></Icon>
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
  import { mapGetters } from 'vuex'
  import config from '@/config'
  import _ from 'lodash'

  import MessagesList from './components/messages-list'

  const baseUrl = process.env.NODE_ENV === 'development' ? config.baseUrl.dev : config.baseUrl.pro

  export default {
    name: 'ChatView',
    props: {
      contact: Object,
      phone: String,
      messages: Array
    },
    components: {
      MessagesList
    },
    data () {
      return {
        message: '',
        sending: false
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
      }
    },
    methods: {
      readyToReply() {
        setTimeout(() => {
          this.$nextTick(() => {
            //this.$refs.scroll.$el.scrollTop = 9999999
            this.$refs.inputmessage.focus()
            this.$refs.inputmessage.$el.value = ''
          })
        },1000)
      },
      reply() {
        this.sending = true;

        if (!this.$refs.inputmessage.$el.value) {
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
          body: this.$refs.inputmessage.$el.value,
          user_id: this.contact ? (+this.contact.id) : null,
          date_sent: this.$moment().utc().format('YYYY-MM-DD HH:mm:ss'),
          direction: 'outbound-api',
          from_phone: `whatsapp:+${this.TwilioPhone}`,
          status: 'queued',
          to_phone: this.contact ? `whtasapp:+52${this.contact.phone}` : this.phone
        };

        // Messages.post(_message).then((response) => {
        //   response.data.date_sent = moment.utc(response.data.date_sent).local().format('YYYY-MM-DD HH:mm:ss');

        //   this.$refs.inputmessage.value = ''
        //   this.readyToReply()
        //   this.sending = false
        // }, (error) => {
        //   this.sending = false
        // });

        this.$emit('onReply', { message: _message })

        // this.$nextTick(() => {
        //   this.readyToReply()
        //   this.$refs.inputmessage.$el.value = ''
        //   this.sending = false
        // })

        // this.$refs.messageListPanel.push({
        //   body: "vue",
        //   created_at: "2022-05-02T19:30:54.000000Z",
        //   date_sent: "2022-05-02 19:30:54",
        //   direction: "outbound-api",
        //   error_code: null,
        //   error_message: null,
        //   from_phone: "whatsapp:+5218181175165",
        //   id: 43,
        //   media_uri: "",
        //   message_id: "SMdc5f08c329e14678a9813d384132a82a",
        //   num_media: 0,
        //   num_segments: 1,
        //   order_id: null,
        //   price: null,
        //   price_unit: null,
        //   reference: "/2010-04-01/Accounts/AC32abd2a385c8b68e529f7024893413e4/Messages/SMdc5f08c329e14678a9813d384132a82a.json",
        //   status: "queued",
        //   to_phone: "whatsapp:+5218111533136",
        //   updated_at: "2022-05-02T19:30:54.000000Z",
        //   user_id: 2,
        // })
      },
      push(message) {
        this.$refs.messageListPanel.push(message)
        this.$refs.inputmessage.$el.value = ''
        this.sending = false
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