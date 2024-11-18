export const environment = {
  production: true,
  //apiUrl: 'https://rest-j-generadores.onrender.com/generadores'
  //apiUrl: 'https://rest-j-generadores-production.up.railway.app/generadores'
  apiUrl: process.env["API_REST_PROD"]
};
