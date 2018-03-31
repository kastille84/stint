import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
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
                <Switch>
                    <Route path="/signin/:id/:hash" component={Signin} />
                    <Route path="/signin"  component={Signin} />
                </Switch>
            </div>
        );
    }

}