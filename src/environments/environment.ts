export const environment = {
  production: true,
  //apiUrl: 'https://rest-j-generadores.onrender.com/generadores'
  //apiUrl: 'https://rest-j-generadores-production.up.railway.app/generadores'
  //Sustituimos por el uso de @ngx-env/builder para coger una variable de entorno definida en el provvedor de alojamiento
  apiUrl: import.meta.env.NG_APP_API_REST_PROD
};
