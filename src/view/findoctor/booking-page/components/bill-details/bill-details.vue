<template>
  <div class="step">
    <div class="row">
      <div class="col-md-6 col-sm-6">
        <label>País</label>
        <div class="form-group">
          <select class="form-control" v-model="bill.country">
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
          <input type="text" class="form-control" placeholder="" v-model="bill.street">
        </div>
      </div>
      <div class="col-md-6 col-sm-6">
        <div class="form-group">
          <label>Entre calles</label>
          <input type="text" class="form-control" placeholder="" v-model="bill.street2">
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col-md-6">
        <div class="form-group">
          <label>Ciudad</label>
          <input type="text" class="form-control" placeholder="" v-model="bill.city">
        </div>
      </div>
      <div class="col-md-3">
        <div class="form-group">
          <label>Estado</label>
          <input type="text" class="form-control" placeholder="Florida" v-model="bill.state">
        </div>
      </div>
      <div class="col-md-3">
        <div class="form-group">
          <label>Código postal</label>
          <input type="text" class="form-control" placeholder="00342" v-model="bill.cp">
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
      }
    },
    data () {
      return {
        cardAlt: '',
        expirationAlt: ''
      }
    }
  }
</script>