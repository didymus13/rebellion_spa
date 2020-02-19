<template lang="pug">
  #user-list
    v-list
      v-list-item(
        v-for="user in users"
        :key="user._id"
        :to="{ name: 'users-id', params: { id: user._id } }"
      )
        v-list-item-title {{ user.username || user.email }}
</template>

<script>
import { mapState } from 'vuex'
export default {
  auth: false,

  computed: {
    ...mapState('users', {
      users: (state) => state.users
    })
  },

  fetch({ store, params }) {
    store.dispatch('users/find', params)
  }
}
</script>
