import React, { Component } from 'react';
//import logo from './logo.svg';
import classes from  './App.css';
import Navigation from './components/Navigation/Navigation';
import Frontend from './containers/Frontend/Frontend';
import Backend from './containers/Backend/Backend';

class App extends Component {
  state = {
    isLoggedIn: false
  }

  componentDidMount() {
    // axios.get('http://localhost:5000/api/users')
    //       .then(data => {
    //         console.log(data);
    //       })
  }

  render() {
    return (
      <div className={classes.App}>
        <Navigation isLoggedIn={this.state.isLoggedIn}></Navigation>
        {this.state.isLoggedIn? <Backend></Backend> : <Frontend ></Frontend> }
        
      </div>
    );
  }
}

export default App;
