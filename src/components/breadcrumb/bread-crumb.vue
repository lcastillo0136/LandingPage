<template>
  <div id="breadcrumb">
    <div class="container">
      <ul>
        <li v-for="(piece, piece_i) in breadready" :key="piece_i">
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
        type: [Array, Function],
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
        return typeof this.routes == 'function' ? this.routes() : this.routes
      },
      breadready() {
        return this.bread.filter(b => b.text)
      }
    }
  }
</script>