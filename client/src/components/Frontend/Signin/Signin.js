import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';

import InfoMessage from '../../UI/Message/infoMessage';


class Signin extends Component {
    state = {
        isVerified: false
    }

    componentWillMount() {
        // if we have params, then reach out to server
        // this is a link to verify user
        if (this.props.match.params['id']) {
            const id = this.props.match.params['id'];
            const hash = this.props.match.params['hash'];
            // make an axios request
            axios.get(`/register/${id}/${hash}`)
                .then(response =>{
                    this.setState({isVerified: true});
                    localStorage.setItem('isVerified', 'true');
                })
                .catch(error =>{

                });
        }
    }

    render() {
        // check if registered, but not verified
        let  message = null;
        if (localStorage.getItem('isRegistered') && !this.state.isVerified) {
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