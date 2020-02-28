<template lang="pug">
  #campaign-overview
    h1.title Campaign overview here

    systems-overview(v-model="value")
</template>

<script>
import SystemsOverview from '@/components/campaigns/SystemsOverview'
export default {
  components: { SystemsOverview },

  props: {
    value: { type: Object, default: () => ({}) }
  }
}
</script>
