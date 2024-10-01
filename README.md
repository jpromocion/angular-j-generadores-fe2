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

### Incrementar código

Ejecutar `ng generate component component-name` para generar un nuevo componente. Puedes usar `ng generate directive|pipe|service|class|guard|interface|enum|module`.

### Build

Ejecutar `ng build` para construir el proyecto. El artefacto montado será guardado en el directorio `dist/`.




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
- Adicional para generar excel, permite descargar el fichero.
