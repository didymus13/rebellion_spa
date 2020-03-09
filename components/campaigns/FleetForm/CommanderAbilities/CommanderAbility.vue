<template lang="pug">
  v-card
    v-form(v-model="valid" @submit.prevent="add")
      v-card-title
        v-text-field(label="Ability name" v-model="form.name" :rules="[ rules.required ]")
      v-card-text
        v-row
          v-col
            v-select(label="Tier" :items="tiers" v-model="form.tier" :rules="[ rules.required ]")
          v-col
            v-text-field(type="number" label="XP cost" v-model.number="form.cost" :rules="[ rules.required ]")

        v-select(label="Category" v-model="form.category" :items="categories" :rules="[ rules.required ]")
        v-textarea(label="Rule summary" v-model="form.rules")
      v-card-actions
        v-spacer
        v-btn(:diabled="!valid" type="submit" color="primary" text) Add
</template>

<script>
export default {
  props: {
    value: { type: Object, default: () => ({}) }
  },

  data: () => ({
    valid: true,
    form: {},
    rules: {
      required: (value) => !!value || 'Required'
    }
  }),

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
  },

  mounted() {
    this.resetForm()
  },

  methods: {
    resetForm() {
      this.form = {
        name: '',
        tier: '',
        cost: '',
        category: '',
        rules: ''
      }
    },
    add() {
      this.$emit('add', { ...this.form })
      this.resetForm()
    }
  }
}
</script>
