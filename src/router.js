import Vue from 'vue'
import Router from 'vue-router'
import Login from './views/Login.vue'
import Agenda from './views/Agenda.vue'
import Fiscales from './views/Fiscal.vue'
import NuevoFiscal from './views/NuevoFiscal.vue'
import EditarFiscal from './views/EditarFiscal.vue'
import Permisos from './views/Permisos.vue'
import NuevoPermiso from './views/NuevoPermiso.vue'
import CargasTrabajo from './views/CargasTrabajo.vue'
import CargaFiscal from './views/CargaFiscal.vue'

Vue.use(Router)
const router = new Router({
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'Login',
      component: Login
    },
    {
      path: '/agenda',
      name: 'Agenda',
      component: Agenda
    },
    {
      path: '/fiscales',
      name: 'Fiscales',
      component: Fiscales
    },
    {
      path: '/fiscales/nuevo',
      name: 'NuevoFiscal',
      component: NuevoFiscal
    },
    {
      path: '/fiscales/editar/:id',
      name: 'EditarFiscal',
      component: EditarFiscal
    },
    {
      path: '/permisos',
      name: 'Permisos',
      component: Permisos
    },
    {
      path: '/permisos/nuevo',
      name: 'NuevoPermiso',
      component: NuevoPermiso
    },
    {
      path: '/cargas',
      name: 'CargasTrabajo',
      component: CargasTrabajo
    },
    {
      path: '/carga_fiscal/:id',
      name: 'CargaFiscal',
      component: CargaFiscal
    },
  ]
})

export default router