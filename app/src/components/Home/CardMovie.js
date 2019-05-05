import React from 'react';

import { getImageRootPath, formatDate } from '../../services/movie';

const CardMovie = ({
  id,
  title,
  poster_path,
  backdrop_path,
  overview,
  release_date
}) => (
  <div className="col-md-6 mb-4">
    <div className="border-bottom card-movie d-flex">
      
      <div className="p-3 w-100">
        <div>
          <h5 className="title">{title}</h5>
          <span className="date">
            <i className="far fa-calendar-alt mr-2" />
            {formatDate(release_date)}
          </span>
        </div>

        <p className="overview mt-2">
          <i className="fas fa-info-circle mr-2" />
          {overview.substring(0, 200)}
          {overview.length > 200 ? '...' : null}
        </p>

        <a href={`#/movie/${id}`} className="see-more text-success">
          See more <i className="fas fa-angle-double-right" />
        </a>
      </div>

      {
        (poster_path || backdrop_path) &&
        <img alt={title} src={`${getImageRootPath(185, 278)}${poster_path || backdrop_path}`} />
      }
    </div>
  </div>
);

export default CardMovie;
