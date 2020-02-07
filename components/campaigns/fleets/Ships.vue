<template lang="pug">
  v-card
    v-toolbar(flat dark)
      v-toolbar-title Ships

    v-data-table(:headers="headers" :items="value")
</template>

<script>
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
      return 0
    }
  }
}
</script>
