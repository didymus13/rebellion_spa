<template lang="pug">
  #fleet-creation
    fleet-form(v-model="form")
    v-fab-transition
      v-btn(fab v-show="dirty" fixed bottom right color="primary" :loading="loading" @click="save")
        v-icon mdi-content-save
</template>

<script>
import { mapState } from 'vuex'
import FleetForm from '@/components/campaigns/FleetForm'
export default {
  components: { FleetForm },

  props: {
    // Faction data
    value: { type: Object, default: () => ({}) }
  },

  data() {
    return {
      valid: false,
      dirty: false,
      form: {
        battles: [],
        commander: {
          abilities: [],
          name: '',
          xp: { spent: 0, total: 0 }
        },
        condition: '',
        faction: this.$route.params.faction,
        name: '',
        objectives: { assault: '', defense: '', navigation: '' },
        ships: [],
        squadrons: [],
        strategicEffectTokens: { ally: 0, destiny: 0, spynet: 0 }
      }
    }
  },

  computed: {
    ...mapState('campaigns', ['loading', 'campaign'])
  },

  watch: {
    form: {
      deep: true,
      handler() {
        this.dirty = true
      }
    }
  },

  methods: {
    async save() {
      try {
        await this.$store.dispatch('campaigns/createFleet', {
          id: this.$route.params.id,
          faction: this.$route.params.faction,
          fleet: this.form
        })
        this.$router.push({
          name: 'campaigns-id-faction',
          params: {
            id: this.$route.params.id,
            faction: this.$route.params.faction
          }
        })
      } catch (err) {
        this.$toast.error(err)
      }
    }
  }
}
</script>
