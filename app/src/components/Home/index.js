
import { connect } from 'react-redux';
import Component from './component';
import { changeTitle } from '../../reducers/app';
import { upcoming, genre as genreMovie, search } from '../../reducers/movie';

const mapStateToProps = ({
  movie: { movies, genre, query }
}) => ({ movies, genre, query });
const mapDispatchToProps = dispatch => (
  {
    changeTitle: title => dispatch(changeTitle(title)),
    upcoming: ({ page }) => dispatch(upcoming({ page })),
    genreMovie: () => dispatch(genreMovie()),
    search: ({ page, query }) => dispatch(search({ page, query }))
  }
);

const Container = connect(
  mapStateToProps,
  mapDispatchToProps
)(Component);

export default connect()(Container);
