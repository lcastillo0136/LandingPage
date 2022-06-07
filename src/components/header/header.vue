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
                    <a href="/">Home</a>
                  </li>
                  <li class="menu-item-has-children">
                    <a href="#couple">Couple</a>
                  </li>
                  <li class="menu-item-has-children">
                    <a href="#story">Story</a>
                  </li>
                  <li class="menu-item-has-children">
                    <a href="#gallery">Gallery</a>
                  </li>
                  <li class="menu-item-has-children">
                    <a href="#RSVP">RSVP</a>
                  </li>
                  <li class="menu-item-has-children">
                    <a href="#event">Events</a>
                  </li>
                  <li class="menu-item-has-children">
                    <a href="#">Blog</a>
                    <ul class="sub-menu">
                      <li><a href="blog.html">Blog right sidebar</a></li>
                      <li><a href="blog-left-sidebar.html">Blog left sidebar</a></li>
                      <li><a href="blog-fullwidth.html">Blog fullwidth</a></li>
                      <li class="menu-item-has-children">
                        <a href="#">Blog details</a>
                        <ul class="sub-menu">
                          <li>
                            <a href="blog-single.html">
                              Blog details right sidebar
                            </a>
                          </li>
                          <li>
                            <a href="blog-single-left-sidebar.html">
                              Blog details left sidebar
                            </a>
                          </li>
                          <li>
                            <a href="blog-single-fullwidth.html">
                              Blog details fullwidth
                            </a>
                          </li>
                        </ul>
                      </li>
                    </ul>
                  </li>
                </ul>
              </div><!-- end of nav-collapse -->
            </div>
            <div class="col-lg-2 col-md-2 col-2">
              <div class="header-right">
                <div class="header-search-form-wrapper">
                  <div class="cart-search-contact">
                    <button class="search-toggle-btn"><i class="fi flaticon-search"></i></button>
                    <div class="header-search-form">
                      <form>
                        <div>
                          <input type="text" class="form-control" placeholder="Search here...">
                          <button type="submit"><i class="fi flaticon-search"></i></button>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
                <div class="mini-cart">
                  <button class="cart-toggle-btn"> 
                    <i class="fi flaticon-shopping-cart"></i>
                    <span class="cart-count">2</span>
                  </button>
                  <div class="mini-cart-content">
                    <button class="mini-cart-close"><i class="ti-close"></i></button>
                    <div class="mini-cart-items">
                      <div class="mini-cart-item clearfix">
                        <div class="mini-cart-item-image">
                          <a href="shop.html">
                            <img src="assets/images/shop/mini-cart/img-1.jpg" alt>
                          </a>
                        </div>
                        <div class="mini-cart-item-des">
                          <a href="shop.html">Wedding Gown</a>
                          <span class="mini-cart-item-price">$20.15 x 1</span>
                          <span class="mini-cart-item-quantity">
                            <a href="#"><i class="ti-close"></i></a>
                          </span>
                        </div>
                      </div>
                      <div class="mini-cart-item clearfix">
                        <div class="mini-cart-item-image">
                          <a href="shop.html">
                            <img src="assets/images/shop/mini-cart/img-2.jpg" alt>
                          </a>
                        </div>
                        <div class="mini-cart-item-des">
                          <a href="shop.html">Bridal Flower</a>
                          <span class="mini-cart-item-price">$13.25 x 2</span>
                          <span class="mini-cart-item-quantity">
                            <a href="#"><i class="ti-close"></i></a>
                          </span>
                        </div>
                      </div>
                    </div>
                    <div class="mini-cart-action clearfix">
                      <span class="mini-checkout-price">Subtotal:
                        <span>$215.14</span>
                      </span>
                      <div class="mini-btn">
                        <a href="checkout.html" class="view-cart-btn s1">Checkout</a>
                        <a href="cart.html" class="view-cart-btn">View Cart</a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
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
