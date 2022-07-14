class CredentialsService {
  // Perfil
  setCurrentPerfil (perfil) {
    localStorage.setItem('consulta_fiac_perfil', perfil)
  }
  getCurrentPerfil () {
    let perfil = localStorage.getItem('consulta_fiac_perfil')
    return perfil
  }
  // User
  setCurrentUser (user) {
    localStorage.setItem('consulta_fiac_user', user)
  }
  getCurrentUser () {
    let user = localStorage.getItem('consulta_fiac_user')
    return user
  }
  // Token
  setToken (token) {
    let jwt = 'Bearer ' + token
    localStorage.setItem('token', jwt)
  }
  getToken () {
    let token = localStorage.getItem('token')
    return token
  }
  clearCredentials () {
    localStorage.clear('consulta_fiac_perfil')
    localStorage.clear('consulta_fiac_user')
    localStorage.clear('token')
  }
  isLogin () {
    if (this.getToken() != null) return true
    else return false
  }
}

export default CredentialsService
