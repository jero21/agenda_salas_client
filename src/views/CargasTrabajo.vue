<template>
  <v-container>
	<v-row class="text-center" justify="center">
        <v-col cols="7">
            <h1>CARGAS DE TRABAJO FISCALES</h1>
            <br>
	    </v-col>
        <v-col cols="5">
            <v-form>
				<v-container>
				<v-row>
					<v-col
						cols="12"
						md="4"
						>
						<v-text-field 
							type="date" label="Fecha Desde" v-model="desde" @change="desdeHasta(desde, hasta)">
						</v-text-field>
					</v-col>

					<v-col
						cols="12"
						md="4"
						>
						<v-text-field 
							type="date" label="Fecha Hasta" v-model="hasta" @change="desdeHasta(desde, hasta)">
						</v-text-field>
					</v-col>

					<v-col
						cols="12"
						md="4"
						>
						<v-btn color="success" dark>
							APLICAR
						</v-btn>
					</v-col>
				</v-row>
				</v-container>
			</v-form>
        </v-col>
	</v-row>
	<v-row class="text-center" justify="center"></v-row>
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
		cargasTipo: [],
		desde: null,
		hasta: null
	}),
	mounted () {
		// this.actualizarCargas()
	},
	methods: {
		async actualizarCargas() {
			let vm = this
			cargasTrabajoFiscalService.query(this.desde, this.hasta).then(resCargasFiscal => {
				vm.cargasFiscal = resCargasFiscal.body
			})
			cargasTrabajoTipoService.query(this.desde, this.hasta).then(resCargasTipo => {
				vm.cargasTipo = resCargasTipo.body
			})
		},
		verCarga(row) {
			this.$router.push({ name: 'CargaFiscal', params: { id: row.id} })
		},
		desdeHasta(desde, hasta) {
			if (desde !== null && hasta !== null) {
				this.actualizarCargas()
			}
			
		}
	}


  }
</script>
