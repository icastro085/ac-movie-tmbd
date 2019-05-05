import React from 'react';

import { IMAGE_ROOT, formatDate } from '../../services/movie';

const CardMovie = ({
  id,
  title,
  backdrop_path,
  overview,
  release_date
}) => (
  <div className="col-md-6 mb-4">
    <div className="border-bottom card-movie d-flex">
      
      <div className="p-3">
        <div>
          <h5 className="title">{title}</h5>
          <span className="date">{formatDate(release_date)}</span>
        </div>

        <p className="overview mt-2">
        {overview.substring(0, 200)}
        {overview.length > 200 ? '...' : null}
        </p>

        <a href={`#/movie/${id}`} className="see-more">See more +</a>
      </div>

      <img src={`${IMAGE_ROOT}${backdrop_path}`} />
    </div>
  </div>
);

export default CardMovie;
