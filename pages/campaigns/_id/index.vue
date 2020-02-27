<template lang="pug">
  #campaign-overview
    h1.title Campaign overview here

    systems-overview(v-model="form" @input="$store.commit('campaigns/setCampaign', $event)")
</template>

<script>
import { mapState } from 'vuex'
import cloneDeep from 'lodash/cloneDeep'
import SystemsOverview from '@/components/campaigns/SystemsOverview'
export default {
  components: { SystemsOverview },

  data: () => ({
    form: {}
  }),

  computed: {
    ...mapState('campaigns', ['campaign'])
  },

  watch: {
    campaign: {
      deep: true,
      handler(value) {
        this.form = cloneDeep(value)
      }
    },
    form: {
      deep: true,
      handler(value) {
        this.$store.commit('campaigns/setDirty', true)
      }
    }
  },

  mounted() {
    this.form = cloneDeep(this.campaign)
  }
}
</script>
