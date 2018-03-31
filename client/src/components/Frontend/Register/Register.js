import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
//import classes from './Register.css';
import axios from 'axios';
import * as actions from '../../../store/actions/index'
import InfoMessage from '../../UI/Message/infoMessage';

class Register extends Component  {
    state = {
        controls: {
            name: {
                value: '',
                validation: []
            },
            email: { 
                value: '',
                validation: []
            },
            password: {
                value: '',
                validation: []
            } ,
            pin: {
                value: '',
                validation: []
            }
        },
        isValid: false,
        reqErrors: null
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
            case 'name':
                // check is empty
                if (value.trim() === '') {
                    errorMessage.push('Name must not be empty');
                }
                // check is maxlength 150 chars
                if (value.trim().length > 100) {
                    errorMessage.push('Name must not be more than 100 chars');
                }
                return errorMessage;
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
            case 'pin':
                // check is empty
                if (value.trim() === '') {
                    errorMessage.push('Pin must not be empty');
                }
                // check is maxlength 150 chars
                if (value.trim().length > 4) {
                    errorMessage.push('Pin must not be more than 4 chars');
                }
                // check is minlength 6 chars
                if (value.trim().length < 4) {
                    errorMessage.push('Pin must be 4 chars');
                }
                return errorMessage;
            default:
                return errorMessage;
        }

    }

    handleSubmit = (e) => {
        e.preventDefault();
        let isValid = true;
        // create data to send to server 
            // && check whole form validity
        const data = {};
        for(let ctr in this.state.controls) {
            data[ctr] = this.state.controls[ctr].value
            if (this.state.controls[ctr].validation.length > 0) {
                isValid = false;
            }
        }
        // Only if form is valid
        if (isValid) {
            // make axios call
            axios.post('/register', data)
                .then(response => {
                    // set registered: true in localStorage
                    localStorage.setItem("isRegistered", 'true');
                    // dispatch an action
                    this.props.onRegisterSet();
                    // navigate to login page
                    this.props.history.push('/signin');
                })
                .catch(e => {
                    this.setState({reqErrors: true});                    
                })
        }
    }


    render(){
        let errors = [];
        let reqErrorsDisplay = null;
        let errorDisplay = null;

        if (!this.state.isValid) {
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
        if (this.state.reqErrors) {
            reqErrorsDisplay = (
                <InfoMessage messageType='fail'>Could Not Register You. Check inputs or email already exists in our system.</InfoMessage>
            )
        }
        return (
            <div className="container">
                <div className="row">
                    <div className="col-md-6 offset-md-3 col-sm-8 offset-sm-2">
                        {reqErrorsDisplay}
                        {errorDisplay}
                        <h1>Register</h1>
                        <small>Already have an account? <Link to="/signin">Signin</Link></small>
                        <form className="form-control" onSubmit={this.handleSubmit}>
                            <div className="form-group">
                                <label>Name</label>
                                <input 
                                    type="text"
                                    className="form-control"
                                    placeholder="Full Name"
                                    name="name"
                                    value={this.state.name}
                                    onChange={this.inputChanged}
                                    />
                            </div>
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
                            <div className="form-group">
                                <label>Parent Pin # <br/><small>used to access Dashboard</small></label>
                                <input 
                                    type="text"
                                    className="form-control"
                                    placeholder="max 4 chars"
                                    name="pin"
                                    value={this.state.pin}
                                    maxLength="4"
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

const mapDispatchToProps = (dispatch) => {
    return {
        onRegisterSet: () => dispatch(actions.setUserRegisteredTrue())
    }
}

export default connect(null, mapDispatchToProps)(Register);