<template>
  <div class="hero_home" :class="classVersion">
    <div class="content">
      <h3 :class="classOnload">¡ENCUENTRE UN MÉDICO!</h3>
      <p :class="classOnload">
        Puedes realizar búsquedas por nombre, ubicación o especialidad.
      </p>
      <form method="post" action="/findoctor/list.html" :class="classOnload">
        <div id="custom-search-input">
          <div class="input-group">
            <input type="text" class=" search-query" placeholder="Ej. Nombre, Especialización ...." v-model="form.search">
            <input type="submit" class="btn_search" value="Buscar" @click.stop.prevent="handleSearch">
          </div>
          <ul>
            <li v-for="(type, type_i) in types" :key="type_i">
              <input type="radio" :id="'search_type_' + type_i" name="radio_search" :value="type.value" v-model="form.type">
              <label :for="'search_type_' + type_i">{{ type.text }}</label>
            </li>
          </ul>
        </div>
      </form>
    </div>
  </div>
</template>
<script>
  import { mapGetters } from 'vuex'
  export default {
    name: 'FindForm',
    props: {
      version: {
        type: Number,
        default: 1
      }
    },
    data () {
      return {
        form: {
          search: '',
          type: 'all'
        }
      }
    },
    computed: {
      classOnload () {
        return {
          'fadeInUp animated': !this.stillLoading
        }
      },
      classVersion () {
        return ['version_' + this.version]
      },
      ...mapGetters({
        stillLoading: 'stillLoading',
        types: 'filterTypes'
      })
    },
    methods: {
      handleSearch () {
        this.$router.push({ 
          name: 'list-page', 
          params: {
            search: this.form.search,
            type: this.form.type
          }
        }, () => {
          this.$emit('onSearch', this.form)
        })
      }
    }
  }
</script>