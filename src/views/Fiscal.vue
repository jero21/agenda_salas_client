<template>
  <v-container>
    <v-row class="text-center" justify="center">
      <v-col cols="11">
        <h1>FISCALES Y ABOGADOS</h1>
        <br>
			</v-col>
			<v-col cols="1">
        <v-btn color="success" dark :to="{ path: '/fiscales/nuevo' }">
        	NUEVO
      	</v-btn>
			</v-col>
		</v-row>
		<v-row  class="text-center" justify="center">
			<v-col>
				<el-table
					:data="fiscales"
					style="width: 100%">
					<el-table-column
						type="index"
						width="40">
					</el-table-column>
					<el-table-column
						prop="nombre"
						sortable
						label="Nombre">
					</el-table-column>
					<el-table-column
						prop="username"
						sortable
						label="Username">
					</el-table-column>
					<el-table-column
						label="Fiscal Activo"
						sortable
						:sort-method="(a, b) => sortData(a, b, 'activo')">
						<template slot-scope="scope">
							<v-btn class="mx-1" elevation="1" fab small color="success" v-if="scope.row.activo">
								<v-icon dark>
									mdi-check
								</v-icon>
    						</v-btn>
							<v-btn class="mx-1" elevation="1" fab small color="danger" v-else>
								<v-icon dark>
									mdi-close
								</v-icon>
    						</v-btn>
						</template>
					</el-table-column>
					<el-table-column
						label="EDITAR FISCAL"
						width="150">
						<template template slot-scope="scope">
							<v-btn
								color="blue"
								class="ma-2 white--text"
								small
								@click="editarFiscal(scope.row)"
								>
									<v-icon	dark>
										mdi-grease-pencil
									</v-icon>
							</v-btn>
						</template>
					</el-table-column>
					<el-table-column
						label="ELIMINAR FISCAL"
						width="150">
						<template template slot-scope="scope">
							<v-btn
								color="warning"
								class="ma-2 white--text"
								small
								@click="removeFiscal(scope.row)"
								>
									<v-icon	dark>
										mdi-delete-empty
									</v-icon>
							</v-btn>
						</template>
					</el-table-column>
				</el-table>
      		</v-col>
    	</v-row>
  	</v-container>
</template>
<script>
  import { fiscalesService } from '@/services/Fiscal/fiscales.service'
  export default {
    data: () => ({
			fiscales: []
    }),
    mounted () {
			this.actualizarFiscales()
    },
    methods: {
      async removeFiscal(row) {
				let vm = this
        fiscalesService.destroy(row.id).then(fiscalesResp => {
					vm.resFiscales = fiscalesResp.body
					this.actualizarFiscales()
				})
      	},
		async actualizarFiscales() {
			let vm = this
			fiscalesService.query().then(fiscalesResp => {
				vm.fiscales = fiscalesResp.body
			})		
		},
		editarFiscal(row) {
			this.$router.push({ name: 'EditarFiscal', params: { id: row.id} })
		}
	}
  }
</script>