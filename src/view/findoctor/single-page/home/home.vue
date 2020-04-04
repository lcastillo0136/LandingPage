<template>
  <main>
    <FindForm></FindForm>
    <Discover></Discover>
    <Carousel></Carousel>
    <FindList></FindList>
    <AppSection></AppSection>
  </main>
  <!-- /main content -->
</template>

<script>
import FindForm from './components/find-form'
import Discover from './components/discover'
import Carousel from './components/carousel'
import FindList from './components/find-list'
import AppSection from './components/app-section'

export default {
  props: {
  },
  components: { 
    FindForm,
    Discover,
    Carousel,
    FindList,
    AppSection
  }
}
</script>
