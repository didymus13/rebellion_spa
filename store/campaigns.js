export const state = () => ({
  campaigns: [],
  campaign: {},
  loading: false
})

export const mutations = {
  setCampaigns(state, list) {
    state.campaigns = list
  },

  setCampaign(state, campaign) {
    state.campaign = campaign
  },
  setLoading(state, loading) {
    state.loading = loading
  }
}

export const actions = {
  async find({ commit, state }, params) {
    try {
      commit('setLoading', true)
      commit('setCampaigns', await this.$axios.$get('/campaigns', params))
    } catch (err) {
      throw err
    } finally {
      commit('setLoading', false)
    }
  },

  async show({ commit }, id) {
    const [campaign, fleets] = await Promise.all([
      this.$axios.$get(`/campaigns/${id}`),
      this.$axios.$get(`/campaigns/${id}/fleets`)
    ])
    commit('setCampaign', campaign)
    commit('fleets/setFleets', fleets, { root: true })
  },

  async save({ state, dispatch, commit }, payload) {
    const action = state.campaign._id ? 'update' : 'create'
    try {
      commit('setLoading', true)
      await dispatch(action, payload)
    } catch (err) {
      throw err
    } finally {
      commit('setLoading', false)
    }
  },

  async update({ dispatch, state }, payload) {
    const campaign = await this.$axios.$put(
      `/campaigns/${state.campaign._id}`,
      payload
    )
    await dispatch('show', campaign._id)
  },

  async create({ state, dispatch }, payload) {
    const campaign = await this.$axios.$post('/campaigns', payload)
    await dispatch('show', campaign._id)
  },

  async delete({ dispatch }, id) {
    await this.$axios.$delete(`/campaigns/${id}`)
    await dispatch('find')
  }
}
