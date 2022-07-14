import Connect from '@/services/Api.service.js'
import CredentialsService from '@/services/Credentials.service.js'

class UserService extends Connect {
  constructor (name) {
    super(name)
    this.credentials = new CredentialsService()
  }
  getCurrentUser () {
    return this.getResource().query()
  }
  ifLogged () {
    this.getCurrentUser().then(success => {
      this.credentials.setCurrentUser(JSON.stringify(success.body[0]))
    }, err => {
      if (err.status === 400 || err.status === 500 || err.status === 404) {
        this.credentials.clearCredentials()
        window.location.href = (this.getAddress().spa + 'login')
      }
    })
  }
}

export const userService = new UserService('getUser')
