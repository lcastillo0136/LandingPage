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
    },
    options () {
      return [{
        url: '/',
        text: this.$t('header.menu.home'),
        childrens: [{
          url: '/',
          text: this.$t('header.menu.home_default')
        }, {
          url: '/home-2',
          text: this.$t('header.menu.home_2')
        }, {
          url: '/',
          text: this.$t('header.menu.home_3')
        }, {
          url: '/',
          text: this.$t('header.menu.home_4')
        }, {
          url: '/',
          text: this.$t('header.menu.revolution_slider')
        }, {
          url: '/',
          text: this.$t('header.menu.home_cookie')
        }]
      }, {
        url: '/',
        text: this.$t('header.menu.pages'),
        childrens: [{
          url: '/',
          text: this.$t('header.menu.list_page')
        }, {
          url: '/',
          text: this.$t('header.menu.list_grid')
        }, {
          url: '/',
          text: this.$t('header.menu.list_map')
        }, {
          url: '/',
          text: this.$t('header.menu.detail_page')
        }, {
          url: '/',
          text: this.$t('header.menu.detail_page_2')
        }, {
          url: '/',
          text: this.$t('header.menu.detail_page_3')
        }, {
          url: '/',
          text: this.$t('header.menu.blog')
        }, {
          url: '/',
          text: this.$t('header.menu.badges')
        }, {
          url: '/',
          text: this.$t('header.menu.login')
        }, {
          url: '/',
          text: this.$t('header.menu.login_2')
        }, {
          url: '/',
          text: this.$t('header.menu.register_doctor')
        }, {
          url: '/',
          text: this.$t('header.menu.register')
        }, {
          url: '/',
          text: this.$t('header.menu.contacts')
        }]
      }, {
        url: '/',
        text: this.$t('header.menu.extra_elements'),
        childrens: [{
          url: '/',
          text: this.$t('header.menu.detail_working_booking')
        }, {
          url: '/',
          text: this.$t('header.menu.booking_page')
        }, {
          url: '/',
          text: this.$t('header.menu.confirm_page')
        }, {
          url: '/',
          text: this.$t('header.menu.faq_page')
        }, {
          url: '/',
          text: this.$t('header.menu.comming_soon')
        }, {
          url: '/',
          text: this.$t('header.menu.responsive_pricing_table')
        }, {
          url: '/',
          text: this.$t('header.menu.responsive_pricing_table_2')
        }, {
          url: '/',
          text: this.$t('header.menu.working_doctor_register')
        }, {
          url: '/',
          text: this.$t('header.menu.icon_pack_1')
        }, {
          url: '/',
          text: this.$t('header.menu.icon_pack_2')
        }, {
          url: '/',
          text: this.$t('header.menu.icon_pack_3')
        }, {
          url: '/',
          text: this.$t('header.menu.no_found_page')
        }]
      }, {
        url: '/',
        text: this.$t('header.menu.menu_v2')
      }, {
        url: 'admin_section/index.html',
        text: this.$t('header.menu.admin')
      }, {
        url: 'https://themeforest.net/item/findoctor-doctors-directory-and-book-online-template/20876478?ref=ansonika',
        text: this.$t('header.menu.buy_template')
      }]
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
