<template lang="pug">
  #campaign-create
    v-form(v-model="valid" @submit.prevent="create")
      v-text-field(v-model="form.name" label="Campaign name" :rules="[rules.required]")

      v-row
        v-col(v-for="(faction, i) in [form.rebels, form.empire]" :key="i" cols="12" sm="6")
          v-card
            v-card-title
              v-text-field(v-model="faction.name" :rules="[rules.required]")
            v-card-text
              player-search(v-model="faction.players" label="Admirals")
              v-select(
                v-model="faction.grandAdmiral"
                label="Grand admiral"
                :items="faction.players"
                item-text="nickname"
                return-object
                :rules="[rules.required]"
              )

      v-fab-transition
        v-btn(fab v-show="dirty" :disabled="!valid" fixed bottom right color="primary" type="submit" :loading="$store.state.campaigns.loading")
          v-icon mdi-content-save
</template>

<script>
import PlayerSearch from '@/components/campaigns/PlayerSearch'
import rules from '@/assets/ValidationRules'
export default {
  components: { PlayerSearch },

  head() {
    return {
      title: this.title,
      meta: [{ property: 'og:title', content: this.title }]
    }
  },

  data: () => ({
    rules,
    valid: true,
    dirty: false,
    form: {
      name: '',
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
    },
    title: 'Create a new Rebellion in the Rim campaign'
  }),

  watch: {
    form: {
      deep: true,
      handler() {
        this.dirty = true
      }
    }
  },

  methods: {
    async create() {
      try {
        await this.$store.dispatch('campaigns/create', this.form)
        this.$router.push({
          name: 'campaigns-id',
          params: { id: this.$store.state.campaigns.campaign._id }
        })
        this.$toast.success('Created')
      } catch (err) {
        this.$toast.error(err)
      }
    }
  }
}
</script>
