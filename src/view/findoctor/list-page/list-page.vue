<template>
  <main class="theia-exception">
    <SearchBar :total="doctors.length" :showing="doctors.length" :value="searchValue" @onSearch="onSearch($event)"></SearchBar>
    <FilterList :types="types" :sort="sort" @onFilter="onFilter($event)"></FilterList>
    
    <div class="container margin_60_35">
      <div class="row">
        <div class="col-lg-7">
          <List :data="doctors"></List>
          <Paginator :pages="paginator.pages" :page="paginator.page" @onPage="onPage($event)"></Paginator>
        </div>
        <!-- /col -->
        
        <aside class="col-lg-5" id="sidebar">
          <div id="map_listing" class="normal_list">
          </div>
        </aside>
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
  import Paginator from '@/components/paginator'

  import { mapGetters } from 'vuex'
  export default {
    components: {
      SearchBar,
      FilterList,
      List,
      Paginator
    },
    data () {
      return {
        searchValue: 'My Search',
        types: [
          { text: 'All', value: 'all' },
          { text: 'Pacients', value: 'pacients', selected: true },
          { text: 'Doctors', value: 'doctors' },
          { text: 'Nurses', value: 'nurses' },
          { text: 'Clinics', value: 'clinics' }
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
        }
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
      }
    },
    methods: {
      onSearch (val) {
        console.log(val)
      },
      onFilter (val) {
        console.log(val)
      },
      onPage (val) {
        console.log(val)
      }
    },
    mounted() {
      window['$']('#sidebar').theiaStickySidebar({
        additionalMarginTop: 95
      });
    }
  }
</script>