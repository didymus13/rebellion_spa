<template lang="pug">
  v-container(fluid)
    v-card
      v-card-title
        v-text-field(v-model="form.name" label="New campaign name" required)

    v-row
      v-col(v-for="(faction, i) in form.factions" :key="i" cols="12" sm="6")
        v-card
          v-img(:src="`/${faction.side}.webp`" aspect-ratio="4" contain gradient="to top, rgba(0,0,0,0.9), rgba(0,0,0,0.4)")
            v-card-title
              v-text-field(v-model="faction.name" label="Faction name")
          v-card-text
            v-autocomplete(
              required
              multiple
              chips
              deletable-chips
              v-model="faction.players"
              clearable
              :items="users"
              item-text="username"
              label="Players"
              return-object
              :search-input.sync="search[faction.side]"
            )
            v-select(v-model="faction.grandAdmiral" :items="faction.players" required label="Grand admiral" item-text="username" return-object)

      v-card-actions
        v-btn(color="primary" @click="save")
          v-icon mdi-save
          | Save
</template>

<script>
import { mapState } from 'vuex'
import map from 'lodash/map'
export default {
  data: () => ({
    valid: true,
    form: {
      name: '',
      factions: [
        {
          name: 'The Galactic Empire',
          side: 'empire',
          grandAdmiral: '',
          players: []
        },
        { name: 'The Rebellion', side: 'rebels', grandAdmiral: '', players: [] }
      ]
    },
    search: { empire: '', rebels: '' }
  }),

  computed: {
    ...mapState('users', {
      users: (state) => state.users
    }),
    payload() {
      return {
        name: this.form.name,
        factions: map(this.form.factions, (faction) => {
          return {
            name: faction.name,
            players: map(faction.players, '_id'),
            side: faction.side,
            gradAdmiral: faction.grandAdmiral._id
          }
        })
      }
    }
  },

  watch: {
    'search.empire': {
      handler(value) {
        this.$store.dispatch('users/find', { username: value })
      }
    }
  },

  methods: {
    async save() {
      await this.$store.dispatch('campaigns/create', this.payload)
      this.$router.push({
        name: 'campaigns-id',
        params: { id: this.$store.state.campaigns.campaign._id }
      })
    }
  }
}
</script>
