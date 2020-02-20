export const state = () => ({
  users: [],
  user: {},
  loading: false
})

export const mutations = {
  setUsers(state, list) {
    state.users = list
  },

  setLoading(state, loading) {
    state.loading = loading
  }
}

export const actions = {
  async find({ commit }, params) {
    try {
      commit('setLoading', true)
      const users = await this.$axios.$get('/private/users', { params })
      commit('setUsers', users)
    } catch (err) {
      throw err
    } finally {
      commit('setLoading', false)
    }
  }
}
