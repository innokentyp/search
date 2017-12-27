<template lang="html">
  <section class="section">
    <div class="container content">
      <h3 v-if="query">Results for <strong>{{ $store.getters.query }}</strong></h3>
      <ol>
        <li v-for="(item, index) in results" :key="index">
          <article class="content">
            <header>
              <a :href="item.url">{{ item.title }}</a>
              <br>
              <em class="item-url">{{ item.url }}</em>
            </header>
            <div v-html="item.snippet"></div>
          </article>
        </li>
      </ol>
    </div>
  </section>
</template>

<script>
export default {
  computed: {
    query () {
      return this.$store.getters.query
    },
    results () {
      return this.$store.getters['search-results']
    }
  }
}
</script>

<style lang="scss">
.searchmatch {
  font-weight: bold;
}
.item-url {
  color: green;
}
</style>
