<template>
  <ul class="user-menu" :class="{ 'open-menu': isOpen }" tabindex="12">
    <li>
      <template v-if="!getUser.avatar">
        <i class="pe-7s-user" @click="isOpen=!isOpen"></i>
      </template>
      <template v-else>
        <img :src="avatar" border="0" class="avatar" @click="isOpen=!isOpen">
      </template>
      <ul>
        <li class="welcome-user">Hola, {{ fullName }}</li>
        <li>Profile</li>
        <li>Settings</li>
        <li class="divider"></li>
        <li @click="handleLogOut">
          Logout
        </li>
      </ul>
    </li>
  </ul>
</template>
<script>
  import { mapGetters, mapActions } from 'vuex'
  import { getServerFile } from '@/libs/util'

  export default {
    name: 'UserMenu',
    data () {
      return {
        isOpen: false
      }
    },
    computed: {
      ...mapGetters([
        'hasToken',
        'getUser'
      ]),
      fullName () {
        return (this.getUser.title || '') + ' ' + (this.getUser.first_name) + ' ' + (this.getUser.last_name)
      },
      avatar () {
        return getServerFile(this.getUser.avatar)
      }
    },
    methods: {
      ...mapActions([
        'handleLogOut'
      ]),
    },
  }
</script>
<style lang="scss">
  .user-menu {
    display: inline-block;
    position: relative;
    z-index: 14;
    width: auto;
    float: right;
    margin: 0;
    padding: 0;
    outline: none;
    li {
      > i {
        font-size: 2.125rem;
        cursor: pointer;
        border: solid 1px #0000;
      }
      > .avatar {
        border-radius: 50%;
        max-width: 36px;
        max-height: 36px;
        vertical-align: unset;
        display: inline-block;
        margin-bottom: -2px;
      }
      > ul {
        position: fixed;
        background: #fff;
        padding: 0px 0px;
        transform: translateX(-100%);
        margin-left: 36px;
        display: none;
        margin-top: -5px;
        border: solid 1px #d5d5d5;
        li {
          display: block;
          padding: 7px 20px;
          cursor: pointer;
          &.welcome-user {
            font-weight: bold;
            white-space: nowrap;
            border-bottom: solid 1px #e1e8ed;
          }
          &:hover:not(.welcome-user) {
            background: #f5f5f5;
          }
          &.divider {
            padding: 0;
            margin: 0;
          }
        }
      }
    }
    &:hover,
    &:focus,
    &.open-menu {
      li {
        > i, > .avatar {
          color: #e74e84;
          border-radius: 50%;
          border-bottom-left-radius: 0;
          border-bottom-right-radius: 0;
          position: relative;
          background: #fff;
          z-index: 154;
          border: solid 1px #d5d5d5;
          border-bottom: 0;
        }
        > ul {
          display: block;
        }
      }
    }
  }
</style>