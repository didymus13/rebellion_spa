<template lang="pug">
  div
    v-row
      v-col
        v-text-field(label="Fleet commander" v-model="value.name")
      v-col
        v-text-field(label="XP earned" type="number" v-model.number="value.xp")
      v-col
        v-text-field(label="XP spent" type="number" :value="xpSpent" disabled)
      v-col
        v-text-field(label="XP available" type="number" :value="value.xp - xpSpent || 0" disabled)

    commander-abilities(v-model="value.abilities")
</template>

<script>
import sumBy from 'lodash/sumBy'
import CommanderAbilities from '@/components/campaigns/fleets/CommanderAbilities'
export default {
  components: { CommanderAbilities },

  props: {
    value: { type: Object, default: () => ({ xp: 0, abilities: [] }) }
  },

  computed: {
    xpSpent() {
      return sumBy(this.value.abilities, 'cost') || 0
    }
  }
}
</script>
