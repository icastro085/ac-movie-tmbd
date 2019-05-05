import React, { Component, Fragment } from 'react';

import CardMovie from './CardMovie';

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

    if (!movies.results.length) {
      return <p>No result!</p>;
    }

    const pageNumbers = [];
    for(let i = 0; i < movies.total_pages; i++) {
      pageNumbers.push(
        <li className={`page-item ${(i + 1) == movies.page ? 'active' : ''}`} key={`keyp${i}`}>
          <a className="page-link" onClick={() => upcoming({page: i + 1})}>
            {i + 1}
          </a>
        </li>
      );
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

      <nav className="my-5">
        <ul className="pagination">
          <li className="page-item disabled">
            <a className="page-link" href="#" tabIndex="-1">Previous</a>
          </li>
          {pageNumbers}
          <li className="page-item">
            <a className="page-link" href="#">Next</a>
          </li>
        </ul>
      </nav>
      </Fragment>
    );
  }
}
