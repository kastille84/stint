import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom'

import InfoMessage from '../../UI/Message/infoMessage';

class Home extends Component {
    noChildren = () => {
        if (this.props.userRedux.user.children.length === 0) {
            return <InfoMessage messageType="warning">You have not registered any child yet.<br/> Please click on Add/Edit Child below.</InfoMessage>
        }
        return null;
    }
    render() {
        let noChildren = this.noChildren();
        
        return (
            <div className="container">
                <div className="row">
                    <div className="col-md-8 offset-md-2">
                        <h1 className="mb-2">Hey {this.props.userRedux.user.name}</h1>
                        {noChildren}

                        <h3 className="btn"><Link to="/dashboard/addChild">Add / Edit Child</Link></h3>
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

export default connect(mapStateToProps)(Home);