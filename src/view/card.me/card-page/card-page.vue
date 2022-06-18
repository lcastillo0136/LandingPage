<template>
  <main>
    <Card v-if="card">
      <template #title>
        <Icon type="ios-film-outline"></Icon>
        {{ card.full_name }}
      </template>
      <template #extra>
        <a href="#">
          <Icon type="ios-loop-strong"></Icon>
          Change
        </a>
      </template>
      <p class="rate-demo">
      </p>
    </Card>
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
    },
    methods: {
      ...mapMutations([
        'setHeaderVisible',
        'setFooterVisible',
        'hasToken',
        'getUser'
      ]),
    },
    mounted() {
      this.setHeaderVisible(false)
      this.setFooterVisible(false)

      if (this.$route.params && this.$route.params.uuid) {
        getCard(this.$route.params.uuid).then(({ data }) => data).then((result) => {
          this.card = { ... result.data }
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
    .ivu-card {
      width: 500px;
      max-width: 100%;
    } 

    @media only screen and (max-width: 450px) {
      padding-top: 0;
      .ivu-card {
        border-radius: 0;
        border: none;
      }
    }
  }
</style>
