<template lang="pug">
  v-card
    v-toolbar(flat dark)
      v-toolbar-title Battle record
      v-spacer
      v-btn(icon)
        v-icon mdi-plus-circle

    v-data-table(:headers="headers" :items="value")
</template>

<script>
export default {
  props: {
    value: { type: Array, default: () => [] }
  },

  data() {
    return {
      form: {
        location: '',
        objective: '',
        winloss: '',
        xp: 0,
        reward: ''
      }
    }
  },

  computed: {
    headers: () => [
      { label: 'Location', value: 'location' },
      { label: 'Objective', value: 'objective' },
      { label: 'W/L', value: 'winloss' },
      { label: 'XP', value: 'xp' },
      { label: 'Reward', value: 'reward' }
    ]
  }
}
</script>

<style lang="css" scoped></style>
