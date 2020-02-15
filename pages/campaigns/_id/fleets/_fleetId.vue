<template lang="pug">
  #fleet-update
    fleet-form(v-model="form" :loading="loading" @save="update")
</template>

<script>
import { mapState } from 'vuex'
import cloneDeep from 'lodash/cloneDeep'
import FleetForm from '@/components/campaigns/fleets/form'

export default {
  components: { FleetForm },

  data: () => ({
    form: {}
  }),

  computed: {
    ...mapState('fleets', ['fleet', 'loading']),
    ...mapState('campaigns', ['campaign'])
  },

  watch: {
    fleet: {
      deep: true,
      handler(value) {
        this.form = cloneDeep(value)
      }
    }
  },

  fetch({ store, params }) {
    if (params.payload) store.commit('fleets/setFleet', params.payload)
    store.dispatch('fleets/show', params.fleetId)
    store.dispatch('campaigns/show', params.id)
  },

  methods: {
    async update() {
      try {
        await this.$store.dispatch('fleets/update', this.form)
        this.$toast.success('Fleet updated')
      } catch (err) {
        this.$toast.error(err)
      }
    }
  }
}
</script>
