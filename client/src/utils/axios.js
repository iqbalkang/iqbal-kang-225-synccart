import axios from 'axios';

const customFetch = axios.create({
  baseURL: 'http://13.56.165.224/api/v1',
});

export default customFetch;
