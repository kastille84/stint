import React, {Component} from 'react';
import { connect } from 'react-redux';

class ChildList extends Component {
    // get child list from userRedux. if no child return false
    getChildList = () => {
        if (this.props.userRedux.user.children.length === 0) {
            return <p>No children yet. Complete the form below to add a child.</p>;
        }
        // if children, construct list of children

        
    }

    render() {
        return (
            <div>
                ChildList
                {this.getChildList()}
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        userRedux: state.userRedux
    }
}

export default connect(mapStateToProps)(ChildList);