<template>
  <v-container>
    <v-row class="text-center" justify="center">
      <v-col cols="11">
        <h1>PERMISOS Y LICENCIAS</h1>
        <br>
			</v-col>
			<v-col cols="1">
        <v-btn color="success" dark :to="{ path: '/permisos/nuevo' }">
        	NUEVO
      	</v-btn>
			</v-col>
		</v-row>
		<v-row  class="text-center" justify="center">
			<v-col>
				<el-table
					:data="permisos"
					style="width: 100%">
					<el-table-column
						type="index"
						width="40">
					</el-table-column>
					<el-table-column
						prop="fiscal"
						sortable
						label="Fiscal">
					</el-table-column>
					<el-table-column
						prop="fecha_inicio"
						sortable
						label="Fecha Inicio">
					</el-table-column>
					<el-table-column
						prop="fecha_fin"
						sortable
						label="Fecha Fin">
					</el-table-column>
					<el-table-column
						prop="tipo_permiso"
						sortable
						label="Tipo Permiso">
					</el-table-column>
					<el-table-column
                label="Eliminar"
                width="150">
                <template template slot-scope="scope">
                  <el-button
                    size="mini"
                    type="primary"
                    @click="removePermiso(scope.row)"
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
  import { permisoService } from '@/services/Permiso/permiso.service'
  export default {
    data: () => ({
			permisos: []
    }),
    mounted () {
			let vm = this
			this.actualizarPermisos()
    },
    methods: {
      async removePermiso(row) {
				let vm = this
        permisoService.destroy(row.id).then(permisosResp => {
					this.actualizarPermisos()
				})
      },
		async actualizarPermisos() {
			let vm = this
			permisoService.query().then(permisosResp => {
				vm.permisos = permisosResp.body
			})		
		}
    }
  }
</script>