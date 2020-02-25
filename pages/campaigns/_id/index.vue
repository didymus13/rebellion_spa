<template lang="pug">
  #campaign-overview
    h1.title Campaign overview here

    v-card
      v-card-title Systems
        v-spacer
        v-text-field(v-model="search" append-icon="mdi-magnify" label="search" single-line hide-details)

      v-data-table(:headers="headers" :items="form.systems" :items-per-page="30" :search="search" hide-default-footer)
        template(v-slot:item.faction="{ item }")
          v-select(v-model="item.faction" :items="systemOwnership" item-text="label" item-value="value" clearable @change="update")
        template(v-slot:item.baseDefenseObjective="{ item }")
          v-text-field(v-model="item.baseDefenseObjective" clearable @input="update")
        template(v-slot:item.completedCampaignObjective="{ item }")
          v-text-field(v-model="item.completedCampaignObjective" clearable @input="update")
</template>

<script>
import { mapState } from 'vuex'
import cloneDeep from 'lodash/cloneDeep'
export default {
  data: () => ({
    form: {},
    search: ''
  }),

  computed: {
    ...mapState('campaigns', ['campaign']),
    headers: () => [
      { text: 'Area', value: 'regions' },
      { text: 'Location', value: 'name' },
      { text: 'Owner', value: 'faction' },
      { text: 'Base defense objective', value: 'baseDefenseObjective' },
      {
        text: 'Completed campaign objectives',
        value: 'completedCampaignObjective'
      }
    ],
    systemOwnership: () => [
      { label: 'Imperial base', value: 'empire-base', color: 'indigo' },
      { label: 'Imperial presence', value: 'empire', color: 'indigo accent-1' },
      { label: 'Rebel presence', value: 'rebel', color: 'red accent-1' },
      { label: 'Rebel base', value: 'rebel-base', color: 'red' }
    ]
  },

  watch: {
    campaign: {
      deep: true,
      handler(value) {
        this.form = cloneDeep(value)
      }
    }
  },

  mounted() {
    this.form = cloneDeep(this.campaign)
  },

  methods: {
    update() {
      this.$store.commit('campaigns/setCampaign', this.form)
      this.$store.commit('campaigns/setDirty', true)
    }
  }
}
</script>
