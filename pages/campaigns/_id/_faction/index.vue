<template lang="pug">
v-row
  v-col(cols="12" md="6")
    v-card
      v-card-text
        faction-form(v-model="value")
  v-col(cols="12" md="6")
    v-card
      v-card-title.display-1 Fleets
      v-list(two-line)
        v-list-item(
          v-for="fleet in value.fleets"
          :key="fleet._id"
          :to="{ name: 'campaigns-id-faction-fleets-fleetId', params: { id: $route.params.id, faction: $route.params.faction, fleetId: fleet._id } }"
          nuxt
        )
          v-list-item-content
            v-list-item-title ( {{ fleet.total }} ) {{ fleet.name }}
            v-list-item-subtitle {{ fleet.commander.name }}
          v-list-item-action(v-if="canDelete(fleet)")
            v-btn(@click.prevent="destroy(fleet)" icon color="red")
              v-icon(small) mdi-delete

      v-card-actions
        v-spacer
        v-btn(
          :to="{ name: 'campaigns-id-faction-fleets-create' , params: { id: $route.params.id , faction: $route.params.faction } }"
          nuxt
          text
        ) Create a new fleet
</template>

<script>
import FactionForm from '@/components/campaigns/FactionForm'

export default {
  components: { FactionForm },

  props: {
    value: { type: Object, default: () => ({}) }
  },

  methods: {
    canDelete(fleet) {
      return (
        this.value.grandAdmiral.sub === this.$auth.user.sub ||
        fleet.fleet.player.sub === this.$auth.user.sub
      )
    },

    async destroy(fleet) {
      if (confirm(`Are you sure that you want to delete "${fleet.name}"`)) {
        await this.$store.dispatch('campaigns/deleteFleet', {
          ...this.$route.params,
          fleetId: fleet._id
        })
      }
    }
  }
}
</script>
