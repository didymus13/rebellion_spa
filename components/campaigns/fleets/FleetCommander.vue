<template lang="pug">
  div
    v-row
      v-col
        v-text-field(label="Fleet commander")
      v-col
        v-text-field(label="XP earned" type="number")
      v-col
        v-text-field(label="XP sent" type="number")
      v-col
        v-text-field(label="XP available" type="number")

    commander-abilities
</template>

<script>
import CommanderAbilities from '@/components/campaigns/fleets/CommanderAbilities'
export default {
  components: { CommanderAbilities }
}
</script>
