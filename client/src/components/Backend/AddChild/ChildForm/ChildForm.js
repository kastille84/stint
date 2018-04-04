import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import * as actions from '../../../../store/actions/index';

import InfoMessage from '../../../UI/Message/infoMessage';

class ChildForm extends Component {
    state = {
        controls: {
            name: {
                value: '',
                validation: []
            },
            pin: {
                value: '',
                validation: []
            }
        },
        editMode : false,
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
                if (value.trim().length > 50) {
                    errorMessage.push('Name must not be more than 50 chars');
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
        // construct data to send to server && check
        //if all controls have empty arrays, set isValid to True
        // else isValid stays False
        const data = {};
            // add parent's id
            data['parentId'] = this.props.userRedux.user._id;
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
            // if edit mode, hit diff api point
            if (this.state.editMode) {
    
            } else {
                // if NOT edit mode, hit diff api point
                axios.post('/addChild', data)
                    .then(response => {
                        // we get child back from the response as response.data.child
                        // add that child to the user.children array
                        this.props.onAddChild(response.data.child)
                    })
                    .catch()
            }

        }
        


    }

    render() {
        let errorDisplay = this.errorDisplay();
        return (
            <div className="container">
                <div className="row">
                    <div className="col-md-6 offset-md-3 col-sm-8 offset-sm-2">
                        {errorDisplay}
                        <form  onSubmit={this.handleSubmit}>
                            <div className="form-group">
                                <label>Name</label>
                                <input 
                                    type="text" 
                                    className="form-control" 
                                    name="name"
                                    onChange={this.inputChanged}
                                />
                            </div>
                            <div className="form-group">
                                <label>Pin</label>
                                <input 
                                    type="text" 
                                    className="form-control" 
                                    name="pin"
                                    maxLength="4"
                                    onChange={this.inputChanged}
                                    />
                            </div>
                            <button className="btn btn-success">{this.props.editMode? 'Edit': 'Add' }</button>
                        </form>
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
        onAddChild: (child) => dispatch(actions.setUserChild(child))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ChildForm);