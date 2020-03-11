<template lang="pug">
    v-navigation-drawer(
        :value="drawer"
        :mini-variant="mini"
        fixed
        app
        clipped
    )
        v-list
            v-list-item(
                v-for="(item, i) in items"
                v-if="item.show"
                :key="i"
                :to="item.to"
                router
                exact
            )
                v-list-item-action
                    v-icon {{ item.icon }}

                v-list-item-content
                    v-list-item-title(v-text="item.title")

            <!-- Auth -->
            v-list-item(@click="$auth.loginWith('auth0')" v-if="!$auth.loggedIn")
                v-list-item-action
                    v-icon mdi-login
                v-list-item-content Login

            v-list-item(@click="$auth.logout()" v-if="$auth.loggedIn")
                v-list-item-action
                    v-icon mdi-logout
                v-list-item-content
                    v-list-item-title Logout
</template>

<script>
import { mapState } from 'vuex'
export default {
  props: {
    drawer: { type: Boolean, default: null },
    mini: { type: Boolean, default: false }
  },

  computed: {
    ...mapState('auth', {
      loggedIn: (state) => state.loggedIn
    }),
    items() {
      return [
        { icon: 'mdi-apps', title: 'Welcome', to: '/', show: true },
        {
          icon: 'mdi-death-star',
          title: 'My campaigns',
          to: { name: 'campaigns' },
          show: this.loggedIn
        }
      ]
    }
  },

  watch: {
    loggedIn: {
      immediate: true,
      handler() {
        if (this.$auth.loggedIn) {
          this.$axios.$post('/private/users/sync', this.$auth.user)
        }
      }
    }
  }
}
</script>
