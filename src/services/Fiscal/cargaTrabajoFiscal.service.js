import Connect from '@/services/Api.service.js'
import CredentialsService from '@/services/Credentials.service.js'

class CargaTrabajoFiscalService extends Connect {
  constructor (name) {
    super(name)
    this.credentials = new CredentialsService()
  }
  query (id) {
    return this.getResource().get({id: id})
  }
}

export const cargaTrabajoFiscalService = new CargaTrabajoFiscalService('carga_trabajo_fiscal{/id}')
