<template>
  <div v-bind="$attrs" class="row">
    <div class="col-lg-7">
      <div class="form-group">
        <div id="calendar"></div>
        <input type="hidden" id="my_hidden_input">
        <ul class="legend">
          <li><strong></strong>Available</li>
          <li><strong></strong>Not available</li>
        </ul>
      </div>
    </div>
    <div class="col-lg-5">
      <ul class="time_select version_2 add_top_20">
        <li v-for="(time, time_i) in availableTimes" :key="time_i">
          <input type="radio" :id="'time_' + time_i" name="radio_time" :value="time" @change="selectedTime($event)">
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
        default: function () { return  ['09.30am','10.00am','10.30am','11.00am','11.30am','12.00am','12.30am','01.00pm','01.30pm','02.00pm','02.30pm'] }
      }
    },
    watch: {
      'availableDates' () {
        window['$']('#calendar', this.$el).datepicker('update')
      },
      'disabledDates' () {
        window['$']('#calendar', this.$el).datepicker('update')
      },
      'startDate' () {
        window['$']('#calendar', this.$el).datepicker('setStartDate', this.startDate)
      }
    },
    methods: {
      selectedTime (time) {
        this.$emit('onSelectTime', time.srcElement.value)
      }
    },
    mounted () {
      window['$']('#calendar', this.$el).datepicker({
        todayHighlight: true,
        daysOfWeekDisabled: [0],
        weekStart: 0,
        format: "yyyy-mm-dd",
        beforeShowDay: (date) => {
          return {
            enabled: this.availableDates.includes(this.$moment(date).format('YYYY-MM-DD')) && !this.disabledDates.includes(this.$moment(date).format('YYYY-MM-DD'))
          }
        },
        datesDisabled: ["2017/10/20", "2017/11/21","2017/12/21", "2018/01/21","2018/02/21","2018/03/21"],
        startDate: this.startDate
      }).on('changeDate', (event) => { 
        this.$emit('onSelectDate', this.$moment(event.date).format('YYYY/MM/DD'))
      }).on('changeMonth', (event) => {
        this.$emit('onSelectMonth', Object({ 
          start: this.$moment(event.date).startOf('month').format('YYYY/MM/DD'),
          end: this.$moment(event.date).endOf('month').format('YYYY/MM/DD')
        }))
      });
    }
  }
</script>