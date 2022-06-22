<template>
  <main>
    <b-card
    :title="`${card.title||''} ${card.full_name}`"
    :sub-title="card.especialidad"
    :img-src="card.avatar"
    img-alt="Image"
    img-top
    tag="article"
    class="mb-2 shadow"
    v-if="card">
    <b-card-text>
      {{ card.biography }}
    </b-card-text>
    <div>
      <div class="caracteristica" v-if="card.bday && isValidBday">
        <div class="rounded-circle bg-success icon">
          <b-icon-calendar2-fill></b-icon-calendar2-fill>
        </div>
        <span>{{ card.bday | moment('DD/MM/YYYY') }}</span>
      </div>
      <div class="caracteristica" v-if="card.phone">
        <div class="rounded-circle bg-success icon">
          <b-icon-telephone-fill></b-icon-telephone-fill>
        </div>
        <span>
          <a :href="`https://wa.me/${card.phone}`" target="_blank">{{ card.phone | phone }}</a>
        </span>
      </div>
      <div class="caracteristica" v-if="card.email">
        <div class="rounded-circle bg-success icon">
          <b-icon-envelope-fill></b-icon-envelope-fill>
        </div>
        <span>
          <a :href="`mailto:${card.email}`">{{ card.email }}</a>
        </span>
      </div>
      <div class="caracteristica" v-for="(direccion) in card.addresses">
        <div class="rounded-circle bg-success icon">
          <b-icon-house></b-icon-house></div>
        <span>
          {{ direccion.alias }}
          <small>
            <a :href="'https://www.google.com/maps/search/?api=1&query='+direccion.latitude+','+direccion.longitude" target="_blank">
              {{ direccion.street }} {{ direccion.exterior_number }}, {{ direccion.suburb }} {{ direccion.township }}, {{ direccion.state }} {{ direccion.country }}
            </a>
          </small>
        </span>
      </div>
    </div>
    
      <div class="skills">
        <div class="skill " v-for="(skill) in card.skills">
          <b-badge pill variant="light">#{{ skill.name }}</b-badge>
        </div>
      </div>
    
    <div class="quote">{{ card.quote }}</div>

    <b-button href="#" variant="primary">Go somewhere</b-button>
  </b-card>
  </main>
</template>

<script>
  import { mapGetters, mapMutations, mapActions } from 'vuex'
  import { getCard } from '@/api/user'

  export default {
    name: 'CardPage',
    data() {
      return {
        card: null
      }
    },
    props: {
    },
    components: { 
    },
    computed: {
      isValidBday() {
        return this.$moment(this.card.bday).isValid()
      }
    },
    methods: {
      ...mapMutations([
        'hasToken',
        'getUser'
      ]),
    },
    mounted() {
      if (this.$route.params && this.$route.params.uuid) {
        getCard(this.$route.params.uuid).then(({ data }) => data).then((result) => {
          this.card = { ... result.data }
          document.title = this.card.full_name
        }).catch((err) => {
          
        })
      } else {
        this.$router.replace({ name: 'home' })
      }
    }
  }
</script>
<style lang="scss">
  main {
    display: flex;
    flex: 1 1 auto;
    justify-content: center;
    padding-top: 20px;
    .card {
      width: 20rem;
      max-width: 100%;
      border-radius: 20px;
      .caracteristica {
        display: flex;
        flex-direction: row;
        align-content: center;
        align-items: center;
        gap: 10px;
        padding: 10px 20px;
        border: dashed 1px #ededed;
        border-left: none;
        border-right: none;
        margin-left: -20px;
        margin-right: -20px;
        &+.caracteristica {
          border-top: none;
        }

        &:last-of-type {
          margin-bottom: 10px;
        }
        .icon {
          width: 35px;
          height: 35px;
          color: #fff;
          text-align: center;
          line-height: 35px;
          flex: 0 0 auto;
        }
        span {
          font-size: 14px;
          display: flex;
          flex-direction: column;
          small {
            color: var(--gray);
          }
        }
        a { color: inherit; }
      }
      .skills {
        display: flex;
        flex-direction: row;
        margin-bottom: 10px;
        align-content: center;
        justify-content: flex-start;
        align-items: center;
        gap: 5px;
        overflow-x: auto;
        padding: 5px 0 10px;
        flex-wrap: wrap;

        &::-webkit-scrollbar-track {
          -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.1);
          background-color: #F5F5F5;
          border-radius: 10px;
        }

        &::-webkit-scrollbar {
          width: 6px;
          background-color: #F5F5F5;
          height: 6px;
          visibility: hidden;
        }

        &:hover{
          &::-webkit-scrollbar {
            visibility: visible;
          }
        }

        &::-webkit-scrollbar-thumb {
          border-radius: 10px;
          -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.1);
          background-color: #9e9e9e;
        }

        .skill {
        }
      }
      .quote {
        padding-bottom: 10px;
        font-size: 12px;
        color: var(--gray);
        font-style: italic;
        text-align: center;
      }
    } 

    @media only screen and (max-width: 450px) {
      padding-top: 0;
      .card {
        width: 100%;
        border-radius: 0;
        border: none;
      }
    }
  }
</style>
