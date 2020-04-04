<template>
  <nav id="menu" class="main-menu">
    <ul>
      <li v-for="(option, option_i) in options" :key="option_i">
        <span>
          <router-link :to="option.url" v-if="!isExternal(option.url)">{{ option.text }}</router-link>
          <a :href="option.url" v-if="isExternal(option.url)">{{ option.text }}</a>
        </span>
        <ul v-if="option.childrens">
          <li v-for="(child, child_i) in option.childrens" :key="child_i">
            <router-link :to="child.url" v-if="!isExternal(child.url)">{{ child.text }}</router-link>
            <a :href="child.url" v-if="isExternal(child.url)">{{ child.text }}</a>
          </li>
        </ul>
      </li>
    </ul>
  </nav>
</template>
<script>
  export default {
    name: 'Menu',
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
          }]
        }
      }
    },
    methods: {
      isExternal (route) {
        return (this.$router.matcher.match(route) || { name: null }).name === null
      }
    }
  }
</script>