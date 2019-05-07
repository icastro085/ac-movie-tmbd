import React, { Component, Fragment } from 'react';
import {
  Redirect
} from 'react-router-dom';

import Loading from '../Loading';
import { getImageRootPath, formatDate } from '../../services/movie';

export default class Details extends Component {

  constructor(props) {
    super(props);
    this.state = {
      movie: this.props.movie,
    };
  }

  componentWillMount() {
    const { changeTitle, match, details, movie, resetDetails } = this.props;
    const { idMovie } = match.params;

    changeTitle('See Movie Details');

    if (parseInt(idMovie) !== parseInt(movie.id)) {
      resetDetails();
      details({ idMovie });
    }
  }

  componentWillReceiveProps({ movie }) {
    this.setState({
      movie,
    });
  }

  render() {
    const { location, resetDetails } = this.props;
    const { movie = {} } = this.state;
    const {
      id,
      original_title,
      release_date,
      overview,
      poster_path,
      backdrop_path,
      genres,
      success,
    } = movie;
    const params = new URLSearchParams(location.search);

    if (success === false) {
      resetDetails();
      return <Redirect to="/" />
    }

    if (!id) {
      return <Loading />;
    }

    return (
      <div className="d-flex mt-5 details">
        <div className="w-100 pr-3 position-relative box-movie-text">
          {
            (genres || []).length ? (
              <Fragment>
                <i className="fas fa-venus-mars mr-2 float-left" />
                <ul className="list-genres mb-2">
                  {
                    (genres || []).map(({ id, name }) => {
                      return <li key={id}>{name}</li>
                    })
                  }
                </ul>
              </Fragment>
            ) : null
          }

          <h2>{original_title}</h2>
          <span className="date">
            <i className="far fa-calendar-alt mr-2" />
            {formatDate(release_date)}
          </span>
          {
            overview && (
              <Fragment>
                <hr />
                <h5 className="font-weight-bold">Sinopse</h5>
                <p className="mb-5">
                  <i className="fas fa-info-circle mr-2" />{overview}
                </p>
              </Fragment>
            )
          }

          <a title="BACK" href={`/#/${params.get('p')}`} className="position-absolute text-success btn-back">
            <i className="fas fa-arrow-left" />
          </a>
        </div>

        {
          (poster_path || backdrop_path) &&
          <img
            alt={original_title}
            src={`${getImageRootPath(300, 450)}${poster_path || backdrop_path}`}
          />
        }
      </div>
    );
  }
}
