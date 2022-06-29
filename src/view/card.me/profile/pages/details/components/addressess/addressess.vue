<template>
  <div class="box_general_2 add_bottom_45">
    <h4>
      Direcciones
      <a-button class="ml-2 align-middle" type="dashed" icon="plus" @click="chooseElement({})">
        Agregar
      </a-button>
    </h4>
    <div class="d-flex card-columns flex-wrap">
      <template v-for="address in profile.addresses">
        <a-card hoverable class="card address-card">
          <template class="ant-card-actions" #actions>
            <b-icon-heart-fill variant="danger" v-if="address.favorite" @click="chooseFav(address)"></b-icon-heart-fill>
            <b-icon-heart v-else @click="chooseFav(address)"></b-icon-heart>
            <b-icon-pencil @click="chooseElement(address)"></b-icon-pencil>
          </template>
          <a-card-meta :title="address.alias" :description="`${address.street} #${address.exterior_number}, ${address.suburb}, ${address.township}, ${address.state}, ${address.country}, ${address.postal_code}`" @click="chooseElement(address)">              
          </a-card-meta>
        </a-card>
      </template>
    </div>
    <template v-if="selectedElement">
      <a-divider/>
      <div class="form-update-address">
        <div class="row">
          <div class="col-md-4 col-sm-4">
            <a-form-model-item prop="alias" label="Nombre">
              <a-input v-model="selectedElement.alias" />
            </a-form-model-item>
          </div>
          <div class="col-md-4 col-sm-4">
              <a-form-model-item prop="street" label="Calle">
                <a-input v-model="selectedElement.street" autocomplete="chrome-off" />
              </a-form-model-item>
          </div>
          <div class="col-md-4 col-sm-4">
            <a-form-model-item prop="exterior_number" label="Numero">
              <a-input type="text" v-model="selectedElement.exterior_number" />
            </a-form-model-item>
          </div>
        </div>
        <div class="row">
          <div class="col-md-4 col-sm-4">
            <a-form-model-item prop="suburb" label="Colonia">
              <a-input v-model="selectedElement.suburb" />
            </a-form-model-item>
          </div>
          <div class="col-md-4 col-sm-4">
            <a-form-model-item prop="township" label="Municipio">
              <a-input v-model="selectedElement.township" />
            </a-form-model-item>
          </div>
          <div class="col-md-4 col-sm-4">
            <a-form-model-item prop="state" label="Estado">
              <a-input v-model="selectedElement.state" />
            </a-form-model-item>
          </div>
        </div>
        <div class="row">
          <div class="col-md-4 col-sm-4">
            <a-form-model-item prop="country" label="Pais">
              <a-input v-model="selectedElement.country" />
            </a-form-model-item>
          </div>
          <div class="col-md-4 col-sm-4">
            <a-form-model-item prop="postal_code" label="Codigo Postal">
              <a-input v-model="selectedElement.postal_code" />
            </a-form-model-item>
          </div>

          <div class="col-md-4 col-sm-4">
            <a-form-model-item prop="favorite" label="Favorito">
              <a-switch v-model="selectedElement.favorite" size="small" />
            </a-form-model-item>
          </div>
        </div>
        <div class="row">
          <div class="col-md-12 col-sm-12" style="text-align: right;">
            <a-popconfirm title="¿Estás seguro de eliminar?" @confirm="() => onDelete(selectedElement.id)" v-if="selectedElement.id">
              <a-button type="danger" class="mr-2">Borrar</a-button>
            </a-popconfirm>
            <a-button type="primary" class="mr-2" @click="addOrSaveAddress()">Guardar</a-button>
            <a-button type="secondary" @click="cancelEdit">Cancelar</a-button>
          </div>
        </div>
      </div>
    </template>
  </div>
</template>
<script>
  import _ from 'lodash'
  export default {
    name: 'Addressess',
    props: {
      profile: Object
    },
    data() {
      return {
        selectedElement: null,
        oldVersionElement: null
      }
    },
    methods: {
      chooseFav(address) {
        this.profile.addresses.forEach(a => a.favorite = false)
        address.favorite = true;
      },
      chooseElement(address) {
        if (this.oldVersionElement && this.selectedElement) {
          this.cancelEdit()
        }

        address.favorite = !!address.favorite

        this.oldVersionElement = {
          ...address
        }
        this.selectedElement = address
      },
      cancelEdit() {
        this.selectedElement.alias = this.oldVersionElement.alias
        this.selectedElement.city = this.oldVersionElement.city
        this.selectedElement.country = this.oldVersionElement.country
        this.selectedElement.directions = this.oldVersionElement.directions
        this.selectedElement.exterior_number = this.oldVersionElement.exterior_number
        this.selectedElement.favorite = this.oldVersionElement.favorite
        
        this.selectedElement.interior_number = this.oldVersionElement.interior_number
        this.selectedElement.latitude = this.oldVersionElement.latitude
        this.selectedElement.longitude = this.oldVersionElement.longitude
        this.selectedElement.postal_code = this.oldVersionElement.postal_code
        this.selectedElement.state = this.oldVersionElement.state
        this.selectedElement.street = this.oldVersionElement.street
        this.selectedElement.suburb = this.oldVersionElement.suburb
        this.selectedElement.township = this.oldVersionElement.township

        this.selectedElement = null
        this.oldVersionElement = null
      },
      addOrSaveAddress() {
        if (this.oldVersionElement && this.selectedElement) {
          if (this.selectedElement.favorite) {
            this.chooseFav(this.selectedElement)
          }
          if (this.selectedElement.id) {
            
          } else {
            this.profile.addresses.push({
              alias: this.selectedElement.alias,
              city: this.selectedElement.city,
              country: this.selectedElement.country,
              directions: this.selectedElement.directions,
              exterior_number: this.selectedElement.exterior_number,
              favorite: this.selectedElement.favorite,
              interior_number: this.selectedElement.interior_number,
              latitude: this.selectedElement.latitude,
              longitude: this.selectedElement.longitude,
              postal_code: this.selectedElement.postal_code,
              state: this.selectedElement.state,
              street: this.selectedElement.street,
              suburb: this.selectedElement.suburb,
              township: this.selectedElement.township,
              user_id: this.profile.id,
              id: Math.min((_.minBy(this.profile.addresses, 'id') ? _.minBy(this.profile.addresses, 'id').id : 0) - 1, -1)
            })
          }


          this.selectedElement = null
          this.oldVersionElement = null
        }
      },
      onDelete(address_id) {
        this.selectedElement = null
        this.oldVersionElement = null
        _.remove(this.profile.addresses, { id: address_id })
      }
    },
    mounted() {

    }
  }
</script>
<style lang="scss">
  .form-update-address {
    border: solid 1px #ededed;
    padding: 16px;
    border-radius: 3px;
    background: #fcfcfc;
    .ant-form-item-label {
      line-height: 1
    }
  }
  .address-card.card {
    width: 30%
  }
</style>