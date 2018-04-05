import React, { Component} from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import * as actions from '../../../store/actions/index';

import InfoMessage from '../../UI/Message/infoMessage';

class WhichUser extends Component {
    state = {
        controls: {
            pin: {
                value: '',
                validation: []
            }
        },
        whoId: null,
        whoType: null,
        isVerified: false,
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
        //add whoId and whoType
        data['whoId'] = this.state.whoId;
        data['whoType'] = this.state.whoType;

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
           axios.post('/pin-submit', data)
                .then(response => {
                    // dispatch to set whichUser to false
                    this.props.onSetWhichUser(false);
                    // dispatch to set userType  & userId to response.data
                    this.props.onSetUserId(response.data._id);
                    this.props.onSetUserType(response.data.type);

                    //redirect to dashboard home. Dashboard should take careof dealign with parent or child view
                    this.props.history.push('/dashboard')
                })
                .catch()

        }
        // else state.isValid remains false
    }

    btnFormClick = (e) => {
        // console.log(e.target.dataset.id);
        // console.log(e.target.dataset.type);
        this.setState({whoId: e.target.dataset.id});
        this.setState({whoType: e.target.dataset.type});
    }

    
    render() {
        let errorDisplay = this.errorDisplay();
        let reqErrorsDisplay = null;
        if (this.state.reqErrors) {
            reqErrorsDisplay = <InfoMessage messageType="fail">Wrong Username/Password Combination</InfoMessage>;
        }
        return (
            <div className="container">
                <div className="row">
                    <div className="col-md-6 offset-md-3 col-sm-8 offset-sm-2">
                        <h2>Who is using Stint?</h2>
                        <div className="card">
                            {this.props.userRedux.user.name}
                            <form onSubmit={this.handleSubmit}>
                                {reqErrorsDisplay}
                                {errorDisplay}
                                <div className="form-group">
                                    <input 
                                        className="form-control"
                                        type="text"
                                        maxLength="4"
                                        placeholder="Enter Your Pin"
                                        onChange={this.inputChanged}
                                        name="pin"
                                    />
                                    <input 
                                        type="hidden" 
                                        value={this.props.userRedux.user._id}
                                        name="adult"
                                    />
                                </div>
                                <button 
                                    className="btn btn-primary"
                                    data-type="adult"
                                    data-id={this.props.userRedux.user._id}
                                    onClick={this.btnFormClick}>Pin</button>
                            </form>                        
                        </div>
                        <hr/>
                        {this.props.userRedux.user.children.map(child => {
                            return (
                                <div key={child._id} className="card">
                                    {child.name}
                                    <form onSubmit={this.handleSubmit}>
                                        <div className="form-group">
                                            {reqErrorsDisplay}
                                            {errorDisplay}
                                            <input 
                                                className="form-control"
                                                type="text"
                                                maxLength="4"
                                                placeholder="Enter Your Pin"
                                                onChange={this.inputChanged}
                                                name="pin"
                                            />
                                            <input 
                                                type="hidden" 
                                                value={child._id}
                                                name="child"
                                                
                                            />
                                        </div>
                                        <button 
                                            className="btn btn-primary"
                                            data-type="child"
                                            data-id={child._id}
                                            onClick={this.btnFormClick}>Pin</button>
                                    </form>                        
                                </div>
                            )
                        })}

                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        userRedux: state.userRedux
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onSetWhichUser: (val) =>{ dispatch(actions.setWhichUserMode(val))},
        onSetUserType: (val) => {dispatch(actions.setUserType(val))},
        onSetUserId: (val) => { dispatch(actions.setUserId(val))}
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(WhichUser);