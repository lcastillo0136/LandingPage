<template>
  <main class="theia-exception">
    <SearchBar :total="paginator.total" :showing="pageShowing" :value="searchValue" :sticky="searchSticky" @onSearch="onSearch($event)" v-if="filter.layout !== 'map'"></SearchBar>
    <FilterList :types="filterTypes" :sorts="filterSorts" :selected="filter" @onFilter="onFilter($event)" v-if="filter.layout !== 'map'"></FilterList>
    
    <div class="" :class="containerMap">
      <div class="row" :class="{ 'row-height': filter.layout === 'map' }">
        <div class="col-lg-7" v-if="filter.layout === 'list'">
          <List :data="doctors" :loading="loading" @onViewMapClick="showInMap"></List>
          <Paginator :paginator="paginator"  @onPage="onPage($event)"></Paginator>
        </div>
        <div class="col-lg-8" v-if="filter.layout === 'grid'">
          <Grid :data="doctors" @onViewMapClick="showInMap"></Grid>
          <Paginator :paginator="paginator" @onPage="onPage($event)"></Paginator>
        </div>
        <div class="col-lg-5 content-left" v-if="filter.layout === 'map'">
          <SearchBar :total="doctors.length" :showing="doctors.length" :value="searchValue" :sticky="searchSticky" @onSearch="onSearch($event)" :onlyInput="true"></SearchBar>
          <FilterList :types="filterTypes" :sorts="filterSorts" :selected="filter" @onFilter="onFilter($event)"></FilterList>
          
          <List :data="doctors" :loading="loading" @onViewMapClick="showInMap"></List>
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
            <ListMap ref="map" :map="map" v-if="!refreshMap"></ListMap>
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

  import { getDoctorsByFilter } from '@/api/data'

  
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
        refreshMap: false,
        pagelimit: 6,
        doctors: [],
        paginator: {
          pages: 1,
          page: 1,
          total: 0
        },
        filter: {
          type: localRead('page.type') || 'doctor',
          layout: localRead('page.layout') || 'list',
          sort: localRead('page.sort') || 'best_rated'
        },
        loading: false,
        map: {
          zoom: 3,
          center: [47.413220, -1.219482],
          marker: null,
          canZoom: false
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
          this.map.canZoom = !this.map.canZoom
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
        'container',
        'filterTypes',
        'filterSorts',
        'geoLocation'
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
      },
      pageShowing () {
        return Math.min(this.pagelimit * this.paginator.page, this.paginator.total)
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
        this.searchValue = val
        this.searchDoctors()
      },
      onFilter (val) {
        this.searchDoctors()
        this.$nextTick().then(() => {
          window['$']('#sidebar', this.$el).theiaStickySidebar({
            additionalMarginTop: 95
          })
        })
      },
      onPage (val) {
        this.searchDoctors()
      },
      showInMap (doctor) {
        this.map.center = [doctor.map.latitude , doctor.map.longitude]
        this.$refs.map.closePopup()
        this.map.marker = {
          id: doctor.id,
          latitude: doctor.map.latitude,
          longitude: doctor.map.longitude,
          img: doctor.img,
          especialidad: doctor.especialidad,
          name: doctor.name,
          address: doctor.map.address,
          phone: doctor.phone
        }
        setTimeout(() => {
          this.$nextTick().then(() => {
            this.$refs.map.openPopup()
          })
        }, 600)
      },
      searchDoctors () {
        this.loading = true
        getDoctorsByFilter({
          filter: this.searchValue,
          sort: this.filter.sort,
          type: this.filter.type,
          limit: this.pagelimit,
          page: this.paginator.page,
          location: this.geoLocation
        }).then((data) => { 
          this.paginator.pages = Math.ceil(data.data.data.paginator.pages)
          this.paginator.page = data.data.data.paginator.page
          this.paginator.total = data.data.data.paginator.total
          this.doctors = Object.values(data.data.data.doctors).map(d => Object({
            id: d.id,
            especialidad: d.especialidad,
            name: `${d.title || ''} ${d.first_name} ${d.last_name}`,
            description: d.biography,
            rating: {
              rate: d.rate,
              comments: d.comments
            },
            img: d.avatar,
            isVisible: false,
            fav: d.fav,
            map: d.address ? {
              latitude: d.address.latitude,
              longitude: d.address.longitude,
              address: `${d.address.street} ${d.address.suburb}, ${d.address.city}`
            } : {},
            phone: d.phone,
            views: d.viewed,
          }))
          this.loading = false
        })
      },
      refresh () {
        window['$']('#sidebar', this.$el).theiaStickySidebar({
          additionalMarginTop: 95
        })

        
        if (this.filter.layout === 'map') {
          this.toggleFooter()
          this.toggleContainer()
          this.toggleHeaderSticky()
          this.searchSticky = !this.searchSticky
          this.map.canZoom = !this.map.canZoom
          this.refreshMap = true
          this.$nextTick().then(() => {
            this.refreshMap = false
          })
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

        setTimeout(() => {
          this.$nextTick().then(() => {
            this.map.center = [this.geoLocation.latitude, this.geoLocation.longitude]
            this.searchDoctors()
          })
        }, 100)  
      }
    },
    mounted() {
      this.refresh()
    },
    beforeRouteLeave (to, from, next) {
      if (this.filter.layout === 'map') {
        this.toggleFooter()
        this.toggleContainer()
        this.toggleHeaderSticky()
        this.searchSticky = !this.searchSticky
        this.map.canZoom = !this.map.canZoom
      }
      next(vm => {
        // access to component instance via `vm`
      })
    },
    beforeDestroy () {
      
    },
    beforeRouteUpdate (to, from ,next) {
      if (this.filter.layout === 'map') {
        this.toggleFooter()
        this.toggleContainer()
        this.toggleHeaderSticky()
        this.searchSticky = !this.searchSticky
        this.map.canZoom = !this.map.canZoom
        this.refreshMap = true
        this.$nextTick().then(() => {
          this.refreshMap = false
        })
      }

      if (to.params) {
        if (to.params.search) {
          this.searchValue = to.params.search
        }

        if (to.params.type) {
          this.filter.type = to.params.type
        }

        if (to.params.layout) {
          this.filter.layout = to.params.layout
        }
      }
      next()
    }
  }
</script>