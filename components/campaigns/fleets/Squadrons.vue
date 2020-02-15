<template lang="pug">
  v-card
    v-toolbar(flat dark)
      v-toolbar-title Squadrons
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
      { text: 'Squadron type / Name', value: 'name' },
      { text: 'Upgrades', value: 'upgrades' },
      { text: 'Points', value: 'points' },
      { text: 'Veteran', value: 'isVeteran' },
      { text: 'Scarred', value: 'isScarred' }
    ],
    total() {
      return sumBy(this.value, 'points') || 0
    }
  }
}
</script>
