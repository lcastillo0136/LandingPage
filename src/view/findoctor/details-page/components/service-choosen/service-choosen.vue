<template>
  <ul class="treatments clearfix">
    <li v-for="(service, service_i) in services" :key="service_i">
      <div class="checkbox">
        <input :type="serviceType" class="css-checkbox" :id="'booking_service_' + service_i" :name="'booking_service'" v-model="service.selected" @change="selectedService(service, $event)">
        <label :for="'booking_service_' + service_i" class="css-label">{{ service.name }} <strong>${{ service.cost }}</strong></label>
      </div>
    </li>
  </ul>
</template>
<script>
  export default {
    name: 'ServiceChoosen',
    props: {
      services: {
        type: Array,
        default: function () {
          return [{
            name: 'Back Pain visit',
            cost: '55',
            selected: false
          }, {
            name: 'Cardiovascular screen',
            cost: '55',
            selected: false
          }, {
            name: 'Diabetes consultation',
            cost: '55',
            selected: false
          }, {
            name: 'Icontinence visit',
            cost: '55',
            selected: false
          }, {
            name: 'Foot Pain visit',
            cost: '55',
            selected: false
          }, {
            name: 'Food intollerance visit',
            cost: '55',
            selected: false
          }, {
            name: 'Neck Pain visit',
            cost: '55',
            selected: false
          }, {
            name: 'Back Pain visit',
            cost: '55',
            selected: false
          }, ]
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