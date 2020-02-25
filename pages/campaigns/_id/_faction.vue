<template lang="pug">
  #faction-detail
    h1.title {{ $route.params.faction }} details

    v-btn(:to="{ name: 'campaigns-id-faction', params: { faction: $route.params.faction } }" ) Faction Overview

    v-btn(:to="{ name: 'campaigns-id-faction-create-fleet', params: { id: $route.params.id, faction: $route.params.faction } }" ) Create Me A Fleet

    v-btn(:to="{ name: 'campaigns-id-faction-fleetId', params: { id: $route.params.id, faction: $route.params.faction, fleetId: 'some-fleet' } }" ) Show Me A Fleet

    nuxt-child
</template>

<script>
export default {}
</script>

<style lang="css" scoped></style>
