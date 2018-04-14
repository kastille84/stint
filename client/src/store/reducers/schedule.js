import * as actionTypes from '../actions/actionTypes';

const initialState = {
    scheduleArr: [],
    selectedSchedule: null,
    editMode: false
}

const reducer = (state = initialState, action) => {
    let cState = {...state};
    let cScheduleArr = [...state.scheduleArr];
    let cSelectedSchedule = {...state.selectedSchedule};
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
        case actionTypes.SET_SCHEDULE_EDIT_TOGGLE:
            return {
                ...state,
                editMode: !state.editMode
            }
        case actionTypes.SET_CHORE_STATUS:
            if (cSelectedSchedule[action.day] === undefined) {
                // means no chore prev assigned for that day
                // make new entry
                // new status - incomplete -> false
                //cSelectedSchedule[action.day][action.chore] = false;
                let daychores = cSelectedSchedule[action.day];
                daychores = {
                        ...daychores,
                        [action.chore]: false
                    }
                cSelectedSchedule[action.day] = daychores;
            } else if (cSelectedSchedule[action.day][action.chore] === undefined) {
                // situation where day is defined, but doens't have particular chore
                let daychores = cSelectedSchedule[action.day];
                daychores = {
                        ...daychores,
                        [action.chore]: false
                    }
                cSelectedSchedule[action.day] = daychores;
            } else if (cSelectedSchedule[action.day][action.chore] === false ) {
                cSelectedSchedule[action.day][action.chore] = true;
            } else if (cSelectedSchedule[action.day][action.chore] === true) {
                // change to inactive
                // remove chore from schedule
                delete cSelectedSchedule[action.day][action.chore];
                // if day is empty, remove the whole day
                if (Object.keys(cSelectedSchedule[action.day]).length === 0) {
                    delete cSelectedSchedule[action.day];
                }
            }
            cState.selectedSchedule = cSelectedSchedule;
            return cState;
            
        default:
            return state;
    }
}

export default reducer;