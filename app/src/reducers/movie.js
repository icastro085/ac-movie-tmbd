import {
  createActions,
  handleActions,
  combineActions,
} from 'redux-actions';

import {
  upcoming as upcomingMovie,
  details as detailsMovie,
  genre as genreMovie,
} from '../services/movie';

const defaultState = { movies: { results: []}, movie: {}, genre: [] };

export const {
  upcoming,
  details,
  search,
  resetDetails,
  genre,
} = createActions({
  UPCOMING: async ({ page }) => {
    const data = await upcomingMovie({ page });
    return { movies: data };
  },
  DETAILS: async ({ idMovie }) => {
    const data  = await detailsMovie({ idMovie });
    return { movie: data };
  },
  SEARCH: page => ({ page }),

  RESET_DETAILS: () => ({ movie: {}}),

  GENRE: async () => {
    const data  = await genreMovie();
    return { genre: (data || {}).genres };
  }
});

const reducer = handleActions(
  {
    [combineActions(upcoming)]: (
      state,
      { payload: { movies } }
    ) => ({ ...state, movies }),

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
