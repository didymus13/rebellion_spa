<template lang="pug">
  #fleet-editor
    fleet-form(v-model="fleet")
</template>

<script>
import find from 'lodash/find'
import FleetForm from '@/components/campaigns/FleetForm'
export default {
  components: { FleetForm },

  props: {
    value: { type: Object, default: () => ({}) }
  },

  computed: {
    fleet() {
      return find(this.value.fleets, { _id: this.$route.params.fleetId })
    }
  }
}
</script>
