import get from 'lodash/get'

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
  },

  addFleet(state, { faction, fleet }) {
    const fleets = get(state.campaign, [faction, 'fleets'])
    fleets.push(fleet)
  }
}

export const actions = {
  async find({ commit, state }, params) {
    try {
      commit('setLoading', true)
      commit(
        'setCampaigns',
        await this.$axios.$get('/private/campaigns', params)
      )
    } catch (err) {
      throw err
    } finally {
      commit('setLoading', false)
    }
  },

  async show({ commit }, id) {
    const [campaign] = await Promise.all([
      this.$axios.$get(`/private/campaigns/${id}`)
    ])
    commit('setCampaign', campaign)
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
      `/private/campaigns/${state.campaign._id}`,
      payload
    )
    await dispatch('show', campaign._id)
  },

  async create({ state, dispatch }, payload) {
    const campaign = await this.$axios.$post('/private/campaigns', payload)
    await dispatch('show', campaign._id)
  },

  async delete({ dispatch }, id) {
    await this.$axios.$delete(`/private/campaigns/${id}`)
    await dispatch('find')
  },

  // fleet Management
  // params: { fleet, faction }
  createFleet({ commit }, params) {
    try {
      commit('setLoading', true)
      commit('addFleet', params)
    } catch (err) {
      throw err
    } finally {
      commit('setLoading', false)
    }
  }
}
