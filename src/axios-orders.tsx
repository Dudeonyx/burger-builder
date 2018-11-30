import axios from 'axios';

const axiosOrderInstance = axios.create( {
  baseURL: 'https://react-burger-builder-8d6de.firebaseio.com/',
} );

export default axiosOrderInstance;
