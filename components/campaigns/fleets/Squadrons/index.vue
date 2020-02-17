<template lang="pug">
  v-card
    v-toolbar(flat dark)
      v-toolbar-title Squadrons ({{ total }} points)
      v-spacer
      v-dialog(v-model="dialog" max-width="500px")
        template(v-slot:activator="{ on }")
          v-btn(icon v-on="on")
            v-icon mdi-plus-circle

        squadron-form(@add="add")

    squadron-list(v-model="value")
</template>

<script>
import sumBy from 'lodash/sumBy'
import SquadronForm from '@/components/campaigns/fleets/Squadrons/SquadronForm'
import SquadronList from '@/components/campaigns/fleets/Squadrons/SquadronList'

export default {
  components: { SquadronForm, SquadronList },

  props: {
    value: { type: Array, default: () => [] }
  },

  data: () => ({
    dialog: false
  }),

  computed: {
    headers: () => [
      { text: 'Squadron type / Name', value: 'name' },
      { text: 'Points', value: 'points' },
      { text: 'Veteran', value: 'isVeteran' },
      { text: 'Scarred', value: 'isScarred' }
    ],

    total() {
      return sumBy(this.value, 'points') || 0
    }
  },

  methods: {
    add(form) {
      this.value.push({ ...form })
      this.dialog = false
    }
  }
}
</script>
