<template>
  <div id="error_page">
    <div :class="containerClasses">
      <div class="row justify-content-center text-center">
        <div class="col-xl-7 col-lg-9">
          <h2>404 <i class="icon_error-triangle_alt"></i></h2>
          <p>We're sorry, but the page you were looking for doesn't exist.</p>
          <form>
            <div class="search_bar_error">
              <input type="text" class="form-control" placeholder="What are you looking for?">
              <input type="submit" value="Search">
            </div>
          </form>
        </div>
      </div>
      <!-- /row -->
    </div>
    <!-- /container -->
  </div>
  <!-- /error_page -->
</template>
<script>
  import { mapGetters } from 'vuex'
  export default {
    name: 'PageNotFound',
    computed: {
      ...mapGetters([
        'container'
      ]),
      containerClasses () {
        return {
          'container': this.container,
          'container-fluid': !this.container
        }
      }
    }
  }
</script>