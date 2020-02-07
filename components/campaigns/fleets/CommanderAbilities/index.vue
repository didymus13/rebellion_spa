<template lang="pug">
  v-card
    v-toolbar(flat dark)
      v-toolbar-title Commander abilities

    v-card-text
      v-row
        v-col(cols="6" v-for="i in [1,2,3,4]" :key="i")
          commander-ability
</template>

<script>
import CommanderAbility from '@/components/campaigns/fleets/CommanderAbilities/CommanderAbility'
export default {
  components: { CommanderAbility }
}
</script>
