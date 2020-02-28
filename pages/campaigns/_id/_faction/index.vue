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
          :to="{name: 'campaigns-id-faction-fleets-fleetId', params: { id: $route.params.id, faction: $route.params.faction, fleetId: fleet._id }}"
          nuxt
        )
          v-list-item-content
            v-list-item-title ( {{ fleet.total }} ) {{ fleet.name }}
            v-list-item-subtitle {{ fleet.commander.name }}
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
  }
}
</script>
