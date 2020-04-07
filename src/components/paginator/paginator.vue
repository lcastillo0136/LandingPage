<template>
  <nav aria-label="" class="add_top_20">
    <ul class="pagination pagination-sm">
      <li class="page-item" :class="previousClass">
        <a class="page-link" href="#" tabindex="-1" @click.stop.prevent="previous">Previous</a>
      </li>
      <li class="page-item" v-for="p in totalPages" :class="selectedPage(p)">
        <a class="page-link" href="#" @click.stop.prevent="selectPage(p)">{{ p }}</a>
      </li>
      <li class="page-item" :class="nextClass">
        <a class="page-link" href="#" @click.stop.prevent="next">Next</a>
      </li>
    </ul>
  </nav>
</template>
<script>
  export default {
    name: 'Paginator',
    props: {
      page: { type: Number, default: 0 },
      pages: { type: Number, default: 0 }
    },
    data () {
      return {
        paginator: {
          page: 0,
          pages: 0
        }
      }
    },
    computed: {
      totalPages () {
        return Array(this.paginator.pages).fill(true).map((e, i) => i + 1)
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
      if (this.page !== 0) {
        this.paginator.page = this.page
      }
      if (this.pages !== 0) {
        this.paginator.pages = this.pages
      }
    }
  }
</script>