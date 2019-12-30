<template lang="pug">
  nuxt-child
</template>

<script>
export default {
  fetch({ store, params }) {
    store.dispatch('campaigns/find', params)
  }
}
</script>
