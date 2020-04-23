<template>
  <div class="filters_listing">
    <div :class="containerClasses">
      <ul class="clearfix">
        <li v-if="types && types.length">
          <h6>Type</h6>
          <div class="switch-field">
            <template v-for="(t) in types">              
              <input type="radio" :id="'type_' + t.value" :value="t.value" v-model="selected.type" @change="emitFilter">
              <label :for="'type_' + t.value">{{ t.text }}</label>
            </template>
          </div>
        </li>
        <li v-if="layoutVisible">
          <h6>Layout</h6>
          <div class="layout_view">
            <a href="#0" @click.stop.prevent="changeLayout('grid')" :class="layoutClass('grid')"><i class="icon-th"></i></a>
            <a href="#0" @click.stop.prevent="changeLayout('list')" :class="layoutClass('list')"><i class="icon-th-list"></i></a>
            <a href="#0"@click.stop.prevent="changeLayout('map')" :class="layoutClass('map')"><i class="icon-map-1"></i></a>
          </div>
        </li>
        <li v-if="sorts && sorts.length">
          <h6>Sort by</h6>
          <select name="orderby" class="selectbox" v-model="selected.sort" @change="emitFilter">
            <option v-for="(s, si) in sorts" :value="s.value" :key="si">{{ s.text }}</option>
          </select>
        </li>
      </ul>
    </div>
    <!-- /container -->
  </div>
  <!-- /filters -->
</template>
<script>
  import { mapGetters } from 'vuex'
  export default {
    name: 'FilterList',
    props: {
      types: {
        type: Array,
        default: function () {
          return [
            { text: 'All', value: 'all', selected: false }, 
            { text: 'Doctors', value: 'doctors', selected: true }, 
            { text: 'Clinics', value: 'clinics', selected: false }
          ]
        }
      },
      layout: {
        type: String,
        default: 'list',
        validator: function (value) {
          return ['grid', 'list', 'map'].indexOf(value) !== -1
        }
      },
      sorts: {
        type: Array,
        default: function() {
          return [
            { text: 'Closest', value: 'closest', selected: true },
            { text: 'Best rated', value: 'best_rated', selected: false },
            { text: 'Men', value: 'men', selected: false },
            { text: 'Women', value: 'women', selected: false }
          ]
        }
      },
      layoutVisible: {
        type: Boolean,
        default: true
      },
      selected: {
        type: Object,
        default: function () {
          return  {
            type: 'doctors',
            layout: 'list',
            sort: 'closest'
          }
        }
      }
    },
    watch: {
      'selected.sort' (value) {
        window['$']('.selectbox', this.$el).selectbox('change', value, (this.sort.find(s => s.value === value)||{}).text, false)
      }
    },
    data () {
      return {
        
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
      selectedType () {
        return (this.types || []).find(t => t.selected)
      },
      selectedSort () {
        return (this.sort || []).find(s => s.selected)
      }
    },
    methods: {
      onChange (evt) {
        this.selected.sort = evt
        this.emitFilter()
      },
      changeLayout (layout) {
        this.selected.layout = layout
        this.emitFilter()
      },
      layoutClass (layout) {
        return {
          'active': this.selected.layout == layout
        }
      },
      emitFilter () {
        this.$emit('onFilter', {...this.selected})
      },
      selectType (type) {
        this.selected.type = type
      },
      selectLayout (layout) {
        this.selected.layout = layout
      }
    },
    mounted() {
      window['$']('.selectbox', this.$el).selectbox({
        onChange: this.onChange
      })
    }
  }
</script>