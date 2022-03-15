<template>
  <div class="box_general_2 settings-container" v-if="getUser.id">
    <h4>Configuraciones</h4>
    <div class="row">
      <div class="col-md-6 col-sm-6">
        <div class="form-group">
          <label>Hora Apertura</label>
          <a-form-model-item prop="start_date">
            <a-time-picker use12-hours v-model="open_time" size="large" format="h:mm a" />
          </a-form-model-item>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import { mapGetters } from 'vuex'

  export default {
    data() {
      return {
        open_time: null,
        refresh: false
      }
    },
    name: 'ProfileSettings',
    watch: {
      'hasToken' () {
        this.setConfiguration()
      },
      'getUser' () {
        this.setConfiguration()
      },
    },
    components: {
    },
    computed: {
      ...mapGetters([
        'hasToken',
        'settings',
        'getUser'
      ])
    },
    methods: {
      setConfiguration() {
        if (this.getUser.id) {
          let [_hr, _min] = (this.getUser.open_time || '00:05').split(':')
          this.open_time = this.$moment()
          this.open_time.set({
            hour: _hr,
            minute: _min
          })

          this.refresh = true 
        }
      }
    },
    mounted() {
      this.$nextTick().then(() => {
        this.setConfiguration()
      });
    }
  }
</script>
<style lang="scss">
  .settings-container {
    .ant-time-picker {
      width: 100%
    }
  }
</style>