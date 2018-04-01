import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import classes from './Backend.css';

import Home from '../../components/Backend/Home/Home';
import WhichUser from '../../components/Backend/WhichUser/WhichUser';

export default class Backend extends Component {

    render() {
        return (
            <div className={classes.Backend}> 
                Back               
                <Switch>
                <Route path="/dashboard" exact component={Home} />
                <Route path="/dashboard/whichuser"  component={WhichUser} />    
            </Switch>
            </div>
        )
    }
}