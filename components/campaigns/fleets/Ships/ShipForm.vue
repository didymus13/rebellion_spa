<template lang="pug">
v-card
  v-card-title
    span.headline Add a new ship
  v-form(v-model="valid" @submit.prevent="add")
    v-card-text
      v-switch(v-model="form.isFlagship" label="Flagship")
      v-text-field(v-model="form.name" label="Ship type / name" required :rules="[rules.required]")
      v-text-field(v-model="form.upgrades" label="Upgrades")
      v-text-field(v-model.number="form.points" label="Point cost" type="number" required :rules="[rules.required]")
      v-row
        v-col(cols="6")
          v-switch(v-model="form.isVeteran" label="Veteran")
        v-col(cols="6")
          v-switch(v-model="form.isScarred" label="Scarred" color="red")

    v-card-actions
      v-spacer
      v-btn(:disabled="!valid" type="submit" color="primary" text) Add
</template>

<script>
export default {
  data: () => ({
    form: {},
    rules: {
      required: (value) => !!value || 'Required'
    },
    valid: true
  }),

  mounted() {
    this.resetForm()
  },

  methods: {
    resetForm() {
      this.form = {
        isFlagship: false,
        name: '',
        upgrades: '',
        points: '',
        isVeteran: false,
        isScarred: false
      }
    },

    add() {
      this.$emit('add', { ...this.form })
      this.resetForm()
    }
  }
}
</script>

<style lang="css" scoped></style>
