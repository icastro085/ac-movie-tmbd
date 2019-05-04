
import { connect } from 'react-redux';
import Component from './component';
import { changeTitle } from '../../reducers/app';

const mapStateToProps = () => ({});
const mapDispatchToProps = dispatch => (
  {
    changeTitle: title => dispatch(changeTitle(title)),
  }
);

const Container = connect(
  mapStateToProps,
  mapDispatchToProps
)(Component);

export default connect()(Container);
