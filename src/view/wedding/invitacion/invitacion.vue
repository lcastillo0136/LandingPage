<template>
  <main  v-if="event">
    <div class="d-flex">
      <div class="invitation shadow flex-fill">
        <div class="invite-content">
          <span class="merrieweather">Estas invitado a la </span>
          <span class="greatvibes gv48">Boda</span>
          <span class="merrieweather">en donde unen sus vidas</span>
          <span class="greatvibes">{{ event.bride.full_name }}</span>
          <span class="merrieweather" style="font-size: 23px;">&</span>
          <span class="greatvibes">{{ event.groom.full_name }}</span>
          <span class="merrieweather">
            <span class="text-capitalize">{{ event.event_date | moment('dddd') }}, {{ event.event_date | moment('MMM DD') }}</span>
          </span>
          <span class="merrieweather d-flex flex-column w-50 gap-4">
            <div v-for="_location in event.locations" :key="_location.id" class="d-flex flex-column gap-1">
              {{ _location.name }}
              <a :href="'https://www.google.com/maps/search/?api=1&query='+_location.location_latitude+','+_location.location_longitude" target="_blank">
                {{ _location.location_address }}
              </a>
              {{ _location.phone | phone }}
            </div>
          </span>
        </div>
      </div>
      <div class="flex-fill">
        
      </div>
    </div>
  </main>
  <!-- /main -->
</template>
<script>
import { mapGetters, mapActions } from 'vuex'
import Validate from 'uuid-validate'

export default {
    props: {},
    data() {
      return {

      }
    },
    computed: {
      ...mapGetters([
        'hasToken',
        'settings',
        'event'
      ])
    },
    methods: {},
    mounted() {
      if (!this.$route.params.uuid || !Validate(this.$route.params.uuid)) {
        this.$router.replace({ name: 'home' })
      }
    }
}
</script>
<style lang="scss">
  .invitation {
    position: relative;
    padding: 62px 20px 15px;
    max-width: 500px;
    background-image: url('/assets/images/floral-swirls_4.png');
    background-size: cover;
    .invite-content {
      display: flex;
      flex-direction: column;
      align-content: center;
      align-items: center;
      position: relative;
      gap: 25px;
      &::after {
        display: none;
      }
    }

    .card_decor {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      height: 100%;
      box-shadow: 0 0 5px 0 rgb(0 0 0 / 12%), 0 8px 5px -5px rgb(0 0 0 / 30%);
      img {
        max-width: 100%;
        max-height: 100%;
      }
    }

    .merrieweather {
      font-family: 'Merriweather';
      font-style: italic;
      font-weight: bold;
      color: #686868;
      font-size: 15px;
      line-height: 18px;
      text-align: center;
      &::after {
        display: none;
      }
    }

    .greatvibes {
      font-family: 'Great Vibes';
      color: #000;
      font-size: 34px;
      line-height: 47.6px;

      &.gv48 {
        font-size: 48px;
        line-height: 67.2px;
      }
    }
  }
</style>