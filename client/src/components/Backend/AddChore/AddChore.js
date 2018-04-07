import React, { Component } from 'react';
import ChoreList from './ChoreList/ChoreList';
import ChoreForm from './ChoreForm/ChoreForm';

class AddChore extends Component {
    render() {
        return (
            <div>
                <ChoreList></ChoreList>
                <hr/>
                <ChoreForm></ChoreForm>
            </div>
        );

    }
}

export default AddChore;