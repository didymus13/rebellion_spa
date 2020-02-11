<template lang="pug">
  v-card
    v-toolbar(flat dark)
      v-toolbar-title Commander abilities

    v-card-text
      v-row
        v-col(cols="6" v-for="(ability, i) in value" :key="i")
          commander-ability(v-model="value[i]")
</template>

<script>
import CommanderAbility from '@/components/campaigns/fleets/CommanderAbilities/CommanderAbility'
export default {
  components: { CommanderAbility },

  props: {
    value: { type: Array, default: () => [] }
  }
}
</script>
