import React, { Component} from 'react';

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
    
    render() {
        return (
            <div className="container">
                <div className="row">
                    <div className="col-md-6 offset-md-3 col-sm-8 offset-sm-2">
                        <h1>choreForm</h1>
                        <form>
                            <div className="form-group">
                                <label>Individiual Chore</label>
                                <input 
                                    type="text"
                                    className="form-control"
                                    name="choreText"
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

export default ChoreForm;