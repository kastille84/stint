import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import classes from './Frontend.css';
import Home from '../../components/Frontend/Home/Home';
import Register from '../../components/Frontend/Register/Register';
import Signin from '../../components/Frontend/Signin/Signin';

export default class Frontend extends Component {
    
    render(){
        return (
            <div className={classes.Frontend}>            
                <Switch>
                    <Route path="/" exact={true} component={Home} />
                    <Route path='/register' component={Register} />
                    <Route path="/signin/:id/:hash" component={Signin} />
                    <Route path="/signin"  component={Signin} />
                </Switch>
                
            </div>
        );
    }

}