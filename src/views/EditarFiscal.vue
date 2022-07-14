<template>
  <v-container>
    <v-row class="text-center" justify="center">
        <v-col cols="11">
            <h1>AGREGAR NUEVO FISCAL O ABOGADO</h1>
            <br>
	    </v-col>
        <v-col cols="1">
            <v-btn color="success" dark :to="{ path: '/fiscales' }">
                ATRAS
            </v-btn>
        </v-col>
	</v-row>
	<v-row  class="text-center" justify="center">
		<v-col cols="6">
            <v-card class="mx-auto my-12">
                <v-card-text>
                    <v-form
                        ref="form"
                        v-model="valid"
                        lazy-validation
                    >
                        <v-text-field
                        v-model="fiscal.nombre"
                        :rules="nameRules"
                        label="nombre"
                        required
                        ></v-text-field>

                        <v-text-field
                        v-model="fiscal.username"
                        :rules="usernameRules"
                        label="username"
                        required
                        ></v-text-field>

                        <v-switch
                        v-model="fiscal.activo"
                        label="Activar/Desactivar"
                        color="success"
                        hide-details
                        ></v-switch>

                        <v-btn
                        color="success"
                        @click="save(fiscal)"
                        >
                        GUARDAR
                        </v-btn>
                    </v-form>
                </v-card-text>
            </v-card>
        </v-col>
    </v-row>
  </v-container>
</template>
<script>
  import { fiscalesService } from '@/services/Fiscal/fiscales.service'
  export default {
    data: () => ({
        fiscal: {},
        valid: true,
        nameRules: [
            v => !!v || 'Nombre es requerido',
        ],
        usernameRules: [
            v => !!v || 'Nombre es requerido',
        ],
        registro: '',
        id_fiscal: Number
    }),
    mounted () {
        let vm = this
        vm.id_fiscal = vm.$route.params.id
        fiscalesService.query(vm.id_fiscal).then(fiscal => {
            vm.fiscal = fiscal.body
        })
    },
    methods: {
        async save(fiscal) {
            let vm = this
            fiscalesService.update(this.id_fiscal, fiscal).then(success => {
                vm.registro = success.body
                this.$router.push({ name: 'Fiscales' })
            }, err => {
                if (err.status) {
                console.log(err)
                }
            })
        }
    }
  }
</script>