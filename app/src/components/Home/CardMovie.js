import React from 'react';

import { getImageRootPath, formatDate } from '../../services/movie';

const TEXT_LIMIT = 150;

const CardMovie = ({
  id,
  title,
  poster_path,
  backdrop_path,
  overview,
  release_date,
  genre_ids,
  genre,
}) => (
  <div className="col-md-6 mb-4">
    <div className="border-bottom card-movie d-flex">
      
      <div className="p-3 w-100">
        <div>
          <div>
          {
            (genre || []).filter((genre) => (
              genre_ids.indexOf(genre.id) !== -1
            )).map((genre) => (
                <span 
                  key={genre.id}
                  className="genre-list mr-2"
                >
                  {genre.name}
                </span>
              )
            )
          }
          </div>
          <h5 className="title">{title}</h5>
          <span className="date">
            <i className="far fa-calendar-alt mr-2" />
            {formatDate(release_date)}
          </span>
        </div>

        {
          overview && (
            <p className="overview mt-2">
              <i className="fas fa-info-circle mr-2" />
              {overview.substring(0, TEXT_LIMIT)}
              {overview.length > TEXT_LIMIT ? '...' : null}
            </p>
          )
        }

        <a
          title="SEE MORE"
          href={`#/movie/${id}`}
          className="see-more font-weight-bold text-success"
        >
          <i class="fas fa-arrow-right" />
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
