<template>
  <div>
    <header class="header_sticky" :class="headerClasses">  
      <HamburgerButton :options="options"></HamburgerButton>
      <div :class="containerClasses">
        <div class="row">
          <div class="col-lg-3 col-6">
            <Logo></Logo>
          </div>
          <div class="col-lg-9 col-6">
            <ul id="top_access">
              <li><User></User></li>
              <li><Register></Register></li>
            </ul>
            <Menu :options="options"></Menu>
            <!-- /main-menu -->
          </div>
        </div>
      </div>
      <!-- /container -->
    </header>
    <div :style="{'margin-top': this.headerStickyHeight + 'px'}" v-if="(this.sticky && this.isSticky) || (this.headerSticky && this.isSticky)"></div>
  </div>
</template>
<script>
import HamburgerButton from './components/hamburger-button'
import Logo from './components/logo'
import User from './components/user'
import Register from './components/register'
import Menu from './components/menu'

import { mapGetters } from 'vuex'

export default {
  name: 'Header',
  props: {
    sticky: Boolean
  },
  components: {
    HamburgerButton,
    Logo,
    User,
    Register,
    Menu
  },
  data () {
    return {
      isSticky: false
    }
  },
  computed: {
    ...mapGetters([
      'stillLoading',
      'container',
      'headerSticky'
    ]),
    headerClasses () {
      return {
        'sticky': (this.sticky && this.isSticky) || (this.headerSticky && this.isSticky)
      }
    },
    options () {
      return [{
        text: this.$t('header.menu.home'),
        childrens: [{
          url: '/index.html',
          text: this.$t('header.menu.home_default')
        }, {
          url: '/home-2.html',
          text: this.$t('header.menu.home_2')
        }, {
          url: '/home-3.html',
          text: this.$t('header.menu.home_3')
        }, {
          url: '/home-4.html',
          text: this.$t('header.menu.home_4')
        }]
      }, {
        text: this.$t('header.menu.pages'),
        childrens: [{
          url: '/list-page.html',
          text: this.$t('header.menu.list_page')
        }, {
          url: '/details-page.html',
          text: this.$t('header.menu.detail_page')
        }, {
          url: '/login.html',
          text: this.$t('header.menu.login')
        }, {
          url: '/login-2.html',
          text: this.$t('header.menu.login_2')
        }, {
          url: '/register-doctor.html',
          text: this.$t('header.menu.register_doctor')
        }, {
          url: '/register.html',
          text: this.$t('header.menu.register')
        }, {
          url: '/contacts.html',
          text: this.$t('header.menu.contacts')
        }]
      }, {
        url: 'admin_section/index.html',
        text: this.$t('header.menu.admin')
      }]
    },
    containerClasses () {
      return {
        'container': this.container,
        'container-fluid': !this.container
      }
    },
    headerStickyHeight () {
      return window['$']('.header_sticky').outerHeight() + 1
    }
  },
  methods: {
  },
  watch: {
  },
  mounted () {
    window.addEventListener('scroll', () => this.isSticky = window.scrollY > 1)
  }
}
</script>
