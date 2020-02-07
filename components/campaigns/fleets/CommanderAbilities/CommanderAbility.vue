<template lang="pug">
  v-card
    v-card-text
      v-row
        v-col
          v-text-field(label="Ability name")
        v-col
          v-select(label="Tier")
        v-col
          v-text-field(type="number" label="XP cost")

      v-text-field(label="Category")
      v-textarea(label="Rule summary")
</template>

<script>
export default {}
</script>
