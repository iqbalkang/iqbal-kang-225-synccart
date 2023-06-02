import axios from 'axios';

const customFetch = axios.create({
  baseURL: 'http://54.67.116.33/api/v1',
});

export default customFetch;
