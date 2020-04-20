<template>
  <main class="theia-exception">
    <SearchBar :total="doctors.length" :showing="doctors.length" :value="searchValue" :sticky="searchSticky" @onSearch="onSearch($event)" v-if="selectedLayout !== 'map'"></SearchBar>
    <FilterList :types="types" :sort="sort" :layout="layout" @onFilter="onFilter($event)" v-if="selectedLayout !== 'map'"></FilterList>
    
    <div class="" :class="containerMap">
      <div class="row" :class="{ 'row-height': selectedLayout === 'map' }">
        <div class="col-lg-7" v-if="selectedLayout === 'list'">
          <List :data="doctors"></List>
          <Paginator :pages="paginator.pages" :page="paginator.page" @onPage="onPage($event)"></Paginator>
        </div>
        <div class="col-lg-8" v-if="selectedLayout === 'grid'">
          <Grid :data="doctors"></Grid>
          <Paginator :pages="paginator.pages" :page="paginator.page" @onPage="onPage($event)"></Paginator>
        </div>
        <div class="col-lg-5 content-left" v-if="selectedLayout === 'map'">
          <SearchBar :total="doctors.length" :showing="doctors.length" :value="searchValue" :sticky="searchSticky" @onSearch="onSearch($event)" :onlyInput="true"></SearchBar>
          <FilterList :types="types" :sort="sort" :layout="layout" @onFilter="onFilter($event)"></FilterList>
          
          <List :data="doctors"></List>
          <Paginator :pages="paginator.pages" :page="paginator.page" @onPage="onPage($event)"></Paginator>
        </div>
        <!-- /col -->
        
        <aside class="col-lg-5" id="sidebar" v-if="selectedLayout === 'list'">
          <div id="map_listing" class="normal_list">
          </div>
        </aside>
        <aside class="col-lg-4" id="sidebar" v-if="selectedLayout === 'grid'">
          <div id="map_listing" class="normal_list">
          </div>
        </aside>

        <div class="col-lg-7 map-right Fixed" v-if="selectedLayout === 'map'">
          <div id="map_listing" class="map_list"></div>
          <!-- map-->
        </div>
        <!-- /aside -->
      </div>
      <!-- /row -->
    </div>
    <!-- /container -->
  </main>
  <!-- /main -->
