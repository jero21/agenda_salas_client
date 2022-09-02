<template>
  <v-container>
    <v-row class="text-center" justify="center">
      <v-col cols="11">
        <h1>AGREGAR PERMISOS A FISCALES</h1>
        <br>
	    </v-col>
      <v-col cols="1">
        <v-btn color="success" dark :to="{ path: '/permisos' }">
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
												<v-combobox
													ref="Fiscal"
													label="Seleccione el Fiscal"
													:items="fiscales"
													v-model="permiso.fiscal"
													item-value="id"
													outlined
													item-text="nombre"
													:rules="[v => !!v || 'Item requerido']">
												</v-combobox>

												<v-combobox
                            label="Seleccione el Tipo de Permiso"
                            :items="tipo_permiso"
                            v-model="permiso.tipo_permiso"
                            item-value="id"
                            outlined
                            item-text="nombre"
                            :rules="[v => !!v || 'Item requerido']">
                        </v-combobox>

                        <v-text-field 
													type="date" label="Fecha inicio" v-model="permiso.fecha_inicio" >
												</v-text-field>

                        <v-text-field 
													type="date" label="Fecha fin" v-model="permiso.fecha_fin" >
												</v-text-field>

                        <v-btn
                        color="success"
                        @click="save(permiso)"
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
	import { fiscalesActivosService } from '@/services/Fiscal/fiscalesActivos.service'
  import { permisoService } from '@/services/Permiso/permiso.service'
  import { tipoPermisoService } from '@/services/Permiso/tipoPermisoService.service'
  export default {
    data: () => ({
			permiso: {},
			tipo_permiso: [],
			fiscales: [],
			valid: true,
			registro: ''
    }),
    mounted () {
			let vm = this
			tipoPermisoService.query().then(permisosResp => {
				vm.tipo_permiso = permisosResp.body
			})
			fiscalesActivosService.query().then(fiscalesResp => {
				vm.fiscales = fiscalesResp.body
			})
    },
    methods: {
			async save(permiso) {
				let vm = this
				permisoService.save(permiso).then(success => {
					vm.registro = success.body
					this.$router.push({ name: 'Permisos' })
				}, err => {
					if (err.status) {
					console.log(err)
					}
				})
			}
    }
  }
</script>