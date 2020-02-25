<template lang="pug">
v-card
  v-card-title
    v-row
      v-col(cols="6")
        v-text-field(label="VP: Act" v-model.number="value.points.act" type="number")
      v-col(cols="6")
        v-text-field(label="VP: Campaign" v-model.number="value.points.total" type="number")
  v-card-text
    v-row
      v-col(cols="6")
        v-text-field(label="Ally" v-model.number="value.resources.ally" type="number")
      v-col(cols="6")
        v-text-field(label="Destiny" v-model.number="value.resources.destiny" type="number")
      v-col(cols="6")
        v-text-field(label="Diplomats" v-model.number="value.resources.diplomats" type="number")
      v-col(cols="6")
        v-text-field(label="Repair yards" v-model.number="value.resources.repairYards" type="number")
      v-col(cols="4")
        v-text-field(label="Resources" v-model.number="value.resources.resources" type="number")
      v-col(cols="4")
        v-text-field(label="Skilled spacers" v-model.number="value.resources.skilledSpacers" type="number")
      v-col(cols="4")
        v-text-field(label="Spynet" v-model.number="value.resources.spynet" type="number")
</template>

<script>
export default {
  props: {
    value: { type: Object, required: true }
  }
}
</script>