</template>
<script>
  import SearchBar from '@/components/search-bar'
  import FilterList from '@/components/filter-list'
  import List from './components/list'
  import Grid from './components/grid'
  import Paginator from '@/components/paginator'
  import { localRead, localSave } from '@/libs/util'

  import { mapGetters, mapMutations } from 'vuex'
  export default {
    components: {
      SearchBar,
      FilterList,
      List,
      Grid,
      Paginator
    },
    data () {
      return {
        searchValue: '',
        searchSticky: true,
        types: [
          { text: 'All', value: 'all', selected: false },
          { text: 'Pacients', value: 'pacients', selected: true },
          { text: 'Doctors', value: 'doctors', selected: false},
          { text: 'Nurses', value: 'nurses', selected: false },
          { text: 'Clinics', value: 'clinics', selected: false }
        ],
        sort: [
          { text: 'Closest', value: 'closest', selected: true },
          { text: 'Best rated', value: 'best_rated', selected: false },
          { text: 'Men', value: 'men', selected: false },
          { text: 'Women', value: 'women', selected: false },
          { text: 'Oldest', value: 'oldest', selected: false },
          { text: 'Youngest', value: 'youngest', selected: false },
        ],
        doctors: [{
          speciality: 'Pediatrician',
          name: 'Dr. Cornfield',
          description: 'Id placerat tacimates definitionem sea, prima quidam vim no. Duo nobis persecuti cuodo....',
          rating: {
            rate: 3,
            comments: 145
          },
          img: 'img/doctor_listing_1.jpg',
          isVisible: false,
        }, {
          speciality: 'Psicologist',
          name: 'Dr. Shoemaker',
          description: 'Id placerat tacimates definitionem sea, prima quidam vim no. Duo nobis persecuti cuodo....',
          rating: {
            rate: 4,
            comments: 165
          },
          img: 'img/doctor_listing_2.jpg',
          isVisible: false,
        }, {
          speciality: 'Pediatrician',
          name: 'Dr. Lachinet',
          description: 'Id placerat tacimates definitionem sea, prima quidam vim no. Duo nobis persecuti cuodo....',
          rating: {
            rate: 2,
            comments: 45
          },
          img: 'img/doctor_listing_3.jpg',
          isVisible: false,
        }, {
          speciality: 'Pediatrician',
          name: 'Dr. Rainwater',
          description: 'Id placerat tacimates definitionem sea, prima quidam vim no. Duo nobis persecuti cuodo....',
          rating: {
            rate: 5,
            comments: 245
          },
          img: 'img/doctor_listing_4.jpg',
          isVisible: false,
        }, {
          speciality: 'Psicologist',
          name: 'Dr. Manzone',
          description: 'Id placerat tacimates definitionem sea, prima quidam vim no. Duo nobis persecuti cuodo....',
          rating: {
            rate: 4,
            comments: 145
          },
          img: 'img/doctor_listing_5.jpg',
          isVisible: false,
        }],
        paginator: {
          pages: 10,
          page: 3
        },
        layout: localRead('page.layout') || 'list'
      }
    },
    watch: {
      layout (new_val, old_val) {
        if (old_val === 'map' || new_val === 'map') {
          this.toggleFooter()
          this.toggleContainer()
          this.toggleHeaderSticky()
          this.searchSticky = !this.searchSticky
        }
        localSave('page.layout', new_val)
      }
    },
    computed: {
      ...mapGetters([
        'stillLoading',
        'container'
      ]),
      containerClasses () {
        return {
          'container': this.container,
          'container-fluid': !this.container
        }
      },
      selectedType () {
        return (this.types.find(t => t.selected) || {})
      },
      selectedLayout () {
        return this.layout
      },
      containerMap () {
        return {
          'margin_60_35 container': this.layout !== 'map',
          'container-fluid full-height': this.layout === 'map'
        }
      }
    },
    methods: {
      ...mapMutations([
        'toggleHeader',
        'toggleFooter',
        'toggleContainer',
        'toggleHeaderSticky'
      ]),
      onSearch (val) {
        console.log(val)
      },
      onFilter (val) {
        let type = this.types.find(t => t.selected && t.value !== val.type)
        if(type) type.selected = false

        type = this.types.find(t => t.value === val.type && t.selected === false)
        if (type) type.selected = true

        this.layout = val.layout

        this.$nextTick().then(() => {
          window['$']('#sidebar').theiaStickySidebar({
            additionalMarginTop: 95
          })
        })
      },
      onPage (val) {
        console.log(val)
      }
    },
    mounted() {
      window['$']('#sidebar').theiaStickySidebar({
        additionalMarginTop: 95
      });
      if (this.$route.params) {
        if (this.$route.params.search) {
          this.searchValue = this.$route.params.search
        }
        if (this.$route.params.type) {
          let type = this.types.find(t => t.selected && t.value !== this.$route.params.type)
          if(type) type.selected = false

          type = this.types.find(t => t.value === this.$route.params.type && t.selected === false)
          if (type) type.selected = true

        }
      }
      if (this.selectedLayout === 'map') {
        this.toggleFooter()
        this.toggleContainer()
        this.toggleHeaderSticky()
        this.searchSticky = !this.searchSticky
      }
    },
    beforeDestroy () {
      if (this.layout === 'map') {
        this.toggleFooter()
        this.toggleContainer()
        this.toggleHeaderSticky()
        this.searchSticky = !this.searchSticky
      }
    }
  }
</script>