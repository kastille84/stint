import React, { Component } from 'react';
import ChildList from './ChildList/ChildList';
import ChildForm from './ChildForm/ChildForm';

class AddChild extends Component {
    state = {
        editMode: false
    }

    render() {
        return (
            <div>
                Add/Edit Child Page
    
                <ChildList></ChildList>
                <hr />
                <ChildForm editMode={this.state.editMode}></ChildForm>
            </div>
        )
    }
}

export default AddChild;