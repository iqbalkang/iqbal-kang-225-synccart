import axios from 'axios';

const customFetch = axios.create({
  baseURL: 'http://54.153.91.186/api/v1',
});

export default customFetch;
