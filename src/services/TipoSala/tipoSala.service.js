import Connect from '@/services/Api.service.js'
import CredentialsService from '@/services/Credentials.service.js'

class TipoSalaService extends Connect {
  constructor (name) {
    super(name)
    this.credentials = new CredentialsService()
  }
  query (date) {
    return this.getResource().get({date: date})
  }
}

export const tipoSalaService = new TipoSalaService('salas{/date}')
