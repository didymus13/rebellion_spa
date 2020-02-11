<template lang="pug">
  v-card
    v-toolbar(flat dark)
      v-toolbar-title Strategic effect tokens

    v-card-text
      v-row
        v-col
          v-text-field(type="number" label="Ally" v-model.number="value.ally")
        v-col
          v-text-field(type="number" label="Destiny" v-model="value.destiny")
        v-col
          v-text-field(type="number" label="Spynet" v-model="value.spynet")
</template>

<script>
export default {
  props: {
    value: {
      type: Object,
      default: () => ({ ally: 0, destiny: 0, spynet: 0 })
    }
  }
}
</script>
