import {
  createActions,
  handleActions,
  combineActions,
} from 'redux-actions';

import {
  upcoming as upcomingMovie,
  details as detailsMovie,
  genre as genreMovie,
  search as searchMovie,
} from '../services/movie';

const defaultState = {
  movies: { results: []},
  movie: {},
  genre: [],
  query: '',
  loading: true,
};

export const {
  upcoming,
  details,
  search,
  resetDetails,
  genre,
  isLoading,
} = createActions({
  UPCOMING: async ({ page }) => {
    const data = await upcomingMovie({ page });
    return { movies: data, loading: false };
  },

  DETAILS: async ({ idMovie }) => {
    const data  = await detailsMovie({ idMovie });
    return { movie: data };
  },

  SEARCH: async ({ page, query }) => {
    const data = await searchMovie({ page, query });
    return { movies: data, query, loading: false };
  },

  RESET_DETAILS: () => ({ movie: {}}),

  GENRE: async () => {
    const data  = await genreMovie();
    return { genre: (data || {}).genres };
  },

  IS_LOADING: () => ({ loading: true })
});

const reducer = handleActions(
  {
    [combineActions(upcoming, search)]: (
      state,
      { payload: { movies, query, loading } }
    ) => ({ ...state, movies, query, loading }),

    [combineActions(isLoading)]: (
      state,
      { payload: { loading } }
    ) => ({ ...state, loading }),

    [combineActions(details, resetDetails)]: (
      state,
      { payload: { movie } }
    ) => ({ ...state, movie }),

    [combineActions(genre)]: (
      state,
      { payload: { genre } }
    ) => ({ ...state, genre }),
  },
  defaultState
);

export default reducer;
