<template>
  <div class="step">
    <div class="row">
      <div class="col-md-6 col-sm-6">
        <label>Country</label>
        <div class="form-group">
          <select class="form-control" v-model="bill.country">
            <option value="">Select your country</option>
            <option value="Europe">Europe</option>
            <option value="United states">United states</option>
            <option value="México">México</option>
            <option value="Asia">Asia</option>
          </select>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col-md-6 col-sm-6">
        <div class="form-group">
          <label>Street line 1</label>
          <input type="text" class="form-control" placeholder="Street line 1" v-model="bill.street">
        </div>
      </div>
      <div class="col-md-6 col-sm-6">
        <div class="form-group">
          <label>Street line 2</label>
          <input type="text" class="form-control" placeholder="Street line 1" v-model="bill.street2">
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col-md-6">
        <div class="form-group">
          <label>City</label>
          <input type="text" class="form-control" placeholder="Miami" v-model="bill.city">
        </div>
      </div>
      <div class="col-md-3">
        <div class="form-group">
          <label>State</label>
          <input type="text" class="form-control" placeholder="Florida" v-model="bill.state">
        </div>
      </div>
      <div class="col-md-3">
        <div class="form-group">
          <label>Postal code</label>
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