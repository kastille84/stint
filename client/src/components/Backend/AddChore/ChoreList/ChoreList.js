import React, { Component } from 'react';
import { connect } from 'react-redux';
import InfoMessage from '../../../UI/Message/infoMessage';
import * as actions from '../../../../store/actions/index';
import classes from './ChoreList.css';
import axios from 'axios';

class ChoreList extends Component {
    state = {
        showDelete: false,
        selectedChore: null,
        reqErrors: null
    }

    componentWillUnmount() {
        this.props.onEditMode(null);
    }

    setShowDelete = (e) => {
        const chore = e.target.dataset.chore;
        this.setState({showDelete: !this.state.showDelete});
        this.setState({selectedChore: chore});
    }
    
    setEditMode = (e) => {
        const chore = e.target.dataset.chore;
        this.props.onEditMode(true);
        this.props.onEditChore(chore);
    }

    deleteChore = (e) => {
        const chore = e.target.dataset.chore;
        const adultId = e.target.dataset.id;
        //axios call, go to api/deleteChore
        axios.delete(`/deleteChore/${adultId}/${chore}`)
            .then(response => {
                // delete the chore on user from userRedux
                this.props.onDeleteChore(chore);
            })
            .catch(err => {
                // set reqErrors
                this.setState({reqErrors: 'Could Not Delete The Chore'});
            });
    }


    getChoreList = () => {
        let choresList = [];
        const chores = this.props.userRedux.user.choreList.length === 0? 
                null: this.props.userRedux.user.choreList;  
        if (chores) {
            choresList = chores.map(chore => {
                return (
                    <li className="list-group-item" key={chore}>
                        <span className={classes.Name}>{chore}</span>
                        <span className="btn-group pull-right" >
                            <button className="btn btn-info"
                                    onClick={this.setEditMode}
                                    data-chore={chore}>edit</button>
                            <button className="btn btn-danger" 
                                    onClick={this.setShowDelete}
                                    data-chore={chore}>X</button>
                            {(this.state.showDelete && this.state.selectedChore === chore)? 
                                <button 
                                    className="btn btn-danger" 
                                    onClick={this.deleteChore}
                                    data-id={this.props.userRedux.user._id}
                                    data-chore={chore}
                                    >Delete</button> 
                            : null}
                        </span>
                    </li>
                )
            })
            return choresList;
        } else {
            return <InfoMessage messageType="warning">No Chores in Chores List. <br/>Please add all the chores that need to be done in the form below.<br/> A maximum of three words to describe each chore.</InfoMessage>
        }     
    }


    render() {
        return (
            <div className={classes.ChoreList + ' row'}>
                <div className=" col-md-8 offset-md-2 col-sm-8 offset-sm-2">
                    <h1>ChoreList</h1>
                    <ul>
                        {this.state.reqErrors? <InfoMessage messageType="fail">{this.state.reqErrors}</InfoMessage>: null}
                        {this.getChoreList()}
                    </ul>
                </div>
            </div>
        );
    }

}

const mapStateToProps = (state) => {
    return {
        userRedux: state.userRedux
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onEditMode: (bool) => dispatch(actions.setEditMode(bool)),
        onEditChore: (chore) => dispatch(actions.setEditChore(chore)),
        onDeleteChore: (chore) => dispatch(actions.setDeleteChore(chore))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ChoreList);