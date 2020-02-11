<template lang="pug">
  v-card
    v-toolbar(flat dark)
      v-toolbar-title Ships
      v-spacer
      v-btn(icon)
        v-icon mdi-plus-circle

    v-data-table(:headers="headers" :items="value")
</template>

<script>
import sumBy from 'lodash/sumBy'
export default {
  props: {
    value: { type: Array, default: () => [] }
  },

  computed: {
    headers: () => [
      { label: 'Flagship', value: 'isFlagship' },
      { label: 'Ship type / Name', value: 'name' },
      { label: 'Upgrades', value: 'upgrades' },
      { label: 'Points', value: 'points' },
      { label: 'Veteran', value: 'isVeteran' },
      { label: 'Scarred', value: 'isScarred' }
    ],
    total() {
      return sumBy(this.value, 'points') || 0
    }
  }
}
</script>
