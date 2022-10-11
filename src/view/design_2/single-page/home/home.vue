<template>
  <main class="u-body u-xl-mode">
    <header-component></header-component>
    <welcome></welcome>
    <services></services>
    <products></products>
    <whats-included></whats-included>
    <what-we-do></what-we-do>
    <contacto></contacto>
    <footerComponent></footerComponent>
  </main>
</template>
<script>
  import { mapGetters, mapMutations } from 'vuex'

  import HeaderComponent from './components/header'
  import Welcome from './components/welcome'
  import Services from './components/services'
  import Products from './components/products'
  import Contacto from './components/contacto'
  import WhatWeDo from './components/what-we-do'
  import WhatsIncluded from './components/whats-included'
  import footerComponent from './components/footer'

  export default {
    name: 'Home',
    components: {
      HeaderComponent,
      Welcome,
      Services,
      Products,
      WhatsIncluded,
      Contacto,
      WhatWeDo,
      footerComponent
    },
    methods: {
      ...mapMutations([
        'setHeaderVisible',
        'setFooterVisible'
      ])
    },
    mounted() {
      this.setHeaderVisible(false)
      this.setFooterVisible(false)
    }
  }
</script>

<style lang="scss">
  @import url('https://fonts.googleapis.com/css2?family=Comfortaa:wght@300;400;500;600;700&display=swap');
  @import url('https://fonts.googleapis.com/css?family=Open+Sans:300,300i,400,400i,600,600i,700,700i,800,800i|Cambay:400,400i,700,700i');
  @import url('https://fonts.googleapis.com/css?family=Advent+Pro:100,200,300,400,500,600,700|Cambay:400,400i,700,700i');

  @import "./nicepage.css";
  @import "./style.1.css";

  @font-face {
    font-family: 'Comfortaa Bold Alt1';
    src: url('./fonts/Comfortaa-Bold-Alt1.woff2') format('woff2'),
        url('./fonts/Comfortaa-Bold-Alt1.woff') format('woff'),
        url('./fonts/Comfortaa-Bold-Alt1.ttf') format('truetype');
    font-weight: bold;
    font-style: normal;
    font-display: swap;
  }

</style>