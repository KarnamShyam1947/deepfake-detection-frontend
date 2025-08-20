import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:8080/',
});

axiosInstance.defaults.withCredentials=true

export default axiosInstance;
