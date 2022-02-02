<template>
  <ul class="treatments clearfix" v-if="!loading">
    <li v-for="(service, service_i) in services" :key="service_i">
      <div class="checkbox">
        <input :type="serviceType" class="css-checkbox" :id="'booking_service_' + service_i" :name="'booking_service'" v-model="service.selected" @change="selectedService(service, $event)">
        <label :for="'booking_service_' + service_i" class="css-label">{{ service.name }} <strong>{{ service.price | currency }}</strong></label>
      </div>
    </li>
  </ul>
  <skeleton-loading v-else>
    <ul class="treatments clearfix loading">
      <li v-for="(service, service_i) in 5" :key="service_i">
        <div class="checkbox">
          <label class="css-label">
            <square-skeleton :count="1" :boxProperties="{ height: '23px' }"></square-skeleton>
            <span>
              <square-skeleton :count="1" :boxProperties="{ width: '23px', height: '23px' }"></square-skeleton>
            </span>
          </label>
        </div>
      </li>
    </ul>
  </skeleton-loading>
</template>
<script>
  export default {
    name: 'ServiceChoosen',
    props: {
      services: {
        type: Array,
        default: function () {
          return []
        }
      },
      multiple: {
        type: Boolean,
        default: true
      }
    },
    computed: {
      selectedServices () {
        return this.services.filter(s => s.selected)
      },
      serviceType () {
        return this.multiple ? 'checkbox' : 'radio'
      },
      loading () {
        return this.services.length <= 0
      }
    },
    methods: {
      selectedService (service, event) {
        if (this.multiple) {
          this.$emit('onSelectService', this.selectedServices)
        } else {
          this.selectedServices.forEach(e => e.selected = false)
          service.selected = event.srcElement.checked
          this.$emit('onSelectService', this.selectedServices)
        }
      }
    }
  }
</script>

<style lang="scss">
  .loading {
    &.treatments {
      .css-label {
        padding-left: 35px;
        height: 25px;
        display: inline-block;
        background-repeat: no-repeat;
        background-position: 0 0;
        vertical-align: middle;
        cursor: pointer;
        padding-top: 1px;
        display: flex;
        flex-direction: row;
        gap: 10px;
        .square-list {
          flex: 1 1 auto;
          width: auto;
          .square {
            border-radius: 0;
          }
        }
      }
    }
  }
</style>