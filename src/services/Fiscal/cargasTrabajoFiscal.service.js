import Connect from '@/services/Api.service.js'
import CredentialsService from '@/services/Credentials.service.js'

class CargasTrabajoFiscalService extends Connect {
  constructor (name) {
    super(name)
    this.credentials = new CredentialsService()
  }
  query (desde, hasta) {
    return this.getResource().get({desde: desde, hasta: hasta})
  }
}

export const cargasTrabajoFiscalService = new CargasTrabajoFiscalService('cargas_trabajo_fiscal{/desde}{/hasta}')
