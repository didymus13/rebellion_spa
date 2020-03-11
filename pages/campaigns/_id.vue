<template lang="pug">
  #campaign-show
    h1.display-1 {{ form.name }}

    v-list.d-md-flex.flex-row
      v-list-item(v-for="(item, i) in overview" :key="i" nuxt :to="item.to")
        v-list-item-avatar(v-if="item.icon")
          v-icon(:color="item.color") {{ item.icon }}
        v-list-item-content
          v-list-item-title {{ item.title }}
          v-list-item-subtitle {{ item.subtitle }}

    nuxt-child(v-model="form")

    v-fab-transition
      v-btn(fab v-show="dirty" fixed bottom right color="primary" :loading="loading" @click="$store.dispatch('campaigns/save', form)")
        v-icon mdi-content-save
</template>

<script>
import { mapState } from 'vuex'
import cloneDeep from 'lodash/cloneDeep'
export default {
  head() {
    return {
      title: this.campaign.name,
      meta: [
        { name: 'description', content: 'A Rebellion in the Rim campaign' },
        { property: 'og:title', content: this.campaign.name },
        {
          property: 'og:description',
          content: 'A Rebellion in the Rim campaign'
        }
      ]
    }
  },

  computed: {
    ...mapState('campaigns', ['loading', 'dirty', 'campaign']),
    overview() {
      return [
        {
          title: `Act ${this.form.act}`,
          subtitle: `Turn ${this.form.turn}`,
          icon: 'mdi-earth',
          to: {
            name: 'campaigns-id',
            params: { id: this.$route.params.id }
          }
        },
        {
          icon: 'fab fa-rebel',
          title: `Total VPs: ${this.form.rebels.points.total}`,
          subtitle: `Act VPs: ${this.form.rebels.points.act}`,
          to: {
            name: 'campaigns-id-faction',
            params: { id: this.$route.params.id, faction: 'rebels' }
          },
          color: 'red darken-1'
        },
        {
          icon: 'fab fa-empire',
          title: `Total VPs: ${this.form.empire.points.total}`,
          subtitle: `Act VPs: ${this.form.empire.points.act}`,
          to: {
            name: 'campaigns-id-faction',
            params: { id: this.$route.params.id, faction: 'empire' }
          },
          color: 'indigo darken-1'
        }
      ]
    }
  },

  watch: {
    form: {
      deep: true,
      handler(value) {
        this.$store.commit('campaigns/setDirty', true)
      }
    },
    campaign: {
      deep: true,
      handler(value) {
        this.form = cloneDeep(value)
      }
    }
  },

  async asyncData({ store, params }) {
    if (params.payload) store.commit('campaigns/setCampaign', params.payload)
    await store.dispatch('campaigns/show', params.id)
    return { form: cloneDeep(store.state.campaigns.campaign) }
  }
}
</script>
