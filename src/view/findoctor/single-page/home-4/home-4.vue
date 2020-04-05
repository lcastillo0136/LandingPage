<template>
  <main>
    <FindForm :version="2"></FindForm>
    <Discover></Discover>
    <Carousel></Carousel>
    <Specialization></Specialization>
    <AppSection></AppSection>
    <MultiRegister></MultiRegister>
  </main>
  <!-- /main content -->
</template>
<script>
import FindForm from '../home/components/find-form'
import Discover from '../home/components/discover'
import Carousel from '../home/components/carousel'
import Specialization from '../home/components/find-specialization'
import AppSection from '../home/components/app-section'
import MultiRegister from '../home/components/multi-register'

export default {
  props: {
  },
  components: { 
    FindForm,
    Discover,
    Carousel,
    Specialization,
    AppSection,
    MultiRegister
  }
}
</script>