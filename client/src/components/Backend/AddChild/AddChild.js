import React, { Component } from 'react';
import ChildList from './ChildList/ChildList';
import ChildForm from './ChildForm/ChildForm';

class AddChild extends Component {
    state = {
        editMode: false,
        addedChildren: []
    }

    onAddedChildren = (child) =>{
        let childrenCopy = [...this.state.children];
        childrenCopy.push(child);
        this.setState({addedChildren: childrenCopy});
    }

    render() {
        return (
            <div>
                Add/Edit Child Page
    
                <ChildList addedChildren={this.state.addedChildren}></ChildList>
                <hr />
                <ChildForm 
                    editMode={this.state.editMode}
                    addedChildren={this.onAddedChildren}></ChildForm>
            </div>
        )
    }
}

export default AddChild;