<template>
  <div id="breadcrumb">
    <div class="container">
      <ul>
        <li v-for="(piece, piece_i) in bread" :key="piece_i">
          <router-link :to="piece.route" v-if="piece.route">{{ piece.text }}</router-link>
          <template v-if="!piece.route">{{ piece.text }}</template>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
  export default {
    name: 'BreadCrumb',
    props: {
      routes: {
        type: Array,
        default: function () {
          return [{
            route: '/',
            text: 'Home'
          }]
        }
      }
    },
    computed: {
      bread () {
        return this.routes
      }
    }
  }
</script>