import axios from 'axios';

const customFetch = axios.create({
  // baseURL: process.env.SERVER,
  baseURL: 'https://synccart.store/api/v1',
});

export default customFetch;
