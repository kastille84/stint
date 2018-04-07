import React, {Component} from 'react';
import { connect } from 'react-redux';
import * as actions from '../../../../store/actions/index';

class ChildList extends Component {
    
    // get child list from userRedux. if no child return false
    getChildList = () => {
        if (this.props.userRedux.user.children.length === 0) {
            return <p>No children yet. Complete the form below to add a child.</p>;
        }
       
        let childrenArray = this.props.userRedux.user.children.map(child => {
            return (
                <li key={child._id} className="list-group-item">
                    {child.name} 
                    <span>
                        <button 
                        className="btn btn-info"
                        onClick={this.onEdit}
                        data-id={child._id}
                        >Edit</button>
                        <button 
                            className="btn btn-danger"
                            data-id={child._id}
                            onClick={this.onDelete}
                            >Delete</button>
                    </span>
                </li>
            )
        });
        return childrenArray;
    }

    onEdit = (e) => {
        const id = e.target.dataset.id;
        const child = this.props.userRedux.user.children.filter( child => {
            return child._id === id;
        })
        // call this.props.editChild()
        // this.props.editChild(child[0]);
        this.props.onEditChild(child[0]);
        this.props.onEditMode(true);
    }

    onDelete = (e) => {
        console.log(e.target.dataset.id)
    }

    render() {
        return (
            <div>
                ChildList
                <ul className="list-group">
                    {this.getChildList()}
                    {this.props.addedChildren? this.props.addedChildren.map(child => {
                        return (
                            <li key={child._id} className="list-group-item">
                                {child.name} 
                                <span>
                                    <button 
                                        className="btn btn-info"
                                        onClick={this.onEdit}
                                        data-id={child._id}
                                        >Edit</button>
                                    <button 
                                        className="btn btn-danger"
                                        data-id={child._id}
                                        onClick={this.onDelete}
                                        >Delete</button>
                                </span>
                            </li>
                        )
                    }): null}
                </ul>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        userRedux: state.userRedux
    }
}

const mapDispatchToProps = (dispatch => {
    return {
        onEditChild: (child) => dispatch(actions.setEditChild(child)),
        onEditMode: (bool) => dispatch(actions.setEditMode(bool))
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(ChildList);