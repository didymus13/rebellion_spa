<template lang="pug">
  div
    v-toolbar.grey.lighten-2(flat)
      v-toolbar-title Commander abilities
      v-spacer
      v-dialog(v-model="dialog" max-width="500px")
        template(v-slot:activator="{ on }")
          v-btn(icon v-on="on")
            v-icon mdi-plus-circle

        commander-ability(@add="add")

    commander-ability-list(v-model="value")
</template>

<script>
import CommanderAbility from '@/components/campaigns/fleets/CommanderAbilities/CommanderAbility'
import CommanderAbilityList from '@/components/campaigns/fleets/CommanderAbilities/CommanderAbilityList'
export default {
  components: { CommanderAbility, CommanderAbilityList },

  props: {
    value: { type: Array, default: () => [] }
  },

  data: () => ({
    dialog: false
  }),

  methods: {
    add(form) {
      this.value.push({ ...form })
      this.dialog = false
    }
  }
}
</script>
