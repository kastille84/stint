import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import classes from './Frontend.css';
import Home from '../../components/Frontend/Home/Home';
import About from '../../components/Frontend/About/About';
import Register from '../../components/Frontend/Register/Register';
import Signin from '../../components/Frontend/Signin/Signin';

export default class Frontend extends Component {

    render(){
        return (
            <div className={classes.Frontend}>
                <Route path="/" exact component={Home} />
                <Route path="/about"  component={About} />
                <Route path="/register" component={Register} />
                <Route path="/signin"  component={Signin} />
            </div>
        );
    }

}