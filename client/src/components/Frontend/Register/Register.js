import React, { Component } from 'react';
import { connect } from 'react-redux';
//import classes from './Register.css';
import axios from 'axios';
import * as actions from '../../../store/actions/index'

class Register extends Component  {
    state = {
        name: '',
        email: '',
        password: '',
        pin: ''
    }

    inputChanged = (event) => {
        let inputName = event.target.name;
        this.setState({[inputName]: event.target.value });
    }

    handleSubmit = (e) => {
        e.preventDefault();
        // make axios call
        axios.post('/register', this.state)
            .then(response => {
                // set registered: true in localStorage
                localStorage.setItem("isRegistered", 'true');
                // dispatch an action
                this.props.onRegisterSet();
                // navigate to login page
                this.props.history.push('/signin');
            })
            .catch(e => {

            })
        console.log('state', this.state);
    }


    render(){

        return (
            <div className="container">
                <div className="row">
                    <div className="col-md-8 offset-md-2">
                        <h1>Register</h1>
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
                                    placeholder=""
                                    name="pin"
                                    value={this.state.pin}
                                    maxLength="4"
                                    onChange={this.inputChanged} />
                            </div>
                            <button className="btn btn-primary">REGISTER</button>
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