<template>
  <main class="theia-exception">
    <SearchBar :total="doctors.length" :showing="doctors.length" :value="searchValue" :sticky="searchSticky" @onSearch="onSearch($event)" v-if="filter.layout !== 'map'"></SearchBar>
    <FilterList :types="types" :sorts="sort" :selected="filter" @onFilter="onFilter($event)" v-if="filter.layout !== 'map'"></FilterList>
    
    <div class="" :class="containerMap">
      <div class="row" :class="{ 'row-height': filter.layout === 'map' }">
        <div class="col-lg-7" v-if="filter.layout === 'list'">
          <List :data="doctors" @onViewMapClick="showInMap"></List>
          <Paginator :paginator="paginator"  @onPage="onPage($event)"></Paginator>
        </div>
        <div class="col-lg-8" v-if="filter.layout === 'grid'">
          <Grid :data="doctors" @onViewMapClick="showInMap"></Grid>
          <Paginator :paginator="paginator" @onPage="onPage($event)"></Paginator>
        </div>
        <div class="col-lg-5 content-left" v-if="filter.layout === 'map'">
          <SearchBar :total="doctors.length" :showing="doctors.length" :value="searchValue" :sticky="searchSticky" @onSearch="onSearch($event)" :onlyInput="true"></SearchBar>
          <FilterList :types="types" :sorts="sort" :selected="filter" @onFilter="onFilter($event)"></FilterList>
          
          <List :data="doctors" @onViewMapClick="showInMap"></List>
          <Paginator :paginator="paginator" @onPage="onPage($event)"></Paginator>
        </div>
        <!-- /col -->
        
        <aside class="col-lg-5" id="sidebar" v-if="filter.layout === 'list'">
          <div id="map_listing" class="normal_list">
            <ListMap ref="map" :map="map"></ListMap>
          </div>
        </aside>
        <aside class="col-lg-4" id="sidebar" v-if="filter.layout === 'grid'">
          <div id="map_listing" class="normal_list">
            <ListMap ref="map" :map="map"></ListMap>
          </div>
        </aside>

        <div class="col-lg-7 map-right Fixed" v-if="filter.layout === 'map'">
          <div id="map_listing" class="map_list">
            <ListMap ref="map" :map="map"></ListMap>
          </div>
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
  import ListMap from './components/map'
  import { localRead, localSave } from '@/libs/util'

  import { mapGetters, mapMutations } from 'vuex'
  export default {
    name: 'ListPage',
    components: {
      SearchBar,
      FilterList,
      List,
      Grid,
      Paginator,
      ListMap
    },
    data () {
      return {
        searchValue: '',
        searchSticky: true,
        types: [
          { text: 'All', value: 'all' },
          { text: 'Pacients', value: 'pacients' },
          { text: 'Doctors', value: 'doctors' },
          { text: 'Nurses', value: 'nurses' },
          { text: 'Clinics', value: 'clinics' }
        ],
        sort: [
          { text: 'Closest', value: 'closest' },
          { text: 'Best rated', value: 'best_rated' },
          { text: 'Men', value: 'men' },
          { text: 'Women', value: 'women' },
          { text: 'Oldest', value: 'oldest' },
          { text: 'Youngest', value: 'youngest' },
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
          fav: false,
          map: {
            latitude: 48.873792,
            longitude: 2.295028,
            address: '35 Newtownards Road, Belfast, BT4.'
          }
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
          fav: false,
          map: {
            latitude: 48.800040,
            longitude: 2.139670,
            address: '35 Newtownards Road, Belfast, BT4.'
          }
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
          fav: false,
          map: {
            latitude: 48.846222,
            longitude: 2.346414,
            address: '35 Newtownards Road, Belfast, BT4.'
          }
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
          fav: false,
          map: {
            latitude: 48.873792,
            longitude: 2.295028,
            address: '35 Newtownards Road, Belfast, BT4.'
          }
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
          fav: false,
          map: {
            latitude: 48.800040,
            longitude: 2.139670,
            address: '35 Newtownards Road, Belfast, BT4.'
          }
        }],
        paginator: {
          pages: 1,
          page: 1,
          total: 0
        },
        filter: {
          type: localRead('page.type') || 'doctors',
          layout: localRead('page.layout') || 'list',
          sort: localRead('page.sort') || 'best_rated'
        },
        map: {
          zoom: 3,
          center: [47.413220, -1.219482],
          marker: null,
          trackResize: false
        }
      }
    },
    watch: {
      'filter.layout' (new_val, old_val) {
        if (old_val === 'map' || new_val === 'map') {
          this.toggleFooter()
          this.toggleContainer()
          this.toggleHeaderSticky()
          this.searchSticky = !this.searchSticky
        }
        localSave('page.layout', new_val)
      },
      'filter.type' (new_val) {
          localSave('page.type', new_val)
      },
      'filter.sort' (new_val) {
        localSave('page.sort', new_val)
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
      containerMap () {
        return {
          'margin_60_35 container': this.filter.layout !== 'map',
          'container-fluid full-height': this.filter.layout === 'map'
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
        this.$nextTick().then(() => {
          window['$']('#sidebar', this.$el).theiaStickySidebar({
            additionalMarginTop: 95
          })
        })
      },
      onPage (val) {
        console.log(val)
      },
      showInMap (doctor) {
        this.map.zoom = 13
        this.map.center = [doctor.map.latitude , doctor.map.longitude]
        this.$refs.map.closePopup()
        this.map.marker = {
          latitude: doctor.map.latitude,
          longitude: doctor.map.longitude,
          img: doctor.img,
          speciality: doctor.speciality,
          name: doctor.name,
          address: doctor.map.address,
          phone: doctor.phone
        }
        setTimeout(() => {
          this.$nextTick().then(() => {
            this.$refs.map.openPopup()
          })
        }, 400)
      }
    },
    mounted() {
      window['$']('#sidebar', this.$el).theiaStickySidebar({
        additionalMarginTop: 95
      });
      
      if (this.filter.layout === 'map') {
        this.toggleFooter()
        this.toggleContainer()
        this.toggleHeaderSticky()
        this.searchSticky = !this.searchSticky
      }

      if (this.$route.params) {
        if (this.$route.params.search) {
          this.searchValue = this.$route.params.search
        }

        if (this.$route.params.type) {
          this.filter.type = this.$route.params.type
        }

        if (this.$route.params.layout) {
          this.filter.layout = this.$route.params.layout
        }
      }

    },
    beforeRouteLeave (to, from, next) {
      if (this.filter.layout === 'map') {
        this.toggleFooter()
        this.toggleContainer()
        this.toggleHeaderSticky()
        this.searchSticky = !this.searchSticky
      }
      next(vm => {
        // access to component instance via `vm`
      })
    },
    beforeDestroy () {
      
    }
  }
</script>