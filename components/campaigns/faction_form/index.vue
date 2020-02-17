<template lang="pug">
v-row
  v-col(cols="12", sm="6")
    v-card
      v-img(:src="img" aspect-ratio="4" contain gradient="to top, rgba(255,255,255,0.6), rgba(255,255,255,1)")
        v-card-text
          v-text-field(label="Team name" v-model="value.name")
          v-select(label="Grand admiral" v-model="value.grandAdmiral" :items="value.players" item-text="username" item-value="_id")

      v-list
        v-subheader Fleets
        v-list-item(
          two-line
          v-for="fleet in fleets"
          :key="fleet._id"
          :to="{ name: 'campaigns-id-fleets-fleetId', params: { id: fleet.campaign, fleetId: fleet._id, payload: fleet } }"
        )
          v-list-item-content
            v-list-item-title ({{ fleet.total }}) {{ fleet.name }}
            v-list-item-subtitle {{ fleet.commander.name }}
        v-list-item(v-if="fleets.length < 1")
          v-list-item-content There are no fleets in this faction yet.
      v-card-actions(v-if="!hasPlayerFleet")
        v-spacer
        v-btn(:to="{ name: 'campaigns-id-fleets-create', params: { campaign: value._id, payload: value } }") Create Your fleet

  v-col(cols="12" sm="6")
    v-card
      v-card-title
        v-row
          v-col(cols="6")
            v-text-field(label="VP: Act" v-model="value.points.act" type="number")
          v-col(cols="6")
            v-text-field(label="VP: Campaign" v-model="value.points.total" type="number")
      v-card-text
        v-row
          v-col(cols="6")
            v-text-field(label="Ally" v-model="value.resources.ally" type="number")
          v-col(cols="6")
            v-text-field(label="Destiny" v-model="value.resources.destiny" type="number")
          v-col(cols="6")
            v-text-field(label="Diplomats" v-model="value.resources.diplomats" type="number")
          v-col(cols="6")
            v-text-field(label="Repair yards" v-model="value.resources.repairYards" type="number")
          v-col(cols="4")
            v-text-field(label="Resources" v-model="value.resources.resources" type="number")
          v-col(cols="4")
            v-text-field(label="Skilled spacers" v-model="value.resources.skilledSpacers" type="number")
          v-col(cols="4")
            v-text-field(label="Spynet" v-model="value.resources.spynet" type="number")
</template>

<script>
import filter from 'lodash/filter'
export default {
  props: {
    value: { type: Object, required: true },
    img: { type: String, required: true },
    fleets: { type: Array, default: () => [] }
  },

  computed: {
    hasPlayerFleet() {
      if (!this.$auth.logged) return false
      const userFleets = filter(
        this.fleets,
        (fleet) => fleet.player === this.$auth.user._id
      )
      return userFleets.length > 0
    }
  },

  methods: {
    isPlayerFleet(fleet) {
      return this.$auth.loggedIn && fleet.player === this.$auth.user._id
    }
  }
}
</script>
