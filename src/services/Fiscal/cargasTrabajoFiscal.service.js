import Connect from '@/services/Api.service.js'
import CredentialsService from '@/services/Credentials.service.js'

class CargasTrabajoFiscalService extends Connect {
  constructor (name) {
    super(name)
    this.credentials = new CredentialsService()
  }
  query () {
    return this.getResource().get()
  }
}

export const cargasTrabajoFiscalService = new CargasTrabajoFiscalService('cargas_trabajo_fiscal')
