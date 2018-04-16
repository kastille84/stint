import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import * as actions from '../../../../store/actions/index';

class ChoreTable extends Component {
    
    componentDidMount() {
        // Initial
        this.colorTheChart();
    }
    componentDidUpdate() {
        this.colorTheChart();
    }

    // shouldComponentUpdate(nextProps) {
    //     if (this.props.scheduleRedux.selectedSchedule !== nextProps.scheduleRedux.selectedSchedule) {
    //         console.log('getting updated');
    //         return true;
    //     }
    //     return false;
    // }

    colorTheChart = () => {
        const tds = document.getElementsByClassName('choreTd');
        [].forEach.call(tds, (td) => {
            if (td.dataset.status === 'complete') {
                td.style.backgroundColor = 'green';
            } else if (td.dataset.status === 'incomplete') {
                td.style.backgroundColor = 'red';
            } else if (td.dataset.status === 'inactive') {
                td.style.backgroundColor = 'inherit';
            }
        });
    }

    checkStatus = (day, chore) => {
        // go into schedule and check day -> chore -> true or false
        const schedule = this.props.scheduleRedux.selectedSchedule;
        // check if chore is set
        if (schedule[day] === undefined) {
            return 'inactive';
        } else if (schedule[day][chore] !== undefined && schedule[day][chore] === true) {
            return 'complete' 
        } else if (schedule[day][chore] !== undefined && schedule[day][chore] === false) {
            return 'incomplete'
        }
        return 'inactive';
    }

    editToggle = () => {
        //dispatch editToggle action
        this.props.onSetEditToggle();
    }

    saveChanges = () => {
        // get the selectedSchedule
        const schedule = this.props.scheduleRedux.selectedSchedule;
        // axios call
        axios.patch('/schedule', schedule)
            .then(response => {
                //success !! change editMode to false
                this.props.onSetEditToggle();
            })
            .catch(err => {
                console.log('err', err);
            });
    }

    changeStatus = (e) => {
        // only change if in edit mode, else do nothing
        if (this.props.scheduleRedux.editMode) {
            //change the status on the redux
            const day = e.target.dataset.day;
            const chore = e.target.dataset.chore;
            const oldStatus = e.target.dataset.status;
            let newStatus = '';
            console.log('status', oldStatus);
            if (oldStatus === 'inactive') {
                // set to incomplete
                newStatus = 'incomplete';
            } else if (oldStatus === 'incomplete') {
                // set to complete
                newStatus = 'complete';
            } else if (oldStatus === 'complete') {
                // set to inactive
                newStatus = 'inactive';
            }
            console.log('newStatus', newStatus)
            //change status in redux
            this.props.onSetChoreStatus(chore, day, newStatus);
            // change status in component
            e.target.dataset.status = newStatus;
            // change the color
            this.colorTheChart();
            return;
        }
    }

    numTrs = () => {
        let choreTable = this.props.userRedux.user.choreList.map(chore =>{
            return (
                <tr key={chore}>
                    <td>{chore}</td>
                    <td className="choreTd" data-day="mon" data-chore={chore} data-status={this.checkStatus('mon', chore)} onClick={this.changeStatus}></td>                         
                    <td className="choreTd" data-day="tue" data-chore={chore} data-status={this.checkStatus('tue', chore)} onClick={this.changeStatus}></td>                         
                    <td className="choreTd" data-day="wed" data-chore={chore} data-status={this.checkStatus('wed', chore)} onClick={this.changeStatus}></td>                         
                    <td className="choreTd" data-day="thu" data-chore={chore} data-status={this.checkStatus('thu', chore)} onClick={this.changeStatus}></td>                         
                    <td className="choreTd" data-day="fri" data-chore={chore} data-status={this.checkStatus('fri', chore)} onClick={this.changeStatus}></td>                         
                    <td className="choreTd" data-day="sat" data-chore={chore} data-status={this.checkStatus('sat', chore)} onClick={this.changeStatus}></td>                         
                    <td className="choreTd" data-day="sun" data-chore={chore} data-status={this.checkStatus('sun', chore)} onClick={this.changeStatus}></td>                         
                </tr>
            )
        })

        return choreTable;
    }

    render() {
        return (
        <div>
            
        <table className="table table-striped table-bordered table-hover">
            <thead>
                <tr>
                    <th></th><th>Mon</th><th>Tue</th><th>Wed</th><th>Thu</th><th>Fri</th><th>Sat</th><th>Sun</th>
                </tr>
            </thead>
            <tbody>
                {this.numTrs()}
            </tbody>
        </table>
        {this.props.scheduleRedux.editMode === false? 
            <button onClick={this.editToggle} className="btn btn-info">Edit</button>
            : 
            <button onClick={this.saveChanges} className="btn btn-primary">Save Changes</button>}
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
        onSetEditToggle: () => dispatch(actions.setEditToggle()),
        onSetChoreStatus: (chore, day, newStatus) => dispatch(actions.setChoreStatus(chore, day, newStatus))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ChoreTable);