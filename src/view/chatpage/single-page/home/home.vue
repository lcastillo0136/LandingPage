<template>
  <main class="main-page">
    <ContactsList class="contacts-panel" :contacts="contacts"></ContactsList>
    <ChatView class="chatview-panel"></ChatView>
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
        contacts: []
      }
    },
    methods: {
      ...mapMutations([
        'setLoading'
      ]),
      ...mapActions([
        'handleLogOut'
      ]),
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
      flex: 0 1 30%;
    }

    .chatview-panel {
      flex: 1 1 auto;
    }
  }
</style>