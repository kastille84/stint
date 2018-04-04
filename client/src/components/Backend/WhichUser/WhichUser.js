import React, { Component} from 'react';
import { connect } from 'react-redux';

class WhichUser extends Component {

    render() {
        
        return (
            <div className="container">
                <div className="row">
                    <div className="col-md-6 offset-md-3 col-sm-8 offset-sm-2">
                        <h2>Who is using Stint?</h2>
                        <div>
                            <form>
                                <div className="form-group">
                                    <label>{this.props.userRedux.user.name}</label>
                                    <input 
                                        type="text"
                                        maxLength="4"
                                        placeholder="Enter Your Pin"
                                         />
                                </div>
                            </form>                        
                        </div>
                        <hr/>

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

export default connect(mapStateToProps)(WhichUser);