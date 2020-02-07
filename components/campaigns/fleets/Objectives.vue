<template lang="pug">
  v-card
    v-toolbar(flat dark)
      v-toolbar-title Objectives
    v-card-text
      v-row
        v-col
          v-text-field(label="Assault" :value="value.assault")
        v-col
          v-text-field(label="Defense" :value="value.defense")
        v-col
          v-text-field(label="Navigation" :value="value.navigation")
</template>

<script>
export default {
  props: {
    value: { type: Object, default: () => ({}) }
  }
}
</script>
