<template lang="pug">
  v-card
    v-toolbar(flat dark)
      v-toolbar-title Battle record
      v-spacer
      v-dialog(v-model="dialog" max-width="500px")
        template(v-slot:activator="{ on }")
          v-btn(icon v-on="on")
            v-icon mdi-plus-circle

        v-card
          v-card-title
            span.headline New Battle Record

          v-card-text
            v-text-field(v-model="form.location" label="Location" required)
            v-text-field(v-model="form.objective" label="Objective" required)
            v-radio-group(v-model="form.winLoss" row required)
              v-radio(value="W" label="Win")
              v-radio(value="L" label="Loss")
            v-text-field(v-model="form.xp" label="XP" type="number" required)
            v-text-field(v-model="form.reward" label="Reward")

          v-card-actions
            v-spacer
            v-btn(@click="add" color="primary" text) Add

    v-data-table(:headers="headers" :items="value")
</template>

<script>
export default {
  props: {
    value: { type: Array, default: () => [] }
  },

  data: () => ({
    dialog: false,
    form: {}
  }),

  computed: {
    headers: () => [
      { text: 'Location', value: 'location' },
      { text: 'Objective', value: 'objective' },
      { text: 'W/L', value: 'winLoss' },
      { text: 'XP', value: 'xp' },
      { text: 'Reward', value: 'reward' }
    ]
  },

  mounted() {
    this.resetForm()
  },

  methods: {
    resetForm() {
      this.form = {
        location: '',
        objective: '',
        winLoss: '',
        xp: 0,
        reward: ''
      }
    },
    add() {
      this.value.push({ ...this.form })
      this.dialog = false
      this.resetForm()
    }
  }
}
</script>
