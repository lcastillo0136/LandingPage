<template>
  <div class="preloader" v-if="loading">
    <div class="vertical-centered-box">
      <div class="content">
        <div class="loader-circle"></div>
        <div class="loader-line-mask">
          <div class="loader-line"></div>
        </div>
        <img src="assets/images/favicon.png" alt="">
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'Loading',
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
  },
  mounted () {
  }
}
</script>
