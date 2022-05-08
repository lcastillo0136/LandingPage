<template>
  <main class="main-page pb-0">
    <template v-if="TwilioPhone && hasPermission">
      <ContactsList class="contacts-panel" :contacts="contacts" @onContactClick="selectContact"></ContactsList>
      <ChatView 
        class="chatview-panel" 
        :contact="selectedContact" 
        :messages="messages" 
        :phone="selectedPhone" 
        @onReply="onReply"
        ref="ChatViewPanel"
      ></ChatView>
    </template>
    <template v-else>
      <a-result title="Su cuenta de whatsapp no ha sido activada">
        <template #extra>
          
        </template>
      </a-result>
    </template>
  </main>
  <!-- /main content -->
</template>

<script>
  import { getDatabase, ref, onValue, set } from "firebase/database";
  import { mapGetters, mapMutations, mapActions } from 'vuex'
  import { Messages } from '@/api/messages'

  import ContactsList from './components/contacts-list'
  import ChatView from './components/chat-view'
  
  import _ from 'lodash'

  export default {
    props: {
    },
    components: { 
      ContactsList,
      ChatView
    },
    data () {
      return {
        contacts: [],
        selectedContact: null,
        selectedPhone: '',
        messages: []
      }
    },
    computed: {
      ...mapGetters([
        'firebase',
        'settings',
        'getUser'
      ]),
      TwilioPhone() {
        return this.settings?.TWILIO_PHONE_FROM;
      },
      hasPermission() {
        return _.find(this.getUser?.permisos, { action: 'view', controller: 'messages', access: 1 }) || false
      }
    },
    methods: {
      ...mapMutations([
        'setLoading'
      ]),
      ...mapActions([
        'handleLogOut'
      ]),
      selectContact({ contact, index }) {
        this.messages = []
        this.selectedContact = null
        this.selectedPhone = ''
        
        Messages.get(contact.last_message.id).then((response) => {
          let { data } = response.data
          this.selectedContact = data.contact
          this.selectedPhone = data.phone
          this.messages = data.messages
        })
        contact.unread = 0
      },
      onReply({ message, file }) {
        Messages.post(message, file).then((response) => {
          let { data } = response.data
          let _contact = _.find(this.contacts, { phone: data.to_phone })
          if (_contact && file) {
            _contact.last_message = { ...data }
            this.$refs.ChatViewPanel.push({...data})
          }
        }).catch((error) => {
          this.$notification.error({
            message: 'No se pudo enviar el mensaje',
            description: 'El tiempo minimo para agendar es de 60 minutos.'
          })
          this.$refs.ChatViewPanel.handleError({
            message: message.body
          })
        })
      }
    },
    mounted () {
      Messages.list().then((response) => {
        this.contacts = _.map(response.data.data, (m) => {
          return {
            ...m,
            unread: 0
          }
        })

        if (this.$route.params) {
          if (this.$route.params.phone) {
            let _tmpContact = _.find(this.contacts, (c) => { return `${c.phone}`.indexOf(this.$route.params.phone) > -1 })
            
            this.selectContact({ contact: _tmpContact })
          }
        }

        if (this.firebase) {
          const db = getDatabase();
          _.forEach(this.contacts, (c) => {
            let _basePhone = this.$options.filters.phone(this.$options.filters.waPhone(c.user ? `${c.user.phone}` : c.user_full_name));

            let childChat = ref(db, `chats/${c.user ? c.user.id : _basePhone}`)
            onValue(childChat, (snapshot) => {
              const _message = snapshot.val();
              
              if (_message) {
                if (!c.last_message || _message.id != c.last_message.id) {
                  _message.date_sent = this.$moment.utc(_message.date_sent).local().format('YYYY-MM-DD HH:mm:ss');
                  c.last_message = { ..._message };
                  c.unread = +(c.unread || 0) + 1;

                  if (this.selectedContact && this.selectedContact.full_name == c.user_full_name) {
                    c.unread = 0;
                    this.$refs.ChatViewPanel.push({..._message})
                  }

                  c.last_message.created_at = this.$moment().utc().format('YYYY-MM-DD[T]HH:mm:ss[.000000Z]');

                  if (document.hidden) {
                    this.$nativenotification.show('Nuevo mensaje de' + c.user_full_name, {
                      body: c.last_message.body || c.last_message.media_uri,
                      data: {
                        phone: _basePhone
                      }
                    }, {
                      onerror: function () {
                      },
                      onclick: (event) => {
                        let _phone = event.target.data.phone.replace(/[^0-9]/g, '')

                        this.$router.push('/'+_phone)

                        let _tmpContact = _.find(this.contacts, (c) => { return `${c.phone}`.indexOf(_phone) > -1 })
                        
                        this.selectContact({ contact: _tmpContact })

                      },
                      onclose: function () {
                      },
                      onshow: function () {
                      }
                    })
                  }
                }
              }
            });
          })

          let parentChats = ref(db, `chats`)
          onValue(parentChats, (snapshot) => {
            let _message = snapshot.val();
            let _found = _.filter(_message, (c) => {
              let _tmpPhone = c.direction == 'outbound-api' ? c.to_phone : c.from_phone;
              return !_.find(this.contacts, { phone: _tmpPhone });
            })

            if (_found && _found.length > 0) {
              _.each(_found, (f) => {
                let _newChat = {
                  user: null,
                  user_full_name: '',
                  user_id: null
                };
                let _tmpPhone = f.direction == 'outbound-api' ? f.to_phone : f.from_phone;
                f.date_sent = this.$moment.utc(f.date_sent).local().format('YYYY-MM-DD HH:mm:ss');
                
                _newChat.last_message = { ...f };
                _newChat.last_message.created_at = f.created_at;
                _newChat.phone = _tmpPhone;
                _newChat.user_full_name = _tmpPhone;
                _newChat.unread = 1;

                if (this.selectedContact && this.selectedContact.full_name == _tmpPhone) {
                  _newChat.unread = 0;
                }

                this.contacts.push({ ..._newChat });

                let _basePhone = this.$options.filters.phone(this.$options.filters.waPhone(_tmpPhone));
                let _var = _basePhone;

                let _tmpVar = ref(db, `chats/${_basePhone}`)
                onValue(_tmpVar, (snapshot2) => {
                  let _message2 = snapshot2.val();
                  let _chat = _.find(this.contacts, { phone: _newChat.phone });
                  if (_message2) {
                    if (!_chat.last_message || _message2.id != _chat.last_message.id) {
                      _message2.date_sent = this.$moment.utc(_message2.date_sent).local().format('YYYY-MM-DD HH:mm:ss');
                      _chat.last_message = { ..._message2 };
                      _chat.unread = +(_chat.unread || 0) + 1;
                      
                      if (this.selectedContact && this.selectedContact.full_name == _chat.user_full_name) {
                        _chat.unread = 0;
                      }

                      _chat.last_message.created_at = this.$moment().utc().format('YYYY-MM-DD[T]HH:mm:ss[.000000Z]');
                    }
                  }
                });
              });
            }
          });
        }
      }).catch((error) => {
        this.handleLogOut()
      })
    },
  }
</script>

<style lang="scss">
  main.main-page {
    display: flex;
    flex-direction: row;
    gap: 20px;
    padding: 30px;
    overflow: hidden;
    
    .contacts-panel {
      flex: 0 0 28%;
    }

    .chatview-panel {
      flex: 1 1 auto;
      overflow: hidden;
    }
    > .ant-result {
      padding: 48px 32px;
      display: flex;
      flex-direction: column;
      align-content: center;
      justify-content: center;
      align-items: center;
      outline: dashed 5px #ededed;
      background: #fff;
      border-radius: 15px;
      outline-offset: -16px;
    }
  }

  footer {
    font-size: 90%;
  }

  @media only screen and (max-width: 450px) {
    main.main-page {
      flex-direction: column;
      padding: 10px;
      .contacts-panel {
        flex: 0 1 auto;
      }
      .chatview-panel {
      }
    }
  }

  @media only screen and (min-width: 1450px) {
    main.main-page {
      max-width: 1500px;
      margin: 0 auto;
      width: 100%;
    }
  }
</style>