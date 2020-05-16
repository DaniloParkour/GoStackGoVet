import axios from 'axios';

const api = axios.create({
  //192.168.232.2
  //10.0.2.2
  baseURL: 'http://10.0.2.2:3333'
});

export default api;
