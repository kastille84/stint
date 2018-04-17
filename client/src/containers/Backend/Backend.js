import React, { Component } from 'react';
import { Route, Switch, withRouter } from 'react-router-dom';
import classes from './Backend.css';

import Home from '../../components/Backend/Home/Home';
import WhichUser from '../../components/Backend/WhichUser/WhichUser';
import AddChild from '../../components/Backend/AddChild/AddChild';
import AddChore from '../../components/Backend/AddChore/AddChore';
import ChoreChart from '../../components/Backend/ChoreChart/ChoreChart';

class Backend extends Component {
    
    render() {
        return (
            <div className={classes.Backend}>               
                <Switch>
                    <Route path="/dashboard" exact component={Home} />
                    <Route path="/dashboard/addchild" component={AddChild} />
                    <Route path="/dashboard/addChore" component={AddChore} />
                    <Route path="/dashboard/choreChart" component={ChoreChart} />
                    <Route path="/dashboard/whichuser"  component={WhichUser} />    
                </Switch>
            </div>
        )
    }
}

export default withRouter(Backend);