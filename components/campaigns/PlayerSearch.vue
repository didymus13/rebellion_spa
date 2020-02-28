<template lang="pug">
v-autocomplete(
  v-model="value"
  :label="label"
  :items="users"
  :search-input.sync="search"
  :loading="loading"
  multiple
  chips
  deletable-chips
  item-text="nickname"
  item-value="_id"
  @change="$emit('input', $event)"
)
</template>

<script>
import { mapState } from 'vuex'
import debounce from 'lodash/debounce'

export default {
  props: ['value', 'label'],

  data: () => ({
    search: ''
  }),

  computed: {
    ...mapState('users', ['users', 'loading'])
  },

  watch: {
    search(value) {
      this.handleUserSearch(value)
    }
  },

  created() {
    this.handleUserSearch = debounce(
      (value) =>
        this.$store.dispatch('users/find', {
          email: value,
          page: 1,
          pageSize: 5
        }),
      300
    )
  }
}
</script>
