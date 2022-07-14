import Connect from '@/services/Api.service.js'
import CredentialsService from '@/services/Credentials.service.js'

class CargasTrabajoTipoService extends Connect {
  constructor (name) {
    super(name)
    this.credentials = new CredentialsService()
  }
  query () {
    return this.getResource().get()
  }
}

export const cargasTrabajoTipoService = new CargasTrabajoTipoService('cargas_trabajo_tipo')
