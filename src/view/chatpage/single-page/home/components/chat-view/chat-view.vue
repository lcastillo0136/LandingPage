<template>
  <div class="chat-view-container">
    <a-card :bordered="false">
      <template v-if="!contact">
        <a-empty />
      </template>
      <template v-else>
        <div class="messages-box">
          <perfect-scrollbar :options="psOptions">
            {{ messages }}
          </perfect-scrollbar>
        </div>
        <div class="message-form">
          <div class="message-input">
            <Icon type="md-happy"></Icon>
            <Input v-model="message" placeholder="Type a message" clearable />
            <Icon type="md-attach"></Icon>
          </div>
          <div class="message-action">
            <a-button type="primary" shape="circle">
              <Icon type="md-send"></Icon>
            </a-button>
          </div>
        </div>
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
        psOptions: {
          useBothWheelAxes: false,
          suppressScrollX: true
        },
        message: ''
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
        display: flex;
        flex-direction: column;
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
        
        .messages-box {
          flex: 1 1 auto;
          max-height: 100%;
          overflow: hidden;
        }

        .message-form {
          flex: 1 1 10%;
          min-height: 67px;
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
            input {
              border: none;
              font-size: 16px;
            }
          }
          .message-action {
            display: flex;
            flex: 0 1 auto;
            flex-direction: row;
            place-self: center;
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