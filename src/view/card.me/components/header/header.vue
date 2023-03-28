<template>
  <!-- <b-navbar toggleable="md">
    <b-container class="d-flex align-items-center">
      <b-navbar-brand class="mt-0" :to="{ name: 'home' }">
        <img src="/img/logo.svg" style="max-height: 100px;" class="mw-100"/>
      </b-navbar-brand>
     
      <b-navbar-nav class="ml-auto d-none d-md-block">
        <div class="mx-lg-5 d-lg-flex flex-lg-row" v-if="!hasToken">
          <b-button class="rounded-lg mx-1" variant="outline-primary" @click="$bvModal.show('login-1')">Iniciar sesion</b-button>
        </div>
        <div class="mx-lg-2 d-lg-flex flex-lg-row" v-else>
          <b-button :to="{ name: 'profile-details' }" class="rounded-lg mr-2" variant="outline-primary">Mi tarjeta</b-button>
          <b-button class="rounded-lg text-white" variant="primary" @click="dispachLogout">Salir</b-button>
        </div>
      </b-navbar-nav> -->
      <!-- MOBILE MENU -->
      <!-- <b-navbar-nav class="ml-auto d-block d-md-none w-100"> -->
        <!-- <div class="mx-lg-5 d-lg-flex flex-lg-row" v-if="!hasToken">
          <b-button class="d-block w-100 my-1" variant="outline-primary" @click="$bvModal.show('login-1')">Iniciar sesion</b-button>
        </div>
        <div class="mx-lg-2 d-lg-flex flex-lg-row" v-else>
          <b-nav-item :to="{ name: 'profile-details' }">Hola, <b>@{{ User.username }}</b></b-nav-item>
          <b-button class="rounded-lg text-white" variant="primary" @click="dispachLogout">Salir</b-button>
        </div> -->
      <!-- </b-navbar-nav>
    </b-container>
  </b-navbar> -->
   <b-navbar toggleable="sm" variant="header-container">
    <b-navbar-toggle target="" v-b-toggle.sidebar-1></b-navbar-toggle>
    <b-sidebar id="sidebar-1" title="" shadow>
      <div class="px-3 py-2">
        <p>
          Cras mattis consectetur purus sit amet fermentum. Cras justo odio, dapibus ac facilisis
          in, egestas eget quam. Morbi leo risus, porta ac consectetur ac, vestibulum at eros.
        </p>
        <b-img src="https://picsum.photos/500/500/?image=54" fluid thumbnail></b-img>
      </div>
    </b-sidebar>
    <b-navbar-brand class="mt-0" :to="{ name: 'home' }">
      <img src="/img/logo.svg" style="max-height: 100px;" class="mw-100"/>
    </b-navbar-brand>

    <b-collapse id="nav-text-collapse" is-nav>
      <b-navbar-nav>
        <b-nav-item :to="{ name: 'home' }">Inicio</b-nav-item>
        <b-nav-item href="#designs" @click="scrollIntoView">Diseños</b-nav-item>
        <b-nav-item href="#create_card">Crear tu tarjeta</b-nav-item>
        <b-nav-item :to="{name: 'contacts' }">Contacto</b-nav-item>

        <!-- Navbar dropdowns -->
        <!-- <b-nav-item-dropdown text="Lenguajes" right>
          <b-dropdown-item href="#">EN</b-dropdown-item>
          <b-dropdown-item href="#">ES</b-dropdown-item>
        </b-nav-item-dropdown> -->

        <b-nav-item-dropdown text="Mi tarjeta" right v-if="hasToken">
          <b-dropdown-item :to="{ name: 'profile-details' }">
            <b-icon-person class="mr-1"></b-icon-person>
            Informacion personal
          </b-dropdown-item>
          <b-dropdown-item :to="{ name: 'profile-settings' }">
            <b-icon-gear class="mr-1"></b-icon-gear>
            Configuraciones
          </b-dropdown-item>
          <b-dropdown-divider></b-dropdown-divider>
          <b-dropdown-item @click="dispachLogout">
            <b-icon-box-arrow-left class="mr-1"></b-icon-box-arrow-left>
            Salir
          </b-dropdown-item>
        </b-nav-item-dropdown>
        <b-button :to="{ name: 'login' }" variant="outline-primary" v-else>Iniciar sesion</b-button>
      </b-navbar-nav>
    </b-collapse>
  </b-navbar>
</template>
<script>
  import { mapGetters, mapActions, mapMutations } from 'vuex'
  export default {
    name: 'Header',
    computed: {
      ...mapGetters([
        'hasToken',
        'settings',
        'getUser'
      ]),
      User() {
        return this.getUser || {}
      },
      appName () {
        return this.settings?.COMPANY_NAME
      },
      appImage () {
        return getServerFile('public/company/company_logo.png')
      }
    },
    methods: {
      ...mapActions([
        'handleLogOut',
        'handleLogin'
      ]),
      scrollIntoView(event) {
        event.preventDefault()
        const href = event.target.getAttribute('href')
        const el = href ? document.querySelector(href) : null
        if (el) {
          window.scrollTo({
            left: 0, 
            top: el.offsetTop,
            behavior: 'smooth'
          })
        }
      },
      dispachLogout () {
        this.handleLogOut()
      },
    }
  }
</script>
<style lang="scss">
  .bg-header-container {
    display: flex;
    .navbar-brand {
      margin-right: 0;
      flex: 1 1 50%;
      margin-left: 50px;
    }
    .navbar-toggler {
      border-color: transparent;
    }
    .dropdown-menu {
      padding: 0;
      .dropdown-item {
        padding: 8px 13px;
        font-size: 14px;
      }
    }
  }
</style>