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
    ...mapState('campaigns', {
      campaign: (state) => state.campaign
    }),
    ...mapState('fleets', {
      loading: (state) => state.loading
    })
  },

  fetch({ store, params }) {
    store.dispatch('campaigns/show', params.id)
  },

  methods: {
    async save() {
      try {
        await this.$store.dispatch('fleets/create', {
          payload: this.fleet,
          campaign: this.campaign
        })
        this.$toast.success('Fleet created')
        this.$router.push({
          name: 'campaigns-id',
          params: { id: this.campaign._id }
        })
      } catch (err) {
        this.$toast.error(err)
      }
    }
  }
}
</script>
