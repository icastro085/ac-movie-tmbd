import {
  createActions,
  handleActions,
  combineActions,
} from 'redux-actions';

import {
  upcoming as upcomingMovie,
  details as detailsMovie
} from '../services/movie';

const defaultState = { movies: { results: []}, movie: {} };

export const { upcoming, details, search, resetDetails } = createActions({
  UPCOMING: async ({ page }) => {
    const data = await upcomingMovie({ page });
    return { movies: data };
  },
  DETAILS: async ({ idMovie }) => {
    const data  = await detailsMovie({ idMovie })
    return { movie: data };
  },
  SEARCH: page => ({ page }),

  RESET_DETAILS: () => ({ movie: {}}),
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
  },
  defaultState
);

export default reducer;
