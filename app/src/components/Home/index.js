
import { connect } from 'react-redux';
import Component from './component';
import { changeTitle } from '../../reducers/app';
import { upcoming, genre as genreMovie } from '../../reducers/movie';

const mapStateToProps = ({ movie: { movies, genre }}) => ({ movies, genre });
const mapDispatchToProps = dispatch => (
  {
    changeTitle: title => dispatch(changeTitle(title)),
    upcoming: ({ page }) => dispatch(upcoming({ page })),
    genreMovie: () => dispatch(genreMovie()),
  }
);

const Container = connect(
  mapStateToProps,
  mapDispatchToProps
)(Component);

export default connect()(Container);
