<template lang="pug">
  #fleet-update
    div {{ this.$auth}}
    fleet-form(v-model="form" :loading="loading" :dirty="isDirty" @save="update")
</template>

<script>
import { mapState } from 'vuex'
import cloneDeep from 'lodash/cloneDeep'
import get from 'lodash/get'
import find from 'lodash/find'
import FleetForm from '@/components/campaigns/fleets/form'

export default {
  components: { FleetForm },

  data: () => ({
    form: {},
    isDirty: false
  }),

  computed: {
    ...mapState('campaigns', ['campaign', 'loading']),
    fleet() {
      const faction = this.$route.params.faction
      const fleets = get(this.campaign, [faction, 'fleets'])
      return find(fleets, { _id: this.$route.params.fleetId })
    }
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
    store.dispatch('campaigns/show', params.id)
  },

  methods: {
    update() {
      this.$store.dispatch('createFleet', {
        faction: this.$route.params.faction,
        fleet: this.fleet
      })
    }
  }
}
</script>
