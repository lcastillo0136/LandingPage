<template>
  <div class="contacts-list-container">
    <a-card :bordered="false">
      <perfect-scrollbar>
        <a-list item-layout="horizontal" :data-source="reverseList" :loading="loadingChats">
          <a-list-item slot="renderItem" slot-scope="item, index" @click.prevent.stop="clickOnContact(item, index)" :class="{ 'choosed': selectedContact && selectedContact.phone == item.phone, 'banned': item.user_banned }">
            <a-list-item-meta>
              <template slot="title">
                <a>
                  <template v-if="item.user">
                    {{ item.user_full_name }}
                  </template>
                  <template v-else>
                    <i>{{ item.user_full_name | waPhone | phone }}</i>
                  </template>
                </a>

                <span class="message-time">
                  {{ item.last_message.created_at | moment('from', 'now') }}
                </span>
              </template>
              <span slot="description">
                <template v-if="item.last_message.body">
                  <span class="message-body text-italic" v-if="item.user_banned">
                    Detectado como spam
                  </span>
                  <span class="message-body" v-else>
                    {{ item.last_message.body }}
                  </span>
                </template>
                <template v-if="item.last_message.media_uri">
                  <span>Archivo <a-icon type="paper-clip" /></span>
                </template>
              </span>
              <template v-if="item.user">
                <a-avatar slot="avatar" :src="item.user.avatar" />
              </template>
              <template v-else>
                <a-avatar slot="avatar" :src="defaultAvatar" />
              </template>
            </a-list-item-meta>
            <template v-if="item.unread > 0">
              <span class="message-badge">{{ item.unread }}</span>
            </template>
          </a-list-item>
        </a-list>
      </perfect-scrollbar>
    </a-card>
    <a-badge :count="totalCount" class="mobileBadge">
      <a-select
        show-search
        size="large"
        placeholder="Seleccione un contacto"
        option-filter-prop="children"
        :defaultActiveFirstOption="false"
        class="mobile-contact"
        :filter-option="filterOption"
        @select="handleChange"
      >
        <a-select-option v-for="(contact, i) in reverseList" :key="i" :value="i">
          <a-row>
            <a-col :span="20">
              {{ contact.user_full_name }}
            </a-col>
            <a-col>
              <a-badge :count="contact.unread"  v-if="contact.unread > 0"/>
            </a-col>
          </a-row>
          <a-row v-if="contact.user_id">
            <a-col :span="24">{{ contact.phone }}
            </a-col>
          </a-row>        
        </a-select-option>
      </a-select>
    </a-badge>
  </div>
  <!-- /white_bg -->
</template>
<script>
  import config from '@/config'
  import _ from 'lodash'

  const baseUrl = process.env.NODE_ENV === 'development' ? config.baseUrl.dev : config.baseUrl.pro

  export default {
    name: 'ContactsList',
    props: {
      contacts: Array,
      loadingChats: Boolean
    },
    components: {
      
    },
    data () {
      return {
        filterText: '',
        contact_index: 0,
        selectedContact: null
      }
    },
    computed: {
      defaultAvatar() {
        return `${baseUrl.replace('/api/', '/')}storage/default.png`
      },
      reverseList() {
        return this.contacts ? _.orderBy(this.contacts, (c) => { return c.last_message.created_at }, [ 'desc' ]) : []
      },
      totalCount() {
        return _.sumBy(this.contacts, 'unread') || 0
      }
    },
    methods: {
      clickOnContact(contact, index) {
        this.selectedContact = contact
        this.$emit('onContactClick', {
          contact, 
          index
        });
      },
      handleChange(contact_index) {
        this.$emit('onContactClick', {
          contact: this.reverseList[contact_index]
        });
      },
      filterOption(input, option) {
        return (
          option.componentOptions.children[0].text.toLowerCase().indexOf(input.toLowerCase()) >= 0
        );
      },
    },
    mounted() {
      if (this.$route.params) {
        if (this.$route.params.phone) {
          let _tmpContact = _.find(this.contacts, (c) => { return `${c.phone}`.indexOf(this.$route.params.phone) > -1 })
          this.selectedContact = _tmpContact
        }
      }
    }
  }
</script>

<style lang="scss">
  .contacts-list-container {
    .mobile-contact, .mobileBadge  { display: none; }
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
      }
      .ant-list-item-meta-title {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        &::after {
          display: none;
        }
      }
      .ant-list-items {
        border-radius: 8px;
        overflow: hidden;
        .ant-list-item {
          padding: 12px 12px;
          cursor: pointer;
          position: relative;
          &:hover {
            background: #f5f5f5;
          }

          .message-badge {
            position: absolute;
            bottom: 15px;
            right: 15px;
            background: #efa985;
            color: #fff;
            border-radius: 50%;
            width: 20px;
            height: 20px;
            text-align: center;
            font-size: 11px;
            display: flex;
            flex-direction: column;
            align-content: center;
            justify-content: center;
            align-items: center;
          }

          &.choosed {
            background: #f5f5f5;
          }

          &.banned {
            text-shadow: 0 0 6px black !important;
            color: transparent;
            opacity: 0.6;
            a, span {
              color: transparent;
            }
          }
        }
      }
      .ant-list-item-meta-description {
        span {
          display: flex;
          flex-direction: row;
          align-items: center;
          justify-content: space-between;
          gap: 15px;
          &::after {
            display: none;
          }
          .message-body {
            overflow: hidden;
            text-overflow: ellipsis;
            display: -webkit-box;
            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical;
            flex: 0 1 80%;
            font-size: 90%;
            line-height: 1.3;
          }
        }
      }
    }
    .message-time {
      white-space: nowrap;
      font-size: 80%;
      color: #9e9e9e;
      font-weight: 400;
    }
  }

  @media only screen and (max-width: 450px) {
    .contacts-list-container {
      .mobile-contact, .mobileBadge  { display: block; }
      .ant-card { display: none; }
      > .ant-badge {
        display: block;
      }
    }
  }
</style>