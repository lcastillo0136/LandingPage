<template>
  <div>
    <div id="results" :class="headerClasses">
      <div :class="containerClasses">
        <div class="row">
          <div class="col-md-6">
            <h4><strong>Showing {{ showing }}</strong> of {{ total }} results</h4>
          </div>
          <div class="col-md-6">
            <div class="search_bar_list">
              <input type="text" class="form-control" placeholder="Ex. Specialist, Name, Doctor..." :value="value" v-on:input="updateValue($event.target.value)">
              <input type="submit" value="Search" @click.prevent.stop="emitClick">
            </div>
          </div>
        </div>
        <!-- /row -->
      </div>
      <!-- /container -->
    </div>

    <div :style="{'margin-top': this.searchSticky + 'px'}" v-if="isSticky"></div>
  </div>
  <!-- /results -->
</template>
<script>
  import { mapGetters } from 'vuex'
  export default {
    name: 'SearchBar',
    inheritAttrs: false,
    props: {
      value: String,
      total: { type: Number, default: 0},
      showing: { type: Number, default: 0}
    },
    data () {
      return {
        isSticky: false,
        val: '',
        hasUpdated: false
      }
    },
    computed: {
      ...mapGetters([
        'container'
      ]),
      containerClasses () {
        return {
          'container': this.container,
          'container-fluid': !this.container
        }
      },
      headerClasses () {
        return {
          'is_stuck': this.isSticky
        }
      },
      headerSticky () {
        return window['$']('.header_sticky').outerHeight() + 1
      },
      searchSticky () {
        return (window['$']('#results').outerHeight() || 0) + 1
      }
    },
    methods: {
      updateValue (value) {
        this.hasChanges = true;
        this.val = value
      },
      emitClick () {
        this.$emit('onSearch', this.hasChanges ? this.val : this.value)
      }
    },
    mounted () {
      window.addEventListener('scroll', () => this.isSticky = window.scrollY > this.headerSticky)
    }
  }
</script>