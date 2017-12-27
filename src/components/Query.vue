<template lang="html">
  <nav class="navbar is-light" role="search" aria-label="query for search">
    <div class="container is-fluid is-flex">
      <div class="navbar-brand">
        <a class="navbar-item" href="https://bulma.io">
          <img src="https://bulma.io/images/bulma-logo.png" alt="Bulma: a modern CSS framework based on Flexbox" width="112" height="28">
        </a>
      </div>

      <form class="navbar-item" @submit.prevent="formSubmit">
        <div class="field has-addons">
          <div class="control is-expanded">
            <input class="input" type="text" name="query" placeholder="Введите строку для поиска">
          </div>
          <div class="control">
            <button type="submit" :class="['button', 'is-primary', { 'is-loading': $store.getters.loading } ]">Search</button>
          </div>
        </div>
      </form>
    </div>
  </nav>
</template>

<script>
export default {
  name: 'app-query',
  methods: {
    formSubmit (e) {
      var search = null
      var query = e.target.query.value.trim()

      if (query) {
        this.$store.commit('loading', true)

        search = this.$store.dispatch('search', query)
          .then((results) => {
            this.$store.commit('search', { query, results })
          })
          .catch((status) => {
            console.error(`Response status: ${status}`)
          })
          .finally(() => {
            this.$store.commit('loading', false)
          })
      }

      return search
    }
  }
}
</script>

<style lang="scss" scoped>
form {
  flex: 1 1 auto;

  :first-child {
    flex: 1 1 auto;
  }
}
</style>
