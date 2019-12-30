export const state = () => ({
  campaigns: [],
  campaign: {}
})

export const mutations = {
  setCampaigns(state, list) {
    state.campaigns = list
  },

  setCampaign(state, campaign) {
    state.campaign = campaign
  }
}

export const actions = {
  async find({ commit }, params) {
    commit('setCampaigns', await this.$axios.$get('/campaigns', params))
  },

  async show({ commit }, id) {
    const [campaign, fleets] = await Promise.all([
      this.$axios.$get(`/campaigns/${id}`),
      this.$axios.$get(`/campaigns/${id}/fleets`)
    ])
    commit('setCampaign', campaign)
    commit('fleets/setFleets', fleets, { root: true })
  }
}
