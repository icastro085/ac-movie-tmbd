import {
  createActions,
  handleActions,
  combineActions,
} from 'redux-actions';

const defaultState = { title: '' };

export const { changeTitle } = createActions({
  CHANGE_TITLE: title => ({ title }),
});

const reducer = handleActions(
  {
    [combineActions(changeTitle)]: (
      state,
      { payload: { title } }
    ) => ({ ...state, title }),
  },
  defaultState
);

export default reducer;
