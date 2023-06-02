import axios from 'axios';

const customFetch = axios.create({
  baseURL: 'http://13.57.222.128/api/v1',
});

export default customFetch;
