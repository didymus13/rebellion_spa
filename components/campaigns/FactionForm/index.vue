<template lang="pug">
  #faction-sheet
    v-text-field(v-model="value.name" label="Name" clearable @input="update")
    v-select(
      v-model="value.grandAdmiral"
      label="Grand admiral"
      :items="value.players"
      item-text="nickname"
      item-value="_id"
      @change="update"
    )

    v-autocomplete(
      v-model="value.players"
      :items="users"
      :search-input.sync="search"
      :loading="loading"
      @change="update"
      multiple
      chips
      deletable-chips
      item-text="nickname"
      item-value="_id"
      label="Admirals"
    )

    // Points
    v-row
      v-col
        v-text-field(v-model.number="value.points.act" label="Act VPs" type="number" @input="update")
      v-col
        v-text-field(v-model.number="value.points.total" label="Total VPs" type="number" @input="update")

    // Resources
    v-row
      v-col
        v-text-field(v-model.number="value.resources.ally" label="Allies" type="number" min="0" @input="update")
      v-col
        v-text-field(v-model.number="value.resources.destiny" label="Destiny" type="number" @input="update")
      v-col
        v-text-field(v-model.number="value.resources.diplomats" label="Diplomats" type="number" @input="update")
    v-row
      v-col
        v-text-field(v-model.number="value.resources.repairYards" label="Repair yards" type="number" @input="update")
      v-col
        v-text-field(v-model.number="value.resources.skilledSpacers" label="Skilled spacers" type="number" @input="update")
      v-col
        v-text-field(v-model.number="value.resources.spynet" label="Spynet" type="number" @input="update")
</template>

<script>
import { mapState } from 'vuex'
import debounce from 'lodash/debounce'
export default {
  props: {
    value: { type: Object, default: () => ({ points: {}, resources: {} }) } // Faction object
  },

  data() {
    return {
      search: ''
    }
  },

  computed: {
    ...mapState('users', ['users', 'loading'])
  },

  watch: {
    search(value) {
      this.handleUserSearch(value)
    }
  },

  created() {
    this.handleUserSearch = debounce(
      (value) =>
        this.$store.dispatch('users/find', {
          email: value,
          page: 1,
          pageSize: 5
        }),
      300
    )
  },

  methods: {
    update() {
      this.$emit('input', this.value)
    }
  }
}
</script>
