<template>
  <div class="step">
    <div class="row">
      <div class="col-md-6 col-sm-6">
        <label>País</label>
        <div class="form-group">
          <select class="form-control" v-model="bill.country" :disabled="loading">
            <option value="">Selecciona tu pais</option>
            <option value="México">México</option>
            <option value="United states">United states</option>
          </select>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col-md-6 col-sm-6">
        <div class="form-group">
          <label>Calle y número</label>
          <input type="text" class="form-control" placeholder="" v-model="bill.street" :disabled="loading">
        </div>
      </div>
      <div class="col-md-6 col-sm-6">
        <div class="form-group">
          <label>Entre calles</label>
          <input type="text" class="form-control" placeholder="" v-model="bill.street2" :disabled="loading">
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col-md-6">
        <div class="form-group">
          <label>Ciudad</label>
          <input type="text" class="form-control" placeholder="" v-model="bill.city" :disabled="loading">
        </div>
      </div>
      <div class="col-md-3">
        <div class="form-group">
          <label>Estado</label>
          <input type="text" class="form-control" placeholder="" v-model="bill.state" :disabled="loading">
        </div>
      </div>
      <div class="col-md-3">
        <div class="form-group">
          <label>Código postal</label>
          <input type="text" class="form-control" placeholder="66000" v-model="bill.cp" :disabled="loading">
        </div>
      </div>
    </div>
    <!--End row -->
  </div>
</template>
<script>
  export default {
    name: 'BillDetails',
    model: {
      prop: 'bill',
      event: 'change'
    },
    props: {
      bill: {
        type: Object,
        default: function () {
          return {
            country: '',
            state: '',
            city: '',
            cp: '',
            street: '',
            street2: ''
          }
        }
      },
      loading: Boolean
    },
    data () {
      return {
        cardAlt: '',
        expirationAlt: ''
      }
    }
  }
</script>