<template lang="pug">
  v-card
    v-toolbar(flat dark)
      v-toolbar-title Objectives
    v-card-text
      v-row
        v-col
          v-text-field(label="Assault" v-model="value.assault")
        v-col
          v-text-field(label="Defense" v-model="value.defense")
        v-col
          v-text-field(label="Navigation" v-model="value.navigation")
</template>

<script>
export default {
  props: {
    value: {
      type: Object,
      default: () => ({ assault: '', defense: '', navigation: '' })
    }
  }
}
</script>
