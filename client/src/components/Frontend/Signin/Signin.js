import React, { Component } from 'react';
import { connect } from 'react-redux';
import InfoMessage from '../../UI/Message/infoMessage';

class Signin extends Component {


    render() {
        // check if registered, but not verified
        let  message = null;
        if (localStorage.getItem('isRegistered') && !this.props.user.isVerified) {
            message = (
                <InfoMessage messageType="warning">You have <b>registered</b>, but have not yet been <b>verified</b>. We sent you an email with instructions on how to verify yourself. Then come back and signin.</InfoMessage>
            )
        }
        return (
            <div>
                {message}
                signin
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        user: state.userRedux
    }
}

export default connect(mapStateToProps)(Signin);