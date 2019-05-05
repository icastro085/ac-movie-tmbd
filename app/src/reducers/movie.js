import {
  createActions,
  handleActions,
  combineActions,
} from 'redux-actions';

import {
  upcoming as upcomingMovie
} from '../services/movie';

const defaultState = { movies: { results: []} };

export const { upcoming, details, search } = createActions({
  UPCOMING: async ({ page }) => {
    const data = await upcomingMovie({ page });
    return { movies: data };
  },
  DETIALS: idMovie => ({ idMovie }),
  SEARCH: page => ({ page }),
});

const reducer = handleActions(
  {
    [combineActions(upcoming)]: (
      state,
      { payload: { movies } }
    ) => ({ ...state, movies }),
  },
  defaultState
);

export default reducer;
