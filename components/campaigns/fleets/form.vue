<template lang="pug">
  #fleet-form
    v-row
      v-col
        v-text-field(:value="$auth.user.name || $auth.user.email" disabled label="Player name")
      v-col
        v-text-field(label="Fleet name" v-model="value.name")

    v-row
      v-col
        v-select(label="Faction" :items="factions" item-text="label" v-model="value.faction" :disabled="exists")
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
        strategic-effect-tokens(v-model="value.tokens")

    v-row
      v-col
        ships(v-model="value.ships")

    v-row
      v-col
        squadrons(v-model="value.squadrons")

    v-fab-transition(v-if="canSave")
      v-btn(v-show="dirty" fab fixed bottom right color="primary" :loading="loading" @click="$emit('save')")
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
    value: { type: Object, required: true },
    loading: { type: Boolean, default: false },
    dirty: { type: Boolean, default: true }
  },

  computed: {
    factions: () => [
      { label: 'Empire', value: 'empire' },
      { label: 'Rebels', value: 'rebel' }
    ],

    conditions: () => [
      { label: 'Low morale', value: 'low-morale' },
      { label: 'Low fuel', value: 'low-fuel' },
      { label: 'Low supplies', value: 'low-supplies' }
    ],

    exists() {
      return !!this.value._id
    },

    canSave() {
      return (
        !this.exists ||
        (this.$auth.loggedIn && this.value.player === this.$auth.user._id)
      )
    }
  }
}
</script>
