
import { connect } from 'react-redux';
import Component from './component';
import { changeTitle } from '../../reducers/app';
import { upcoming, genre as genreMovie, search, isLoading } from '../../reducers/movie';

const mapStateToProps = ({
  movie: { movies, genre, query, loading }
}) => ({ movies, genre, query, loading });
const mapDispatchToProps = dispatch => (
  {
    changeTitle: title => dispatch(changeTitle(title)),
    upcoming: ({ page }) => dispatch(isLoading()) && dispatch(upcoming({ page })),
    genreMovie: () => dispatch(genreMovie()),
    search: ({ page, query }) => dispatch(isLoading()) && dispatch(search({ page, query }))
  }
);

const Container = connect(
  mapStateToProps,
  mapDispatchToProps
)(Component);

export default connect()(Container);
