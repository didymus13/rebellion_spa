<template lang="pug">
  #fleet-form
    v-row
      v-col
        v-text-field(disabled :value="$auth.user.name" label="Player name")
      v-col
        v-text-field(label="Fleet name")
    v-row
      v-col
        v-select(label="Faction")
      v-col
        v-select(label="Fleet condition")

    v-row
      v-col
        objectives(v-model="value.objectives")

    v-row
      v-col
        battle-record(:items="value.battles")

    v-row
      v-col
        fleet-commander

    v-row
      v-col
        strategic-effect-tokens

    v-row
      v-col
        ships(v-model="value.ships")

    v-row
      v-col
        squadrons(v-model="value.squadrons")
</template>

<script>
import Objectives from '@/components/campaigns/fleets/Objectives'
import BattleRecord from '@/components/campaigns/fleets/BattleRecord'
import CommanderAbilities from '@/components/campaigns/fleets/CommanderAbilities'
import StrategicEffectTokens from '@/components/campaigns/fleets/StrategicEffectTokens'
import Ships from '@/components/campaigns/fleets/Ships'
import Squadrons from '@/components/campaigns/fleets/Squadrons'
import FleetCommander from '@/components/campaigns/fleets/FleetCommander'

export default {
  components: {
    Objectives,
    BattleRecord,
    CommanderAbilities,
    StrategicEffectTokens,
    Ships,
    Squadrons,
    FleetCommander
  },

  props: {
    value: { type: Object, default: () => ({}) }
  }
}
</script>
