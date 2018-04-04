import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
//import logo from './logo.svg';
import classes from  './App.css';

import Navigation from './components/Navigation/Navigation';
import Backend from './containers/Backend/Backend';
import Frontend from './containers/Frontend/Frontend';

class App extends Component {
  state = {
    isLoggedIn: false,
    whichUser: false
  }

  componentDidMount() {
    // axios.get('http://localhost:5000/api/users')
    //       .then(data => {
    //         console.log(data);
    //       })
    if (localStorage.getItem('token')){
      this.setState({isLoggedIn: true});
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
export default withRouter(connect(mapStateToProps)(App) );