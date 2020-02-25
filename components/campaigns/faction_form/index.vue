<template lang="pug">
v-row
  v-col(cols="12", sm="6")
    faction-card(v-model="value" :img="img" :faction="faction" :campaign="campaign")

  v-col(cols="12" sm="6")
    resource-card(v-model="value")
</template>

<script>
import FactionCard from '@/components/campaigns/faction_form/FactionCard'
import ResourceCard from '@/components/campaigns/faction_form/ResourceCard'

export default {
  components: { FactionCard, ResourceCard },

  props: {
    value: { type: Object, required: true },
    img: { type: String, required: true },
    faction: { type: String, default: null },
    campaign: { type: Object, required: true }
  }
}
</script>
