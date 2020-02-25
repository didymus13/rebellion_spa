<template lang="pug">
  div
    v-card
      v-card-text
        v-row
          v-col(cols="12" sm="6")
            v-text-field(v-model="form.name" label="Rebellion in the rim campaign name")
          v-col
            v-text-field(v-model="form.act" label="Act" type="number" min="1")
          v-col
            v-text-field(v-model="form.turn" label="Turn" type="number" min="1")

    faction-sheet(v-model="form.rebels" :fleets="form.rebels.fleets" img="/rebels.webp" faction="rebels")
    faction-sheet(v-model="form.empire" :fleets="form.empire.fleets" img="/empire.webp" faction="empire")

    v-card
      v-card-title Systems
        v-spacer
        v-text-field(v-model="search" append-icon="mdi-magnify" label="search" single-line hide-details)

      v-data-table(:headers="headers" :items="form.systems" :items-per-page="30" :search="search" hide-default-footer)
        template(v-slot:item.faction="{ item }")
          v-select(v-model="item.faction" :items="systemOwnership" item-text="label" item-value="value" clearable)
        template(v-slot:item.baseDefenseObjective="{ item }")
          v-text-field(v-model="item.baseDefenseObjective")
        template(v-slot:item.completedCampaignObjective="{ item }")
          v-text-field(v-model="item.completedCampaignObjective")

    v-fab-transition
      v-btn(v-show="isDirty" fab fixed bottom right color="primary" :loading="loading" @click="save")
        v-icon mdi-content-save
</template>

<script>
import { mapState, mapGetters } from 'vuex'
import cloneDeep from 'lodash/cloneDeep'
import includes from 'lodash/includes'
import FactionSheet from '@/components/campaigns/faction_form'

export default {
  components: {
    FactionSheet
  },

  data: () => ({
    headers: [
      { text: 'Area', value: 'regions' },
      { text: 'Location', value: 'name' },
      { text: 'Owner', value: 'faction' },
      { text: 'Base defense objective', value: 'baseDefenseObjective' },
      {
        text: 'Completed campaign objectives',
        value: 'completedCampaignObjective'
      }
    ],
    form: {},
    search: '',
    systemOwnership: [
      { label: 'Imperial base', value: 'empire-base', color: 'indigo' },
      { label: 'Imperial presence', value: 'empire', color: 'indigo accent-1' },
      { label: 'Rebel presence', value: 'rebel', color: 'red accent-1' },
      { label: 'Rebel base', value: 'rebel-base', color: 'red' }
    ],
    isDirty: false
  }),

  computed: {
    ...mapState('campaigns', {
      campaign: (state) => state.campaign,
      loading: (state) => state.loading
    }),
    ...mapState('fleets', {
      fleets: (state) => state.fleets
    }),
    ...mapGetters('fleets', ['rebel', 'empire'])
  },

  watch: {
    campaign: {
      deep: true,
      immediate: true,
      handler(value) {
        this.form = cloneDeep(value)
      }
    },
    form: {
      deep: true,
      handler(value) {
        this.isDirty = true
      }
    }
  },

  async fetch({ store, params }) {
    if (params.payload) store.commit('campaigns/setCampaign', params.payload)
    await store.dispatch('campaigns/show', params.id)
  },

  methods: {
    async save() {
      try {
        await this.$store.dispatch('campaigns/save', this.form)
        this.isDirty = false
        this.$toast.success('Campaign updated')
      } catch (err) {
        this.$toast.error(err)
      }
    },

    isInFaction(faction) {
      return includes(faction.players, this.$auth.user._id)
    }
  }
}
</script>
