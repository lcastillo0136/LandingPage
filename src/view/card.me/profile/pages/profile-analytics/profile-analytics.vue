<template>
  <div v-if="getUser.id" class="analytics-container">
    <a-form-model ref="analyticsForm" :rules="rules" :model="user" class="analytics-form d-flex flex-column" :label-col="{ span: 8 }" :wrapper-col="{ span: 14, offset: 2 }" :colon="false">
      <b-card no-body>
        <b-card-body>
          <h3 class="mb-4">
            Analitics
          </h3>
          <a-form-model-item prop="google_trackid">
            <template #label>
              <span>Google TrackID</span>
              <br>
              <small class="text-muted">ID de seguimiento de Google Analytics para mejora de posicionamiento en buscador Google</small>
            </template>
            <a-input v-model="user.google_trackid" size="large" />
          </a-form-model-item>
        </b-card-body>
      </b-card>
    </a-form-model>

    <div style="text-align: right;">
      <a-button type="primary"  class="save-button" shape="circle" size="large" @click="handleSave" :loading="saving">
        <a-icon type="save" theme="filled" v-if="!saving" />
      </a-button>
    </div>
  </div>
</template>
<script>
  import { updateUser } from '@/api/user'
  import { mapGetters } from 'vuex'
  import _ from 'lodash'
  export default {
    name: 'ProfileAnalytics',
    props: {
      user: {
        type: Object,
        default: function () {
          return { }
        }
      }
    },
    data() {
      return  {
        errors: [],
        saving: false,
        labelCol: { span: 4 },
        wrapperCol: { span: 14 },
        rules: {},
      }
    },
    computed: {
      ...mapGetters([
        'hasToken',
        'settings',
        'getUser'
      ]),
      isProvider() {
        return this.user.role && this.user.role.is_provider
      },
      isClient() {
        return this.user.role && this.user.role.is_client
      }
    },
    methods: {
      handleSave () {
        this.saving = true
        this.errors = []
        updateUser({
          ...this.user,
          ...{
            bday: this.user.bday && this.user.bday.format('YYYY-MM-DD'),
            phone: (`${this.user.phone||''}`).replace(/\D/g, ''),
          }
        }, this.hasToken).then((response) => {
          this.saving = false

          this.$notification.success({
            message: 'Datos guardados',
            description: 'Los datos analiticos del usuario han sido actulizados'
          })
        }).catch((error) => {
          this.saving = false
          this.errors = error.data.error
        })
      },
    },
    mounted() {

    }
  }
</script>
<style lang="scss">
  .analytics-container {
    .ant-btn {
      &.save-button {
        width: 50px;
        position: fixed;
        bottom: 16px;
        height: 50px;
        font-size: 20px;
        right: 20px;
      }
      .anticon {
        vertical-align: initial;
      }
    }
    .analytics-form {
      --border-color: #ececec;
      --border-color-hover: #40a9ff;
      --font-size: 13px;
      gap: 20px;
      .ant-form-item {
        display: flex;
        align-items: center;
      }
      .ant-form-item-label {
        line-height: 1;
        text-align: left;
        & > label {
          line-height: 1;
        }
        small.text-muted {
          margin-top: 2px;
          display: inline-block;
          margin-left: 2px;
          color: #959ba1 !important;
          white-space: normal;
        }
      }
      .has-feedback .ant-input-affix-wrapper .ant-input-suffix {
        padding-right: 0
      }
      
      .input-checkbox100 {
        display: none;
      }

      .label-checkbox100 {
        margin: 0;

        display: block;
        position: relative;
        padding-left: 26px;
        cursor: pointer;
      }

      .label-checkbox100 > span.check {
        font-size: 13px;
        color: transparent;

        display: -webkit-box;
        display: -webkit-flex;
        display: -moz-box;
        display: -ms-flexbox;
        display: flex;
        justify-content: center;
        align-items: center;
        position: absolute;
        width: 16px;
        height: 16px;
        border-radius: 2px;
        background: #e6e6e6;
        left: 0;
        top: 50%;
        -webkit-transform: translateY(-50%);
        -moz-transform: translateY(-50%);
        -ms-transform: translateY(-50%);
        -o-transform: translateY(-50%);
        transform: translateY(-50%);
      }

      .input-checkbox100:checked + .label-checkbox100 > span.check {
        color: #c87ef0;
      }
    }
  }
</style>