<template lang="pug">
  v-app(dark)
    main-menu(:mini="miniVariant" :drawer="drawer")

    v-app-bar.yellow--text(fixed app color="black" clipped-left)
      v-app-bar-nav-icon(@click.stop="drawer = !drawer" color="yellow")
      v-btn(@click.stop="miniVariant = !miniVariant" icon)
        v-icon(color="yellow") mdi-{{ `chevron-${miniVariant ? 'right' : 'left'}` }}
      v-toolbar-title RitR Galaxy Manager

    v-content
      v-container
        nuxt

    v-footer.caption(app)
      span &copy; 2020. Star Wars: Armada is property of Fantasy Flight Games. No copyright infringement is intended.
</template>

<script>
import MainMenu from '@/components/MainMenu'
export default {
  components: { MainMenu },

  head() {
    return {
      meta: [{ property: 'og:locale', content: 'en_CA' }],
      link: [
        {
          href: 'https://use.fontawesome.com/releases/v5.0.13/css/all.css',
          rel: 'stylesheet'
        }
      ]
    }
  },

  data() {
    return {
      drawer: null,
      miniVariant: false
    }
  }
}
</script>
