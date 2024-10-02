#####################################################################
#Esto seria para construirla... y desplegarlo con el servidor Nginx
#####################################################################
#PASO 1: Contenedor donde se construye la aplicacion
FROM node:alpine AS builder

RUN npm install -g @angular/cli

WORKDIR /usr/src/app

COPY . /usr/src/app

RUN npm install

#ahora hacemos un build para construit el objeto final (para build es el defecto, pero lo marcamos para que sea mas claro)
RUN ng build --configuration=production

#PASO 2: Contenedor donde se despliega la aplicacion

#ahora creamos una imagen de Alpine Linux con Nginx instalado
FROM nginx:alpine

# copy the custom nginx configuration file to the container in the
# default location
COPY --from=builder /usr/src/app/nginx.conf /etc/nginx/nginx.conf

#copiamos la carpeta que genera el build (ver en angular.json el outputPath) a la ruta de aplicaciones del Nginx
#builder: es el nombre del paso anterior "AS builder"
#OJO!!!: Con las nuevas versions de Angular, al outputPath le añade una carpeta "browser", y dentro de esta esta
#el contenido de la aplicacion. Por eso debemos copiar esto. Ahora habria dos formas tal como hemos dejado nginx.conf:
#  - Copiar "browser" renombrada a "angular-j-generadores-fe2" en cuyo caso para acceder al contenido deberia
#    ser "/angular-j-generadores-fe2"
#  - Copiar el contenido de "browser" a la html de nginx directamente. Toda nuestra aplicacion ocupa todo el server.
# Todo esto tambien depende de la configuracion del nginx.conf, claro. Hacemos la segunda opción
COPY --from=builder /usr/src/app/dist/angular-j-generadores-fe2/browser/* /usr/share/nginx/html

#Aqui el expuesto es el del servidor Nginx... que es el 80 noirmal
EXPOSE 80

# Levantamos NGINX server
CMD ["nginx", "-g", "daemon off;"]


#####################################################################
#Esto seria para construirla... y desplegarlo como en local con ng serve
#####################################################################

#Una maquina preconfigurada de Alpine Linux con Node.js
#+FROM node:alpine

#Instalamos angular-cli
#RUN npm install -g @angular/cli

#Configuramos el directorio de trabajo para nuestra aplicacion
#WORKDIR /usr/src/app

#Copiamos nuestra aplicacion a ese directorio
#en el .dockerignore hemos indicado que no copie las cosas innecesarios, o simplemente que se generaran en el install y build
#COPY . /usr/src/app

#Instalamos las dependencias de nuestra aplicacion
#RUN npm install

#Indicamos el puerto expuesto por nuestra aplicacion que levantamos con ng serve
#EXPOSE 4200

#Levantamos el server de nuestra aplicacion para produccion
#NOTA: esto lo levantaria como lo hacemos en nuestro local... pero no es lo que recomiendan para produccion, sino utilzar
#un servidor web como Nginx. En nuestro caso de momneto solo queremos probarlo asi.
#CMD ["ng", "serve", "--configuration", "production"]
