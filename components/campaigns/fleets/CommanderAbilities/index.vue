<template lang="pug">
  v-card
    v-toolbar(flat dark)
      v-toolbar-title Commander abilities
      v-spacer
      v-btn(icon @click="value.push({})")
        v-icon mdi-plus-circle

    v-card-text
      v-row
        v-col(cols="6" v-for="(ability, i) in value" :key="i")
          commander-ability(v-model="value[i]" @delete="value.splice(i,1)")
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
