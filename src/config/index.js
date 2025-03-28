// Trocar 8080 para porta 8082 caso queira usar o projeto vejoflix-api
const URL_BACKEND_TOP = window.location.hostname.includes('localhost')
  ? 'http://localhost:8080'
  : 'https://ec2-3-18-102-247.us-east-2.compute.amazonaws.com:443';

export default {
  URL_BACKEND_TOP,
};