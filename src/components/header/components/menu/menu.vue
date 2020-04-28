<template>
  <nav id="menu" class="main-menu">
    <ul>
      <li v-for="(option, option_i) in options" :key="option_i">
        <span>
          <router-link :to="option.url" v-if="!isExternal(option.url) && !isEmpty(option.url) && !option.external">{{ option.text }}</router-link>
          <a :href="option.url" v-if="(isExternal(option.url) || option.external) && !isEmpty(option.url)">{{ option.text }}</a>
          <a href="" v-if="isEmpty(option.url)" @click.stop.prevent="">{{ option.text }}</a>
        </span>
        <ul v-if="option.childrens">
          <li v-for="(child, child_i) in option.childrens" :key="child_i" :class="optionListClass(child.url)">
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
            }]
          }]
        }
      }
    },
    computed: {
    },
    methods: {
      optionListClass (url) {
        return { 'active': url && this.isSelected(url) }
      },
      isExternal (route) {
        return ((route && this.$router.matcher.match(route)) || { name: null }).name === null
      },
      isEmpty (route) {
        return (route||'').trim() === ""
      },
      isSelected(url) {
        return ((url && this.$router.matcher.match(url)) || { name: null}).name === this.$route.name
      }
    }
  }
</script>