<template>
  <footer>
    <div class=" margin_60_35" :class="containerClasses">
      <div class="row">
        <div class="col-lg-3 col-md-12">
          <p>
            <router-link to="index.html" title="Findoctor">
              <img src="img/logo.png" data-retina="true" alt="" width="163" height="36" class="img-fluid">
            </router-link>
          </p>
        </div>
        <div class="col-lg-3 col-md-4">
          <h5>{{ $t('footer.about') }}</h5>
          <ul class="links">
            <li><router-link to="/">{{ $t('footer.about_us') }}</router-link></li>
            <li><router-link to="/">{{ $t('footer.blog') }}</router-link></li>
            <li><router-link to="/">{{ $t('footer.faq') }}</router-link></li>
            <li><router-link to="login.html">{{ $t('footer.login') }}</router-link></li>
            <li><router-link to="register.html">{{ $t('footer.register') }}</router-link></li>
          </ul>
        </div>
        <div class="col-lg-3 col-md-4">
          <h5>{{ $t('footer.useful_links') }}</h5>
          <ul class="links">
            <li><router-link :to="{ name: 'list-page', params: { type: 'doctors', layout: 'grid' }}">{{ $t('footer.doctors') }}</router-link></li>
            <li><router-link :to="{ name: 'list-page', params: { type: 'clinics', layout: 'grid' }}">{{ $t('footer.clinic') }}</router-link></li>
            <li><router-link :to="{ name: 'list-page', params: { type: 'doctors', layout: 'list' }}">{{ $t('footer.specialization') }}</router-link></li>
            <li><router-link to="register.html">{{ $t('footer.join_doctor') }}</router-link></li>
            <li><router-link to="/">{{ $t('footer.download_app') }}</router-link></li>
          </ul>
        </div>
        <div class="col-lg-3 col-md-4">
          <h5>{{ $t('footer.contact_us') }}</h5>
          <ul class="contacts">
            <li><a href="tel://61280932400"><i class="icon_mobile"></i> + 61 23 8093 3400</a></li>
            <li><a href="mail:mail@mail.com"><i class="icon_mail_alt"></i> <span class="__cf_email__">mail@mail.com</span></a></li>
          </ul>
          <div class="follow_us">
            <h5>{{ $t('footer.follow_us') }}</h5>
            <ul>
              <li><a href="https://www.facebook.com/"><i class="social_facebook"></i></a></li>
              <li><a href="https://www.twitter.com/"><i class="social_twitter"></i></a></li>
              <li><a href="https://www.linkedin.com/"><i class="social_linkedin"></i></a></li>
              <li><a href="https://www.instagram.com/"><i class="social_instagram"></i></a></li>
            </ul>
          </div>
        </div>
      </div>
      <!--/row-->
      <hr>
      <div class="row">
        <div class="col-md-8">
          <ul id="additional_links">
            <li><router-link to="terms-conditions.html">{{ $t('footer.terms_conditions') }}</router-link></li>
            <li><router-link to="privacy.html">{{ $t('footer.privacy') }}</router-link></li>
          </ul>
        </div>
        <div class="col-md-4">
          <div id="copy">© {{ year }} Findoctor</div>
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
      },
      year () {
        return this.$moment().format('YYYY')
      }
    },
  }
</script>