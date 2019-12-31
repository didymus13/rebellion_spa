export const state = () => ({
  users: []
})

export const mutations = {
  setUsers(state, list) {
    state.users = list
  }
}

export const actions = {
  async find({ commit }, params) {
    commit('setUsers', await this.$axios.$get('/users', { params }))
  }
}
