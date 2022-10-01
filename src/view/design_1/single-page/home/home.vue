<template>
  <main class="u-body">
    <home-header></home-header>
    <carrousel></carrousel>
    <carrousel-products></carrousel-products>
    <company-principles></company-principles>
  </main>
  <!-- /main content -->
</template>

<script>
  import { mapGetters, mapMutations } from 'vuex'
  import HomeHeader from './components/header'
  import Carrousel from './components/carrousel'
  import CarrouselProducts from './components/carrousel-products'
  import CompanyPrinciples from './components/company-principles'

  export default {
    props: {
    },
    methods: {
      ...mapMutations([
        'setHeaderVisible',
        'setFooterVisible'
      ])
    },
    components: { 
      HomeHeader,
      Carrousel,
      CarrouselProducts,
      CompanyPrinciples
    },
    mounted() {
      this.setHeaderVisible(false)
      this.setFooterVisible(false)
    }
  }
</script>

<style lang="scss">
  @import url('https://fonts.googleapis.com/css2?family=Comfortaa:wght@300;400;500;600;700&display=swap');
  @import "./nicepage.css";
  @import "./Zibasoft.css";
</style>