import React, { Component } from 'react';
import ChoreList from './ChoreList/ChoreList';
import ChoreForm from './ChoreForm/ChoreForm';
import classes from './AddChore.css';

class AddChore extends Component {
    render() {
        return (
            <div className={classes.AddChore + " container"}>
                <ChoreList></ChoreList>
                <hr/>
                <ChoreForm></ChoreForm>
            </div>
        );

    }
}

export default AddChore;