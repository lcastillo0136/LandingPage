<template>
  <div v-if="getUser.id" class="profile-history-container">
    <a-form-model ref="perofesionalInfoForm" :rules="rules" :model="user" class="profile-history-form d-flex flex-column" :label-col="labelCol" :wrapper-col="wrapperCol" :colon="false">
      <b-card no-body>
        <b-card-body>
          <h3 class="mb-4">
            Información profesional 
          </h3>
          <a-form-model-item prop="profesion">
            <template #label>
              <span>Profesión</span>
              <br>
              <small class="text-muted">Nombre de carrera que actualmente ejerce</small>
            </template>
            <a-input type="text" placeholder="Profesión" v-model="user.profesion" :disabled="saving" size="large">
            </a-input>
          </a-form-model-item>
          <a-form-model-item prop="especialidad">
            <template #label>
              <span>Especialidad</span>
              <br>
              <small class="text-muted">Rama de especialidad que maneja de acuerdo a su carrera profesional</small>
            </template>
            <a-input type="text" placeholder="Especialidad" v-model="user.especialidad" :disabled="saving" size="large">
            </a-input>
          </a-form-model-item>
          <a-form-model-item prop="company_name">
            <template #label>
              <span>Nombre de empresa actual</span>
              <br>
              <small class="text-muted">Nombre de la empresa o negocio en el que trabaja actualmente</small>
            </template>
            <a-input type="text" placeholder="Empresa actual" v-model="user.company_name" :disabled="saving" size="large">
            </a-input>
          </a-form-model-item>
        </b-card-body>
      </b-card>

      <b-card no-body>
        <h3 class="mb-4 mt-3 mx-3 pt-1 px-1">
          Redes sociales 
          <a-button class="float-right align-middle ml-auto" @click="modal.visible = true" type="primary">
            <b-icon-plus style="font-size: 22px;vertical-align: -6px;" font-scale="1.5"></b-icon-plus>
            Agregar
          </a-button>
        </h3>
        <small class="mb-4 ml-4 d-block text-muted">Ordena y agrega tus redes sociales o sitios donde te puedan encontrar</small>

        <draggable v-model="user.social_networks" :class="{ 'list-group list-group-flush': true, 'list-group-disabled': saving }" handle=".b-icon" @sort="onSortSocialNetworks">
          <b-list-group-item href="#" v-for="(element, element_i) in user.social_networks" :key="element.id" @click="!saving && openEditSocialNework(element)">
            <b-icon-grip-vertical class="cursor-move"></b-icon-grip-vertical>
            <i :icon="element.network_icon || 'globe'" :class="['mx-2', 'icon-' + element.network_icon, 'bi bi-' + (element.network_icon || 'globe') ]"></i>
            {{ element.network_url }}
            <b-icon-trash-fill class="float-right mt-1 text-danger" @click.stop.prevent="!saving && deleteSocialNetwork(element, $event)"></b-icon-trash-fill>
          </b-list-group-item>
        </draggable>
          
        <b-card-body>
        </b-card-body>
      </b-card>
    </a-form-model>

    <a-modal title="Agregar url o red social" :visible="modal.visible" @ok="addNewSocial" @cancel="() => modal.visible = false" class="profile-history-modal">
      <a-form-model ref="modalForm" :rules="rulesModal" :model="modal.newSocial" :label-col="{ }" :wrapper-col="{ }">
        <a-form-model-item label="Direccion web" prop="url">
          <a-input v-model="modal.newSocial.url" placeholder="https://www.facebook.com"></a-input>
        </a-form-model-item>
      </a-form-model>
    </a-modal>

    <a-modal title="Editar url o red social" :visible="modal.visible_edit" @ok="addNewSocial" @cancel="() => modal.visible_edit = false" class="profile-history-modal">
      <a-form-model ref="modalForm" :rules="rulesModal" :model="modal.newSocial" :label-col="{ }" :wrapper-col="{ }">
        <a-form-model-item label="Direccion web" prop="url">
          <a-input v-model="modal.newSocial.url" placeholder="https://www.facebook.com"></a-input>
        </a-form-model-item>
      </a-form-model>
    </a-modal>

    <div style="text-align: right;">
      <a-button type="primary" class="save-button" shape="circle" size="large" @click="handleSave" :loading="saving">
        <a-icon type="save" theme="filled" v-if="!saving" />
      </a-button>
    </div>
  </div>
