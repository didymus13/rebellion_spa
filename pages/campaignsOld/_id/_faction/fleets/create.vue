<template lang="pug">
  #fleet-creation
    h1.display-3 {{ campaign.name }}
    h2.display-1 Create a new fleet
    fleet-form(v-model="fleet" @save="save" :loading="loading")
</template>

<script>
import { mapState } from 'vuex'
import FleetForm from '@/components/campaigns/fleets/form'

export default {
  components: { FleetForm },

  data: () => ({
    fleet: {
      name: '',
      user: {},
      faction: '',
      condition: '',
      objectives: {
        assault: '',
        defense: '',
        navigation: ''
      },
      battleRecord: [],
      commander: {
        name: '',
        xp: 0,
        abilities: []
      },
      tokens: {
        ally: 0,
        destiny: 0,
        spynet: 0
      },
      ships: [],
      squadrons: []
    }
  }),

  computed: {
    ...mapState('campaigns', ['campaign', 'loading'])
  },

  fetch({ store, params, query }) {
    store.dispatch('campaigns/show', params.id)
  },

  mounted() {
    this.fleet.faction = this.setFleetFaction()
  },

  methods: {
    setFleetFaction(faction) {
      switch (this.$route.query.faction) {
        case 'rebels':
          return 'rebels'
        case 'empire':
          return 'empire'
      }
      return null
    },

    async save() {
      const params = { fleet: this.fleet, faction: this.$route.params.faction }
      await this.$store.dispatch('campaigns/createFleet', params)
    }
  }
}
</script>
