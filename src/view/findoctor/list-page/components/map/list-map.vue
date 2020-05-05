<template>
  <l-map ref="mapContent" :zoom="zoom" :center="center" @update:zoom="zoomUpdated" @update:center="centerUpdated" @update:bounds="boundsUpdated" :options="{ trackResize: map.canZoom, scrollWheelZoom: map.canZoom }">
    <l-tile-layer :url="url"></l-tile-layer>
    <l-marker ref="marker" :lat-lng="[ map.marker.latitude, map.marker.longitude ]" :icon="icon" v-if="map.marker">
      <l-popup :options="{ 'className' : 'custom' }">
        <div class="marker_info" v-if="map.marker">
          <figure>
            <router-link :to="{ name: 'details-page', params: { id: map.marker.id }  }">
              <img :src="map.marker.img" alt="Image">
            </router-link>
          </figure>
          <small>{{ map.marker.speciality }}</small>
          <h3>
            <router-link :to="{ name: 'details-page', params: { id: map.marker.id }  }">
              {{ map.marker.name }}
            </router-link>
          </h3>
          <span>{{ map.marker.address }}</span>
          <div class="marker_tools">
            <form action="http://maps.google.com/maps" method="get" target="_blank" style="display:inline-block">
              <input name="saddr" value="" type="hidden">
              <input type="hidden" name="daddr" :value="map.marker.latitude+','+ map.marker.longitude">
              <button type="submit" value="Get directions" class="btn_infobox_get_directions">Directions</button>
            </form>
            <a :href="'tel:' + map.marker.phone" class="btn_infobox_phone">{{ map.marker.phone }}</a>
          </div>
        </div>
      </l-popup>
    </l-marker>
  </l-map>
</template>
<script>
  import { latLng, icon } from "leaflet"

  export default {
    name: 'ListMap',
    props: {
      map: {
        type: Object,
        default: function () { 
          return  {
            url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
            zoom: 3,
            center: [47.413220, -1.219482],
            bounds: null,
            marker: null
          } 
        }
      }
    },
    computed: {
      center () {
        return this.map.center || [47.413220, -1.219482]
      },
      zoom () {
        return this.map.zoom || 3
      },
      url () {
        return this.map.url || 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
      },
      icon () {
        return icon({
          iconUrl:       'img/pin/Doctors.png',
          shadowUrl:     '',
          iconSize:    [25, 35],
          shadowSize:  [25, 35],
          iconAnchor:  [12, 35],
          popupAnchor: [1, -35],
          tooltipAnchor: [16, -28],
        });
      }
    },
    methods: {
      openPopup () {
        if(this.$refs.marker) this.$refs.marker.mapObject.openPopup()
      },
      closePopup() {
        if(this.$refs.marker) this.$refs.marker.mapObject.closePopup()
      },
      zoomUpdated (zoom) {
        this.map.zoom = zoom;
      },
      centerUpdated (center) {
        this.map.center = center;
      },
      boundsUpdated (bounds) {
        this.map.bounds = bounds;
      }
    },
    mounted() {
    }
  }
</script>
<style>
  .leaflet-popup.custom {

  }
  .leaflet-popup.custom .leaflet-popup-content-wrapper,.leaflet-popup-tip {
    background: rgba(255,255,255,.9);
    border-radius: 0px;
    box-shadow: none;
  }
  .leaflet-popup.custom .leaflet-popup-content-wrapper .leaflet-popup-content {
    margin: 0;
    width: 100% !important;
  }
  .leaflet-popup.custom .leaflet-popup-content-wrapper .marker_info {
    background: none;
  }
</style>