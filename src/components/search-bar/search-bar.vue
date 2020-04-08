<template>
  <div>
    <div id="results" :class="headerClasses">
      <div :class="containerClasses">
        <div class="row">
          <div class="col-md-6" v-if="!onlyInput">
            <h4><strong>Showing {{ showing }}</strong> of {{ total }} results</h4>
          </div>
          <div class="col-md-6" v-if="!onlyInput">
            <div class="search_bar_list">
              <input type="text" class="form-control" placeholder="Ex. Specialist, Name, Doctor..." :value="value" v-on:input="updateValue($event.target.value)">
              <input type="submit" value="Search" @click.prevent.stop="emitClick">
            </div>
          </div>
          <div class="col-md-12" v-if="onlyInput">
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

    <div :style="{'margin-top': this.searchSticky + 'px'}" v-if="isSticky && sticky"></div>
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
      total: { type: Number, default: 0 },
      showing: { type: Number, default: 0 },
      sticky: { type: Boolean, default: true },
      onlyInput: { type: Boolean, default: false }
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
          'is_stuck': this.isSticky && this.sticky,
          'result_map': this.onlyInput
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
<style type="text/css">
  #results.result_map {
    margin-left: -15px;
    margin-right: -15px;
    padding: 15px 0;
  }
</style>