<template>
  <div v-bind="$attrs" class="row">
    <div :class="{'col-lg-7':hasTimes, 'col-lg-12': !hasTimes}">
      <div class="form-group">
        <div id="calendar"></div>
        <input type="hidden" id="my_hidden_input">
        <ul class="legend">
          <li><strong></strong>Available</li>
          <li><strong></strong>Not available</li>
        </ul>
      </div>
    </div>
    <div class="col-lg-5" v-if="hasTimes">
      <ul class="time_select version_2 add_top_20">
        <li v-for="(time, time_i) in listTimes" :key="time_i" :class="time_clases(time)">
          <input :type="timeType" :id="'time_' + time_i" name="radio_time" :value="time" @change="selectedTime($event)" v-if="enabledTime(time)">
          <label :for="'time_' + time_i">{{ time }}</label>
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
      availableDates: {
        type: Array,
        default: function () { return  ['2020-04-15','2020-04-16','2020-04-17'] }
      },
      disabledDates: {
        type: Array,
        default: function () { return ['2020-04-16','2020-04-21','2020-04-30'] }
      },
      availableTimes: {
        type: Array,
        default: function () { return  [] }
      },
      multiple: {
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
      'startDate' () {
        window['$']('#calendar', this.$el).datepicker('setStartDate', this.startDate)
      }
    },
    methods: {
      selectedTime (time) {
        if (this.multiple) {
          this.$emit('onSelectTime', [...time.srcElement.parentElement.parentElement.querySelectorAll(':checked')].map(r => r.value))
        } else {
          if (this.enabledTime(time)) {
            this.$emit('onSelectTime', time.srcElement.value)
          }
        }
      },
      time_clases (time) {
        return {
          'disabled': !this.enabledTime(time)
        }
      },
      enabledTime (time) {
        return this.$moment(`${this.selected.date} ${time}`, 'YYYY-MM-DD hh:mm a').isAfter()
      }
    },
    mounted () {
      window['$']('#calendar', this.$el).datepicker({
        todayHighlight: true,
        daysOfWeekDisabled: [0],
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
        datesDisabled: ["2017/10/20", "2017/11/21","2017/12/21", "2018/01/21","2018/02/21","2018/03/21"],
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