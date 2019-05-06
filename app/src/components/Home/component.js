import React, { Component, Fragment } from 'react';

import CardMovie from './CardMovie';
import Pagination from './Pagination';
import Loading from '../Loading';

export default class Home extends Component {
  constructor(props) {
    super(props);
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

    if (
      !/search/g.test(location.pathname) &&
      (!movies || !movies.results.length)
    ) {
      genreMovie();
      upcoming({});
    } else if (
      /search/g.test(location.pathname) &&
      (!movies || !movies.results.length)
    ){
      history.push('/');
      genreMovie();
      upcoming({});
    }
  }

  onChangePage(page) {
    const { upcoming, query, search } = this.props;
    if (query) {
      search({ page, query });
    } else {
      upcoming({ page });
    }
  }

  render() {
    const { movies, genre } = this.props;

    if (!movies || !movies.results || !movies.results.length) {
      return <Loading />;
    }

    return (
      <Fragment>
        <Pagination
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
          totalPages={movies.total_pages}
          currentPage={movies.page}
          changePage={(page) => this.onChangePage(page)}
        />
      </Fragment>
    );
  }
}
