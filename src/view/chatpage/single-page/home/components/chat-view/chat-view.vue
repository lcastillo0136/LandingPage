<template>
  <div class="chat-view-container">
    <a-card :bordered="false">
      CHATVIEW
    </a-card>
  </div>
  <!-- /white_bg -->
</template>
<script>
  import config from '@/config'

  export default {
    name: 'ChatView',
    props: {
      contacts: Array
    },
    components: {
      
    },
    data () {
      return {
        
      }
    },
    methods: {
    },
    mounted() {
      
    }
  }
</script>
<style lang="scss">
  .chat-view-container {
    .ant-card {
      border-radius: 20px;
    }
  }
</style>