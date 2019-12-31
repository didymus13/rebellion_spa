export const state = () => ({
  fleets: [],
  fleet: {}
})

export const mutations = {
  setFleets(state, list) {
    state.fleets = list
  }
}
