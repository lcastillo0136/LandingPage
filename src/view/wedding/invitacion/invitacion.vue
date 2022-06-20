<template>
  <main class="px-4 container-md" v-if="event">
    <div class="d-flex gap-3 no_after flex-column flex-sm-row">
    
      <div class="invitation shadow flex-fill" id="invitation">
        <div class="invite-content">
          <span class="merrieweather">Estas invitado a la </span>
          <span class="greatvibes gv48">Boda</span>
          <span class="merrieweather">en donde unen sus vidas</span>
          <span class="greatvibes">{{ event.bride.first_name }}</span>
          <span class="merrieweather" style="font-size: 23px;">&</span>
          <span class="greatvibes">{{ event.groom.first_name }}</span>
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
      <div class="flex-fill" v-if="inviteUser">
        <div class="relatives">
          <div>
            {{ inviteUser.full_name }}
            <a-switch size="small" v-model="inviteUser.invite_confirmed" @change="updateInvite({ uuid: inviteUser.uuid_key })"/>
          </div>
          <div v-for="_relative in inviteUser.relatives" :key="_relative.id">
            {{ _relative.guest_name }} 
            <a-switch size="small" v-model="_relative.guest_confirmed" @change="updateInvite({ uuid: inviteUser.uuid_key, id: _relative.id })"/>
          </div>
        </div>
        <div class="firmas mt-4 text-center">
          <a-button @click="downloadInvite()" type="dashed" block size="large">Descargar invitacion</a-button>
        </div>
      </div>
    </div>
  </main>
  <!-- /main -->
