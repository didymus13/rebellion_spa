<template lang="pug">
  #campaign-index
    v-card
      v-toolbar(color="primary" dark flat relative src="/pic4819168.webp")
        v-toolbar-title My campaigns
        template(v-slot:extension)
          v-btn(fab color="secondary" bottom right absolute :to="{ name: 'campaigns-create' }")
            v-icon mdi-plus

      v-card-text
        v-list(three-line)
          v-list-item(v-for="campaign in campaigns" :key="campaign._id" :to="{ name: 'campaigns-id', params: { id: campaign._id, payload: campaign } }")
            v-list-item-content
              v-list-item-title {{ campaign.name }}
              v-list-item-subtitle Players: {{ campaign.playerCount }}
</template>

<script>
import { mapState } from 'vuex'
export default {
  computed: {
    ...mapState('campaigns', ['campaigns'])
  },

  fetch({ store }) {
    store.dispatch('campaigns/find')
  }
}
</script>
