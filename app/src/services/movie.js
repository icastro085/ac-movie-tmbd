const axios = require('axios');

const URL_API = '/api/movie';

const api = axios.create({
  baseURL: URL_API,
});

export const IMAGE_ROOT = 'https://image.tmdb.org/t/p/w185_and_h278_bestv2';

export const upcoming = async ({ page = 1}) => {
  const response = await api.get('/upcoming', {
    params: {
      page,
    }
  });

  return response.data;
};

export const details = ({ idMovie }) => {

};

export const search = ({ page, query }) => {

};


export const formatDate = (release_date) => (
  new Date(release_date).toLocaleDateString(
    'en-US', { year: 'numeric', month: 'long', day: 'numeric' }
  )
)