</template>
<script>
  import jsPDF from "jspdf";

  import * as htmlToImage from 'html-to-image'

  import { mapGetters, mapActions } from 'vuex'
  import Validate from 'uuid-validate'
  import download from 'downloadjs'
  import { GreatVibes, PDFBackgroundImage, MerriWeatherBoldItalic } from '@/libs/util'

  (function(API){
    API.alignText = function(text = '', options = {}, x = 0, y = 0) {
      if ( options.align == "center" ) {
        // Get current font size
        var fontSize = this.internal.getFontSize();

        // Get page width
        var pageWidth = this.internal.pageSize.getWidth();

        let txtWidth = this.getStringUnitWidth(text) * fontSize / this.internal.scaleFactor;

        // Calculate text's x coordinate
        x = ( pageWidth - txtWidth ) / 2;
      }

      // Draw text at x,y
      text = text.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
      if (options.link) {
        this.textWithLink(text, x, y, { url: options.link });
      } else {
        this.text(text, x, y);
      }
    }
    API.greatvibes = function(text = '', options = {}, x = 0, y = 0) {
      this.setFontSize(options.size || 34);
      this.setFontType(options.type || 'normal');
      this.setFontStyle(options.style || 'normal');
      this.setTextColor(options.color || '#000000');

      this.addFileToVFS("great-vibes.ttf", GreatVibes);
      this.addFont("great-vibes.ttf", "great-vibes", "normal");
      this.setFont('great-vibes', 'normal');
      
      this.alignText(text, options, x, y);
      return this;
    }
    API.merrieweather = function(text = '', options = {}, x = 0, y = 0) {
      this.setFontSize(options.size || 15);
      this.setFontType(options.type || 'bold');
      this.setFontStyle(options.style || 'italic')
      this.setTextColor(options.color || '#686868');

      this.addFileToVFS("Merriweather.ttf", MerriWeatherBoldItalic);
      this.addFont("Merriweather.ttf", "Merriweather", "normal");
      this.setFont('Merriweather', 'normal');

      this.alignText(text, options, x, y);
      return this;
    }
  })(jsPDF.API);

  export default {
    props: {},
    components: {
      
    },
    data() {
      return {
        inviteUser: null,
        download: false,
        pdfOptions: {
          enableLinks: true,
          jsPDF: {

          },
          html2canvas: {
            width: 600
          }
        }
      }
    },
    computed: {
      ...mapGetters([
        'hasToken',
        'settings',
        'event'
      ])
    },
    methods: {
      ...mapActions([
        'getInvite',
        'updateInvite'
      ]),
      downloadInvite() {
        var element = document.getElementById('invitation');
        const doc = new jsPDF({
          format: 'a4',
          unit: 'mm',
        });

        let _currentTop = 0;

        doc.addImage(PDFBackgroundImage, 'PNG', 0, _currentTop, 210, 297);

        doc.merrieweather('Estas invitado a la', { align: 'center', type: 'bold', style: 'italic' }, 0, _currentTop+=30)
        doc.greatvibes('Boda', { align: 'center', size: 48 }, 10, _currentTop+=30)
        doc.merrieweather('en donde unen sus vidas', { align: 'center', type: 'bold', style: 'italic' }, 0, _currentTop+=20)
        doc.greatvibes(this.event.bride.first_name, { align: 'center' }, 10, _currentTop+=25)
        doc.merrieweather('&', { align: 'center', type: 'bold', style: 'italic', size: 23 }, 0, _currentTop+=20)
        doc.greatvibes(this.event.groom.first_name, { align: 'center' }, 10, _currentTop+=24)

        doc.merrieweather(this.$moment(this.event.event_date).format('dddd, MMM DD'), { align: 'center', type: 'bold', style: 'italic' }, 0, _currentTop+=20)

        _currentTop += 10;

        (this.event.locations||[]).forEach((e, i) => {
          doc.merrieweather(e.name, { align: 'center', type: 'bold', style: 'italic' }, 0, _currentTop+=10)
          doc.merrieweather(e.location_address, { align: 'center', type: 'bold', style: 'italic', color: '#e74e84', link: 'https://www.google.com/maps/search/?api=1&query='+e.location_latitude+','+e.location_longitude }, 0, _currentTop+=10)
          doc.merrieweather(`${e.phone}`, { align: 'center', type: 'bold', style: 'italic', link: `tel:${e.phone}` }, 0, _currentTop+=10)

          if ((_currentTop + 30) > 290) {
            doc.addPage({
              format: 'a4',
              orientation: 'p'
            });
            _currentTop = 0;
            doc.addImage(PDFBackgroundImage, 'PNG', 0, _currentTop, 210, 297);
          }
        });

        doc.save('invitacion-'+this.$moment(this.event.event_date).format('DD-MM-YY')+'.pdf')
      },
      beforeDownload($event) { 
        $event.html2pdf().from($event.pdfContent).outputPdf().then((pdf) => {
          let _file = new File([ new Blob([ pdf ], { type: 'application/pdf' }) ], `receipt-${this.order.uuid_key}.pdf`);
        });
      }
    },
    mounted() {
      if (!this.$route.params.uuid || !Validate(this.$route.params.uuid)) {
        this.$router.replace({ name: 'home' })
      }

      this.getInvite(this.$route.params.uuid).then((data) => {
        this.inviteUser = {
          ...data,
          invite_confirmed: !!data.invite_confirmed,
          relatives: data.relatives.map((r) => Object({ ...r, guest_confirmed: !!r.guest_confirmed }))
        }
      }).catch(() => {

      })
    }
  }
</script>
<style lang="scss">
  .invitation {
    position: relative;
    padding: 62px 20px 15px;
    max-width: 600px;
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
      font-family: 'Great Vibes', 'great-vibes-v7-latin-regular';
      color: #000;
      font-size: 34px;
      line-height: 47.6px;

      &.gv48 {
        font-size: 48px;
        line-height: 67.2px;
      }
    }
  }
  .relatives {
    display: flex;
    flex-direction: column;
    gap: 10px;
    border: solid 4px #e3e1e0;
    border-radius: 10px;
    padding: 16px;
    font-size: 18px;
    font-family: "Merriweather";
    font-style: italic;
    align-self: flex-start;

    > div {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      &::after { display: none; }
    }
    &::after {
      display: none;
    }
  }

  .no_after::after {
    display: none;
  }

  .vue-html2pdf {
    display: flex;
    flex: 1 1 auto;

    *::after, &::after { display: none; }

    section.layout-container.show-layout.unset-all {
      display: flex;
      flex: 1 1 auto;
      width: 100%;
    }
  }
</style>