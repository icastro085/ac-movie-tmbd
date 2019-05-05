import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { toastr } from 'react-redux-toastr';
import { search } from '../../reducers/movie';

const element = React.createRef();
const TEXT_LIMIT = 3;

const SearchInput = ({ query, searchMovies, location, history }) => (
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
        searchMovies({ query });

        if (!/search/g.test(location.pathname)) {
          history.push('/search');
        }
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
    searchMovies: ({ page, query }) => dispatch(search({ page, query })),
  }
);

const Container = connect(mapStateToProps, mapDispatchToProps)(SearchInput);

export default withRouter(connect()(Container));
