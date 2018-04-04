import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import axios from 'axios';
import * as actions from '../../../store/actions/index';

import InfoMessage from '../../UI/Message/infoMessage';


class Signin extends Component {
    state = {
        controls: {
            email: {
                value: '',
                validation: []
            },
            password: {
                value: '',
                validation: []
            }
        },
        isVerified: false,
        isValid: false,
        reqErrors: null
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
        } else {
            // if no params
            if (localStorage.getItem('isRegistered') && localStorage.getItem('isVerified')) {
                this.setState({isVerified: true});
            }
        }
        
    }

    inputChanged = (event) => {
        let updatedControls = {...this.state.controls};
        const inputName = event.target.name;
        let updatedInput = updatedControls[inputName];

        updatedInput.value = event.target.value;
        updatedInput.validation = this.checkValidity(event.target.name, event.target.value);
        updatedControls[inputName] = updatedInput;
        this.setState({controls: updatedControls});
        
    }
    checkValidity = (control, value) => {
        //let isValid = true;
        let errorMessage = [];
        // either return true or false
        switch(control) {
            case 'email':
                // check is empty
                if (value.trim() === '') {
                    errorMessage.push('Email must not be empty');
                }
                // check is maxlength 150 chars
                if (value.trim().length > 100) {
                    errorMessage.push('Email must not be more than 100 chars');
                }
                // check is email
                if (!value.trim().match(/[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/)) {
                    errorMessage.push("Not a Valid Email");
                }
                return errorMessage;
            case 'password':
                // check is empty
                if (value.trim() === '') {
                    errorMessage.push('Password must not be empty');
                }
                // check is maxlength 150 chars
                if (value.trim().length > 20) {
                    errorMessage.push('Password must not be more than 20 chars');
                }
                // check is minlength 6 chars
                if (value.trim().length < 6) {
                    errorMessage.push('Password must be more than 6 chars');
                }
                return errorMessage;
            default:
                return errorMessage;
        }

    }

    errorDisplay =  () => {
        let errors= [];
        let errorDisplay = null;

        if(!this.state.isValid) {
            for (let ctr in this.state.controls) {
                if (this.state.controls[ctr].validation.length > 0) {
                    errors.push(...this.state.controls[ctr].validation);
                }
            }
            errorDisplay = (
                <ul style={{listStyle: 'none'}}>
                    {errors.map( (err, index) => (
                        <li key={index}>
                            <InfoMessage messageType="fail">{err}</InfoMessage>
                        </li>
                    ))}
                </ul>
            )
        }
        return errorDisplay;
    }
    handleSubmit = (e) => {
        e.preventDefault();
        let tempIsValid = true;
        // construct data to send to server && check
        //if all controls have empty arrays, set isValid to True
        // else isValid stays False
        const data = {};
        for (let ctr in this.state.controls) {
            data[ctr] = this.state.controls[ctr].value;
            // validation check
            if (this.state.controls[ctr].validation.length > 0) {
                tempIsValid = false;
            }
        }
        // we set state based on tempIsValid
        this.setState({isValid: tempIsValid});
        // if tempIsValid stays true, then reach out to server
        if (tempIsValid) {
            //axios
            axios.post('/signin', data)
                .then(response => {
                    // store token in localStorage
                    localStorage.setItem('token', response.data.token);
                    // store user in redux
                        //set isSignedIn to true, whichusermode stays false
                    this.props.onSetUser(response.data.user);
                    this.props.onSetSignedIn();

                    //** Temp for testing for whichuser */
                    // response.data.user.children[0]={name: 'johnny', age:"12"}
                    //** Temp for testing */

                    // redirect to Dashboard OR Whichuser
                    if (response.data.user.children.length === 0) {
                        // send them to dashboard so they can add children
                        // whichuserMode is false
                        // set usertype to adult
                        this.props.onSetUserType('adult');
                        this.props.history.push('/dashboard');
                    } else {
                        // there's children, WhichuserMode is true
                        this.props.onSetWhichUserMode();
                        // whichuser will set userType, and id
                        this.props.history.push('/dashboard/whichuser');
                    }
                })
                .catch(error =>{
                    //reqErrors
                    this.setState({reqErrors: true})
                });
        }
        // else state.isValid remains false
    }

    render() {
        // check if registered, but not verified
        let  message = null;
        if ( (localStorage.getItem('isRegistered') && !this.state.isVerified) ) {
            message = (
                <InfoMessage messageType="warning">You have <b>registered</b>, but have not yet been <b>verified</b>. We sent you an email with instructions on how to verify yourself. Then come back and signin.</InfoMessage>
            )
        }
        // display input errors
        let errorDisplay = this.errorDisplay();
        let reqErrorsDisplay = null;
        if (this.state.reqErrors) {
            reqErrorsDisplay = <InfoMessage messageType="fail">Wrong Username/Password Combination</InfoMessage>;
        }
        return (
            <div className="container">
                <div className="row">
                    <div className="col-md-6 offset-md-3 col-sm-8 offset-sm-2">
                        {message}
                        {reqErrorsDisplay}
                        {errorDisplay}
                        <h1>Signin</h1>
                        <small>Don't have an account? <Link to="/register">Register</Link></small>
                        <form className="form-control" onSubmit={this.handleSubmit}>
                            <div className="form-group">
                                <label>Email</label>
                                <input 
                                    type="email"
                                    className="form-control"
                                    placeholder="Your Email"
                                    name="email"
                                    value={this.state.email}
                                    onChange={this.inputChanged} />
                            </div>
                            <div className="form-group">
                                <label>Password <br/><small>shared with family</small></label>
                                <input 
                                    type="password"
                                    className="form-control"
                                    placeholder="Type Password carefully"
                                    name="password"
                                    value={this.state.password}
                                    onChange={this.inputChanged} />
                            </div>                            
                            <button 
                                className="btn btn-primary">REGISTER</button>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        user: state.userRedux
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        onSetUser: (user)=> {dispatch(actions.setUser(user))},
        onSetSignedIn: () => {dispatch(actions.setSigninUser())},
        onSetWhichUserMode: () =>{dispatch(actions.setWhichUserMode())},
        onSetUserType: (type) => {dispatch(actions.setUserType(type))}
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Signin);