<template>
  <v-container fluid fill-height>
    <v-layout align-center justify-center>
      <v-flex xs12 sm8 md4>
        <v-card class="elevation-12">
          <v-alert :value="alert" type="warning" color="yellow black--text" align-center justify-center
            style="text-align: center">
            Usuario o Contraseña incorrecta.
          </v-alert>
          <v-toolbar dark color="blue-grey">
            <v-toolbar-title>Iniciar Sesión</v-toolbar-title>
          </v-toolbar>
          <v-card-text>
            <v-form ref="form" lazy-validation>
              <v-text-field label="Usuario" required v-model="credentials.username"
                @keyup.enter.native="submit(credentials)"></v-text-field>
              <v-text-field v-model="credentials.password" @keyup.enter.native="submit(credentials)" label="Contraseña"
                type="password" required></v-text-field>
            </v-form>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn dark color="primary" type="submit" @click="submit(credentials)" :loading="loading"
              :disabled="loading" @click.native="loader = 'loading'" block>Iniciar Sesión
              <span slot="loader">Iniciando...</span>
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>
<script>
import CredentialsService from '@/services/Credentials.service'
import { loginService } from '@/services/Login/Login.service'
import { userService } from '@/services/Login/User.service'
export default {
  data: () => ({
    credentials: {
      username: '',
      password: ''
    },
    loader: null,
    loading: false,
    credentialsService: new CredentialsService(),
    alert: false
  }),
  methods: {
    submit (credentials) {
      let vm = this
      loginService.authenticate(credentials).then(success => {
        vm.credentialsService.setToken(success.body.token)
        userService.getCurrentUser().then(user => {
          vm.user = user.body
          vm.credentialsService.setCurrentUser(vm.user.username)
        })
        vm.$router.push('/agenda')
      }, err => {
        if (err.status) {
          this.alert = true
        }
      })
    },
    refresh () {
      location.reload()
    }
  },
  watch: {
    loader () {
      const l = this.loader
      this[l] = !this[l]
      setTimeout(() => (this[l] = false), 3000)
      this.loader = null
    }
  }
}
</script>
