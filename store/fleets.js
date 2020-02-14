export const state = () => ({
  fleets: [],
  fleet: {},
  loading: false
})

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
  }
}
