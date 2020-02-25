<template lang="pug">
  #campaign-show
    h1.title {{ $route.params.id }} Top Level Scoring

    v-tabs(icons-and-text)
      v-tab(v-for="(tab,i) in tabs" :key="i" :to="tab.to" nuxt) {{ tab.label }}
        v-icon {{ tab.icon }}
    nuxt-child

    v-fab-transition
      v-btn(fab v-show="dirty" fixed bottom right color="primary" :loading="loading" @click="$store.dispatch('campaigns/save')")
        v-icon mdi-content-save
</template>

<script>
import { mapState } from 'vuex'
export default {
  computed: {
    ...mapState('campaigns', ['campaign', 'dirty', 'loading']),
    tabs() {
      return [
        {
          label: 'Galactic map',
          to: { name: 'campaigns-id', params: { id: this.campaign._id } },
          icon: 'mdi-earth'
        },
        {
          label: 'The Rebellion',
          to: {
            name: 'campaigns-id-faction',
            params: { id: this.campaign._id, faction: 'rebels' }
          },
          icon: 'fab fa-rebel'
        },
        {
          label: 'The galactic empire',
          to: {
            name: 'campaigns-id-faction',
            params: { id: this.campaign._id, faction: 'empire' }
          },
          icon: 'fab fa-empire'
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
