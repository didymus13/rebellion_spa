<template lang="pug">
  v-card
    v-toolbar(flat dark)
      v-toolbar-title Ships ({{ total }} points)
      v-spacer
      v-dialog(v-model="dialog" max-width="500px")
        template(v-slot:activator="{ on }")
          v-btn(icon v-on="on")
            v-icon mdi-plus-circle

        ship-form(@add="add")

    ship-list(v-model="value")
</template>

<script>
import sumBy from 'lodash/sumBy'
import ShipForm from '@/components/campaigns/fleets/Ships/ShipForm'
import ShipList from '@/components/campaigns/fleets/Ships/ShipList'
export default {
  components: { ShipForm, ShipList },

  props: {
    value: { type: Array, default: () => [] }
  },

  data: () => ({
    dialog: false
  }),

  computed: {
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
