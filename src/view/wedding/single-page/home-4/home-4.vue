<template>
  <main>
    <FindForm :version="2"></FindForm>
    <Discover></Discover>
    <Carousel></Carousel>
    <Specialization></Specialization>
    <MultiRegister></MultiRegister>
  </main>
  <!-- /main content -->
</template>
<script>
import FindForm from '../home/components/find-form'
import Discover from '../home/components/discover'
import Carousel from '../home/components/carousel'
import Specialization from '../home/components/find-specialization'
import MultiRegister from '../home/components/multi-register'

export default {
  props: {
  },
  components: { 
    FindForm,
    Discover,
    Carousel,
    Specialization,
    MultiRegister
  }
}
</script>