<template>
  <main class="main-page">
    <ContactsList class="contacts-panel" :contacts="contacts" @onContactClick="selectContact"></ContactsList>
    <ChatView 
      class="chatview-panel" 
      :contact="selectedContact" 
      :messages="messages" 
      :phone="selectedPhone" 
      @onReply="onReply"
      ref="ChatViewPanel"
    ></ChatView>
  </main>
  <!-- /main content -->
</template>

<script>
  import { mapGetters, mapMutations, mapActions } from 'vuex'
  import { Messages } from '@/api/messages'

  import ContactsList from './components/contacts-list'
  import ChatView from './components/chat-view'

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
    methods: {
      ...mapMutations([
        'setLoading'
      ]),
      ...mapActions([
        'handleLogOut'
      ]),
      selectContact({ contact, index }) {
        Messages.get(contact.last_message.id).then((response) => {
          let { data } = response.data
          this.selectedContact = data.contact
          this.selectedPhone = data.phone
          this.messages = data.messages
        })
      },
      onReply({ message }) {
        Messages.post(message).then((response) => {
          let { data } = response.data
          let _contact = _.find(this.contacts, { phone: data.to_phone })
          if (_contact) {
            _contact.last_message = { ...data }
            this.$refs.ChatViewPanel.push({...data})
          }
        })
      }
    },
    mounted () {
      Messages.list().then((response) => {
        this.contacts = response.data.data
      }).catch((error) => {
        this.handleLogOut()
        this.setLoading(false)
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
    }
  }
</style>