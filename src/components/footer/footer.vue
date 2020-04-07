<template>
  <footer>
    <div class=" margin_60_35" :class="containerClasses">
      <div class="row">
        <div class="col-lg-3 col-md-12">
          <p>
            <a href="index-2.html" title="Findoctor">
              <img src="img/logo.png" data-retina="true" alt="" width="163" height="36" class="img-fluid">
            </a>
          </p>
        </div>
        <div class="col-lg-3 col-md-4">
          <h5>{{ $t('footer.about') }}</h5>
          <ul class="links">
            <li><a href="#0">{{ $t('footer.about_us') }}</a></li>
            <li><a href="blog.html">{{ $t('footer.blog') }}</a></li>
            <li><a href="#0">{{ $t('footer.faq') }}</a></li>
            <li><a href="login.html">{{ $t('footer.login') }}</a></li>
            <li><a href="register.html">{{ $t('footer.register') }}</a></li>
          </ul>
        </div>
        <div class="col-lg-3 col-md-4">
          <h5>{{ $t('footer.useful_links') }}</h5>
          <ul class="links">
            <li><a href="#0">{{ $t('footer.doctors') }}</a></li>
            <li><a href="#0">{{ $t('footer.clinic') }}</a></li>
            <li><a href="#0">{{ $t('footer.specialization') }}</a></li>
            <li><a href="#0">{{ $t('footer.join_doctor') }}</a></li>
            <li><a href="#0">{{ $t('footer.download_app') }}</a></li>
          </ul>
        </div>
        <div class="col-lg-3 col-md-4">
          <h5>{{ $t('footer.contact_us') }}</h5>
          <ul class="contacts">
            <li><a href="tel://61280932400"><i class="icon_mobile"></i> + 61 23 8093 3400</a></li>
            <li><a href="http://www.ansonika.com/cdn-cgi/l/email-protection#96fff8f0f9d6f0fff8f2f9f5e2f9e4b8f5f9fb"><i class="icon_mail_alt"></i> <span class="__cf_email__" data-cfemail="dcb4b9b0ac9cbab5b2b8b3bfa8b3aef2bfb3b1">[email&#160;protected]</span></a></li>
          </ul>
          <div class="follow_us">
            <h5>{{ $t('footer.follow_us') }}</h5>
            <ul>
              <li><a href="#0"><i class="social_facebook"></i></a></li>
              <li><a href="#0"><i class="social_twitter"></i></a></li>
              <li><a href="#0"><i class="social_linkedin"></i></a></li>
              <li><a href="#0"><i class="social_instagram"></i></a></li>
            </ul>
          </div>
        </div>
      </div>
      <!--/row-->
      <hr>
      <div class="row">
        <div class="col-md-8">
          <ul id="additional_links">
            <li><a href="#0">{{ $t('footer.terms_conditions') }}</a></li>
            <li><a href="#0">{{ $t('footer.privacy') }}</a></li>
          </ul>
        </div>
        <div class="col-md-4">
          <div id="copy">© 2017 Findoctor</div>
        </div>
      </div>
    </div>
  </footer>
</template>
<script>

  import { mapGetters } from 'vuex'
  export default {
    name: 'Footer',
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
    },
  }
</script>