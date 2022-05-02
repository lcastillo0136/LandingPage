<template>
  <div class="chat-view-container">
    <a-card :bordered="false">
      <template v-if="!contact">
        <a-empty />
      </template>
      <template v-else>
        MESSAGES
      </template>
    </a-card>
  </div>
  <!-- /white_bg -->
</template>
<script>
  import config from '@/config'

  export default {
    name: 'ChatView',
    props: {
      contact: Object,
      messages: Array
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
      max-height: 100%;
      height: 100%;
      .ant-card-body {
        max-height: 100%;
        overflow: hidden;
        height: 100%;
        .ps {
          max-height: 100%;
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
      }
    }
  }
</style>