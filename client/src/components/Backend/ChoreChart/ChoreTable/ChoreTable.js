import React, { Component } from 'react';
import { connect } from 'react-redux';

class ChoreTable extends Component {
    

    checkStatus = (day, chore) => {
        // go into schedule and check day -> chore -> true or false
        const schedule = this.props.scheduleRedux.selectedSchedule;
        console.log(`checkStatus - ${day}`);
        // check if chore is set
        if (schedule[day] === undefined) {
            return 'inactive';
        } else if (schedule[day][chore] && schedule[day][chore] === true) {
            return 'on' 
        } else if (schedule[day][chore] && schedule[day][chore] === false) {
            return 'off'
        }
        return 'inactive';
    }

    numTrs = () => {
        let choreTable = this.props.userRedux.user.choreList.map(chore =>{
            return (
                <tr key={chore}>
                    <td>{chore}</td>
                    <td data-day="mon" data-chore={chore} data-status={this.checkStatus('mon', chore)}></td>                         
                    <td data-day="tue" data-chore={chore} data-status={this.checkStatus('tue', chore)}></td>                         
                    <td data-day="wed" data-chore={chore} data-status={this.checkStatus('wed', chore)}></td>                         
                    <td data-day="thu" data-chore={chore} data-status={this.checkStatus('thu', chore)}></td>                         
                    <td data-day="fri" data-chore={chore} data-status={this.checkStatus('fri', chore)}></td>                         
                    <td data-day="sat" data-chore={chore} data-status={this.checkStatus('sat', chore)}></td>                         
                    <td data-day="sun" data-chore={chore} data-status={this.checkStatus('sun', chore)}></td>                         
                </tr>
            )
        })

        return choreTable;
    }

    render() {
        return (
        <div>
        <table className="table table-striped">
            <thead>
                <tr>
                    <th></th><th>Mon</th><th>Tue</th><th>Wed</th><th>Thu</th><th>Fri</th><th>Sat</th><th>Sun</th>
                </tr>
            </thead>
            <tbody>
                {this.numTrs()}
            </tbody>
        </table>
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

export default connect(mapStateToProps)(ChoreTable);