# Generadores de jpromocion - FrontEnd en Angular

Pretende ser un frontend de ejemplo realizado en Angular para atacar la API REST JSON de generadores desarrollada en mi otro proyecto [rest-j-generadores](https://github.com/jpromocion/rest-j-generadores) y poder utilizar visualmente la explotación de datos auto-generados.

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

Creado con Angular v18 [Angular CLI](https://github.com/angular/angular-cli) version 18.2.3:
  - `ng new`
    - workspace: angular-j-generadores-fe2
    - hoja estlo: SCSS
    - SSR: no

> Los componentes, entidades, servicios reutilizados nos los hemos ido trayendo directamente desde [angular-j-generadores-fe](https://github.com/jpromocion/angular-j-generadores-fe) copiando. Y ya hemos evolucionado desde ahí.


### Actualización versión Angular a 19

Posteriormente con la salida de la versión Angular-v19 Seguimos las instrucciones de [Actualizar 18 a 19] (https://angular.dev/update-guide?v=18.0-19.0&l=3)
> Incluye tambien la de Angular Material en las instrucciones.
> Angular material lleva ya un TimePicker en la v19, pero tiene carencias respecto a "ngx-mat-timepicker". Si bien permite combinar en un campo date al mismo tiempo una fecha y tiempo sin separarlos, no permite la selección de hora por relog redondo que tiene "ngx-mat-timepicker".
> Sin embargo, actualmente [ngx-mat-timepicker](https://www.npmjs.com/package/ngx-mat-timepicker?activeTab=readme) no lo han revisado para ser compatible con angular material 19, por lo que da un error de dependencias en el npm install: *@angular/animations@"^18.0.0"*
> De momento por tanto debemos dejar de usarlo y pasar a utilizar el propuesto por Angular Material nuevo.



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


~~Adicionalmente ocurria que en local todo funcionaba correctamente, pero al desplegar en Render/Railway, las traducciones no eran localizadas.
Básicamente daba un error de no encontrar "https://angular-j-generadores-fe-production.up.railway.app/i18n/es.json". Lo cual era cierto, porque la url que si funcionaba era "https://angular-j-generadores-fe-production.up.railway.app/es.json", sin el subfolder.~~
- ~~Estuvimos intentado meter en el angular.json en los "assets" del build lo siguiente para forzar que en el dist del build se cree la carpeta. Sin embargo, aunque el dist que genera el build efectivamente ahora si mete una carpeta "i18n", se desplego así y no funciono, la url para ver uno de los archivos de languaje seguía siendo "https://angular-j-generadores-fe-production.up.railway.app/es.json"~~:
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
- ~~Finalmente se optó por la politica de "si mahoma no va a la montaña... la montaña viene a mahoma". Los .json del i18n se pasan directamente al folder "public/", y modificamos el app.config.ts para indicar que los busque directamente en el raíz, no el subfolder "i18n". De esta forma al desplegar Railway/Render si funciona porque ahora si busca la traucción en la ruta directa "https://angular-j-generadores-fe-production.up.railway.app/es.json".~~
```
const httpLoaderFactory: (http: HttpClient) => TranslateHttpLoader = (http: HttpClient) =>
  //new TranslateHttpLoader(http, './i18n/', '.json');
  new TranslateHttpLoader(http, './', '.json');
```
**SOLVENTAMOS** finalmente para dejar json de idiomas en subfolder. Al final el problema es el COPY de Docker, el cual haciendose con el * lo que hace es no copiar subfolders sino coger todo el contenido de un subfolder y hacerle un merge al directorio raíz donde copia ([dockerfile-copy-keep-subdirectory-structure](https://stackoverflow.com/questions/30215830/dockerfile-copy-keep-subdirectory-structure)). Por ello dejamos los json dentro del *i18n*, el "app.config.ts" lo dejamos con apunte al *i18n* finalmente, y en el DockerFile:
```
COPY --from=builder /usr/src/app/dist/angular-j-generadores-fe2/browser/* /usr/share/nginx/html
COPY --from=builder /usr/src/app/dist/angular-j-generadores-fe2/browser/i18n /usr/share/nginx/html/i18n
```
  - El primer COPY era el pre-existente. El segundo COPY es el añadido.
  - Donde el primer COPY anterior, realmente mete los .json de *i18n* dentro del mismo raíz */html*.
  - El segundo COPY fuerza finalmente a que se cree dentro el subfolder *i18n* con todo su contenido.
  - A decir verdad, de esta forma los json quedan tanto en */html* copiados como en */html/i18n*. Se podría estudiar no utilizar el * y copiar ficheros de dentro... pero a priori no sabemos que genera, por lo que habría que hacer algún loop... no merece la pena calentarse más la cabeza con esto.


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


## Accesibilidad

Se incoporan elementos para controlar accesibilidad durante desarrollo.

### angular-eslint
[angular-eslint](https://github.com/angular-eslint/angular-eslint/tree/main)
Un plugin EsLint (analizar el código fuente para encontrar patrones). Especializado en el ecosistema Angular, incluye reglas de accesibilidad específicas de Angular y buenas prácticas del framework. Dispone de unas 11 reglas de accesibilidad.

Instalación en proyecto:
```
ng add angular-eslint
```

Su archivo de configuración es el nuevo "eslint.config.js", donde dejamos solo las propieas de html: accesibilidad y recomendaciones.
```
{
  files: ["**/*.html"],
  extends: [
    ...angular.configs.templateRecommended,
    ...angular.configs.templateAccessibility,
  ],
  rules: {},
}
```

Añadio la regla "lint": "ng lint" en package.json directamente. Por lo que para ejecutar este análisis basta con ejecutar cualquiera de los dos siguientes comandos:
```
npm run lint
ng lint
```

### html-validate
[html-validate](https://html-validate.org/)
Se centra en la validez del HTML subyacente. Asegura que tu HTML es semánticamente correcto y cumple con los estándares. Más de 26 reglas de accesibilidad, aunque solo válidas para HTML puro, no será capaz de interpretar nada propio de Angular, por lo que algunas reglas pueden necesitar ser desactivadas para no dar falsos positivos.

Requiere instalar la herramienta:
```
npm install --save-dev html-validate
```

Se creo en raíz el ".htmlvalidate.json" para configurar:
```
{
  "extends": [
    "html-validate:recommended",
    "html-validate:a11y"
  ],
  "elements": [
    "html5"
  ],
  "rules": {
  }
}
```
> NOTA: se recomienda dejar solo las de accesibilidad "html-validate:a11y"

Si se quieren excepcionar reglas concretas se puede modificar el rules:
```
  "rules": {
    // Puedes desactivar reglas que den falsos positivos con Angular
    "no-inline-style": "off",
    "no-unknown-elements": "off",
    // Si usas [hidden] de Angular, puedes desactivar esta regla
    "attribute-boolean-style": "off"
  }
```

Es necesario crear la regla en package.json para poder ejecutar sobre los html:
```
"scripts": {
  ...
  "lint:html": "html-validate \"src/**/*.html\""
},
```

Para ejecutar este análisis basta con ejecutar cualquiera de los dos siguientes comandos:
```
npm run lint:html
```

Se crea adicionalmente la regla en package.json para poder ejecutar ambos:
```
"scripts": {
  ...
  "lint:all": "npm run lint && npm run lint:html"
},
```

Cuya ejecución sería:
```
npm run lint:all
```


### axe-core con E2E (Playwright)
[axe-core](https://github.com/dequelabs/axe-core) el motor de verificación de comprobaciones de accesibilidad sobre páginas combinado con el framework de test sobre URL desplegadas Playwright.
Ejecuta las validaciones de Axe de forma automatizada sobre las URL, a las que además se puede ejecutar acciones antes de realizar el test de accesibilidad.

Se instalaron los plugins con:
```
npm i -D @playwright/test @axe-core/playwright
npx playwright install
npm i -D axe-html-reporter
```
NOTA: El último es para incluir el plugin axe-html-reporter para generar informes HTML de los resultados de axe-core.

Se modificó el package.json para tener los scripts de lanzamiento:
```
"e2e": "playwright test",
"e2e:ui": "playwright test --ui",
"e2e:debug": "PWDEBUG=1 playwright test"
```
- e2e: ejecutar las pruebas.
- e2e:ui: ejecutarlas desde una interfaz visual.

En el fichero "playwright.config.ts" se añadio la configuración de Playwright, haciendo referencia a la carpeta "e2e" donde estarán los test a ejecutar.
Dentro creamos "a11y.spec.ts" donde vamos a configurar los test de accesibilidad:
- Ejecutamos uno por cada URL de generacion.
- Hemos creado uno para pulsar el boton de generacion de NIFS mockeando la salida, y realizar el test de accesibilidad despues de la obtención del resultado. Además añade una captura de pantalla sobre el informe.
- A partir de aquí ya podriamos crear muchas combinaciones para probarlo todo.

Para ejecutar estas pruebas:
```
npm run e2e
```
axe-html-reporter generará los reportes HTML en la ruta "axe-reports" (utilizando internamente además una "test-results" y una "artifacts" durante la ejecución). Todas estas rutas no se suben al repositorio.


### Allure Report para las pruebas axe-core con E2E (Playwright)
[Allure Report](https://allurereport.org/es/) nos permite visualizar la información en un dashboard de control de las pruebas axe-core con E2E (Playwright) vistas en el punto anterior.
Allure Report lo tendremos instalado en nuestro S.O. y ejecutable via path.

En la aplicación se instaló el plugin:
```
npm install -D allure-playwright
```

Se modificó el "playwright.config.ts" de la configuración del punto anterior, para incoporar como reporter allure-playwright.

Metimos en "package.json" todos los scripts necesarios:
```
"allure:serve": "allure serve allure-results",
"e2e:allure:serve": "cmd /c \"npm run e2e & npm run allure:serve\"",
"allure:generate": "allure generate allure-results -o allure-report --clean",
"allure:open": "allure open allure-report",
"allure:history:pull": "powershell -NoProfile -ExecutionPolicy Bypass -Command \"New-Item -ItemType Directory -Force -Path .\\allure-results\\history | Out-Null; if (Test-Path .\\allure-history) { Copy-Item .\\allure-history\\* -Destination .\\allure-results\\history -Recurse -Force } elseif (Test-Path .\\allure-report\\history) { Copy-Item .\\allure-report\\history\\* -Destination .\\allure-results\\history -Recurse -Force }\"",
"allure:history:push": "powershell -NoProfile -ExecutionPolicy Bypass -Command \"New-Item -ItemType Directory -Force -Path .\\allure-history | Out-Null; if (Test-Path .\\allure-report\\history) { Copy-Item .\\allure-report\\history\\* -Destination .\\allure-history -Recurse -Force }\"",
"e2e:allure:report": "cmd /c \"npm run e2e & npm run allure:history:pull & npm run allure:generate & npm run allure:history:push & npm run allure:open\""
```

- npm run e2e:allure:serve: Ejecuta las pruebas E2E generando el resultado en "allure-results" y luego abre esos resultados ejecutando el comando allure en el S.O. Servidor Allure Report desplegado para ver los resultados en http://127.0.0.1:60203.
- npm run e2e:allure:report: Ejecuta lo anterior, pero al mismo tiempo va creando una imagen fija en "allure-report", que conserva las tendencias históricas. Hace uso de "allure-history" como respaldo local. Por tanto cada vez que ejecutamos esto, hace una foto fija para la tendencia. Tambien levanta el servidor de Allure Report en http://127.0.0.1:60203 con los resultados. Por esto, las carpetas "allure-report" y "allure-history" si las subimos al repositorio, son los datos que se mostrarán por un Allure Report Server.
- npm run allure:open: Se levanta el servidor de Allure Report en http://127.0.0.1:60203 con los resultados de "allure-report" que estén cargados. Sin necesidad de hacer un nuevo análisis.