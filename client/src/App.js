import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
//import logo from './logo.svg';
import classes from  './App.css';
import * as actions from './store/actions/index';

import Navigation from './components/Navigation/Navigation';
import Backend from './containers/Backend/Backend';
import Frontend from './containers/Frontend/Frontend';

class App extends Component {
  state = {
    //isLoggedIn: false,
    whichUser: false
  }

  componentDidMount() {
    // GUARD 
    if (localStorage.getItem('token') && this.props.user.user){
      //this.setState({isLoggedIn: true});
      // set userRedux issignedin
      this.props.onSetIsSignedIn(true);
    } else {
      localStorage.removeItem('token');
      this.props.history.push('/');
    }
  }

  render() {
    return (
      <div className={classes.App}>
        <Navigation></Navigation>
        {this.props.user.isSignedIn? <Backend /> : <Frontend />}
                          
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    user: state.userRedux
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    onSetIsSignedIn: (bool) => dispatch(actions.setSigninUser(bool))
  }
}
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App) );