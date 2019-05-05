
import { connect } from 'react-redux';
import Component from './component';
import { changeTitle } from '../../reducers/app';
import { upcoming } from '../../reducers/movie';

const mapStateToProps = ({ movie: { movies }}) => ({ movies });
const mapDispatchToProps = dispatch => (
  {
    changeTitle: title => dispatch(changeTitle(title)),
    upcoming: ({ page }) => dispatch(upcoming({ page })),
  }
);

const Container = connect(
  mapStateToProps,
  mapDispatchToProps
)(Component);

export default connect()(Container);
