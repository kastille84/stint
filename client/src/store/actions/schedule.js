import * as actionTypes from '../actions/actionTypes';

export const setSchedules = (schedules) => {
    return {
        type: actionTypes.SET_SCHEDULES,
        scheduleArr: schedules
    }
}

export const setSelectedSchedule = (schedule) => {
    return {
        type: actionTypes.SET_SELECTED_SCHEDULE,
        schedule: schedule
    }
}