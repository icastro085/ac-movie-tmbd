
import { connect } from 'react-redux';
import Component from './component';
import { changeTitle } from '../../reducers/app';
import { details, resetDetails } from '../../reducers/movie';

const mapStateToProps = ({ movie: { movie }}) => ({ movie });
const mapDispatchToProps = dispatch => (
  {
    changeTitle: title => dispatch(changeTitle(title)),
    details: ({ idMovie }) => dispatch(details({ idMovie })),
    resetDetails: () => dispatch(resetDetails()),
  }
);

const Container = connect(
  mapStateToProps,
  mapDispatchToProps
)(Component);

export default connect()(Container);
