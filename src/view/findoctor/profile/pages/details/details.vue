<template>
  <div v-if="profile">
    <div class="box_general_2 add_bottom_45">
      <h4>Datos personales</h4>
      <div class="row">
        <div class="col-md-3 col-sm-12">
          <div class="form-group">
            <label>Titulo</label>
            <select v-model="profile.title" class="form-control" >
              <option value="">&nbsp;</option>
              <option value="Dr.">
                Dr. (Doctor)
              </option>
              <option value="Esq.">
                Esq. (Esquire)
              </option>
              <option value="Hon.">
                Hon. (Honorable)
              </option>
              <option value="Jr.">
                Jr. (Junior)
              </option>
              <option value="Mr.">
                Mr.
              </option>
              <option value="Mrs.">
                Mrs.
              </option>
              <option value="Ms.">
                Ms.
              </option>
              <option value="Msgr.">
                Msgr. (Monsignor)
              </option>
              <option value="Prof.">
                Prof. (Professor)
              </option>
              <option value="Rev.">
                Rev. (Reverend)
              </option>
              <option value="Rt. Hon.">
                Rt. Hon. (Right Honorable)
              </option>
              <option value="Sr.">
                Sr. (Senior)
              </option>
              <option value="St.">
                St. (Saint)
              </option>
            </select>
          </div>
        </div>
        <div class="col-md-5 col-sm-6">
          <div class="form-group">
            <label>Nombre(s)</label>
            <input type="text" class="form-control" placeholder="Tu nombre" v-model="profile.first_name" autocomplete="chrome-off">
          </div>
        </div>
        <div class="col-md-4 col-sm-6">
          <div class="form-group">
            <label>Apellido(s)</label>
            <input type="text" class="form-control" placeholder="Tu apelido" v-model="profile.last_name" autocomplete="chrome-off">
          </div>
        </div>
      </div>

      <div class="row">
        <div class="col-md-3 col-sm-6">
          <div class="form-group">
            <label>Telefono</label>
            <input type="text" class="form-control" placeholder="Tel." v-model="profile.phone" autocomplete="chrome-off">
          </div>
        </div>
        <div class="col-md-5 col-sm-6">
          <div class="form-group">
            <label>Correo electronico</label>
            <input type="text" class="form-control" placeholder="Correo electronico" v-model="profile.email" autocomplete="chrome-off">
          </div>
        </div>
        <div class="col-md-4 col-sm-6">
          <div class="form-group">
            <label>Fecha nacimiento</label>
            <a-date-picker v-model="profile.bday" size="large" />
          </div>
        </div>
      </div>

      <div class="row">
        <div class="col-md-3">
          <div class="form-group">
            <label>Genero</label>
            <select v-model="profile.gender" class="form-control">
              <option value="">&nbsp;</option>
              <option value="male">
                Masculino
              </option>
              <option value="female">
                Femenino
              </option>
              <option value="other">
                Otro
              </option>
              <option value="not_sure">
                No estoy seguro
              </option>
              <option value="rather_not_say">
                Prefiero no decir
              </option>
            </select>
          </div>
        </div>
      </div>
    </div>
    <div class="box_general_2 add_bottom_45">
      <h4>Informacion profesional</h4>

      <div class="row">
        <div class="col-md-6 col-sm-6">
          <div class="form-group">
            <label>Cedula Profesional</label>
            <input type="text" class="form-control" placeholder="----------" v-model="profile.cedula_profesional" autocomplete="chrome-off">
          </div>
        </div>
        <div class="col-md-6 col-sm-6">
          <div class="form-group">
            <label>Especialidad</label>
            <input type="text" class="form-control" placeholder="Correo electronico" v-model="profile.especialidad" autocomplete="chrome-off">
          </div>
        </div>
      </div>

      <div>
        <label>Habilidades</label>
        <br>
        <template v-for="(tag, index) in profile.skills">
          <a-tooltip v-if="tag.name.length > 20" :key="tag.name" :title="tag.name">
            <a-tag :key="tag.name" :closable="true" @close="() => handleClose(tag.name)">
              {{ `${tag.name.slice(0, 20)}...` }}
            </a-tag>
          </a-tooltip>
          <a-tag v-else :key="tag.name" :closable="true" @close="() => handleClose(tag.name)">
            {{ tag.name }}
          </a-tag>
        </template>
        <a-input
          v-if="inputVisible"
          ref="input"
          type="text"
          size="small"
          :style="{ width: '78px' }"
          :value="inputValue"
          @change="handleInputChange"
          @blur="handleInputConfirm"
          @keyup.enter="handleInputConfirm"
        />
        <a-tag v-else style="background: #fff; borderStyle: dashed;" @click="showInput">
          <a-icon type="plus" /> New Tag
        </a-tag>
      </div>

    </div>
    <div class="box_general_2 add_bottom_45">
      <h4>Informacion adicional</h4>
      <div class="form-group">
        <label>Cita</label>
        <input type="text" class="form-control" placeholder="Frase que te describa" v-model="profile.quote" autocomplete="chrome-off">
      </div>
      <div class="form-group">
        <label>Biografia</label>
        <a-textarea :autoSize="true" class="form-control" placeholder="Biografia" v-model="profile.biography" />
      </div>
    </div>
  </div>
</template>
<script>
  import { mapGetters, mapMutations } from 'vuex'

  export default {
    name: 'ProfileDetails',
    props: {
      user: {
        type: Object,
        default: function () {
          return { }
        }
      }
    },
    components: {
    },
    data () {
      return {
        inputVisible: false,
        inputValue: '',
      }
    },
    watch: {
    },
    computed: {
      ...mapGetters([
        'hasToken',
        'settings',
      ]),
      profile: {
        get() {
          return this.user
        },
        set() {
          
        }
      }
    },
    methods: {
      ...mapMutations([
        'setUserEdited'
      ]),
      handleClose(removedTag) {
        const tags = this.profile.skills.filter(tag => tag.name !== removedTag)
        this.profile.skills = tags
        this.setUserEdited(true)
      },

      showInput() {
        this.inputVisible = true
        this.$nextTick(function() {
          this.$refs.input.focus()
        });
      },

      handleInputChange(e) {
        this.inputValue = e.target.value
      },

      handleInputConfirm() {
        const inputValue = this.inputValue
        let tags = this.profile.skills.map(s => s.name)
        if (inputValue && tags.indexOf(inputValue) === -1) {
          this.profile.skills.push({
            active: 1,
            description: null,
            name: inputValue,
            user_id: this.profile.id,
            value: 0
          })
        }
        Object.assign(this, {
          inputVisible: false,
          inputValue: '',
        })
      },
    },
    mounted() {
    }
  }
</script>
<style lang="scss">
  .ant-calendar-picker {
    width: 100%;
    .ant-input {
      border-color: #e1e8ed;
    }
  }
</style>