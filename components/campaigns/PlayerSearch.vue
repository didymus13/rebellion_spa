<template lang="pug">
v-autocomplete(
  :value="value"
  :label="label"
  :items="users"
  :search-input.sync="search"
  :loading="loading"
  multiple
  chips
  deletable-chips
  item-text="nickname"
  return-object
  @change="$emit('input', $event)"
  :rules="rules"
  cache-items
)
</template>

<script>
import { mapState } from 'vuex'
import debounce from 'lodash/debounce'

export default {
  props: {
    value: { type: Array, required: true },
    label: { type: String, default: '' },
    rules: { type: Array, default: () => [] }
  },

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
