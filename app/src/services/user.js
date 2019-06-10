const axios = require('axios');
const gapi = require('gapi');

const URL_API = '/api/user';

const api = axios.create({
  baseURL: URL_API,
});

export const get = async ({ page = 1}) => {
  const response = await api.get('/', {
    params: {
      page,
    }
  });

  return response.data;
};

export const saveAddress = (data) => {
  return api.post('/address', data);
}

export const getAddress = async(email) => {
  const response = await api.get('/address', {
    params: {
      email,
    }
  });

  return response.data;
}
