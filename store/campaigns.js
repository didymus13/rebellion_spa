import cloneDeep from 'lodash/cloneDeep'

export const state = () => ({
  campaigns: [],
  campaign: {
    empire: { points: {} },
    rebels: { points: {} }
  },
  loading: false,
  dirty: false
})

export const getters = {
  exists: (state) => !!state.campaign._id
}

export const mutations = {
  setCampaigns(state, list) {
    state.campaigns = list
  },

  setCampaign(state, campaign) {
    state.campaign = cloneDeep(campaign)
  },

  setLoading(state, loading) {
    state.loading = loading
  },

  setDirty(state, dirty) {
    state.dirty = dirty
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
    commit('setDirty', false)
  },

  async save({ state, dispatch, commit, getters }, payload) {
    const action = getters.exists ? 'update' : 'create'
    try {
      commit('setLoading', true)
      await dispatch(action, payload)
    } catch (err) {
      throw err
    } finally {
      commit('setLoading', false)
      commit('setDirty', false)
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

  async createFleet({ state, dispatch }, { id, faction, fleet }) {
    const campaign = await this.$axios.$post(
      `/private/campaigns/${id}/${faction}/fleets`,
      fleet
    )
    await dispatch('show', campaign._id)
  }
}
