import filter from 'lodash/filter'
export const state = () => ({
  fleets: [],
  fleet: {},
  loading: false
})

export const getters = {
  empire: (state) =>
    filter(state.fleets, (fleet) => fleet.faction === 'empire'),
  rebel: (state) => filter(state.fleets, (fleet) => fleet.faction === 'rebel'),
  fleetExists: (state) => !!state.fleet._id
}

export const mutations = {
  setFleets(state, list) {
    state.fleets = list
  },
  setFleet(state, fleet) {
    state.fleet = fleet
  },
  setLoading(state, loading) {
    state.loading = loading
  }
}

export const actions = {
  async create({ commit, state }, { payload, campaign }) {
    try {
      commit('setLoading', true)
      const fleet = await this.$axios.$post(
        `/campaigns/${campaign.id}/fleets`,
        payload
      )
      commit('setFleet', fleet)
    } finally {
      commit('setLoading', false)
    }
  },
  async update({ commit, state }, payload) {
    try {
      commit('setLoading', true)
      commit(
        'setFleet',
        await this.$axios.$put(`/fleets/${state.fleet._id}`, payload)
      )
    } catch (err) {
      throw err
    } finally {
      commit('setLoading', false)
    }
  },
  async show({ commit }, id) {
    try {
      commit('setLoading', true)
      commit('setFleet', await this.$axios.$get(`/fleets/${id}`))
    } catch (err) {
      throw err
    } finally {
      commit('setLoading', false)
    }
  }
}
