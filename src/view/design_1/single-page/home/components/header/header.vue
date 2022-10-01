<template>
  <header class="u-align-left u-clearfix u-header u-white u-header" id="sec-5541">
    <div class="u-clearfix u-sheet u-sheet-1">
      <div class="u-clearfix u-expanded-width u-gutter-0 u-layout-wrap u-white u-layout-wrap-1">
        <div class="u-gutter-0 u-layout">
          <div class="u-layout-row">
            <div class="u-align-center u-container-style u-layout-cell u-size-20 u-layout-cell-1">
              <div class="u-container-layout u-valign-middle u-container-layout-1">
                <img class="u-align-center u-image u-image-default u-image-1" src="../../images/logo-fondo-blanco-color-negro.png" alt="" data-image-width="600" data-image-height="200">
              </div>
            </div>
            <div class="u-align-left u-container-style u-layout-cell u-size-20 u-layout-cell-2">
              <div class="u-container-layout u-container-layout-2">
                <div class="u-align-left u-container-style u-expanded-width u-group u-group-1">
                  <div class="u-container-layout u-valign-middle">
                    <h5 class="u-text u-text-default u-text-1">Registro Legal</h5>
                    <p class="u-text u-text-default u-text-2">
                      Zibasoft es una compañia que opera en <span style="font-weight: 700;">MÉXICO</span> al servicio particular propiedad de <span style="font-weight: 700;">ANGELINA AGUNDIZ PEDRAZA </span>con RFC:&nbsp;<span style="font-weight: 700;">AUPA7211278R2 <span style="font-weight: 400;">operando como persona fisica desde el 2021</span></span>
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div class="u-align-center u-container-style u-layout-cell u-size-20 u-layout-cell-3">
              <div class="u-container-layout u-valign-middle u-container-layout-4">
                <div class="u-align-center u-container-style u-expanded-width u-group u-group-2">
                  <div class="u-container-layout u-valign-middle">
                    <a :href="'https://api.whatsapp.com/send?phone=521'+currentSettings.COMPANY_PHONE+'&text=Hola'" class="u-align-center u-black u-border-0 u-btn u-button-style u-hover-palette-1-dark-1 u-btn-1" target="_blank">
                      <span class="u-icon u-text-custom-color-1 u-icon-1">
                        <b-icon-whatsapp variant="success"></b-icon-whatsapp>
                      </span>&nbsp;<span style="font-size: 0.625rem;">ENVIANOS UN WHATSAPP&nbsp;</span>
                    </a>
                    <a href="#carousel_92d2" class="u-align-center u-black u-border-0 u-btn u-button-style u-hover-palette-1-dark-1 u-btn-2">
                      <span class="u-icon u-icon-2">
                        <b-icon-envelope-fill variant="info"></b-icon-envelope-fill>
                      </span>&nbsp;<span style="font-size: 0.625rem;">Envianos un correo electronico&nbsp;</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </header>
</template>
<script>
  import { mapGetters } from 'vuex'

  export default {
    name: 'home-header',
    computed: {
      ...mapGetters([
        'settings',
        'hasToken',
        'getUser'
      ]),
      currentSettings() {
        return this.settings || {}
      }
    }
  }
</script>