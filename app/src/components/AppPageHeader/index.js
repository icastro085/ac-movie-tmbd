import { connect } from 'react-redux';
import Component from './component';

const mapStateToProps = ({ app: { title } }) => ({ title });
const Container = connect(mapStateToProps)(Component);

export default connect()(Container);
