<template>
  <div v-if="getUser.id">
    <div class="box_general_2 settings-container">
      <h4>Analitics</h4>
      <div class="row">
        <div class="col-md-6 col-sm-6 helper-container">
          <span class="helper-text">ID de seguimiento de Google Analytics</span>
        </div>
        <div class="col-md-6 col-sm-6">
          <div class="form-group">
            <label>ID Seguimiento</label>
            <a-form-model-item prop="google_trackid">
              <a-input v-model="user.google_trackid" size="large" />
            </a-form-model-item>
          </div>
        </div>
      </div>
    </div>
    <div style="text-align: right;">
      <a-button type="primary" class="save-button" shape="circle" size="large" @click="handleSave" :loading="saving">
        <a-icon type="save" theme="filled" v-if="!saving" />
      </a-button>
      <div v-for="(e, ei) in errors">
        <div v-for="ee in e" class="d-block invalid-feedback">
          {{ $t(`errors.${ei}.${ee}`) }}
        </div>
      </div>
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
        saving: false
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