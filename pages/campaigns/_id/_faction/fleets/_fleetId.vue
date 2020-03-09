<template lang="pug">
  #fleet-editor
    fleet-form(v-model="fleet")
    v-fab-transition
      v-btn(fab v-show="dirty" fixed bottom right color="primary" :loading="loading" @click="save")
        v-icon mdi-content-save
</template>

<script>
import find from 'lodash/find'
import cloneDeep from 'lodash/cloneDeep'
import { mapState } from 'vuex'
import FleetForm from '@/components/campaigns/FleetForm'
export default {
  components: { FleetForm },

  props: {
    value: { type: Object, default: () => ({}) }
  },

  data: () => ({
    fleet: {},
    dirty: false
  }),

  computed: {
    ...mapState('campaigns', ['loading'])
  },

  watch: {
    fleet(value) {
      this.dirty = true
    }
  },

  mounted() {
    this.setFleet()
  },

  methods: {
    async save() {
      await this.$store.dispatch('campaigns/updateFleet', {
        ...this.$route.params,
        fleet: this.fleet
      })
      this.setFleet()
      this.dirty = false
    },

    setFleet() {
      const fleet = find(this.value.fleets, { _id: this.$route.params.fleetId })
      this.fleet = cloneDeep(fleet)
    }
  }
}
</script>
