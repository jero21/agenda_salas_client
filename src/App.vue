<template>
  <v-app>
    <v-app-bar
      app
      color="blue-grey"
      dark
      v-if="credentials.isLogin()"
    >
      <div class="d-flex align-center">
        <h2 class="text-center">AGENDA TEMUCO</h2>
      </div>
      <v-spacer></v-spacer>
      <v-btn color="primary" dark class="mr-4" :to="{ path: '/agenda' }">
        AGENDA
      </v-btn>
      <v-btn color="primary" class="mr-4" :to="{ path: '/cargas' }">
        CARGA DE TRABAJO
      </v-btn>
      <v-btn color="primary" dark class="mr-4" :to="{ path: '/permisos' }">
        PERMISOS Y LICENCIAS
      </v-btn>
      <v-btn color="primary" dark class="mr-4" :to="{ path: '/fiscales' }">
        FISCALES
      </v-btn>
      <v-btn
        class="mx-2"
        @click="dialog = true"
        fab
        small
        color="teal"
        elevation="2"
      >
        <v-icon dark>
          mdi-file-excel-outline
        </v-icon>
      </v-btn>
      <v-btn color="blue-grey lighten-5" text @click="logout()">
        CERRAR SESIÓN
      </v-btn>
    </v-app-bar>
    <v-main>
      <router-view/>
    </v-main>
    <v-dialog v-model="dialog" width="50%">
      <v-card>
        <v-container>
          <h1>Rangos de fechas para la Agenda</h1>
          <v-form @submit.prevent="download(desde, hasta)">
            <v-text-field 
              type="date" label="DESDE" v-model="desde">
            </v-text-field>
            <v-text-field 
              type="date" label="HASTA" v-model="hasta">
            </v-text-field>
            <v-btn 
              type="submit" color="primary" class="mr-4" block
              @click.stop="dialog = false"> DESCARGAR
            </v-btn>
          </v-form>
        </v-container>
      </v-card>
    </v-dialog>
  </v-app>
</template>

<script>
import Credentials from '@/services/Credentials.service'
export default {
  name: 'App',
  data: () => ({
    credentials: new Credentials(),
    dialog: false,
    desde: Date,
    hasta: Date
  }),
  methods: {
    logout () {
      let vm = this
      vm.credentials.clearCredentials()
      vm.$router.push('/')
    },
    download (desde, hasta) {
      window.open('http://172.17.24.10/apis/api_agenda_temuco/public/api/descarga/' + desde + '/' +  hasta ,'_blank')
      this.dialog = false
    },
  }
};
</script>
