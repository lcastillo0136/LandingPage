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
            <ul id="top_access" v-if="!hasToken">
              <li>
                <User></User>
              </li>
            </ul>
            <UserMenu v-else></UserMenu>
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
  import UserMenu from './components/user-menu'

  import { mapGetters, mapActions } from 'vuex'

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
      Menu,
      UserMenu
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
        'headerSticky',
        'hasToken'
      ]),
      headerClasses () {
        return {
          'sticky': (this.sticky && this.isSticky) || (this.headerSticky && this.isSticky)
        }
      },
      options () {
        return [{
          text: this.$t('header.menu.home'),
          url: '/'
        }, {
          text: 'Buscar',
          url: { name: 'list-page' },
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
      ...mapActions([
        'handleLogOut'
      ]),
    },
    watch: {
    },
    mounted () {
      window.addEventListener('scroll', () => this.isSticky = window.scrollY > 1)
    }
  }
</script>
