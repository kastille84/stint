import React, { Component } from 'react';
import { connect } from 'react-redux';
import InfoMessage from '../../../UI/Message/infoMessage';

class ChoreList extends Component {
    state = {
        showDelete: false,
        selectedChore: null
    }

    setShowDelete = (e) => {
        const chore = e.target.dataset.chore
        this.setState({showDelete: !this.state.showDelete});
        this.setState({selectedChore: chore});
    }
    // unSetShowDelete = () => {
    //     this.setState({showDelete: false});
    //     this.setState({selectedChore: null});
    // }
    deleteChore = () => {
        console.log('im trigeered');
    }


    getChoreList = () => {
        let choresList = [];
        const chores = this.props.userRedux.user.choreList.length === 0? 
                null: this.props.userRedux.user.choreList;  
        if (chores) {
            choresList = chores.map(chore => {
                return (
                    <li className="list-group-item" key={chore}>
                        <span>{chore}</span>
                        <span className="btn-group" >
                            <button className="btn btn-info">edit</button>
                            <button className="btn btn-warning" 
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
            <div>
                <h1>choreList</h1>
                <ul>
                    {this.getChoreList()}
                </ul>
            </div>
        );
    }

}

const mapStateToProps = (state) => {
    return {
        userRedux: state.userRedux
    }
}

export default connect(mapStateToProps)(ChoreList);