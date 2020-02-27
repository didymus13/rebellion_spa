<template lang="pug">
v-card
  v-card-title Systems
    v-spacer
    v-text-field(v-model="search" append-icon="mdi-magnify" label="search" single-line hide-details)

  v-data-table(:headers="headers" :items="value.systems" :items-per-page="30" :search="search" hide-default-footer)
    template(v-slot:item.faction="{ item }")
      v-select(v-model="item.faction" :items="systemOwnership" item-text="label" item-value="value" clearable @change="$emit('input', value)")
    template(v-slot:item.baseDefenseObjective="{ item }")
      v-text-field(v-model="item.baseDefenseObjective" clearable @input="$emit('input', value)")
    template(v-slot:item.completedCampaignObjective="{ item }")
      v-text-field(v-model="item.completedCampaignObjective" clearable @input="$emit('input', value)")
</template>

<script>
export default {
  props: {
    value: { type: Object, default: () => ({}) }
  },

  data: () => ({
    search: ''
  }),

  computed: {
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
  }
}
</script>
