import React, { Component } from 'react';
import { connect } from 'react-redux';
import InfoMessage from '../../../UI/Message/infoMessage';

class ChoreList extends Component {
    getChoreList = () => {
        const choreList = this.props.userRedux.user.choreList.length === 0? 
                null: this.props.userRedux.user.choreList;  
        if (choreList) {

        } else {
            return <InfoMessage messageType="warning">No Chores in Chores List. <br/>Please add all the chores that need to be done in the form below.<br/> A maximum of three words to describe each chore.</InfoMessage>
        }     
    }


    render() {
        return (
            <div>
                <h1>choreList</h1>
                {this.getChoreList()}
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