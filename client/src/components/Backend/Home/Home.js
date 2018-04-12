import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom'

import InfoMessage from '../../UI/Message/infoMessage';

class Home extends Component {
    state = {
        userType: null,
        userId: null
    }

    componentWillMount() {
        this.setState({userType: this.props.userRedux.userType});
        this.setState({userId: this.props.userRedux.userId});
    }

    noChildren = () => {
        if (this.props.userRedux.user.children.length === 0) {
            return <InfoMessage messageType="warning">You have not registered any child yet.<br/> Please click on Add/Edit Child below.</InfoMessage>
        }
        return null;
    }
    getChild = () => {
        let childArr = this.props.userRedux.user.children.filter( child => {
            return child._id === this.state.userId;
        });
        return childArr[0];
    }
    getUserContent = () => {
        let userContent = null;
        if (this.state.userType === 'adult') {
            let noChildren = this.noChildren();
            userContent = (
                <div>
                    <h1 className="mb-2">Hey {this.props.userRedux.user.name}</h1>
                    {noChildren}
                    <h3 className="btn"><Link to="/dashboard/addchild">Add / Edit Child</Link></h3>
                    {!noChildren ? (
                        <div>
                            <h3 className="btn"><Link to="/dashboard/addChore">Add / Edit Chore List</Link></h3>
                            <h3 className="btn"><Link to="/dashboard/choreChart">View Chore Chart</Link></h3>
                            <h3 className="btn"><Link to="/dashboard/addChild">Messages</Link></h3>
                        </div>)
                    :null}
                </div>
            )
        }
        if (this.state.userType === 'child') {
            let child = this.getChild()
            userContent = (
                <div>
                    <h1>Hey {child.name}</h1>
                    <h3 className="btn"><Link to="/dashboard/choreChart">Chore Chart</Link></h3>
                    <h3 className="btn"><Link to="/dashboard/addChild">Messages</Link></h3>

                </div>
            )
        }
        return userContent;
    }

    render() {        
        let userContent = this.getUserContent();       
        
        return (
            <div className="container">
                <div className="row">
                    <div className="col-md-8 offset-md-2">
                        {userContent}
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