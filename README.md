# calendario_temuco

## Project setup
```
npm install
```

Apuntar ruta de los servicios backend a la carpeta del proyecto en el servidor apache:
En archivo: src/services/Api.service.js
```
Linea 8
this.resource = Vue.resource('http://IP_SERVIDOR/apis/NOMBRE_CARPETA_PROYECTO_BACKEND/public/api/' + route)
```
### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

Este comando crea carpeta **/dist** la cuál contiene el proyecto compilado que se debe llevar al servidor apache.
para su despliegue edite el archivo **ndex.html** donde se apunte a un **link** o **src** quitando el primer slash (**/**) 
Por ejemplo:
-   cómo queda: src="/js/app-legacy.58df838c.js"
-   cómo debe quedar src="js/app-legacy.58df838c.js"

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
