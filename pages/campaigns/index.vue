<template lang="pug">
  v-card
    v-toolbar(color="primary" dark flat relative src="/pic4819168.webp")
      v-toolbar-title My campaigns
      template(v-slot:extension)
        v-btn(fab color="secondary" bottom right absolute :to="{ name: 'campaigns-create' }")
          v-icon mdi-plus

    v-card-text
      v-list(three-line)
        v-list-item(v-for="campaign in campaigns" :key="campaign._id" :to="{ name: 'campaigns-id', params: { id: campaign._id } }")
          v-list-item-content
            v-list-item-title {{ campaign.name }}
            v-list-item-subtitle Players: {{ campaign.playerCount }}
</template>

<script>
import { mapState } from 'vuex'
export default {
  data: () => ({
    headers: [
      { text: 'Name', value: 'name' },
      { text: '# Players', value: 'playerCount' },
      { text: 'Empire VP', value: 'empire.vp' },
      { text: 'Rebel VP', value: 'rebels.vp' },
      { text: 'Actions', value: 'action', sortable: false }
    ]
  }),

  computed: {
    ...mapState('campaigns', {
      campaigns: (state) => state.campaigns
    })
  }
}
</script>
