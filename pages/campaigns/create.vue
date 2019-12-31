<template lang="pug">
  v-container(fluid)
    v-card
      v-card-title
        v-text-field(v-model="form.name" label="New campaign name" required)

    v-row
      v-col(v-for="(faction, i) in [form.empire, form.rebels]" :key="i" cols="12" sm="6")
        v-card
          v-img(:src="faction.img" contain aspect-ratio="5" gradient="to bottom left, rgba(255,255,255,1), rgba(255,255,255,0)")
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
              :search-input.sync="faction.search"
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
      empire: {
        name: 'The Galactic Empire',
        side: 'empire',
        grandAdmiral: '',
        players: [],
        img: '/empire.webp',
        search: ''
      },
      rebels: {
        name: 'The Rebellion',
        side: 'rebels',
        grandAdmiral: '',
        players: [],
        img: '/rebels.webp',
        search: ''
      }
    }
  }),

  computed: {
    ...mapState('users', {
      users: (state) => state.users
    }),
    payload() {
      return {
        name: this.form.name,
        rebels: {
          name: this.form.rebels.name,
          players: map(this.form.rebels.players, '_id'),
          grandAdmiral: this.form.rebels.grandAdmiral._id
        },
        empire: {
          name: this.form.empire.name,
          players: map(this.form.empire.players, '_id'),
          grandAdmiral: this.form.empire.grandAdmiral._id
        }
      }
    }
  },

  watch: {
    'form.empire.search': {
      handler(value) {
        this.$store.dispatch('users/find', { username: value })
      }
    },
    'form.rebels.search': {
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
