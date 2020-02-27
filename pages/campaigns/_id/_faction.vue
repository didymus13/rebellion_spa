<template lang="pug">
  #faction-detail
    h1.display-1 {{ faction.name }}

    nuxt-child
</template>

<script>
import { mapState } from 'vuex'
export default {
  computed: {
    ...mapState('campaigns', ['campaign']),

    faction() {
      const isEmpire = this.$route.params.faction === 'empire'
      return isEmpire ? this.campaign.empire : this.campaign.rebels
    }
  }
}
</script>
