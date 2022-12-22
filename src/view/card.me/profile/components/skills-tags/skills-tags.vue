<template>
  <div class="form-row mx-3 p-2 mb-4 skills-tags border">
    <template v-for="(tag, index) in user.skills">
      <a-tooltip v-if="tag.name.length > 20" :key="tag.name" :title="tag.name">
        <a-tag :key="tag.name" :closable="!saving" @close="() => !saving && handleClose(tag.name)">
          {{ `${tag.name.slice(0, 20)}...` }}
        </a-tag>
      </a-tooltip>
      <a-tag v-else :key="tag.name" :closable="!saving" @close="() => !saving && handleClose(tag.name)">
        {{ tag.name }}
      </a-tag>
    </template>
    <a-input
      v-if="!saving && inputVisible"
      v-model="inputValue"
      ref="input"
      type="text"
      size="small"
      :style="{ width: '78px' }"
      @blur="handleInputConfirm"
      @keyup.enter="handleInputConfirm"
    />
    <a-tag v-else-if="!saving" style="background: #fff; borderStyle: dashed;" @click="showInput">
      <a-icon type="plus" /> New Tag
    </a-tag>
  </div>
</template>
<script>
  import * as _ from 'lodash'
  export default {
    name: 'SkillsTags',
    props: {
      user: {
        type: Object,
        default: function () {
          return { }
        }
      },
      saving: {
        type: Boolean,
        default: false
      }
    },
    data () {
      return {
        inputVisible: false,
        inputValue: '',
      }
    },
    methods: {
      handleClose(removedTag) {
        _.remove(this.user.skills, { name: removedTag })
      },
      handleInputChange(e) {
        this.inputValue = e.target.value
      },
      handleInputConfirm() {
        let tags = this.user.skills.map(s => s.name)
        if (this.inputValue && !_.find(this.user.skills, (s) => (s.name || '').toLowerCase() === (this.inputValue || '').toLowerCase())) {
          this.user.skills.push({
            active: 1,
            description: null,
            name: this.inputValue,
            user_id: this.user.id,
            value: 0
          })
        } else if (this.inputValue) {
          let _tmp = this.inputValue
          this.$notification.warning({
            message: 'No se pudo agregar la habilidad',
            description: h => {
              return h(
                'span',
                [
                  'Ya se encuentra registrada la habilidad ',
                  h('b', [ _tmp ])
                ]
              );
            }
          })
        }
        if (this.inputValue) {
          this.inputVisible = false
          this.inputValue = ''
          this.showInput()
        } else {
          this.inputVisible = false
          this.inputValue = ''
        }
      },
      showInput() {
        this.inputVisible = true
        this.$nextTick(function() {
          this.$refs.input.focus()
        });
      },
    }
  }
</script>
<style lang="scss">
  .skills-tags {
    border-style: dashed !important;
    .ant-tag {
      margin-bottom: 3px;
    }
  }
</style>