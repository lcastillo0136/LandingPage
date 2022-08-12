<template>
  <div class="box_general_2 reviews-container mt-3 mt-lg-0">
    <h4>Reseñas</h4>

    <a-list item-layout="vertical" size="large" :data-source="reviews" :split="false">
      <a-list-item slot="renderItem" key="item.id" slot-scope="item, index" :class="{ 'disabled': item.banned }">
        <template slot="actions">
          <a-tooltip title="Responder">
            <a-button size="small" type="primary" style="transform: rotateY(180deg);" @click="openForm(item)">
              <span class="arrow_back"></span>
            </a-button>
          </a-tooltip>
          <span @click="toggleReview(item)">
            <a-tooltip title="Ocultar" v-if="!item.banned">
              <a-icon type="eye" />
            </a-tooltip>
            <a-tooltip title="Mostrar" v-else>
              <a-icon type="eye-invisible" />
            </a-tooltip>
          </span>
          <span @click="openForm(item)"><a-icon type="message" style="margin-right: 8px" />{{ item.replies.length }}</span>
        </template>
        <template slot="extra">
          <a-rate :value="item.rate" disabled></a-rate>
        </template>
        <a-list-item-meta>
          <span slot="description">
            {{ item.created_at | moment("from", "now") }}
          </span>
          <a slot="title">{{ getFullName(item.from) }}</a>
          <a-avatar slot="avatar" :src="item.from.avatar" />
        </a-list-item-meta>
        {{ item.message }}
      </a-list-item>
    </a-list>
    <a-modal :visible="!!selectedComment" :width="900" @cancel="handleCancel" :footer="null">
      <template v-if="selectedComment">
        <div slot="title">Respuestas</div>
        <a-list item-layout="vertical" size="large" :data-source="selectedComment.replies" :split="false">
          <a-list-item slot="renderItem" key="item.id" slot-scope="item, index">
            <a-list-item-meta>
              <span slot="description">
                <a-tooltip>
                  <span slot="title">{{ item.created_at | moment("dddd, MMM YYYY hh:mm a") }}</span>
                  {{ item.created_at | moment("from", "now") }}
                </a-tooltip>
              </span>
              <a slot="title">{{ getFullName(item.from) }}</a>
              <a-avatar slot="avatar" :src="item.from.avatar" />
            </a-list-item-meta>
            {{ item.message }}
          </a-list-item>
        </a-list>

        <a-form-model ref="replyForm" :model="reply" :rules="rules" v-if="selectedComment" class="mt-4">
          <div class="row">
            <div class="col-md-12">
              <div class="form-group">
                <label class="mb-0">Comentario</label>
                <a-form-model-item prop="message">
                   <a-textarea v-model="reply.message" :rows="4" />
                </a-form-model-item>
              </div>
            </div>
          </div>
          <div class="text-right">
            <a-button @click="handleCancel" class="mr-2">
              Cerrar
            </a-button>
            <a-button type="primary" @click="publishResponse" :loading="reply.loading">
              Publicar
            </a-button>
          </div>
        </a-form-model>

      </template>
    </a-modal>
  </div>
</template>
<script>
  import { postReply, updateReview } from '@/api/user'

  import { mapGetters } from 'vuex'

  export default {
    data() {
      return {
        selectedComment: null,
        reply: {
          message: '',
          loading: false
        },
        rules: {
          message: [{ validator: (rule, value, callback) => {
            if ((value === '' || !value)) {
              callback(new Error('Favor de no dejar este campo vacío'));
            } else {
              callback();
            }
          }, trigger: 'change' }],
        },
      };
    },
    components: {
    },
    name: 'ProfileReviews',
    watch: {
    },
    filters: {
    },
    computed: {
      ...mapGetters([
        'hasToken',
        'settings',
        'getUser'
      ]),
      reviews() {
        return this.getUser.comments
      }
    },
    methods: {
      getFullName: function(user) {
        return `${user.title || ''} ${user.first_name || ''} ${user.last_name || ''}`
      },
      openForm(item) {
        this.selectedComment = { ...item }
      },
      handleCancel() {
        this.selectedComment = null
        this.reply.message = ''
        this.reply.loading = false
      },
      publishResponse() {
        this.reply.loading = true;
        this.$refs.replyForm.validate().then(valid => {
          if (valid) {
            if (!this.selectedComment.replies) this.selectedComment.replies = []

            postReply({
              message: this.reply.message,
              from_id: this.getUser.id,
              reply_id: this.selectedComment.id
            }, this.hasToken).then((response) => {
              
              this.$notification.success({
                message: 'Datos Guardados',
                description: 'La respuesta ha sido enviada'
              });
            
              this.selectedComment.replies.unshift({ ...response.data.data })

              this.reply.message = ''
              this.reply.loading = false
              // this.handleCancel()
            }).catch((error) => {
              this.reply.loading = false

              this.$notification.error({
                message: 'Datos no guardados',
                description: 'La misma respuesta ya ha sido enviada'
              });
            })

          } else {
            this.reply.loading = false
          }
        }).catch(() => {
          this.reply.loading = false
        })
      },
      toggleReview(review) {
        updateReview({ 
          ...review,
          ...{
            banned: !review.banned
          }
        }, this.hasToken).then(() => {
          review.banned = !review.banned
          this.$notification.success({
            message: 'Datos Actualizados',
            description: 'La reseña ha sido ' + (review.banned ? 'ocultada' : 'mostrada')
          })
        }).catch(() => {

        })
      }
    },
    mounted() {
    }
  }
</script>
<style lang="scss">
  .reviews-container {
    .ant-card-body {
      padding: 16px;
    }

    .ant-list-item {
      padding: 16px;
      border: 1px solid #e8e8e8 !important;
      border-radius: 5px;
      position: relative;
      margin-bottom: 16px;

      .ant-list-item-meta-title {
        margin-bottom: 0;
      }

      .ant-list-item-extra {
        position: absolute;
        right: 15px;
        top: 15px;
      }
      .ant-list-item-main {
        overflow-wrap: anywhere;
      }
      &.disabled {
        opacity: 0.4;
      }
    }

    @media (max-width: 426px) {
      &.box_general_2, .box_general_2 {
        padding: 16px;
      }

      .ant-list-item {
        .ant-list-item-meta-title {
          
        }

        .ant-list-item-extra {
          position: relative;
          top: inherit;
          right: inherit;
          margin: 0;
        }
      }
    }
  }

  .ant-modal {
    max-width: 95%;
    .ant-modal-body {
      .ant-list-item {
        padding: 10px 15px;
        border: 1px solid #e8e8e8 !important;
        border-radius: 5px;
        display: flex;
        flex-direction: row-reverse;
        align-items: center;
        font-style: italic;
        margin-bottom: 10px;

        &::after {
          display: none;
        }

        .ant-list-item-meta {
          flex: 0 0 auto;
          margin-bottom: 0px;
          margin-left: 6px;
          font-style: normal;

          .ant-list-item-meta-content {
            
          }
        }

        .ant-list-item-meta-title {
          margin-bottom: 0;
          font-size: 12px;
        }
        
        .ant-list-item-meta-description {
          font-size: 12px;
          line-height: 5px;
        }

        .ant-list-item-extra {
          position: absolute;
          right: 15px;
          top: 15px;
        }
      }
    }
  }
</style>