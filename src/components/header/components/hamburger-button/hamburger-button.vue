<template>
  <div>  
    <a-drawer title="MENU" placement="left" :closable="false" :visible="mobileMenuOpen" @close="toggleMenuMobile" width="80%">
      <a-menu mode="inline" >
        <a-sub-menu v-for="(option, option_i) in options" :key="option_i">
          <span slot="title"><span>
            <router-link :to="option.url" v-if="!isExternal(option.url) && !isEmpty(option.url)" @click.stop.prevent="toggleMenuMobile">{{ option.text }}</router-link>
            <a :href="option.url" v-if="isExternal(option.url) && !isEmpty(option.url)" @click.stop.prevent="toggleMenuMobile">{{ option.text }}</a>
            <a href="" v-if="isEmpty(option.url)" @click.stop.prevent="">{{ option.text }}</a>
          </span>
          </span>
          <a-menu-item-group key="g1">
            <template slot="title"></template>
            <template v-if="option.childrens">
              <a-menu-item  v-for="(child, child_i) in option.childrens" :key="child_i">
                <router-link :to="child.url" v-if="!isExternal(child.url)" @click.stop.prevent="toggleMenuMobile">{{ child.text }}</router-link>
                <a :href="child.url" v-if="isExternal(child.url)" @click.stop.prevent="toggleMenuMobile">{{ child.text }}</a>
              </a-menu-item>
            </template>
          </a-menu-item-group>
        </a-sub-menu>
      </a-menu>
    </a-drawer>
    <a href="#menu" class="btn_mobile" @click.stop.prevent="toggleMenuMobile">
      <div class="hamburger hamburger--spin" :class="{'is-active': mobileMenuOpen}">
        <div class="hamburger-box">
          <div class="hamburger-inner"></div>
        </div>
      </div>
    </a>
    <!-- /btn_mobile-->
  </div>
</template>
<script>
import { mapGetters, mapMutations } from 'vuex'
export default {
  name: 'HamburgerButton',
    props: {
      options: {
        type: Array,
        default: () => {
          return [{
            url: '/',
            text: 'Home',
            childrens: [{
              url: '/',
              text: 'Home Default'
            }, {
              url: '/',
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
          }]
        }
      }
    },
  components: {
  },
  data () {
    return {
    }
  },
  computed: {
    ...mapGetters([
      'mobileMenuOpen'
    ])
  },
  methods: {
    ...mapMutations([
      'toggleMenuMobile'
    ]),
    isExternal (route) {
      return ((route && this.$router.matcher.match(route)) || { name: null }).name === null
    },
    isEmpty (route) {
        return typeof route == 'string' ? (route||'').trim() === "" : false
    }
  },
  watch: {
  },
  mounted () {
  }
}
</script>
<style>
  .ant-menu-item-group-title {
    display: none;
  }
</style>