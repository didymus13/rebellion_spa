<template lang="pug">
v-data-table(:headers="headers" :items="value" hide-default-footer)
  template(v-slot:item.isFlagship="{ item }")
    v-simple-checkbox(v-model="item.isFlagship")
  template(v-slot:item.name="props")
    v-edit-dialog(:return-value.sync="props.item.name") {{ props.item.name }}
      template(v-slot:input)
        v-text-field(v-model="props.item.name" single-line)
  template(v-slot:item.upgrades="props")
    v-edit-dialog(:return-value.sync="props.item.upgrades") {{ props.item.upgrades }}
      template(v-slot:input)
        v-text-field(v-model="props.item.upgrades" single-line)
  template(v-slot:item.points="props")
    v-edit-dialog(:return-value.sync="props.item.points") {{ props.item.points }}
      template(v-slot:input)
        v-text-field(v-model.number="props.item.points" type="number" single-line)
  template(v-slot:item.isVeteran="{ item }")
    v-simple-checkbox(v-model="item.isVeteran")
  template(v-slot:item.isScarred="{ item }")
    v-simple-checkbox(v-model="item.isScarred" color="red")
  template(v-slot:item.actions="{ item }")
    v-icon(small @click="deleteItem(item)" color="red") mdi-delete
</template>

<script>
export default {
  props: {
    value: { type: Array, default: () => [] }
  },

  computed: {
    headers: () => [
      { text: 'Flagship', value: 'isFlagship' },
      { text: 'Ship type / Name', value: 'name' },
      { text: 'Upgrades', value: 'upgrades' },
      { text: 'Points', value: 'points' },
      { text: 'Veteran', value: 'isVeteran' },
      { text: 'Scarred', value: 'isScarred' },
      { text: 'Delete?', sortable: false, value: 'actions' }
    ]
  },

  methods: {
    deleteItem(item) {
      const index = this.value.indexOf(item)
      confirm('Are you sure that you want to delete this ship?') &&
        this.value.splice(index, 1)
    }
  }
}
</script>
