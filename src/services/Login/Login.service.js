import Connect from '@/services/Api.service.js'

class LoginService extends Connect {
  constructor (name) {
    super(name)
    this.name = name
  }
  authenticate (credentials) {
    return this.getResource().save(credentials)
  }
}

export const loginService = new LoginService('login')
