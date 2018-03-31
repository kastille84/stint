// import actiontype
import * as actionTypes from '../actions/actionTypes';

const initialState = {
    whichUser: false,
    user: null,
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
        case actionTypes.SET_USER:
            return {
                ...state,
                user: action.user
            }
        case actionTypes.SET_SIGNIN_USER:
            return {
                ...state,
                isSignedIn: true
            }
        default:
            return state;
    }
}

export default reducer;