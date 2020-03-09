<template lang="pug">
  nuxt-child
</template>

<script>
export default {
  auth: true,

  fetch({ store, params }) {
    store.dispatch('campaigns/find', params)
  }
}
</script>
