import React, { Component, Fragment } from 'react';

import CardMovie from './CardMovie';
import Pagination from './Pagination';

export default class Home extends Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    const { changeTitle, upcoming } = this.props;
    changeTitle('Are the Upcoming Movies');
    upcoming({});
  }

  render() {
    const { movies, upcoming } = this.props;

    if (!movies || !movies.results.length) {
      return <p>No result!</p>;
    }

    return (
      <Fragment>
      <div className="row mt-5">
      {
        movies.results.map(data => (
          <CardMovie key={data.id} {...data} />
        ))
      }
      </div>

      <Pagination
        totalPages={movies.total_pages}
        currentPage={movies.page}
        changePage={(page) => upcoming({ page })}
      />
      </Fragment>
    );
  }
}
