import axios from 'axios';

const customFetch = axios.create({
  baseURL: 'http://54.215.53.218/api/v1',
});

export default customFetch;
