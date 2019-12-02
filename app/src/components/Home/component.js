import React, { Component, Fragment } from 'react';
import { toastr } from 'react-redux-toastr';

import CardMovie from './CardMovie';
import Pagination from './Pagination';
import Loading from '../Loading';

export default class Home extends Component {
  constructor(props) {
    super(props);
    const { history, upcoming } = props;

    this.state = {
      totalResults: -1,
    };

    // here active when press home
    const isBackUpcoming = history.action === 'REPLACE';

    if (isBackUpcoming) {
      upcoming({});
    }
  }

  componentWillMount() {
    const {
      changeTitle,
      upcoming,
      movies,
      genreMovie,
      location,
      history,
    } = this.props;

    changeTitle('The Upcoming Movies');

    if (!movies || !movies.results.length) {
      genreMovie();
      upcoming({});

      // when reload page, if is search page redirect to home
      if (/search/g.test(location.pathname)) {
        history.push('/');
      }
    }
  }

  componentWillReceiveProps({ movies, loading }) {
    if (!movies || movies.success === false) {
      toastr.warning('Something goes wrong!!');

      this.setState({
        loading: false,
        totalResults: 0,
      });
    } else {
      this.setState({
        loading: loading,
        totalResults: movies.total_results,
      });
    }
  }

  onChangePage(page) {
    const { upcoming, location, query, search } = this.props;
    if (location.pathname === '/search') {
      search({ page, query });
    } else {
      upcoming({ page });
    }
  }

  render() {
    const { movies, genre, location, loading } = this.props;
    const { totalResults } = this.state;

    if (loading) {
      return <Loading />;
    } else if (totalResults === 0) {
      return (
        <p className="text-center text-warning mt-5 h1">
          No results found
        </p>
      );
    }

    return (
      <Fragment>
        <Pagination
          url={location.pathname}
          totalPages={movies.total_pages}
          currentPage={movies.page}
          changePage={(page) => this.onChangePage(page)}
        />

        <div className="row mt-2">
        {
          movies.results.map(data => (
            <CardMovie key={data.id} {...data} genre={genre} />
          ))
        }
        </div>

        <Pagination
          url={location.pathname}
          totalPages={movies.total_pages}
          currentPage={movies.page}
          changePage={(page) => this.onChangePage(page)}
        />
      </Fragment>
    );
  }
}
