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
- Vehículos: Ataca la API REST para la generación de tipos de mátricula y número de bastidos, así como la validación de un número de bastidor.
- Localización: Ataca la API REST para recuperar CCAA, Provincias, Municipios de España.
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

Requisitos de internacionalizacióin de los DatePicker de Angular Material
[Angular Material Date Picker](https://material.angular.io/components/datepicker/overview)

Instalamos con:
```
npm install @angular/material-moment-adapter --force
```
- Permite configurar en el app.config.ts el "provideMomentDateAdapter", de forma que los calendarios empiecen por Lunes.



## Docker - Render

Se incluye un Dockerfile que permite desplegar la aplicación en Render:
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




