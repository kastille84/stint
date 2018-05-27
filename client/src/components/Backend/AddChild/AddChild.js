import React, { Component } from 'react';
import ChildsList from './ChildsList/ChildsList';
import ChildForm from './ChildForm/ChildForm';
import * as actions from '../../../store/actions/index';
import { connect } from 'react-redux';

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
    componentDidMount() {
        this.props.onSetEditChild(null);
        this.props.onSetEditMode(null);
    }
    
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

const mapDispatchToProps = (dispatch) => {
    return {
        onSetEditChild: (bool) => dispatch(actions.setEditMode(bool)),
        onSetEditMode: (bool) => dispatch(actions.setEditMode(bool))
    }
}

export default connect(null, mapDispatchToProps)(AddChild);