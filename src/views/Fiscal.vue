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
							<el-button type="success" icon="el-icon-check" circle v-if="scope.row.activo"></el-button>
							<el-button type="danger" icon="el-icon-close" circle v-else></el-button>
						</template>
					</el-table-column>
					<el-table-column
						label="EDITAR FISCAL"
						width="150">
						<template template slot-scope="scope">
							<el-button
								size="mini"
								type="primary"
								@click="editarFiscal(scope.row)"
								icon="el-icon-edit">
							</el-button>
						</template>
					</el-table-column>
					<el-table-column
						label="ELIMINAR FISCAL"
						width="150">
						<template template slot-scope="scope">
							<el-button
								size="mini"
								type="primary"
								@click="removeFiscal(scope.row)"
								icon="el-icon-delete-solid">
							</el-button>
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