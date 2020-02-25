<template lang="pug">
  v-form#campaign-create(v-model="valid")
    v-text-field(v-model="form.name" label="New campaign name" required :rules="[rules.required]")

    v-row
      v-col(v-for="(faction, i) in [form.empire, form.rebels]" :key="i" cols="12" sm="6")
        v-card
          v-img(:src="faction.img" contain aspect-ratio="5" gradient="to bottom left, rgba(255,255,255,1), rgba(255,255,255,0)")
            v-card-title
              v-text-field(v-model="faction.name" label="Faction name" required :rules="[rules.required]")
          v-card-text
            v-autocomplete(
              required
              multiple
              chips
              deletable-chips
              v-model="faction.players"
              clearable
              :items="users"
              item-text="nickname"
              label="Players"
              return-object
              :search-input.sync="faction.search"
            )
            v-select(v-model="faction.grandAdmiral" :items="faction.players"  required :rules="[rules.required]" label="Grand admiral" item-text="nickname" return-object)

    v-btn(@click="save" color="primary" :loading="loading" :disabled="!valid" fab absolute right)
      v-icon mdi-content-save
</template>

<script>
import { mapState } from 'vuex'
import map from 'lodash/map'
import debounce from 'lodash/debounce'
export default {
  data: () => ({
    valid: true,
    loading: false,
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
    },
    rules: {
      required: (value) => !!value || 'Required.'
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
        this.handleUserSearch(value)
      }
    },
    'form.rebels.search': {
      handler(value) {
        this.handleUserSearch(value)
      }
    }
  },

  created() {
    this.handleUserSearch = debounce(
      (value) =>
        this.$store.dispatch('users/find', {
          email: value,
          page: 1,
          pageSize: 5
        }),
      300
    )
  },

  methods: {
    async save() {
      try {
        this.loading = true
        await this.$store.dispatch('campaigns/create', this.payload)
        this.$toast.success('Campaign created')
        this.$router.push({
          name: 'campaigns-id',
          params: { id: this.$store.state.campaigns.campaign._id }
        })
      } catch (err) {
        this.$toast.error(err)
      } finally {
        this.loading = false
      }
    }
  }
}
</script>
