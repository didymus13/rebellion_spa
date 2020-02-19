<template lang="pug">
  #user-id {{ user }}
</template>

<script>
import { mapState } from 'vuex'
export default {
  auth: false,

  computed: {
    ...mapState('users', {
      user: (state) => state.user
    })
  },

  fetch({ store, params }) {
    store.dispatch('users/show', params.id)
  }
}
</script>
