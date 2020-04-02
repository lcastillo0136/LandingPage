<template>
  <div>
    <div id="preloader" class="Fixed" v-if="loading">
      <div data-loader="circle-side"></div>
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
