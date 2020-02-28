<template lang="pug">
  #fleet-form
    v-row
      v-col
        v-text-field(label="Fleet name" v-model="value.name")

    v-row
      v-col
        v-select(label="Faction" :items="factions" item-text="label" v-model="value.faction" disabled)
      v-col
        v-select(label="Fleet condition" v-model="value.condition" :items="conditions" item-text="label" clearable)

    v-row
      v-col
        objectives(v-model="value.objectives")

    v-row
      v-col
        battle-record(v-model="value.battles")

    v-row
      v-col
        fleet-commander(v-model="value.commander")

    v-row
      v-col
        strategic-effect-tokens(v-model="value.strategicEffectTokens")

    v-row
      v-col
        ships(v-model="value.ships")

    v-row
      v-col
        squadrons(v-model="value.squadrons")
</template>

<script>
import Objectives from '@/components/campaigns/FleetForm/Objectives'
import BattleRecord from '@/components/campaigns/FleetForm/BattleRecord'
import CommanderAbilities from '@/components/campaigns/FleetForm/CommanderAbilities'
import StrategicEffectTokens from '@/components/campaigns/FleetForm/StrategicEffectTokens'
import Ships from '@/components/campaigns/FleetForm/Ships'
import Squadrons from '@/components/campaigns/FleetForm/Squadrons'
import FleetCommander from '@/components/campaigns/FleetForm/FleetCommander'

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
  },

  computed: {
    factions: () => [
      { label: 'Empire', value: 'empire' },
      { label: 'Rebels', value: 'rebels' }
    ],

    conditions: () => [
      { label: 'Low morale', value: 'low-morale' },
      { label: 'Low fuel', value: 'low-fuel' },
      { label: 'Low supplies', value: 'low-supplies' }
    ]
  }
}
</script>
