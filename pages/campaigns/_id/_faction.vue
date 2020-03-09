<template lang="pug">
  #faction-detail
    h1.display-1 {{ faction.name }}

    nuxt-child(v-model="faction")
</template>

<script>
export default {
  props: {
    value: { type: Object, default: () => [] }
  },

  computed: {
    faction() {
      const isEmpire = this.$route.params.faction === 'empire'
      return isEmpire ? this.value.empire : this.value.rebels
    }
  }
}
</script>
