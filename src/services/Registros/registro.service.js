import Connect from '@/services/Api.service.js'
import CredentialsService from '@/services/Credentials.service.js'

class RegistrosService extends Connect {
  constructor (name) {
    super(name)
    this.credentials = new CredentialsService()
  }
  query () {
    return this.getResource().get()
  }
}

export const registrosService = new RegistrosService('registros{/id}')
