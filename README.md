# Generadores de jpromocion - FrontEnd en Angular 2

Pretende ser un frontend de ejemplo realizado en Angular 18 para atacar la API REST JSON de generadores desarrollada en mi otro proyecto [rest-j-generadores](https://github.com/jpromocion/rest-j-generadores) y poder utilizar visualmente la explotación de datos auto-generados.

La diferencia con [angular-j-generadores-fe](https://github.com/jpromocion/angular-j-generadores-fe) es que aquí vamos a crear la aplicación con angular material también pero con hojas de estilo SCSS y utilizando las plantillas de esquema de angular material para la distribución, para tener una interfaz más bonita.





## Funcionamiento

Tendrá un menú lateral (ocultable por tamaño pantalla) cargandose en la parte central la página correspondiente:
- Principal: Lugar donde fijar la api-key de ataque sobre la API REST de [rest-j-generadores](https://github.com/jpromocion/rest-j-generadores). Por defecto la aplicación se levanta con una api-key de test de ejemplo pre-rellenada. También pueden cargarse mensajes de error generados en este apartado.
> La url del servidor en si es un valor almacenado en los environments del proyecto (por defecto localhost:8085).
- Documentos: Ataca la API REST para la generación/validación de documentos de identidad: NIF, NIE, CIF.
![Generador documentos](/screenshots/generador_documento.png)
- Bancario: Ataca la API REST para la generación/validación de documentos bancarios: IBAN, Tarjeta.
- Perfiles: Ataca la API REST para la generación de perfiles completo de persona o empresa.
![Generador perfiles](/screenshots/generador_perfil.png)
- Textos: Ataca la API REST para la generación de textos aleatorios.
![Generador textos](/screenshots/generador_textos.png)
- Números: Ataca la API REST para la generación/operaciones de números en diversas condiciones.
![Generador numeros](/screenshots/generar_numeros.png)
- Fechas: Ataca la API REST para la generación/operaciones de fechas.
- Vehículos: Ataca la API REST para la generación de tipos de mátricula y número de bastidos, así como la validación de un número de bastidor.
- Localización: Ataca la API REST para recuperar CCAA, Provincias, Municipios de España y el generador aleatorio de direcciones.
![Generador localización](/screenshots/generar_localizacion.png)
- Cod. Barras: Ataca la API REST para generar códigos de barra/QR.
![Generador barras](/screenshots/generar_cod_barras.png)
- Archivos: Ataca la API REST para operaciones sobre archivos: base64, hash, zip.
- Colores: Ataca la API REST para generación/operaciones sobre colores.
![Generador colores](/screenshots/generar_color.png)
- Variados: Ataca la API REST para generaciones variadas: emails, teléfonos, passwords, códigos promocionales, etc...
![Generador variados](/screenshots/generador_variados.png)
- Acerca de: Página about info.


## Montar

### Descargar y montar

Una vez descargado de github: `npm install` para instalar dependencias.

### Servidor de desarrollo

Ejecutar `ng serve` para el servidor de desarrollo. Navegar a `http://localhost:4200/`. La aplicación se recarga automaticamente tras modificar los archivos fuente.
> Como se creo environments, por defecto se lanza con la de desarrollo (Indicado en el angular.json `"defaultConfiguration": "development"`). Para lanzar con la de producción `ng serve --configuration production`

### Incrementar código

Ejecutar `ng generate component component-name` para generar un nuevo componente. Puedes usar `ng generate directive|pipe|service|class|guard|interface|enum|module`.

### Build

Ejecutar `ng build` para construir el proyecto. El artefacto montado será guardado en el directorio `dist/`.
> Como se creo environments, en el caso de build la configuración por defecto es la de producción (Indicado en el angular.json `"defaultConfiguration": "production"`). Para lanzar con la de desarrollo `ng build --configuration development`



## Creación original desde cero

Creado con [Angular CLI](https://github.com/angular/angular-cli) version 18.2.3:
  - `ng new`
    - workspace: angular-j-generadores-fe2
    - hoja estlo: SCSS
    - SSR: no

NOTA: Los componentes, entidades, servicios reutilizados nos los hemos ido trayendo directamente desde [angular-j-generadores-fe](https://github.com/jpromocion/angular-j-generadores-fe) copiando.



### Instalado Angular Material.

[Angular Material](https://material.angular.io/)
Componentes y temas preconstruidos.

Instalamos con:
```
ng add @angular/material
```
- Magenta/violet theme
- Include typography
- Include and enable animations

Esto incluye en el angular.json directamente:
```
    "styles": [
      "@angular/material/prebuilt-themes/magenta-violet.css",
      "src/styles.css"
    ],
```


### Instalar control entorno.

Instalamos con:
```
ng generate environments
```
- Configuramos en src/environments para fijar una url API-rest por entorno.
- Luego rellenamos en los ficheros de entorno lo que necesitamos. Ver documentación Angular


### Instalar inclusión variables entorno sistema en aplicación.

[@ngx-env/builder](https://www.npmjs.com/package/@ngx-env/builder)
[Explicación adicional ngx-env/builder](https://dev.to/dimeloper/managing-environment-variables-in-angular-apps-14gn)

Buscamos parametrizar la url de ataque de la API rest cuando despleguemos en producción (de forma que podamos alojar en sistios distintos.)

Instalamos con:
```
ng add @ngx-env/builder
```
- Se acepta configuración que incluye el "env.d.ts"
- En "env.d.ts" añadimos la variable de entorno "NG_APP_API_REST_PROD" -> "readonly NG_APP_API_REST_PROD: string;"


Modificamos el environment.ts para que la variable "apiUrl" coja "import.meta.env.NG_APP_API_REST_PROD".
El sistema donde se despligue para producción deberá tener la variable de entorno NG_APP_API_REST_PROD con la url donde este desplegada la API REST que atacar.

En environment.development.ts dejamos apiUrl contra localhost directo, en vez de variable entorno, de esta forma en local es irrelevante esto.

Se puede crear un .env directamente en la raíz del proyecto con:
```
# Simular en local utiliza la API rest desplegada en produccion (render o railway) con variable de entorno -> @ngx-env/builder
# Desplegado en su proveedor en el entonro de produccion, sera dicho entorno el que tenga el .env con la variable de entorno.
# En local el enviroment.development.ts apunta a la url en produccion sin necesidad de usar @ngx-env/builder
# NG_APP_API_REST_PROD=https://rest-j-generadores.onrender.com/generadores
NG_APP_API_REST_PROD=https://rest-j-generadores-production.up.railway.app/generadores
```
  - Para que si desplegamos en local pero con la configuración de producción `ng serve --configuration=production`, podamos probar en local contra la API rest seleccionada de producción concreta.
  - Pero en principio no es necesario para desplegar en desarrollo, dado que el enviroment.development.ts no utiliza variable de entorno, sino que asigna la url de API con el localhost directamente.


### Instalar generador excel.

Instalamos con:
```
npm i xlsx --save
```
- Permite generar excel


### Instalar file saver.

Instalamos con:
```
npm install file-saver
npm install --save-dev @types/file-saver
```
- Permite descargar fichero desde el navegador.
- Es requerido para generar excel además.


### Instalar Angular Color Picker.

[Angular Color Picker](https://www.npmjs.com/package/ngx-color-picker)
[Angular Color Picker Github](https://github.com/zefoy/ngx-color-picker?tab=readme-ov-file)

Instalamos con:
```
npm install ngx-color-picker --save
```
- Permite utilizar un color picker



### Instalar Angular Material Moment Adapter

Requisitos de internacionalización de los DatePicker de Angular Material
[Angular Material Date Picker](https://material.angular.io/components/datepicker/overview)

Instalamos con:
```
npm install @angular/material-moment-adapter --force
```
- Permite configurar en el app.config.ts el "provideMomentDateAdapter", de forma que los calendarios empiecen por Lunes.


### Instalar módulo internacionalización aplicación

Se utiliza el @ngx-translate/core para facilitar la internacionalización de la aplicación completa.
[NGX-Translate](https://github.com/ngx-translate/core?tab=readme-ov-file)

Instalamos con:
```
npm install @ngx-translate/core @ngx-translate/http-loader @colsen1991/ngx-translate-extract-marker
```
- Ver [Guía aplicar NGX-Translate](https://www.codeandweb.com/babeledit/tutorials/how-to-translate-your-angular-app-with-ngx-translate)


Adicionalmente ocurria que en local todo funcionaba correctamente, pero al desplegar en Render/Railway, las traducciones no eran localizadas.
Básicamente daba un error de no encontrar "https://angular-j-generadores-fe-production.up.railway.app/i18n/es.json". Lo cual era cierto, porque la url que si funcionaba era "https://angular-j-generadores-fe-production.up.railway.app/es.json", sin el subfolder.
- Estuvimos intentado meter en el angular.json en los "assets" del build lo siguiente para forzar que en el dist del build se cree la carpeta. Sin embargo, aunque el dist que genera el build efectivamente ahora si mete una carpeta "i18n", se desplego así y no funciono, la url para ver uno de los archivos de languaje seguía siendo "https://angular-j-generadores-fe-production.up.railway.app/es.json":
```
"assets": [
  {
  "glob": "**/*",
  "input": "public"
  },
  {
  "glob": "**/*",
  "input": "public/i18n",
  "output": "i18n"
  }
],
```
- Finalmente se optó por la politica de "si mahoma no va a la montaña... la montaña viene a mahoma". Los .json del i18n se pasan directamente al folder "public/", y modificamos el app.config.ts para indicar que los busque directamente en el raíz, no el subfolder "i18n". De esta forma al desplegar Railway/Render si funciona porque ahora si busca la traucción en la ruta directa "https://angular-j-generadores-fe-production.up.railway.app/es.json".
```
const httpLoaderFactory: (http: HttpClient) => TranslateHttpLoader = (http: HttpClient) =>
  //new TranslateHttpLoader(http, './i18n/', '.json');
  new TranslateHttpLoader(http, './', '.json');
```
- Quiza habría que investigar más para conseguir que desplegado también las viera en subfolder "i18n", pero desplegarlo probando despliegues directos a producción... mmm no. Habría que bajarse un nginx local y probar que pasa realmente... pero de momento me conformo con esta solución.


## Docker - Render o Railway

Se incluye un Dockerfile que permite desplegar la aplicación en Render o en Railway:
- Define el contenedor:
	- Carga una maquina preconfigurada de Alphine Linux con lo necesario para nodejs pero solo para construir nuesta aplicación.
	- Le instala el cliente angular.
	- Copia los datos de la aplicación a un directorio de trabajo (evitamos con .dockerignore copiar cosas innecesarias)
  - Hace el `npm install` para instalar lo necesario en el directorio de trabajo.
  - Luego hace el `npm build` para construir la carpeta con nuestra aplicación.
- Define el contenedor que vamos a ejecutar:
	- Carga una maquina preconfigurada de Alphine Linux con un servidor web Nginx.
  - Copia la aplicacion build construida antes a la ruta del servidor Nginx para sus aplicacions.
	- puerto expuesto 80 (El derl servidor Nginx)
	- Levanta el servidor Nginx

> NOTA: en Dockerfile esta comentada la configuración para lanzarlo como `ng serve`, como se haría en un entorno de desarrollo, aunque con la configuración de producción.

### Variable entorno para API rest url producción para uso de multiples-alojadores

Adicional para uso de variable entorno del alojador, de forma que podamos desplegar en Render y en Railway a la par, y que cada uno de ellos apunte a la url de API rest que cada uno ha levantado tambien en su alojamiento distinto:
- El alojador, deberá definir para el despliegue de esta aplicación angular una enviroment variable de nombre NG_APP_API_REST_PROD con la url correspondiente de su API rest (Ver [Render Enviroment variables](https://docs.render.com/configure-environment-variables) o [Railway Enviroment variables](https://docs.railway.com/reference/environments):
  - Render: https://rest-j-generadores.onrender.com/generadores
  - Railway: https://rest-j-generadores-production.up.railway.app/generadores
- Nuesto Dockerfile lo modificamos para (Ver [Railway inyectar Enviroment variables en build docker](https://docs.railway.com/guides/dockerfiles)):
```
#Injectar la variable de entorno definida en el alojador (en este caso Railway)
ARG NG_APP_API_REST_PROD
#Mostrar en consola la variable entorno
RUN echo "[JPROMOCION] NG_APP_API_REST_PROD env variable es:"
RUN echo $NG_APP_API_REST_PROD
```

  - Con ARG inyecta la variable de entorno del alojador en nuestra build de dockerfile. Luego simplemente la mostramos para ver que coge el valor.
  - Con esto, cuando se vaya a hacer el `ng build --configuration=production` con la configuración de producción, va a cargar el @ngx-env/builder rellenando la variable entorno dentro de NG_APP_API_REST_PROD, cogiendo correctamente la NG_APP_API_REST_PROD que hemos cargado en el docker desde las definidas por el alojador, sin necesidad de modificar nada más en los comandos.
  - COmo es la configuración de producción, utilizará `environment.ts` donde la "apiUrl" si es sustituida por "NG_APP_API_REST_PROD"

> NOTA: en el dashboard (principal) esta comentado un input "mostrarApiUrlPorAsegurar" para ver la url cargada en la "apiUrl" para asegurar.




## Mejorando la estructura del proyecto

Viendo el tamaño final, realizamos una reestructuración de la estructura del proyecto, dado que la que te genera por defecto Angular CLI es para cosas sencillas.
En base a ello y siguiendo las recomendaciones de [Así deberías Estructurar tus Proyectos en Angular 17](https://www.youtube.com/watch?v=kLUdumt8lNY):
  - **src/**: Todo el fuente. Directamente el `index.html` y el `main.ts` de inicio de la aplicación.
    - **environments**: Definimos los elementos para diferenciar entorno: desarrollo, producción.
    - **app/**: ELementos de la aplicación en si. Directamente esta el componente `app` principal de la aplicación con su `config` y `routes`.
      - **core/**: Todos los elementos que no son de interfaz gráfica.
        - **models/**: Intefaces que definen modelos.
        - **services/**: Servicios de la aplicación.
      - **shared/**: Elementos de utilización común en la aplicación.
        - **pipes/**: Pipes de formato.
        - **components/**: Componentes particulares comunes y reutilizables. Dentro irá un folder para cada componente con su nombre y a su vez dentro tendra los `.html`, `.scss`, `.ts` que lo definen.
      - **(cada_carpeta_estructura_logica)/**: El resto son carpetas que organizan la estructura lógica de nuestros componentes según las funcionalidades. Una carpeta podría ser un contenedor de carpetas que son los componentes, o ser el mismo ya el componente (`.html`, `.scss`, `.ts` que lo definen).



## Desplegar aplicación en un nginx local

Lo instalas para windos "https://nginx.org/en/docs/windows.html"
```
start nginx
```

Comprobar esta el proceso:
```
tasklist /fi "imagename eq nginx.exe"
```

Manipularlo:
```
nginx -s stop	      fast shutdown
nginx -s quit	      graceful shutdown
nginx -s reload	    changing configuration, starting new worker processes with a new configuration, graceful shutdown of old worker processes
nginx -s reopen	    re-opening log files
```

Construyes tu aplicación:
```
ng build --configuration=production
```

Del contenido que el anterior comando genera en "dist" copias lo que ha generado dentro de "dist\angular-j-generadores-fe2\browser" directamente a "C:\nginx-1.27.3\html". Vuelves a levantar y accedes a "http://localhost/80"
