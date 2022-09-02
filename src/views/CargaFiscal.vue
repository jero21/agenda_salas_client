<template>
  <v-container>
	<v-row class="text-center" justify="center">
        <v-col cols="11">
            <h1>CARGA DE TRABAJO FISCAL</h1>
            <br>
	    </v-col>
        <v-col cols="1">
            <v-btn color="success" dark :to="{ path: '/cargas' }">
                ATRAS
            </v-btn>
        </v-col>
	</v-row>
    <v-row class="text-center" justify="center">
		<v-row>
			<v-col cols="4">
					<el-table
					:data="cargasTipo.jo">
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
	</v-row>
	</v-container>
</template>
<script>
	import { cargaTrabajoFiscalService } from '@/services/Fiscal/cargaTrabajoFiscal.service'
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
				cargaTrabajoFiscalService.query(vm.$route.params.id).then(resCargasTipo => {
					vm.cargasTipo = resCargasTipo.body
				})
			}
    }
  }
</script>
