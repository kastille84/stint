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

export const setEditToggle = () => {
    return {
        type: actionTypes.SET_SCHEDULE_EDIT_TOGGLE
    }
}

export const setChoreStatus = (chore, day, newStatus) => {
    return {
        type: actionTypes.SET_CHORE_STATUS,
        chore: chore,
        day: day,
        newStatus: newStatus
    }
}