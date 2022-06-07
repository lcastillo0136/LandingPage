<template>
  <header id="header">
    <div class="wpo-site-header">
      <nav class="navigation navbar navbar-expand-lg navbar-light">
        <div class="container-fluid">
          <div class="row align-items-center">
            <div class="col-lg-3 col-md-3 col-3 d-lg-none dl-block">
              <div class="mobail-menu">
                <button type="button" class="navbar-toggler open-btn">
                  <span class="sr-only">Toggle navigation</span>
                  <span class="icon-bar first-angle"></span>
                  <span class="icon-bar middle-angle"></span>
                  <span class="icon-bar last-angle"></span>
                </button>
              </div>
            </div>
            <div class="col-lg-2 col-md-6 col-6">
              <div class="navbar-header">
                <a class="navbar-brand" href="index.html"><img src="assets/images/logo.png" alt=""></a>
              </div>
            </div>
            <div class="col-lg-8 col-md-1 col-1">
              <div id="navbar" class="collapse navbar-collapse navigation-holder">
                <button class="menu-close"><i class="ti-close"></i></button>
                <ul class="nav navbar-nav mb-2 mb-lg-0">
                  <li class="menu-item-has-children">
                    <a href="/">Inicio</a>
                  </li>
                  <li class="menu-item-has-children">
                    <a href="/gallery">Galeria</a>
                  </li>
                  <li class="menu-item-has-children">
                    <a href="/contact">Contacto</a>
                  </li>
                </ul>
              </div><!-- end of nav-collapse -->
            </div>
          </div>
        </div><!-- end of container -->
      </nav>
    </div>
  </header>
</template>
<script>
  import HamburgerButton from './components/hamburger-button'
  import Logo from './components/logo'
  import User from './components/user'
  import Register from './components/register'
  import Menu from './components/menu'
  import UserMenu from './components/user-menu'
  import JQuery from 'jquery'
  window.$ = JQuery

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
        }, this.hasToken ? {} : {
          url: { name: 'login' },
          text: this.$t('header.menu.login')
        }
        // , this.hasToken ? {
        //   url: '',
        //   callback: () => {
        //     this.handleLogOut()
        //   },
        //   text: 'Cerrar sesion'
        // } : {
        //   url: { name: 'login' },
        //   text: this.$t('header.menu.login')
        // }
        ]
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
      cloneNavForSticyMenu(ele, $newElmClass) {
        ele.addClass('original').clone().insertAfter(ele).addClass($newElmClass).removeClass('original');
      }
    },
    watch: {
    },
    mounted () {
      // clone home style 1 navigation for sticky menu
      if ($('.wpo-site-header .navigation').length) {
        this.cloneNavForSticyMenu($('.wpo-site-header .navigation'), "sticky-header");
      }
      window.addEventListener('scroll', () => this.isSticky = window.scrollY > 1)
    }
  }
</script>
