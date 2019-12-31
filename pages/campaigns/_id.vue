<template lang="pug">
  div
    v-card
      v-card-text
        v-row
          v-col(cols="12" sm="6")
            h1.display-1 Rebellion in the rim team roster
          v-col
            v-text-field(v-model="form.act" label="Act" type="number" min="1")
          v-col
            v-text-field(v-model="form.turn" label="Turn" type="number" min="1")

    v-row(v-if="isOwner || isInFaction(faction)" v-for="faction in form.factions" :key="faction._id")
      v-col(cols="12" sm="6")
        v-text-field(label="Team name" v-model="faction.name")
        v-select(label="Grand admiral" v-model="faction.grandAdmiral" :items="faction.players" item-text="username" item-value="_id")
        v-list
          v-subheader Players
          v-list-item(v-for="player in faction.players" :key="player._id")
            v-list-item-content {{ player.username }}

      v-col(cols="12" sm="6")
        v-row
          v-col(cols="4")
            v-text-field(label="VP: Act" v-model="faction.points.act" type="number")
          v-col(cols="4")
            v-text-field(label="VP: Campaign" v-model="faction.points.total" type="number")
          v-col(cols="4")
            v-img(:src="`/${faction.side}.webp`")
          v-col(cols="4")
            v-text-field(label="Ally" v-model="faction.resources.ally" type="number")
          v-col(cols="4")
            v-text-field(label="Destiny" v-model="faction.resources.destiny" type="number")
          v-col(cols="4")
            v-text-field(label="Diplomats" v-model="faction.resources.diplomats" type="number")
          v-col(cols="4")
            v-text-field(label="Repair yards" v-model="faction.resources.repairYards" type="number")
          v-col(cols="4")
            v-text-field(label="Resources" v-model="faction.resources.resources" type="number")
          v-col(cols="4")
            v-text-field(label="Skilled spacers" v-model="faction.resources.skilledSpacers" type="number")
          v-col(cols="4")
            v-text-field(label="Spynet" v-model="faction.resources.spynet" type="number")

    v-card
      v-card-title Systems
        v-spacer
        v-text-field(v-model="search" append-icon="mdi-magnify" label="search" single-line hide-details)
      v-data-table(:headers="headers" :items="form.systems" :items-per-page="30" :search="search")
        template(v-slot:item.faction="{ item }")
          v-select(v-model="item.faction" :items="systemOwnership" item-text="label" item-value="value" clearable)
        template(v-slot:item.baseDefenseObjective="{ item }")
          v-text-field(v-model="item.baseDefenseObjective")
        template(v-slot:item.completedCampaignObjective="{ item }")
          v-text-field(v-model="item.completedCampaignObjective")

    v-btn(color="primary" @click="save")
      v-icon mdi-save
      | Save
</template>

<script>
import { mapState } from 'vuex'
import cloneDeep from 'lodash/cloneDeep'
import includes from 'lodash/includes'

export default {
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
    ]
  }),

  computed: {
    ...mapState('campaigns', {
      campaign: (state) => state.campaign
    }),
    isOwner() {
      return this.campaign.user._id === this.$auth.user._id
    }
  },

  watch: {
    campaign(value) {
      this.form = cloneDeep(value)
    }
  },

  fetch({ store, params }) {
    if (params.payload) store.commit('campaigns/setCampaign', params.payload)
    store.dispatch('campaigns/show', params.id)
  },

  methods: {
    save() {
      this.$store.dispatch('campaigns/save', this.form)
    },
    isInFaction(faction) {
      return includes(faction.players, this.$auth.user._id)
    }
  }
}
</script>
