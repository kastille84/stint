import React, {Component} from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import * as actions from '../../../../store/actions/index';
import classes from './ChildsList.css';

import InfoMessage from '../../../UI/Message/infoMessage';

class ChildsList extends Component {
    state = {
        reqErrors : null,
        deleteMessage: false,
        deleteId: null
    }
    
    // get child list from userRedux. if no child return false
    getChildList = () => {
        if (this.props.userRedux.user.children.length === 0) {
            return <p>No children yet. Complete the form below to add a child.</p>;
        }
       
        let childrenArray = this.props.userRedux.user.children.map(child => {
            return (
                <li key={child._id} className="list-group-item">
                    {child.name} &nbsp;&nbsp;
                    <span>
                        <button 
                        className="btn btn-info"
                        onClick={this.onEdit}
                        data-id={child._id}
                        >Edit</button>
                        <button 
                            className="btn btn-danger"
                            data-id={child._id}
                            onClick={this.onDeleteCheck}
                            >Delete</button>
                    </span>
                    { (this.state.deleteMessage && this.state.deleteId === child._id)? (
                        <div>
                        <br />
                        <span> Are you sure? &nbsp;
                            <button 
                                className="btn btn-danger" 
                                data-id={child._id}
                                onClick={this.onDeleteConfirm}>yes</button>
                            <button 
                                className="btn btn-info" 
                                onClick={this.onDeleteCancel}>no</button></span>
                        </div>) 
                : null}
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

    onDeleteCheck = (e) => {
        this.setState({deleteMessage: true});
        this.setState({deleteId: e.target.dataset.id});
    }

    onDeleteConfirm = (e) => {
        this.onDelete(e);
    }
    onDeleteCancel = () => {
        this.setState({deleteMessage: false});
        this.setState({deleteId: null});
    }

    onDelete = (e) => {
        const id = e.target.dataset.id;
        // const child = this.props.userRedux.user.children.filter( child => {
        //     return child._id === id;
        // })
        // axios call
        axios.delete('/delete/'+ id)
            .then(response => {
                // delete child on redux
                this.props.onDeleteChild(id);
            })
            .catch(err => {
                this.setState({reqErrors: 'Could not delete user'});
            })
    }

    render() {
        return (
            <div className={classes.ChildsList}>
                {this.state.reqErrors? <InfoMessage messageType="fail">{this.setState.reqErrors}</InfoMessage>: null}
                <ul className="list-group">
                    {this.getChildList()}
                    {this.props.addedChildren? this.props.addedChildren.map(child => {
                        return (
                            <li key={child._id} className="list-group-item">
                                <div>
                                    <span className={classes.Name}>{child.name}</span> 
                                    <span>
                                        <button 
                                            className="btn btn-info"
                                            onClick={this.onEdit}
                                            data-id={child._id}
                                            >Edit</button>
                                        {(this.state.deleteMessage && this.state.deleteId === child._id)?
                                            <button 
                                                className="btn btn-danger"
                                                data-id={child._id}
                                                onClick={this.onDeleteCheck}
                                                >&nbsp;X &nbsp;</button>
                                            :
                                            <button
                                                className="btn btn-default" 
                                                data-id={child._id}
                                                onClick={this.onDeleteConfirm}>Delete
                                            </button>   
                                        }
                                    </span>
                                </div>
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
        onEditMode: (bool) => dispatch(actions.setEditMode(bool)),
        onDeleteChild: (id) => dispatch(actions.setDeleteChild(id))
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(ChildsList);