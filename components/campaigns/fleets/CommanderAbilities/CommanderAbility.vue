<template lang="pug">
  v-card
    v-card-title
      v-text-field(label="Ability name" v-model="value.name")
      v-spacer
      v-btn(icon @click="$emit('delete')")
        v-icon mdi-delete
    v-card-text
      v-row
        v-col
          v-select(label="Tier" :items="tiers" v-model="value.tier")
        v-col
          v-text-field(type="number" label="XP cost" v-model.number="value.cost")

      v-select(label="Category" v-model="value.category" :items="categories")
      v-textarea(label="Rule summary" v-model="value.rules")
</template>

<script>
export default {
  props: {
    value: { type: Object, default: () => ({}) }
  },

  computed: {
    tiers: () => ['I', 'II', 'III', 'IV'],
    categories: () => [
      'engineering',
      'espionnage',
      'gunnery',
      'logistics',
      'navigation',
      'squadron tactics'
    ]
  }
}
</script>
