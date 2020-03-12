<template lang="pug">
  #campaign-index
    v-card(:loading="loading")
      v-toolbar(color="primary" dark flat relative src="/pic4819168.webp")
        v-toolbar-title My campaigns
        template(v-slot:extension)
          v-btn(fab color="primary" bottom right absolute :to="{ name: 'campaigns-create' }")
            v-icon mdi-plus

      v-card-text
        v-list(three-line)
          v-list-item(v-for="campaign in campaigns" :key="campaign._id" :to="{ name: 'campaigns-id', params: { id: campaign._id, payload: campaign } }")
            v-list-item-content
              v-list-item-title {{ campaign.name }}
              v-list-item-subtitle Players: {{ campaign.playerCount }}
            v-list-item-action(v-if="campaign.user === $auth.user.sub")
              v-btn(@click.prevent="deleteCampaign(campaign)" icon)
                v-icon(small color="red") mdi-delete
</template>

<script>
import { mapState } from 'vuex'
export default {
  computed: {
    ...mapState('campaigns', ['campaigns', 'loading'])
  },

  fetch({ store }) {
    store.dispatch('campaigns/find')
  },

  methods: {
    async deleteCampaign(campaign) {
      if (confirm(`Delete campaign named: ${campaign.name} ?`)) {
        await this.$store.dispatch('campaigns/delete', campaign._id)
        this.$toast.success('Deleted')
      }
    }
  }
}
</script>
