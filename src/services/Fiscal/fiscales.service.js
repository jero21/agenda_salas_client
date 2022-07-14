import Connect from '@/services/Api.service.js'
import CredentialsService from '@/services/Credentials.service.js'

class FiscalesService extends Connect {
  constructor (name) {
    super(name)
    this.credentials = new CredentialsService()
  }
  query (id) {
    return this.getResource().get({id: id})
  }
}

export const fiscalesService = new FiscalesService('fiscales{/id}')
