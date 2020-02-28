<template lang="pug">
  #campaign-overview
    v-card.my-4
      v-card-text
        v-row
          v-col
            v-text-field(v-model="value.name" label="Campaign name")
          v-col
            v-text-field(v-model.number="value.act" label="Act" type="number")
          v-col
            v-text-field(v-model.number="value.turn" label="Turn" type="number")

    systems-overview(v-model="value")
</template>

<script>
import SystemsOverview from '@/components/campaigns/SystemsOverview'
export default {
  components: { SystemsOverview },

  props: {
    value: { type: Object, default: () => ({}) }
  }
}
</script>
