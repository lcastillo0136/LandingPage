<template>
  <div id="toTop" class="animated" :class="buttonClasses" v-if="enabled" @click.stop.prevent="sendTop"></div>
</template>
<script>
  export default {
    name: 'ToTop',
    props: {
      enabled: {
        type: Boolean,
        default: true
      }
    },
    data () {
      return {
        isVisible: false,
        isBlock: true,
      }
    },
    computed: {
      buttonClasses () {
        return {
          'fadeInUp': this.isVisible,
          'fadeOutDown': !this.isVisible
        }
      }
    },
    methods: {
      sendTop () {
        window.scrollTo(0, 0);
      }
    },
    mounted () {
      window.addEventListener('scroll', () => this.isVisible = window.scrollY != 0)
    }
  }
</script>