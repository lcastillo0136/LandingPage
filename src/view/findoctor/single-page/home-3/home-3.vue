<template>
  <main>
    <FindFormSimple></FindFormSimple>
    <Discover></Discover>
    <FindGrid></FindGrid>
    <FindList></FindList>
    <AppSection></AppSection>
  </main>
  <!-- /main content -->
</template>
<script>
import FindFormSimple from '../home/components/find-form-simple'
import Discover from '../home/components/discover'
import FindGrid from '../home/components/find-grid'
import FindList from '../home/components/find-list'
import AppSection from '../home/components/app-section'

export default {
  props: {
  },
  components: { 
    FindFormSimple,
    Discover,
    FindGrid,
    FindList,
    AppSection
  }
}
</script>