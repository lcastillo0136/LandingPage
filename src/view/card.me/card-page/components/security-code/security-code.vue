<template>
  <div class="fields-code mt-5">
    <div>
      <a-input type="number" placeholder="0" v-model="defaultcode.digit1" :min="0" :max="9" @input="handleInput" @keypress="isNumber" @keydown.delete="handleDelete" @paste="onPaste" :disabled="valid" />
    </div>
    <div>
      <a-input type="number" placeholder="0" v-model="defaultcode.digit2" :min="0" :max="9" @input="handleInput" @keypress="isNumber" @keydown.delete="handleDelete" @paste="onPaste" :disabled="valid" />
    </div>
    <div>
      <a-input type="number" placeholder="0" v-model="defaultcode.digit3" :min="0" :max="9" @input="handleInput" @keypress="isNumber" @keydown.delete="handleDelete" @paste="onPaste" :disabled="valid" />
    </div>
    <div>
      <a-input type="number" placeholder="0" v-model="defaultcode.digit4" :min="0" :max="9" @input="handleInput" @keypress="isNumber" @keydown.delete="handleDelete" @paste="onPaste" :disabled="valid" />
    </div>
  </div>
</template>
<script>
  const keysAllowed = ["0","1","2","3","4","5","6","7","8","9",];
  
  export default {
    name: 'SecurityCode',
    props: {
      code: {
        type: String,
        default: ''
      },
      valid: {
        type: Boolean,
        default: false
      }
    },
    data() {
      return {
        defaultcode: {
          digit1: '',
          digit2: '',
          digit3: '',
          digit4: ''
        },
        dataFromPaste: ''
      }
    },
    computed: {
      fullCode() {
        return `${this.defaultcode.digit1}${this.defaultcode.digit2}${this.defaultcode.digit3}${this.defaultcode.digit4}`.trim().replace(/[^\d]/g,'')
      }
    },  
    methods: {
      isNumber(event) {
        if (event.currentTarget.value.length > 0) event.preventDefault();
      },
      handleDelete(event) {
      },
      onPaste(event) {
        this.dataFromPaste = event.clipboardData.getData("text").trim().replace(/[^\d]/g,'').split("");
      },
      handleInput(event) {
        const inputType = event.inputType;
        let currentActiveElement = event.target;
        
        if (inputType === "insertText" && currentActiveElement.value.length == 1) {
          if (currentActiveElement.parentElement.nextElementSibling) {
            currentActiveElement.parentElement.nextElementSibling.querySelector('input').focus();
          }
        }

        if (inputType === "deleteContentBackward" && currentActiveElement.value.length == 0) {
          if (currentActiveElement.parentElement.previousElementSibling) {
            currentActiveElement.parentElement.previousElementSibling.querySelector('input').focus();
          }
        }

        if (inputType === "insertFromPaste" && currentActiveElement.value.length > 1) {
          let valueSplit = () => {
            let n = this.dataFromPaste;
            let currentIndex = 0;
            return {
              next: function() {
                const _index = currentIndex++
                return { value: n[_index] || '', done: !n[_index] };
              }
            };
          }

          let _iterator = valueSplit()

          for (const _field of Object.keys(this.defaultcode)) {
            let _r = _iterator.next()
            if(_r.done === false)
              this.defaultcode[_field] = _r.value
          }
        }

        if (this.fullCode.length === 4) {
          this.validateCode()
        }       
      },
      validateCode() {
        this.$emit('done', this.fullCode)
      }
    }
  }
</script>
<style lang="scss">
  .fields-code {
    display: flex;
    gap: 15px;
    justify-content: center;
    flex-wrap: wrap;
    > div {
      width: 60px;
      height: 90px;
      .ant-input {
        display: block;
        height: 100%;
        font-size: 46px;
        color: #0489ff;
        border-color: #0489ff;
        border-width: 2px;
        border-right-width: 2px !important;
        border-radius: 15px;
        text-align: center;

        /* Chrome, Safari, Edge, Opera */
        &::-webkit-outer-spin-button,
        &::-webkit-inner-spin-button {
          -webkit-appearance: none;
          margin: 0;
        }

        /* Firefox */
        &[type=number] {
          -moz-appearance: textfield;
        }

        &[disabled] {
          border-color: #d9d9d9;
          color: #d9d9d9;
          border-right-width: 2px !important;
        }
      }
    }
  }
</style>