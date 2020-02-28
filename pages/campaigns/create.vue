<template lang="pug">
  #campaign-create
    v-text-field(v-model="form.name" label="Campaign name")

    v-row
      v-col(v-for="(faction, i) in [form.rebels, form.empire]" :key="i")
        v-card
          v-card-title
            v-text-field(v-model="faction.name")
          v-card-text
            v-select(
              v-model="faction.grandAdmiral"
              label="Grand admiral"
              :items="faction.players"
              item-text="nickname"
              item-value="_id"
            )

            player-search(v-model="faction.players" label="Admirals")
</template>

<script>
import PlayerSearch from '@/components/campaigns/PlayerSearch'
export default {
  components: { PlayerSearch },

  data: () => ({
    form: {
      name: '',
      act: 1,
      turn: 1,
      rebels: {
        name: 'The Rebellion',
        grandAdmiral: '',
        players: []
      },
      empire: {
        name: 'The Galactic Empire',
        grandAdmiral: '',
        players: []
      }
    }
  })
}
</script>
