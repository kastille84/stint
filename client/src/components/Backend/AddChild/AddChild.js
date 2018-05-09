import React, { Component } from 'react';
import ChildsList from './ChildsList/ChildsList';
import ChildForm from './ChildForm/ChildForm';

class AddChild extends Component {
    state = {
        //editMode: false,
        addedChildren: [],
        //editChild: null
    }

    // onEditChild = (child) => {
    //     this.setState({editMode: true});
    //     this.setState({editChild: child});
    // }

    onAddedChildren = (child) =>{
        let childrenCopy = [...this.state.children];
        childrenCopy.push(child);
        this.setState({addedChildren: childrenCopy});
    }

    render() {
        return (
            <div className="container">
                <h3>List of Children</h3>
                <div className="row">
                    
                    <ChildsList 
                        addedChildren={this.state.addedChildren}
                    ></ChildsList>
                    <hr />
                    <ChildForm 
                        addedChildren={this.onAddedChildren}></ChildForm>
                </div>
            </div>
        )
    }
}

export default AddChild;