export const state = () => ({
  users: [],
  user: {}
})

export const mutations = {
  setUsers(state, list) {
    state.users = list
  },

  setUser(state, user) {
    state.user = user
  }
}

export const actions = {
  async find({ commit }, params) {
    const users = await this.$axios.$get('/user.index', { params })
    commit('setUsers', users)
  },
  async show({ commit }, id) {
    commit('setUser', await this.$axios.$get(`/user.show/${id}`))
  }
}
