<template lang="pug">
  #campaign-show
    h1.display-1 {{ campaign.name }}

    v-list.d-md-flex.flex-row
      v-list-item(v-for="(item, i) in overview" :key="i" nuxt :to="item.to")
        v-list-item-avatar(v-if="item.icon")
          v-icon(:color="item.color") {{ item.icon }}
        v-list-item-content
          v-list-item-title {{ item.title }}
          v-list-item-subtitle {{ item.subtitle }}

    nuxt-child

    v-fab-transition
      v-btn(fab v-show="dirty" fixed bottom right color="primary" :loading="loading" @click="$store.dispatch('campaigns/save', campaign)")
        v-icon mdi-content-save
</template>

<script>
import { mapState } from 'vuex'
export default {
  computed: {
    ...mapState('campaigns', ['campaign', 'dirty', 'loading']),
    overview() {
      return [
        {
          title: `Act ${this.campaign.act}`,
          subtitle: `Turn ${this.campaign.turn}`,
          icon: 'mdi-earth',
          to: {
            name: 'campaigns-id',
            params: { id: this.$route.params.id }
          }
        },
        {
          icon: 'fab fa-rebel',
          title: `Total VPs: ${this.campaign.rebels.points.total}`,
          subtitle: `Act VPs: ${this.campaign.rebels.points.act}`,
          to: {
            name: 'campaigns-id-faction',
            params: { id: this.$route.params.id, faction: 'rebels' }
          },
          color: 'red darken-1'
        },
        {
          icon: 'fab fa-empire',
          title: `Total VPs: ${this.campaign.empire.points.total}`,
          subtitle: `Act VPs: ${this.campaign.empire.points.act}`,
          to: {
            name: 'campaigns-id-faction',
            params: { id: this.$route.params.id, faction: 'empire' }
          },
          color: 'indigo darken-1'
        }
      ]
    }
  },

  fetch({ store, params }) {
    if (params.payload) store.commit('campaigns/setCampaign', params.payload)
    store.dispatch('campaigns/show', params.id)
  }
}
</script>
