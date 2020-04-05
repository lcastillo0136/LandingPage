<template>
  <div class="hero_home" :class="classVersion">
    <div class="content">
      <h3 :class="classOnload">Find a Doctor!</h3>
      <p :class="classOnload">
        Ridiculus sociosqu cursus neque cursus curae ante scelerisque vehicula.
      </p>
      <form method="post" action="/findoctor/list.html" :class="classOnload">
        <div id="custom-search-input">
          <div class="input-group">
            <input type="text" class=" search-query" placeholder="Ex. Name, Specialization ....">
            <input type="submit" class="btn_search" value="Search">
          </div>
          <ul>
            <li>
              <input type="radio" id="all" name="radio_search" value="all" checked>
              <label for="all">All</label>
            </li>
            <li>
              <input type="radio" id="doctor" name="radio_search" value="doctor">
              <label for="doctor">Doctor</label>
            </li>
            <li>
              <input type="radio" id="clinic" name="radio_search" value="clinic">
              <label for="clinic">Clinic</label>
            </li>
          </ul>
        </div>
      </form>
    </div>
  </div>
</template>
<script>
  import { mapGetters } from 'vuex'
  export default {
    name: 'FindForm',
    props: {
      version: {
        type: Number,
        default: 1
      }
    },
    data () {
      return {

      }
    },
    computed: {
      classOnload () {
        return {
          'fadeInUp animated': !this.stillLoading
        }
      },
      classVersion () {
        return ['version_' + this.version]
      },
      ...mapGetters([
        'stillLoading'
      ])
    }
  }
</script>