</template>
<script>
  import { updateUser } from '@/api/user'
  import { mapGetters } from 'vuex'
  import draggable from 'vuedraggable'
  import Addressess from '../details/components/addressess'

  import _ from 'lodash'

  export default {
    props: {
      user: {
        type: Object,
        default: function () {
          return { }
        }
      }
    },
    components: {
      Addressess,
      draggable,
    },
    data() {
      return {
        saving: false,
        labelCol: { 
          md: {
            span: 8
          },
          xs: { 
            span: 24 
          } 
        },
        wrapperCol: { 
          md: { 
            span: 14, 
            offset: 2
          },
          xs: { 
            span: 24, 
            offset: 0 
          } 
        },
        rules: {},
        errors: [],
        visiblePasswordPanel: false,
        modal: {
          newSocial: {
            url: '',
            id: false
          },
          visible: false,
          visible_edit: false
        },
        rulesModal: {
          url: [{ validator: (rule, value, callback) => {
            let _match = /^(?:(http|https):\/\/|www.)/
            if (value.match(_match)) {
              callback();
            } else {
              callback(new Error('Favor de caputurar una url valida'));
            }
          }, trigger: 'change' }]
        }
      }
    },
    name: 'ProfileHistory',
    computed: {
      ...mapGetters([
        'hasToken',
        'settings',
        'getUser'
      ])
    },
    methods: {
      handleSave () {
        this.saving = true
        this.errors = []

        updateUser({
          ...this.user,
          ...{
            bday: this.user.bday && this.user.bday.format('YYYY-MM-DD'),
            phone: (`${this.user.phone||''}`).replace(/\D/g, ''),
          }
        }, this.hasToken)
        .then((response) => response.data)
        .then((response) => {
          this.user.social_networks = [...response.data.social_networks]

          this.saving = false
          this.$notification.success({
            message: 'Datos guardados',
            description: 'Los datos del usuario han sido actualizados'
          })
        }).catch((error) => {
          this.saving = false
          
          this.$notification.error({
            message: 'Error al guardar',
            description: 'no se puedo actualiar la información'
          })
        })
      },
      addNewSocial(bvModalEvent) {
        let _match = /^(?:(http|https):\/\/|www.)/

        if (this.modal.newSocial.url && this.modal.newSocial.url.match(_match)) {
          this.$refs.modalForm.validate().then(valid => {
            if (valid) {
              if (!this.user.social_networks) this.$set(this.user, 'social_networks', [])

              if (this.modal.newSocial.url && this.modal.newSocial.id == false) {
                this.user.social_networks.push({
                  id: Math.min(+_.minBy(this.user.social_networks, 'id')?.id || 0, 0) - 1,
                  network_url: this.modal.newSocial.url,
                  network_icon: this.getIcon(this.modal.newSocial.url) || 'globe',
                  order: (+_.maxBy(this.user.social_networks, 'order')?.order || 0) + 1
                })
                this.modal.newSocial.url = ''
                this.modal.newSocial.id = this.modal.visible_edit = this.modal.visible = false
              } else {
                let _n = _.find(this.user.social_networks, { id: this.modal.newSocial.id })
                if (_n) {
                  _n.network_url = this.modal.newSocial.url
                  _n.network_icon = this.getIcon(this.modal.newSocial.url) || 'globe'
                }
                this.modal.newSocial.url = ''
                this.modal.newSocial.id = this.modal.visible_edit = this.modal.visible = false
              }
            } else {
              
            }
          }).catch((error) => {
            
          })
        } else {
          this.$refs.modalForm.validate()
          return false;
        }
      },
      onSortSocialNetworks () {
        _.forEach(this.user.social_networks, (s, i) => s.order = i)
      },
      getIcon(url) {
        let _icon = 'globe';
        if (url.match(/(?:https?:\/\/)?(?:www\.)?(mbasic.facebook|m\.facebook|facebook|fb)\.(com|me)(?:\/)?(?:(?:\w\.)*#!\/)?(?:pages\/)?(?:[\w\-\.]*\/)*([\w\-\.]*)/)) {
          _icon = 'facebook'
        } else if (url.match(/http(?:s)?:\/\/(?:www\.)?twitter\.com\/([a-zA-Z0-9_]+)/)) {
          _icon = 'twitter'
        } else if (url.match(/(?:http|https):\/\/?(?:www\.|[a-z]{2,3}\.)?tiktok.com\/(?:v|embed|trending|h5|share)?(?:[@a-z])?(?:\/)?(?:\?shareId=)?/)) {
          _icon = 'tiktok'
        } else if (url.match(/(?:(?:http|https):\/\/)?(?:www.)?(?:instagram.com|instagr.am|instagr.com)\/(\w+)/)) {
          _icon = 'instagram'
        } else if (url.match(/^(?:http|https):\/\/?(?:www\.|[a-z]{2,3}\.)?linkedin\.com\/.*$/)) {
          _icon = 'linkedin'
        } else if (url.match(/^((?:https?:)?\/\/)?((?:www|m)\.)?((?:youtube(-nocookie)?\.com|youtu.be))(\/(?:[\w\-]+\?v=|embed\/|v\/)?)([\w\-]+)(\S+)?$/)) {
          _icon = 'youtube'
        } else if (url.match(/^(?:http|https):\/\/?(?:www\.)?paypal\.(com|me)(?:\/.+)?/)) {
          _icon = 'paypal'
        } else if (url.match(/(?:https?:\/\/)(?:www\.)?pinterest\.com\/(.+)\/?/)) {
          _icon = 'pinterest'
        } else if (url.match(/(http|https)?:\/\/(www\.|player\.)?vimeo\.com\/(?:channels\/(?:\w+\/)?|groups\/([^\/]*)\/videos\/|video\/|)(\d+)(?:|\/\?)/)) {
          _icon = 'vimeo'
        } else if (url.match(/^(?:http|https):\/\/?(?:www\.|[a-z]{2,3}\.)?tumblr\.com\/.*$/)) {
          _icon = 'tumblr'
        } else if (url.match(/^(?:(?:http|https):\/\/?(?:www\.|[a-z]{2,3}\.)?|(?:www\.|[a-z]{2,3}\.))?flickr\.com/)) {
          _icon = 'flickr'
        } else if (url.match(/(?:http?:\/\/|https?:\/\/)?(?:www\.)?dribbble\.com\/(?:\/*)([\w\-\.]*)/)) {
          _icon = 'dribbble'
        } else if (url.match(/^(?:(?:http|https):\/\/?(?:www\.|[a-z]{2,3}\.)?|(?:www\.|[a-z]{2,3}\.))?quora\.com/)) {
          _icon = 'quora'
        } else if (url.match(/^(?:(?:http|https):\/\/?(?:www\.|[a-z]{2,3}\.)?|(?:www\.|[a-z]{2,3}\.))?foursquare\.com/)) {
          _icon = 'foursquare'
        } else if (url.match(/^(?:(?:http|https):\/\/?(?:www\.|[a-z]{2,3}\.)?|(?:www\.|[a-z]{2,3}\.))?forrst\.com/)) {
          _icon = 'forrst'
        } else if (url.match(/^(?:(?:http|https):\/\/?(?:www\.|[a-z]{2,3}\.)?|(?:www\.|[a-z]{2,3}\.))?vk\.com/)) {
          _icon = 'vk'
        } else if (url.match(/^(?:(?:http|https):\/\/?(?:www\.|[a-z]{1,23}\.)?|(?:www\.|[a-z]{2,3}\.))?wordpress\.com/)) {
          _icon = 'wordpress'
        } else if (url.match(/^(?:(?:http|https):\/\/?(?:www\.|[a-z]{2,3}\.)?|(?:www\.|[a-z]{2,3}\.))?stumbleupon\.com/)) {
          _icon = 'stumbleupon'
        } else if (url.match(/^(?:(?:http|https):\/\/?(?:www\.|[a-z]{2,3}\.)?|(?:www\.|[a-z]{2,3}\.))?yahoo\.com/)) {
          _icon = 'yahoo'
        } else if (url.match(/^(?:(?:http|https):\/\/?(?:www\.|[a-z]{2,3}\.)?|(?:www\.|[a-z]{2,3}\.))?blogger\.com/)) {
          _icon = 'blogger'
        } else if (url.match(/^(?:(?:http|https):\/\/?(?:www\.|[a-z]{2,3}\.)?|(?:www\.|[a-z]{2,3}\.))?soundcloud\.com/)) {
          _icon = 'soundcloud'
        } else if (url.match(/^(?:(?:http|https):\/\/?(?:www\.|[a-z]{2,3}\.)?|(?:www\.|[a-z]{2,3}\.))?github\.com/)) {
          _icon = 'github'
        }
        return _icon
      },
      openEditSocialNework (record) {
        this.modal.visible_edit = true
        this.modal.newSocial.url = record.network_url
        this.modal.newSocial.id = record.id
      },
      deleteSocialNetwork (record, event) {
        this.$confirm({
          title: 'Esta seguro de eliminar este registro',
          content: record.network_url,
          okText: 'Aceptar',
          cancelText: 'Cancelar',
          onOk: (closeModal) => {
            let _tmp = [...this.user.social_networks]
            _.remove(_tmp, { id: record.id })
            this.user.social_networks = [..._tmp]
            closeModal()
          }
        });
      }
    },
    mounted() {
      
    }
  }
</script>
<style lang="scss">
  .profile-history-container {

    .ant-btn {
      &.save-button {
        width: 50px;
        position: fixed;
        bottom: 16px;
        height: 50px;
        font-size: 20px;
        right: 20px;
      }
      .anticon {
        vertical-align: initial;
      }
      &.ant-btn-primary {
        background-color: #54bd95;
        border-color: #54bd95;

        &:hover {
          background-color: #59a588;
          border-color: #59a588;
        }
      }
    }

    .profile-history-form {
      --border-color: #ececec;
      --border-color-hover: #40a9ff;
      --font-size: 13px;
      gap: 20px;
      .ant-form-item {
        display: flex;
        align-items: center;
        border-bottom: dashed 1px var(--border-color);
        padding-bottom: 10px;
        &:last-child {
          border-bottom: none;
        }

        @media only screen and (max-width: 750px) {
          flex-direction: column;
        }
      }
      .ant-form-item-label {
        line-height: 1;
        text-align: left;
        & > label {
          line-height: 1;
        }
        small.text-muted {
          margin-top: 2px;
          display: inline-block;
          margin-left: 2px;
          color: #959ba1 !important;
          white-space: normal;
          line-height: 15px;
        }
      }
      .has-feedback .ant-input-affix-wrapper .ant-input-suffix {
        padding-right: 0
      }
      
      .input-checkbox100 {
        display: none;
      }

      .label-checkbox100 {
        margin: 0;

        display: block;
        position: relative;
        padding-left: 26px;
        cursor: pointer;
      }

      .label-checkbox100 > span.check {
        font-size: 13px;
        color: transparent;

        display: -webkit-box;
        display: -webkit-flex;
        display: -moz-box;
        display: -ms-flexbox;
        display: flex;
        justify-content: center;
        align-items: center;
        position: absolute;
        width: 16px;
        height: 16px;
        border-radius: 2px;
        background: #e6e6e6;
        left: 0;
        top: 50%;
        -webkit-transform: translateY(-50%);
        -moz-transform: translateY(-50%);
        -ms-transform: translateY(-50%);
        -o-transform: translateY(-50%);
        transform: translateY(-50%);
      }

      .input-checkbox100:checked + .label-checkbox100 > span.check {
        color: #c87ef0;
      }
      .ant-collapse-header {
        .ant-collapse-arrow {
          display: none;
        }
      }
      .ant-collapse-content-box {
        label {
          line-height: 11px;
          margin: 0;
          padding: 0;
          display: block;
          height: auto;
        }
      }
      .bi {
        &.icon-twitter { 
          color: #00aced; 
          color: rgb(0, 172, 237);
        }
        &.icon-facebook { 
          color: #3b5998; 
          color: rgb(59, 89, 152);
        }
        &.icon-googleplus { 
          color: #dd4b39; 
          color: rgb(221, 75, 57); 
        }
        &.icon-rss { 
          color: #f26522; 
          color: rgb(242, 101, 34); 
        }
        &.icon-pinterest { 
          color: #cb2027; 
          color: rgb(203, 32, 39); 
        }
        &.icon-linkedin { 
          color: #007bb6; 
          color: rgb(0, 123, 182); 
        }
        &.icon-youtube { 
          color: #bb0000; 
          color: rgb(187, 0, 0); 
        }
        &.icon-vimeo { 
          color: #1ab7ea; 
          color: rgb(26, 183, 234); 
        }
        &.icon-tumblr { 
          color: #32506d; 
          color: rgb(50, 80, 109); 

          &::after {
            content: 't';
            font-style: normal;
            font-weight: bold;
          }
        }
        &.icon-instagram {
          color: #bc2a8d; 
          color: rgb(188, 42, 141); 
        }
        &.icon-flickr { 
          color: #ff0084; 
          color: rgb(255, 0, 132); 
        }
        &.icon-dribbble { 
          color: #ea4c89; 
          color: rgb(234, 76, 137); 
        }
        &.icon-quora { 
          color: #a82400; 
          color: rgb(168, 36, 0); 
        }
        &.icon-foursquare { 
          color: #0072b1; 
          color: rgb(0, 114, 177);
        }
        &.icon-forrst { 
          color: #5B9A68; 
          color: rgb(91, 154, 104); 
        }
        &.icon-vk { 
          color: #45668e; 
          color: rgb(69, 102, 142); 
        }
        &.icon-wordpress { 
          color: #21759b; 
          color: rgb(33, 117, 155); 
        }
        &.icon-stumbleupon { 
          color: #EB4823; 
          color: rgb(235, 72, 35); 
        }
        &.icon-yahoo { 
          color: #7B0099; 
          color: rgb(123, 0, 153); 
        }
        &.icon-blogger { 
          color: #fb8f3d; 
          color: rgb(251, 143, 61); 
        }
        &.icon-soundcloud { 
          color: #ff3a00; 
          color: rgb(255, 58, 0); 
        }
        &.icon-paypal { 
          color: #003087; 
          color: rgb(0, 48, 135);
        }
        &.icon-tiktok { 
          font-size: 15px;
          color: #f1f1f1;
          text-shadow: -1px -1px 1px #25f4ee, 1px 1px 1px #fe2c55;
          background-color: #000 !important;
          border-radius: 50% !important;
          width: 17px;
          height: 17px;
          display: inline-block;
          text-align: center;
          font-size: 10px;
          line-height: 17px;
          span {
            text-shadow: none;
          }
          .bg-success {
            background-color: #000 !important;
            border: solid 1px #28a745;
          }
        }
      }
      .list-group-disabled {
        opacity: 0.5;
        svg , i , a {
          cursor: text !important;
        }
      }
    }
  }
  .profile-history-modal {
    .ant-modal-header {
      padding: 16px;
    }
    .ant-modal-body {
      padding: 16px;
      .ant-form-item-label {
        line-height: 1;
      }
    }
  }
</style>