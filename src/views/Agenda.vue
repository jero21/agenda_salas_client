<template>
  <v-container>
    <div class="align-center">
      <h1 class="text-center">AGENDA TEMUCO</h1>
    </div>
    <Calendario />
  </v-container>
</template>

<script>
import Calendario from '../components/Calendario'

export default {
  name: 'Home',

  components: {
    Calendario,
  },

  data: () => ({
    registros: []
  }),
  mounted () {
    //
  },
};
</script>
