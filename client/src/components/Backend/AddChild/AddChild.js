import React, { Component } from 'react';
import ChildList from './ChildList/ChildList';
import ChildForm from './ChildForm/ChildForm';

class AddChild extends Component {
    state = {
        editMode: false,
        addedChildren: [],
        editChild: null
    }

    onEditChild = (child) => {
        this.setState({editMode: true});
        this.setState({editChild: child});
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
    
                <ChildList 
                    addedChildren={this.state.addedChildren}
                    editChild={this.onEditChild}
                ></ChildList>
                <hr />
                <ChildForm 
                    editMode={this.state.editMode}
                    editChild={this.state.editChild}
                    addedChildren={this.onAddedChildren}></ChildForm>
            </div>
        )
    }
}

export default AddChild;