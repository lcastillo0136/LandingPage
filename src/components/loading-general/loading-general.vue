<template>
  <div class="loading-general slideInDown animated" v-if="loading">
    <div class="loading-find-doctors" ref="start_animation">
      <div class="cross-up"></div>
      <div class="cross-left"></div>
      <div class="cross-right"></div>
      <div class="cross-bottom"></div>
      <div class="arrow-red"></div>
      <div class="heartbeat">
        <svg x="0px" y="0px" viewBox="0 0 298 53.9">
          <path class="st0" d="M297.5,41.2h-76.6c-0.5,0-0.9,0.4-1,0.8l-1.6,11.3l-3.1-32c0-0.5-0.4-0.9-0.9-0.9c-0.5,0-0.9,0.3-1,0.8
           l-5.3,25.5l-2.3-10.9c-0.1-0.4-0.4-0.7-0.9-0.8c-0.4,0-0.8,0.2-1,0.6l-2.3,4.8h-107c0,0,0,0,0,0H82c-1.6,0-2.2,1.1-2.2,1.6
           l-1.6,11.3l-3.1-52c0-0.5-0.4-0.9-0.9-0.9c-0.5,0-0.9,0.3-1,0.8l-9.3,45.5l-2.3-10.9c-0.1-0.4-0.4-0.7-0.9-0.8c-0.4,0-0.8,0.2-1,0.6
           l-2.3,4.8H0.5"></path>
        </svg>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'LoadingGeneral',
  props: {
    loading: {
      type: Boolean,
      default: true
    }
  },
  components: {
  },
  data () {
    return {
    }
  },
  computed: {},
  methods: {
  },
  watch: {
    loading() {
      if (this.loading) setTimeout(() => {
        this.$refs.start_animation.classList.add('start');
      }, 500);
    }
  },
  mounted () {
  }
}
</script>
