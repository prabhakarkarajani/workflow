import React from 'react';
import { connect } from 'react-redux';
import resetAuthState_action from '../../actions/authAction';
import Header from '../Header';

function Layout(props) {
  return (
    <React.Fragment>
      <Header />
      {props.children}
    </React.Fragment>
  )
}

const mapStateToProps = state => ({
});

const mapDispatchToProps = dispatch => ({
  resetAuthState_action: () => {
    dispatch(resetAuthState_action());
  },
});
export default connect(mapStateToProps, mapDispatchToProps)(Layout)