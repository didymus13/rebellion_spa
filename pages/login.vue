<template lang="pug">
  v-row(align="center" justify="center")
    v-col(cols="12" sm="8" md="4")
      v-card
        v-toolbar(color="primary" dark flat)
          v-toolbar-title Login
        v-card-text
          v-form(v-model="valid")
            v-text-field(label="Login" v-model="email" prepend-icon="mdi-account")
            v-text-field(type="password" label="Password" v-model="password" prepend-icon="mdi-lock")
            v-card-actions
              v-spacer
              v-btn(:disabled="!valid" color="primary" @click="login") Login
</template>

<script>
export default {
  data: () => ({
    valid: true,
    email: '',
    password: ''
  }),

  methods: {
    async login() {
      const payload = { data: { email: this.email, password: this.password } }
      await this.$auth.loginWith('local', payload)
    }
  }
}
</script>
