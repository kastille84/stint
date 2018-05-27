import React, { Component } from 'react';
import {withRouter} from 'react-router-dom';
import axios from 'axios';
import { connect } from 'react-redux';
import classes from './ChildForm.css';
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
        isValid: false,
        isNameTouched: false,
        isPinTouched: false,
        reqErrors: null
    }

    componentWillReceiveProps() {

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
        // Edit Mode
        if (this.props.userRedux.editMode ) {
            let upControls = {...this.state.controls};

            if (this.state.controls['name'].value==='') {
                upControls['name'].value = this.props.userRedux.editChild.name;
            }
            if (this.state.controls['pin'].value==='') {
                upControls['pin'].value = this.props.userRedux.editChild.pin;
            }
            this.setState({controls: upControls});
        } 

        let tempIsValid = true;
        // construct data to send to server && check
        //if all controls have empty arrays, set isValid to True
        // else isValid stays False
        const data = {};
            // add parent's id
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
            // if edit mode, hit diff api point
            if (this.props.userRedux.editMode) {
                    // add child's id
                data['childId'] = this.props.userRedux.editChild._id;
                // we have the data so 
                //we need to clear the forms input
                let upControls = {...this.state.controls};
                    upControls['name'].value = '';
                    upControls['pin'].value = '';                
                this.setState({controls: upControls});
                document.getElementById('name').value = '';
                document.getElementById('pin').value ='';
                // or chage edit mode to false & editchild to null
                this.props.onEditChild(null);
                this.props.onEditMode(false);
                //this.props.history.push('/dashboard/addChild');
                //axios call
                axios.post('/editChild', data)
                    .then(response => {
                        // update child in redux
                        this.props.onUpdateChild(response.data.child);
                    })
                    .catch( (err) => {
                        this.setState({reqErrors: "Could Not Edit Child. Check Your Inputs."})
                    });

            } else {
                // if NOT edit mode, hit diff api point
                axios.post('/addChild', data)
                    .then(response => {
                        document.getElementById('name').value = '';
                        document.getElementById('pin').value ='';
                        // we get child back from the response as response.data.child
                        // add that child to the user.children array
                        this.props.onAddChild(response.data.child);
                    })
                    .catch( (err) => {
                        this.setState({reqErrors: "Could Not Add Child. Check Your Inputs."})
                    })
            }
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
                    <div className={classes.ChildForm+" col-md-8 offset-md-2 col-sm-8 offset-sm-2"}>
                        {reqErrorsDisplay}
                        {errorDisplay}
                        {this.props.userRedux.editMode === true? <InfoMessage messageType="info">Edit {this.props.userRedux.editChild.name}</InfoMessage>: <h3>Add New Child</h3> }
                        <form  onSubmit={this.handleSubmit}>
                            <div className="form-group">
                                <label>Name</label>
                                <input 
                                    type="text" 
                                    className="form-control" 
                                    id='name'
                                    name="name"
                                    onChange={this.inputChanged}
                                    placeholder={this.props.userRedux.editMode? this.props.userRedux.editChild.name : ''}
                                />
                            </div>
                            <div className="form-group">
                                <label>Pin</label>
                                <input 
                                    type="text" 
                                    className="form-control" 
                                    id="pin"
                                    name="pin"
                                    maxLength="4"
                                    onChange={this.inputChanged}
                                    placeholder={this.props.userRedux.editMode? this.props.userRedux.editChild.pin : ''}
                                    />
                            </div>
                            <button 
                                className="btn btn-success"

                                >{this.props.userRedux.editMode? `Edit ${this.props.userRedux.editChild.name}`: 'Add' }</button>
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
        onAddChild: (child) => dispatch(actions.setUserChild(child)),
        onEditChild: (child) => dispatch(actions.setEditChild(child)),
        onEditMode: (bool) => dispatch(actions.setEditMode(bool)),
        onUpdateChild: (child) => dispatch(actions.setUpdateChild(child))
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ChildForm));