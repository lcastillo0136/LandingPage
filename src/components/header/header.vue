<template>
  <div>
    <header class="header_sticky" :class="headerClasses">
      <template v-if="TwilioPhone && hasPermission">
        <!-- <HamburgerButton :options="options"></HamburgerButton> -->
      </template>
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
        'hasToken',
        'settings',
        'getUser'
      ]),
      TwilioPhone() {
        return this.settings?.TWILIO_PHONE_FROM;
      },
      hasPermission() {
        return _.find(this.getUser?.permisos, { action: 'view', controller: 'messages', access: 1 }) || false
      },
      COMPANY_PHONE() {
        return this.settings?.COMPANY_PHONE;
      },
      headerClasses () {
        return {
          'sticky': (this.sticky && this.isSticky) || (this.headerSticky && this.isSticky)
        }
      },
      options () {
        return [{
          text: this.$options.filters.phone(this.COMPANY_PHONE),
          url: 'home',
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
<style lang="scss">
  @media only screen and (max-width: 450px) {
    .header_sticky {
      display: flex;
      flex-direction: row;
      align-content: center;
      align-items: center;
      gap: 5px;
      padding: 0 20px;
      > * {
        flex: 1 1 auto;
      }
    }
  }
</style>