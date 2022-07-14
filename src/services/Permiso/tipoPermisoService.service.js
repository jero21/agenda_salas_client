import Connect from '@/services/Api.service.js'
import CredentialsService from '@/services/Credentials.service.js'

class TipoPermisoService extends Connect {
  constructor (name) {
    super(name)
    this.credentials = new CredentialsService()
  }
  query () {
    return this.getResource().get()
  }
}

export const tipoPermisoService = new TipoPermisoService('tipo_permiso{/id}')
