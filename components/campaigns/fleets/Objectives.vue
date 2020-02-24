<template lang="pug">
  v-card
    v-toolbar(flat dark)
      v-toolbar-title Objectives
    v-card-text
      v-row
        v-col
          v-text-field(label="Assault" v-model="value.assault" color="red")
        v-col
          v-text-field(label="Defense" v-model="value.defense" color="yellow darken-3")
        v-col
          v-text-field(label="Navigation" v-model="value.navigation" color="cyan")
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
