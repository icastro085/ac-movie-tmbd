const axios = require('axios');

const URL_API = '/api/movie';

const api = axios.create({
  baseURL: URL_API,
});

export const IMAGE_ROOT = 'https://image.tmdb.org/t/p/';

export const upcoming = async ({ page = 1}) => {
  const response = await api.get('/upcoming', {
    params: {
      page,
    }
  });

  return response.data;
};

export const details = async ({ idMovie }) => {
  const response = await api.get(`/${idMovie}`);
  return response.data;
};

export const search = async ({ page, query }) => {
  const response = await api.get('/search', {
    params: {
      page,
      query,
    }
  });
  return response.data;
};

export const genre = async () => {
  const response = await api.get(`/genre`);
  return response.data;
};

export const formatDate = (release_date) => (
  new Date(release_date).toLocaleDateString(
    'en-US', { year: 'numeric', month: 'long', day: 'numeric' }
  )
);

export const getImageRootPath = (w, h) => (
  `${IMAGE_ROOT}w${w}_and_h${h}_bestv2`
);
