<template lang="pug">
  faction-form(v-model="form[$route.params.faction]" @input="update")
</template>

<script>
import { mapState } from 'vuex'
import cloneDeep from 'lodash/cloneDeep'
import FactionForm from '@/components/campaigns/FactionForm'

export default {
  components: { FactionForm },

  data: () => ({
    form: {}
  }),

  computed: {
    ...mapState('campaigns', ['campaign'])
  },

  watch: {
    campaign(value) {
      this.form = cloneDeep(value)
    }
  },

  mounted() {
    this.form = cloneDeep(this.campaign)
  },

  methods: {
    update() {
      this.$store.commit('campaigns/setDirty', true)
      this.$store.commit('campaigns/setCampaign', this.form)
    }
  }
}
</script>
