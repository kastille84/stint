import React, { Component} from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import * as actions from '../../../../store/actions/index';
import InfoMessage from '../../../UI/Message/infoMessage';

class ChoreForm extends Component {
    state = {
        controls: {
            choreText: {
                value: '',
                validation: []
            }
        },
        reqErrors: null,
        isValid: false
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
            case 'choreText':
                // check is empty
                if (value.trim() === '') {
                    errorMessage.push('Name must not be empty');
                }
                // check is maxlength 150 chars
                if (value.trim().length > 50) {
                    errorMessage.push('Name must not be more than 50 chars');
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

    handleSubmit = (event) => {
        event.preventDefault();
        let tempIsValid = true;
        const data = {};
        data['adultId'] = this.props.userRedux.user._id;
        for (let ctr in this.state.controls) {
            data[ctr] = this.state.controls[ctr].value;
            // validation check
            if (this.state.controls[ctr].validation.length > 0) {
                tempIsValid = false;
            }
        }
        // we set state based on tempIsValid
        this.setState({isValid: tempIsValid});

        if (tempIsValid) {
            // axios call
            axios.post('/addToChoreList', data)
                .then(response => {
                    // clear form input
                    document.getElementById('choreText').value = '';                    
                    // redux action to add choreText to chorelist in userRedux
                    this.props.onAddToChoreList(this.state.controls.choreText.value);
                    
                })
                .catch(err => {
                    // reqErrors

                })
        }

    }
    
    render() {
        let errorDisplay = this.errorDisplay();
        let reqErrorsDisplay = null;
        if (this.state.reqErrors) {
            reqErrorsDisplay = (
                <InfoMessage messageType='fail'>{this.state.reqErrors}</InfoMessage>
            )
        } 

        return (
            <div className="container">
                <div className="row">
                    <div className="col-md-6 offset-md-3 col-sm-8 offset-sm-2">
                        <h1>ChoreForm</h1>
                        {errorDisplay}
                        {reqErrorsDisplay}
                        <form onSubmit={this.handleSubmit}>
                            <div className="form-group">
                                <label>Individiual Chore</label>
                                <input 
                                    type="text"
                                    className="form-control"
                                    name="choreText"
                                    id="choreText"
                                    onChange={this.inputChanged}
                                    
                                />
                            </div>
                            <button className="btn btn-primary">Add Chore</button>
                        </form>
                    </div>
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
        onAddToChoreList: (choreText) => dispatch(actions.addToChoreList(choreText)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ChoreForm);