import React, { Component } from 'react';
import { connect } from 'react-redux';
import ChoreTable from './ChoreTable/ChoreTable';
import axios from 'axios';
import * as actions from '../../../store/actions/index'; 

class ChoreChart extends Component {
    
    // fetch schedules
    componentDidMount() {
        //axios
        axios.get(`/getAllSchedules/${this.props.userRedux.user._id}`)
            .then(response => {
                console.log(response.data);
                // dispatch actions
                this.props.onSetSchedules(response.data.schedules);              

            })
            .catch(err => {
                // reqErrors
            });
            
    }

    setTable = (e) => {
        // get the child id
        const childId= e.target.dataset.id;
        //get the individual schedule
        const schedules= this.props.scheduleRedux.scheduleArr;
        // pick out the correct schedule
        let correctSchedule = null;
        for (let schedule of schedules) {
            if (schedule.childId === childId) {
                correctSchedule = schedule
            }
        }
        // at this point, we have selectd schedule, save it to scheduleRedux
        //action - save schedule
        this.props.onSetSelectedSchedule(correctSchedule);
    }

    getChildList = () => {
        let childrenArr = this.props.userRedux.user.children;
        let childrenDisplay = childrenArr.map(child => {
            return <button 
                        className="btn btn-primary"
                        key={child.name}
                        onClick={this.setTable}
                        data-id={child._id}
                    >{child.name}</button>
        });
        return childrenDisplay;
    }

    render() {
        return (
            <div className="container">
                <div className="row">
                    <div className="col-md-8 md-offset-2">
                        <div>
                            {this.getChildList()}
                        </div>
                        {this.props.scheduleRedux.selectedSchedule !== null? 
                            <ChoreTable /> : null }
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        userRedux: state.userRedux,
        scheduleRedux: state.scheduleRedux
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onSetSchedules: (schedules) => dispatch(actions.setSchedules(schedules)),
        onSetSelectedSchedule: (schedule) => dispatch(actions.setSelectedSchedule(schedule))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ChoreChart);