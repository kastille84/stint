import * as actionTypes from '../actions/actionTypes';

const initialState = {
    scheduleArr: [],
    selectedSchedule: null
}

const reducer = (state = initialState, action) => {
    let cState = {...state};
    let cScheduleArr = [...state.scheduleArr];
    switch(action.type) {
        case actionTypes.SET_SCHEDULES:            
            return {
                ...state,
                scheduleArr: action.scheduleArr
            }
        case actionTypes.SET_SELECTED_SCHEDULE:
            return {
                ...state,
                selectedSchedule: action.schedule
            }
        default:
            return state;
    }
}

export default reducer;