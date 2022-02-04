<template>
  <footer>
    <div class=" margin_60_35" :class="containerClasses">
      <div class="row">
        <div class="col-lg-3 col-md-12">
          <p>
            <router-link :to="{ name: 'home' }" title="My Doctor">
              <img src="img/logox2.png" data-retina="true" alt="" width="163" height="36" class="img-fluid">
            </router-link>
          </p>
        </div>
        <div class="col-lg-3 col-md-4">
          <h5>{{ $t('footer.about') }}</h5>
          <ul class="links">
            <li><router-link :to="{ name: 'home' }">{{ $t('footer.about_us') }}</router-link></li>
            <li><router-link :to="{ name: 'home' }">{{ $t('footer.blog') }}</router-link></li>
            <li><router-link :to="{ name: 'home' }">{{ $t('footer.faq') }}</router-link></li>
            <li><router-link :to="{ nome: 'login' }">{{ $t('footer.login') }}</router-link></li>
            <li><router-link :to="{ name: 'register' }">{{ $t('footer.register') }}</router-link></li>
          </ul>
        </div>
        <div class="col-lg-3 col-md-4">
          <h5>{{ $t('footer.useful_links') }}</h5>
          <ul class="links">
            <li>
              <router-link :to="{ name: 'list-page-type', params: { type: 'doctor', layout: 'grid' }}" replace>{{ $t('footer.doctors') }}</router-link>
            </li>
            <li>
              <router-link :to="{ name: 'list-page-type', params: { type: 'clinic', layout: 'grid' }}" replace>{{ $t('footer.clinic') }}</router-link>
            </li>
            <li>
              <router-link :to="{ name: 'list-page-type', params: { type: 'doctor', layout: 'list' }}" replace>{{ $t('footer.specialization') }}</router-link>
            </li>
            <li><router-link :to="{ name: 'register' }">{{ $t('footer.join_doctor') }}</router-link></li>
            <li><router-link :to="{ name: 'home' }">{{ $t('footer.download_app') }}</router-link></li>
          </ul>
        </div>
        <div class="col-lg-3 col-md-4">
          <h5>{{ $t('footer.contact_us') }}</h5>
          <ul class="contacts">
            <li><a href="tel:61280932400"><i class="icon_mobile"></i> + 61 23 8093 3400</a></li>
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
            <li><router-link :to="{ name: 'terms-conditions' }">{{ $t('footer.terms_conditions') }}</router-link></li>
            <li><router-link :to="{ name: 'privacy' }">{{ $t('footer.privacy') }}</router-link></li>
          </ul>
        </div>
        <div class="col-md-4">
          <div id="copy">© {{ year }} {{ appName }}</div>
        </div>
      </div>
    </div>
  </footer>
</template>
<script>

  import { mapGetters, mapMutations } from 'vuex'
  export default {
    name: 'Footer',
    computed: {
      ...mapGetters([
        'container',
        'settings'
      ]),
      containerClasses () {
        return {
          'container': this.container,
          'container-fluid': !this.container
        }
      },
      year () {
        return this.$moment().format('YYYY')
      },
      appName () {
        return this.settings?.COMPANY_NAME
      }
    },
    methods: {
      newHash (page) {
        var hash = 0, i, chr 
        for (i = 0; i < page.length; i++) {
          chr   = page.charCodeAt(i)
          hash  = ((hash << 5) - hash) + chr
          hash |= 0 
        }
        return '#' + hash
      }
    }
  }
</script>