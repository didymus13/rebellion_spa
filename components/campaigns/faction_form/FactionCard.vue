<template lang="pug">
v-card
  v-img(:src="img" aspect-ratio="4" contain gradient="to top, rgba(255,255,255,0.6), rgba(255,255,255,1)")
    v-card-text
      v-text-field(label="Team name" v-model="value.name")
      v-select(label="Grand admiral" v-model="value.grandAdmiral" :items="value.players" item-text="nickname" item-value="_id")

  v-list(dense)
    v-list-item(
      v-for="fleet in value.fleets"
      :key="fleet._id" two-line
      :to="{ name: 'campaigns-id-faction-fleets-fleetId', params: { id: campaign._id, fleetId: fleet._id, faction } }"
    )
      v-list-item-title {{ fleet.name }}
      v-list-item-subtitle {{ fleet.player }}

  v-card-actions(v-if="!hasPlayerFleet")
    v-spacer
    v-btn(:to="{ name: 'campaigns-id-fleets-create', params: { campaign: value._id, payload: value }, query: { faction } }" nuxt) Create Your fleet
</template>

<script>
import includes from 'lodash/includes'
export default {
  props: {
    value: { type: Object, required: true },
    img: { type: String, default: null },
    faction: { type: String, required: true },
    campaign: { type: Object, required: true }
  },

  computed: {
    hasPlayerFleet() {
      return includes(this.value.fleets, { player: this.$auth.user._id })
    }
  }
}
</script>
