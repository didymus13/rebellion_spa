<template lang="pug">
  #fleet-form
    v-row
      v-col
        v-text-field(disabled :value="$auth.user.name || $auth.user.email" label="Player name")
      v-col
        v-text-field(label="Fleet name" v-model="value.name")
          
    v-row
      v-col
        v-select(label="Faction" :items="factions" item-text="label" v-model="value.faction")
      v-col
        v-select(label="Fleet condition" v-model="value.condition")

    v-row
      v-col
        objectives(v-model="value.objectives")

    v-row
      v-col
        battle-record(:items="value.battles")

    v-row
      v-col
        fleet-commander(v-model="value.commander")

    v-row
      v-col
        strategic-effect-tokens(v-model="value.tokens")

    v-row
      v-col
        ships(v-model="value.ships")

    v-row
      v-col
        squadrons(v-model="value.squadrons")

    v-btn(fab fixed bottom right color="primary" :loading="loading")
      v-icon mdi-content-save
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
    value: {
      _id: null,
      type: Object,
      default: () => ({
        name: '',
        user: {},
        faction: '',
        condition: '',
        objectives: {
          assault: '',
          defense: '',
          navigation: ''
        },
        battleRecord: [],
        commander: {
          name: '',
          xp: 0,
          abilities: [{ name: '', xp: 0 }, {}, {}, {}]
        },
        tokens: {
          ally: 0,
          destiny: 0,
          spynet: 0
        },
        ships: [],
        squadrons: []
      })
    }
  },

  data: () => ({
    loading: false
  }),

  computed: {
    factions: () => [
      { label: 'Empire', value: 'empire' },
      { label: 'Rebels', value: 'rebels' }
    ]
  }
}
</script>
