<template lang="pug">
v-data-table(:headers="headers" :items="value" hide-default-footer :expanded.sync="expanded" item-key="_id" show-expand)
  template(v-slot:item.name="props")
    v-edit-dialog(:return-value.sync="props.item.name") {{ props.item.name }}
      template(v-slot:input)
        v-text-field(v-model="props.item.name" single-line)
  template(v-slot:item.tier="props")
    v-edit-dialog(:return-value.sync="props.item.tier") {{ props.item.tier }}
      template(v-slot:input)
        v-select(v-model="props.item.tier" :items="tiers" single-line)
  template(v-slot:item.cost="props")
    v-edit-dialog(:return-value.sync="props.item.cost") {{ props.item.cost }}
      template(v-slot:input)
        v-text-field(v-model.number="props.item.cost" type="number" single-line)
  template(v-slot:item.actions="{ item }")
    v-icon(small @click="deleteItem(item)" color="red") mdi-delete
  template(v-slot:expanded-item="{ item, headers }")
    td(:colspan="headers.length" flat) {{ item.rules }}
</template>

<script>
export default {
  props: {
    value: { type: Array, default: () => [] }
  },

  data: () => ({
    expanded: []
  }),

  computed: {
    headers: () => [
      { text: 'Rules summary', value: 'data-table-expand' },
      { text: 'Name', value: 'name' },
      { text: 'Tier', value: 'tier' },
      { text: 'Cost', value: 'cost' },
      { text: 'Category', value: 'category' },
      { text: 'Actions', value: 'actions', sortable: false }
    ],

    tiers: () => ['I', 'II', 'III', 'IV'],
    categories: () => [
      'engineering',
      'espionnage',
      'gunnery',
      'logistics',
      'navigation',
      'squadron tactics'
    ]
  },

  methods: {
    deleteItem(item) {
      const index = this.value.indexOf(item)
      confirm('Are you sure that you want to delete this ability?') &&
        this.value.splice(index, 1)
    }
  }
}
</script>
