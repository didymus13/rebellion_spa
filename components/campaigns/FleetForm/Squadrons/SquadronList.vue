<template lang="pug">
v-data-table(:headers="headers" :items="value" hide-default-footer)
  template(v-slot:item.name="props")
    v-edit-dialog(:return-value.sync="props.item.name") {{ props.item.name }}
      template(v-slot:input)
        v-text-field(v-model="props.item.name" single-line)
  template(v-slot:item.points="props")
    v-edit-dialog(:return-value.sync="props.item.points") {{ props.item.points }}
      template(v-slot:input)
        v-text-field(v-model.number="props.item.points" type="number" single-line)
  template(v-slot:item.isVeteran="{ item }")
    v-simple-checkbox(v-model="item.isVeteran")
  template(v-slot:item.isScarred="{ item }")
    v-simple-checkbox(v-model="item.isScarred" color="red")
  template(v-slot:item.actions="{ item }")
    v-icon.mr-4(small @click="value.push({ ...item })") mdi-content-copy
    v-icon(small @click="deleteItem(item)" color="red") mdi-delete
</template>

<script>
export default {
  props: {
    value: { type: Array, default: () => [] }
  },

  computed: {
    headers: () => [
      { text: 'Squadron type / Name', value: 'name' },
      { text: 'Points', value: 'points' },
      { text: 'Veteran', value: 'isVeteran' },
      { text: 'Scarred', value: 'isScarred' },
      { text: 'Actions', sortable: false, value: 'actions' }
    ]
  },

  methods: {
    deleteItem(item) {
      const index = this.value.indexOf(item)
      confirm('Are you sure that you want to delete this squadron?') &&
        this.value.splice(index, 1)
    }
  }
}
</script>
