<template lang="pug">
  v-card
    v-card-text
      v-row
        v-col
          v-text-field(label="Ability name" v-model="value.name")
        v-col
          v-select(label="Tier" :items="tiers" v-model="value.tier")
        v-col
          v-text-field(type="number" label="XP cost" v-model.number="value.cost")

      v-text-field(label="Category" v-model="value.category")
      v-textarea(label="Rule summary" v-model="value.rules")
</template>

<script>
export default {
  props: {
    value: { type: Object, default: () => ({}) }
  },

  computed: {
    tiers: () => ['I', 'II', 'III', 'IV']
  }
}
</script>
