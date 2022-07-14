import Credentials from '@/services/Credentials.service'

const credentials = new Credentials()

export default function (request, next) {
  request.headers.set('Authorization', credentials.getToken())
  request.headers.set('User', credentials.getCurrentUser())
  request.headers.set('Perfil', credentials.getCurrentPerfil())
  request.headers.set('Accept', 'application/json')
  let vm = this
  next(function (response) {
    if (response.status === 401) {
      credentials.clearCredentials()
      window.location.href = (`${process.env.address.spa}`)
      vm.$dispatch('logout')
    }
  })
}
