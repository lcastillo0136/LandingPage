<template>
  <div v-bind="$attrs" class="row booking-calendar">
    <div :class="{ 'col-lg-7': selected.date, 'col-md-12': !selected.date }">
      <div class="form-group">
        <div id="calendar"></div>
        <input type="hidden" id="my_hidden_input">
        <ul class="legend">
          <li><strong></strong>Disponible</li>
          <li><strong></strong>No Disponible</li>
        </ul>
      </div>
    </div>
    <div class="col-lg-5" v-if="hasTimes && !loading && selected.date">
      <ul class="time_select version_2 add_top_20">
        <li v-for="(slot, time_i) in listTimes" :key="time_i" :class="time_clases(slot)">
          <input :type="timeType" :id="'time_' + time_i" name="radio_time" :value="slot" @change="selectedTime($event, slot)" v-if="enabledTime(slot)">
          <label :for="'time_' + time_i">{{ slot.time }}</label>
        </li>
      </ul>
    </div>
    <skeleton-loading v-else-if="loading">
      <div class="col-lg-12">
        <ul class="time_select version_2 add_top_20">
          <li v-for="(slot, time_i) in 15" :key="time_i">
            <square-skeleton :count="1" :boxProperties="{ width: '100px', height: '28px', bottom: '4px' }"></square-skeleton>
          </li>
        </ul>
      </div>
    </skeleton-loading>
    <div class="col-lg-5" v-else-if="!hasTimes && !loading && selected.date">
      <ul class="time_select add_top_20">
        <li>
          <label class="w-100">Sin horarios disponibles</label>
        </li>
      </ul>
    </div>
  </div>
  <!-- /row -->
</template>
<script>
  export default {
    name: 'BookingCalendar',
    props: {
      startDate: {
        type: Date,
        default: function () { return new Date() }
      },
      disabledDays: {
        type: Array,
        default: function () { return [0] }
      },
      availableDates: {
        type: Array,
        default: function () { return  [] }
      },
      disabledDates: {
        type: Array,
        default: function () { return [] }
      },
      availableTimes: {
        type: Array,
        default: function () { return  [] }
      },
      multiple: {
        type: Boolean,
        default: false
      },
      loading: {
        type: Boolean,
        default: false
      }
    },
    data () {
      return {
        selected: {
          date: ''
        }
      }
    },
    computed: {
      hasTimes () {
        return (this.listTimes||[]).length > 0
      },
      timeType () {
        return this.multiple ? 'checkbox': 'radio'
      },
      listTimes () {
        return this.availableTimes
      }
    },
    watch: {
      'availableDates' () {
        window['$']('#calendar', this.$el).datepicker('fill')
      },
      'disabledDates' () {
        window['$']('#calendar', this.$el).datepicker('fill')
      },
      'disabledDays' () {
        window['$']('#calendar', this.$el).datepicker('setDaysOfWeekDisabled', this.disabledDays)
      },
      'startDate' () {
        window['$']('#calendar', this.$el).datepicker('setStartDate', this.startDate)
      }
    },
    methods: {
      selectedTime ($event, slot) {
        if (this.multiple) {
          this.$emit('onSelectTime', [...$event.srcElement.parentElement.parentElement.querySelectorAll(':checked')].map(r => r.value))
        } else {
          if (this.enabledTime(slot)) {
            this.$emit('onSelectTime', slot.time)
          }
        }
      },
      time_clases (slot) {
        return {
          'disabled': !this.enabledTime(slot)
        }
      },
      enabledTime (slot) {
        return this.$moment(`${this.selected.date} ${slot.time}`, 'YYYY-MM-DD hh:mm a').isAfter() && slot.available
      }
    },
    mounted () {
      window['$']().datepicker.defaults.language = 'es'
      
      window['$']('#calendar', this.$el).datepicker({
        todayHighlight: true,
        daysOfWeekDisabled: this.disabledDays,
        weekStart: 0,
        format: "yyyy-mm-dd",
        defaultViewDate: 'month',
        beforeShowDay: (date) => {
          return {
            enabled: this.availableDates.includes(this.$moment(date).format('YYYY-MM-DD')) && !this.disabledDates.includes(this.$moment(date).format('YYYY-MM-DD'))
          }
        },
        beforeShowMonth: (date) => {
        },
        datesDisabled: ["2017/10/20"],
        startDate: this.startDate
      }).on('changeDate', (event) => { 
        this.selected.date = this.$moment(event.date).format('YYYY-MM-DD')
        this.$emit('onSelectDate', this.selected.date)
      }).on('changeMonth', (event) => {
        this.$emit('onSelectMonth', Object({ 
          start: this.$moment(event.date).startOf('month').format('YYYY-MM-DD'),
          end: this.$moment(event.date).endOf('month').format('YYYY-MM-DD')
        })) 
      });
    }
  }
</script>
<style lang="scss">
  .booking-calendar {
    .vue-skeleton-loading {
      display: flex;
      flex: 0 0 auto;
      max-width: 41.666667%;
      .square {
        border-radius: 4px;
      }
    }
  }
</style>