<template lang="pug">
  #fleet-creation
    h1.display-3 {{ campaign.name }}
    h2.display-1 Create a new fleet
    fleet-form
</template>

<script>
import { mapState } from 'vuex'
import FleetForm from '@/components/campaigns/fleets/form'

export default {
  components: { FleetForm },

  computed: {
    ...mapState('campaigns', {
      campaign: (state) => state.campaign
    })
  },

  fetch({ store, params }) {
    store.dispatch('campaigns/show', params.id)
  }
}
</script>
