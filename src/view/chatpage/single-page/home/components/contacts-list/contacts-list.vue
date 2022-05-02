<template>
  <div class="contacts-list-container">
    <a-card :bordered="false">
      <a-list item-layout="horizontal" :data-source="contacts">
        <a-list-item slot="renderItem" slot-scope="item, index">
          <a-list-item-meta>
            <a slot="title">
              <template v-if="item.user">
                {{ item.user_full_name }}
              </template>
              <template v-else>
                <i>{{ item.user_full_name | waPhone | phone }}</i>
              </template>
            </a>
            <span slot="description">
              <template v-if="item.last_message.body">
                {{ item.last_message.body }}
              </template>
              <template v-if="item.last_message.media_uri">
                <span>Archivo <a-icon type="paper-clip" /></span>
              </template>
              <span>
                {{ item.last_message.created_at | moment('from', 'now') }}
              </span>
            </span>
            <template v-if="item.user">
              <a-avatar slot="avatar" :src="item.user.avatar" />
            </template>
            <template v-else>
              <a-avatar slot="avatar" :src="defaultAvatar" />
            </template>
          </a-list-item-meta>
        </a-list-item>
      </a-list>
    </a-card>
  </div>
  <!-- /white_bg -->
</template>
<script>
  import config from '@/config'

  const baseUrl = process.env.NODE_ENV === 'development' ? config.baseUrl.dev : config.baseUrl.pro

  export default {
    name: 'ContactsList',
    props: {
      contacts: Array
    },
    components: {
      
    },
    data () {
      return {
        
      }
    },
    computed: {
      defaultAvatar() {
        return `${baseUrl.replace('/api/', '/')}storage/default.png`
      }
    },
    methods: {
    },
    mounted() {
      
    }
  }
</script>

<style lang="scss">
  .contacts-list-container {
    .ant-card {
      border-radius: 20px;

      .ant-list-item-meta-description {
        span {
          display: flex;
          flex-direction: row;
          align-items: center;
          justify-content: space-between;
          &::after {
            display: none;
          }
        }
      }
    }
  }
</style>