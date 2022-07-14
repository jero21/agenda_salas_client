<template>
  <v-container>
	<v-row class="text-center" justify="center">
	  <v-col cols="11">
		<h1>CARGAS DE TRABAJO</h1>
			</v-col>
		</v-row>
		<br>
		<v-row  class="text-center" justify="center">
			<v-col>
				<el-table
					:data="cargasFiscal"
					style="width: 100%">
					<el-table-column label="Carga de trabajo general">
						<el-table-column
							prop="nombre"
							sortable
							label="Fiscal/Abogado">
						</el-table-column>
						<el-table-column
							prop="registros"
							sortable
							label="Cantidad">
						</el-table-column>
						<el-table-column
							label="DETALLE"
							width="150">
							<template template slot-scope="scope">
								<el-button
									size="mini"
									type="success"
									@click="verCarga(scope.row)"> DETALLE
								</el-button>
							</template>
						</el-table-column>
					</el-table-column>
				</el-table>	
			</v-col>
		</v-row>
		<br>
		<v-row>
			<v-col cols="4">
					<el-table
					:data="cargasTipo.jo" >
					<el-table-column label="Juicios Orales">
						<el-table-column
							prop="fiscal"
							label="Fiscal/Abogado">
						</el-table-column>
						<el-table-column
							prop="registros"
							sortable
							label="Cantidad">
						</el-table-column>
					</el-table-column>
				</el-table>
			</v-col>
			<v-col cols="4">
				<el-table
				:data="cargasTipo.audiencia">
					<el-table-column label="Audiencias">
						<el-table-column
							prop="fiscal"
							label="Fiscal/Abogado">
						</el-table-column>
						<el-table-column
							prop="registros"
							sortable
							label="Cantidad">
						</el-table-column>
					</el-table-column>
				</el-table>
			</v-col>
			<v-col cols="4">
				<el-table
				:data="cargasTipo.control">
					<el-table-column label="Control">
						<el-table-column
							prop="fiscal"
							label="Fiscal/Abogado">
						</el-table-column>
						<el-table-column
							prop="registros"
							sortable
							label="Cantidad">
						</el-table-column>
					</el-table-column>
				</el-table>
			</v-col>
		</v-row>
	</v-container>
</template>
<script>
  import { cargasTrabajoFiscalService } from '@/services/Fiscal/cargasTrabajoFiscal.service'
	import { cargasTrabajoTipoService } from '@/services/Fiscal/cargasTrabajoTipo.service'
  export default {
	data: () => ({
		cargasFiscal: [],
		cargasTipo: []
	}),
	mounted () {
		this.actualizarCargas()
	},
	methods: {
			async actualizarCargas() {
				let vm = this
				cargasTrabajoFiscalService.query().then(resCargasFiscal => {
					vm.cargasFiscal = resCargasFiscal.body
				})
				cargasTrabajoTipoService.query().then(resCargasTipo => {
					vm.cargasTipo = resCargasTipo.body
				})
			},
			verCarga(row) {
				this.$router.push({ name: 'CargaFiscal', params: { id: row.id} })
			}
	}
  }
</script>
