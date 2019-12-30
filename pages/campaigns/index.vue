<template lang="pug">
  v-card
    v-toolbar(color="primary" dark flat relative)
      v-toolbar-title My campaigns
      template(v-slot:extension)
        v-btn(fab color="secondary" bottom right absolute)
          v-icon mdi-plus
    v-list
      v-list-item(
        v-for="campaign in campaigns"
        :key="campaign._id"
        :to="{ name: 'campaigns-id', params: { id: campaign._id, payload: campaign } }"
      )
        v-list-item-content {{ campaign.name }}
</template>

<script>
import { mapState } from 'vuex'
export default {
  computed: {
    ...mapState('campaigns', {
      campaigns: (state) => state.campaigns
    })
  }
}
</script>
