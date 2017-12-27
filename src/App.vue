<template>
  <div>
    <app-query></app-query>
    <app-search-results></app-search-results>
  </div>
</template>

<script>
import Query from './components/Query.vue'
import SearchResults from './components/SearchResults.vue'

export default {
  name: 'app',
  components: {
    'app-query': Query,
    'app-search-results': SearchResults
  },
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  },
  mounted () {
    //console.log(this.$store)
  }
}
</script>

<style lang="scss" scoped>

</style>
