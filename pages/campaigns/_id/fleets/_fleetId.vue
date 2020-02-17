<template lang="pug">
  #fleet-update
    fleet-form(v-model="form" :loading="loading" :dirty="isDirty" @save="update")
</template>

<script>
import { mapState } from 'vuex'
import cloneDeep from 'lodash/cloneDeep'
import FleetForm from '@/components/campaigns/fleets/form'

export default {
  components: { FleetForm },

  data: () => ({
    form: {},
    isDirty: false
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
    },
    form: {
      deep: true,
      handler(newForm, oldForm) {
        this.isDirty = true
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
        this.isDirty = false
      } catch (err) {
        this.$toast.error(err)
      }
    }
  }
}
</script>
