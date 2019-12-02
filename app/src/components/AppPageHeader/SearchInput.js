import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { toastr } from 'react-redux-toastr';
import { search, isLoading } from '../../reducers/movie';
import { changeTitle } from '../../reducers/app';

const element = React.createRef();
const TEXT_LIMIT = 3;

const SearchInput = ({
  query,
  searchMovies,
  history,
  changeTitle,
}) => (
  <form
    className="form-search"
    action="/#/"
    method="POST"
    onSubmit={(e) => {
      const query = element.current.value;
      e.preventDefault();

      if ((query || '').length < TEXT_LIMIT) {
        toastr.error('Type text with than 3 character');
      } else {
        history.push('/search');
        searchMovies({ query });
        changeTitle('Looking For Movies');
      }
    }}
  >
    <input
      ref={element}
      className="form-control form-control-lg" 
      type="text"
      defaultValue={query}
      placeholder="Type search text..." />

    <button type="submit" className="btn btn-success">
      <i className="fas fa-search"/>
    </button>
  </form>
);

const mapStateToProps = ({ movie: { query } }) => ({ query });
const mapDispatchToProps = dispatch => (
  {
    searchMovies: ({ page, query }) => dispatch(isLoading()) && dispatch(search({ page, query })),
    changeTitle: title => dispatch(changeTitle(title)),
  }
);

const Container = connect(mapStateToProps, mapDispatchToProps)(SearchInput);

export default withRouter(connect()(Container));
