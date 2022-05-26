<template>
  <main>
    <FindForm></FindForm>
    <Specialization></Specialization>
    <Carousel></Carousel>
    <Discover></Discover>
    <AppSection></AppSection>
  </main>
  <!-- /main content -->
</template>
<script>
import FindForm from '../home/components/find-form-video'
import Discover from '../home/components/discover'
import Carousel from '../home/components/carousel'
import AppSection from '../home/components/app-section'
import Specialization from '../home/components/find-specialization'

export default {
  props: {
  },
  components: { 
    FindForm,
    Discover,
    Carousel,
    AppSection,
    Specialization
  }
}
</script>