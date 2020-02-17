<template lang="pug">
v-row(align="center" justify="center")
  v-col(cols="12" sm="8" md="4")
    v-form(v-model="valid" @submit.prevent="register")
      v-card
        v-toolbar(color="primary" dark flat)
          v-toolbar-title Sign-up!

        v-card-text
          v-text-field(v-model="form.username" label="Username" :rules="[rules.required]" prepend-icon="mdi-account")
          v-text-field(v-model="form.email" type="email" label="E-mail" :rules="[rules.required, rules.email]" prepend-icon="mdi-email")
          v-text-field(v-model="form.password" type="password" label="Password" :rules="[rules.required]" prepend-icon="mdi-lock")

        v-card-actions
          v-btn(:to="{ name: 'login' }" text nuxt color="secondary") Login
          v-spacer
          v-btn(type="submit" color="primary" :disabled="!valid") Sign-up
</template>

<script>
export default {
  auth: false,

  data: () => ({
    valid: true,
    form: {
      name: '',
      email: '',
      password: ''
    },
    rules: {
      required: (value) => !!value || 'Required',
      email: (value) => {
        const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        return re.test(String(value).toLowerCase())
      }
    }
  }),

  methods: {
    async register() {
      try {
        await this.$axios.$post('/auth/register', this.form)
        this.$toast.success('Registration successful')
        const payload = {
          data: { ...this.form }
        }
        await this.$auth.loginWith('local', payload)
        this.$router.push({ name: 'campaigns' })
      } catch (err) {
        this.$toast.error(err)
      }
    }
  }
}
</script>
