import Connect from '@/services/Api.service.js'
import CredentialsService from '@/services/Credentials.service.js'

class FiscalesActivosService extends Connect {
  constructor (name) {
    super(name)
    this.credentials = new CredentialsService()
  }
  query () {
    return this.getResource().get()
  }
}

export const fiscalesActivosService = new FiscalesActivosService('fiscales_activos')
