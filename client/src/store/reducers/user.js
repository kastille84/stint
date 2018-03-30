// import actiontype
import * as actionTypes from '../actions/actionTypes';

const initialState = {
    whichUser: null,
    user: {
        id: null,
        type: null, // parent or child
        token: null,
        children: null, // only changed if parent
        choreList: null, 
        completed: null
    },
    isRegistered: false,
    isSignedIn: false,
    isVerified: false
}

const reducer = (state = initialState, action) => {
    switch(action.type) {
        case actionTypes.SET_USER_REGISTERED_TRUE:
            return {
                ...state,
                isRegistered: true 
            }
        default:
            return state;
    }
}

export default reducer;