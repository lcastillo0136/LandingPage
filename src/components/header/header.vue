<template>
  <div>
    <header class="header_sticky" :class="headerClasses">  
      <HamburgerButton :options="options"></HamburgerButton>
      <div class="container">
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
      options: [{
        url: '/',
        text: 'Home',
        childrens: [{
          url: '/',
          text: 'Home Default'
        }, {
          url: '/home-2',
          text: 'Home Default 2'
        }, {
          url: '/',
          text: 'Home Default 3'
        }, {
          url: '/',
          text: 'Home Default 4'
        }, {
          url: '/',
          text: 'Revolution Slider'
        }, {
          url: '/',
          text: 'With Cookie Bar (EU law)'
        }]
      }, {
        url: '/',
        text: 'Pages',
        childrens: [{
          url: '/',
          text: 'List page'
        }, {
          url: '/',
          text: 'List grid page'
        }, {
          url: '/',
          text: 'List map page'
        }, {
          url: '/',
          text: 'Detail page'
        }, {
          url: '/',
          text: 'Detail page 2'
        }, {
          url: '/',
          text: 'Detail page 3'
        }, {
          url: '/',
          text: 'Blog'
        }, {
          url: '/',
          text: 'Badges'
        }, {
          url: '/',
          text: 'Login'
        }, {
          url: '/',
          text: 'Login 2'
        }, {
          url: '/',
          text: 'Register Doctor'
        }, {
          url: '/',
          text: 'Register'
        }, {
          url: '/',
          text: 'Contacts'
        }]
      }, {
        url: '/',
        text: 'Extra Elements',
        childrens: [{
          url: '/',
          text: 'Detail working booking'
        }, {
          url: '/',
          text: 'Booking page'
        }, {
          url: '/',
          text: 'Confirm page'
        }, {
          url: '/',
          text: 'Faq page'
        }, {
          url: '/',
          text: 'Coming soon'
        }, {
          url: '/',
          text: 'Responsive pricing tables'
        }, {
          url: '/',
          text: 'Responsive pricing tables 2'
        }, {
          url: '/',
          text: 'Working doctor register'
        }, {
          url: '/',
          text: 'Icon pack 1'
        }, {
          url: '/',
          text: 'Icon pack 2'
        }, {
          url: '/',
          text: 'Icon pack 3'
        }, {
          url: '/',
          text: '404 page'
        }]
      }, {
        url: '/',
        text: 'Menu V2'
      }, {
        url: 'admin_section/index.html',
        text: 'Admin'
      }, {
        url: 'https://themeforest.net/item/findoctor-doctors-directory-and-book-online-template/20876478?ref=ansonika',
        text: 'Buy this template'
      }],
      isSticky: false
    }
  },
  computed: {
    ...mapGetters([
      'stillLoading'
    ]),
    headerClasses () {
      return {
        'sticky': this.sticky && this.isSticky
      }
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
