import React, {Component} from 'react';
import { connect } from 'react-redux';

class ChildList extends Component {
    
    // get child list from userRedux. if no child return false
    getChildList = () => {
        if (this.props.userRedux.user.children.length === 0) {
            return <p>No children yet. Complete the form below to add a child.</p>;
        }
        // At this point, we have children
        // axios.get('/getfam/'+ this.props.userRedux.user._id)
        //     .then(fam => {
        //         console.log('fam', fam);
        //     })
        //     .catch()
            //# TODO- currently only have child_id in children array
            // may need to create a generic api that gets the parent populated with the children
        let childrenArray = this.props.userRedux.user.children.map(child => {
            return (
                <li key={child._id} className="list-group-item">
                    {child.name} 
                    <span>
                        <button className="btn btn-info">Edit</button>
                        <button className="btn btn-danger">Delete</button>
                    </span>
                </li>
            )
        });
        return childrenArray;
    }

    render() {
        return (
            <div>
                ChildList
                <ul className="list-group">
                    {this.getChildList()}
                    {this.props.addedChildren? this.props.addedChildren.map(child => {
                        return (
                            <li key={child._id} className="list-group-item">
                                {child.name} 
                                <span>
                                    <button className="btn btn-info">Edit</button>
                                    <button className="btn btn-danger">Delete</button>
                                </span>
                            </li>
                        )
                    }): null}
                </ul>
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