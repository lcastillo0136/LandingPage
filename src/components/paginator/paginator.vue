<template>
  <nav aria-label="" class="add_top_20">
    <ul class="pagination pagination-sm">
      <li class="page-item" :class="previousClass">
        <a class="page-link" href="#" tabindex="-1" @click.stop.prevent="previous">Anterior</a>
      </li>
      <li class="page-item" v-for="p in totalPages" :class="selectedPage(p)">
        <a class="page-link" href="#" @click.stop.prevent="selectPage(p)">{{ p }}</a>
      </li>
      <li class="page-item" :class="nextClass">
        <a class="page-link" href="#" @click.stop.prevent="next">Siguiente</a>
      </li>
    </ul>
  </nav>
</template>
<script>
  export default {
    name: 'Paginator',
    props: {
      paginator: { type: Object, default: function () { return { page: 1, pages: 1 } }}
    },
    data () {
      return {}
    },
    computed: {
      totalPages () {
        return Array(this.paginator.pages).fill(true).map((e, i) => i + 1).slice(Math.max(0, this.paginator.page-5), Math.min(this.paginator.page + 9, this.paginator.pages)).slice(0, 10)
      },
      previousClass () {
        return { 'disabled': this.paginator.page <= 1 }
      },
      nextClass () {
        return { 'disabled': this.paginator.page >= this.paginator.pages }
      }
    },
    methods: {
      emitPagination () {
        this.$emit('onPage', { selected: this.paginator.page })
      },
      selectPage (page) {
        this.paginator.page = page
        this.emitPagination()
      },
      selectedPage (page) {
        return {
          'active': this.paginator.page === page
        }
      },
      previous () {
        if (this.paginator.page > 0) this.paginator.page--
        else this.paginator.page = 0

        this.emitPagination()
      },
      next () {
        if (this.paginator.page < this.paginator.pages) this.paginator.page++
        else this.paginator.page = this.paginator.pages

        this.emitPagination()
      }
    },
    mounted () {
      
    }
  }
</script>