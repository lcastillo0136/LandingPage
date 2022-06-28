<template>
  <div class="box_profile aside-profile">
    <figure v-if="avatar">
      <img :src="avatar" alt="" class="img-fluid" v-if="isImage">
      <img :src="avatarFile" alt="" class="img-fluid" v-else>
    </figure>
    <template>
      <small v-if="user.especialidad">
        {{ user.especialidad }}
      </small>
    </template>
    <h1 v-if="user && user.first_name" class="mb-0">
      {{ user.first_name }}
    </h1>
    <div class="mb-3 link-cardme">
      <template v-if="user.active_account">
        <a :to="{ name: 'card-preview-page' }" target="_blank">
          <a-tag color="green">
            Perfil desactivado 
            <b-icon-box-arrow-up-right></b-icon-box-arrow-up-right>
          </a-tag>
        </a>
      </template>
      <template v-else>
        <router-link :to="{ name: 'card-preview-page' }" target="_blank">
          <a-tag color="red">
            Perfil desactivado
            <b-icon-box-arrow-up-right></b-icon-box-arrow-up-right>
          </a-tag>
        </router-link>
      </template>
    </div>
    <div class="button-group d-flex">
      <a-button type="dashed">Copiar link</a-button>
      <a-button type="dashed">Enviar Email</a-button>
    </div>
    <!-- <ul class="contacts">
      <li><h6>Direccion</h6>{{ getUser.address.street }} {{ getUser.address.suburb }}, {{ getUser.address.city}}</li>
      <li v-if="getUser.phone"><h6>Telefono</h6><a :href="'tel:' + getUser.phone ">{{ getUser.phone | phone }}</a></li>
    </ul> -->
    <ul class="contacts">
      <li>
        <router-link :to="{ name: 'profile-details' }">
          <span>Detalles</span>
          <i class="arrow_carrot-right"></i>
        </router-link>
      </li>
      <li>
        <router-link :to="{ name: 'profile-appointments' }">
          <span>Citas</span>
          <i class="arrow_carrot-right"></i>
        </router-link>
      </li>
      <li>
        <router-link :to="{ name: 'profile-orders' }">
          <span>Ordenes</span>
          <i class="arrow_carrot-right"></i>
        </router-link>
      </li>
      <!-- <li>
        <router-link :to="{ name: 'profile-files' }">
          <span>Archivos</span>
          <i class="arrow_carrot-right"></i>
        </router-link>
      </li> -->
      <li>
        <router-link :to="{ name: 'profile-reviews' }">
          <span>Reseñas</span>
          <i class="arrow_carrot-right"></i>
        </router-link>
      </li>
      <li>
        <router-link :to="{ name: 'profile-settings' }">
          <span>Configuraciones</span>
          <i class="arrow_carrot-right"></i>
        </router-link>
      </li>
    </ul>
  </div>
</template>
<script>
  import { mapGetters } from 'vuex'

  export default {
    name: 'AsideProfile',
    props: {
      user: {
        type: Object,
        default: function () {
          return { }
        }
      }
    },
    data() {
      return {
        visible: false,
        avatarFile: ''
      }
    },
    watch:{
      avatar () {
        if (!this.isImage) {
          var reader  = new FileReader();
          reader.onloadend = () => {
            this.avatarFile = reader.result;
          }

          if (this.avatar) {
            reader.readAsDataURL(this.avatar);
          } else {

          }
        }
      }
    },
    computed: {
      ...mapGetters([
        'hasToken',
        'settings',
        'getUser'
      ]),
      avatar () {
        return (this.user && this.user.avatar) || '/img/blank-profile.webp'
      },
      isImage() {
        try {
          if (this.user.avatar && this.user.avatar instanceof File) {
            return false;
          }
        } catch(e) { }
         
       return true
      },
      isProvider() {
        return this.user.role && this.user.role.is_provider
      },
      isClient() {
        return this.user.role && this.user.role.is_client
      }
    },
    methods: {
      preventClick(arg1, arg2, arg3) {
        
      }
    },
    mounted() {
      this.user
    }
  }
</script>
<style lang="scss">
  .box_profile {
    &.aside-profile {
      figure {
        margin: -1px -26px 12px;
        position: relative;
        button {
          border-radius: 50%;
          background: var(--orange);
          color: var(--light);
          position: absolute;
          z-index: 1;
          bottom: 5px;
          right: 5px;
          width: 40px;
          height: 40px;
          border: 0;
          display: flex;
          flex-direction: row;
          align-content: center;
          justify-content: center;
          align-items: center;
          box-shadow: 0px 0px 8px -3px #424242;
          outline: none;
        }
      }

      @media (max-width: 991px) {
        figure {
          margin: 25px auto;
        }
      }
      .contacts {
        border-top: none;
        li {
          margin-bottom: 4px;
          a {
            display: flex;
            align-items: center;
            color: #639bbe;
            background: var(--light);
            border-radius: 6px;
            padding: 10px;
            margin: 0;
            span {
            }
            i {
              margin-left: auto
            }
            &.router-link-active {
              color: var(--light);
              background: var(--cyan);
            }
          }
        }
      }

      .link-cardme {
        .ant-tag {
          cursor: pointer;
        }
      }
      .button-group {
        display: flex;
        margin: 0 -25px;
        flex-direction: row;
        .ant-btn {
          border-radius: 0;
          flex: 1 1 auto;
          min-height: 42px;
          & + .ant-btn {
            
          }
        }
      }
    }
  }
</style>