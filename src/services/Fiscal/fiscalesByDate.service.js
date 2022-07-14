import Connect from '@/services/Api.service.js'
import CredentialsService from '@/services/Credentials.service.js'

class FiscalesByDateService extends Connect {
  constructor (name) {
    super(name)
    this.credentials = new CredentialsService()
  }
  query (date) {
    return this.getResource().get({date: date})
  }
}

export const fiscalesByDateService = new FiscalesByDateService('fiscales_by_date{/date}')
