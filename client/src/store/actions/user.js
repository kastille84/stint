import * as actionTypes from './actionTypes';
// maybe need axios

export const setUserRegisteredTrue = () => {
    return {
        type: actionTypes.SET_USER_REGISTERED_TRUE
    }
}

export const setUser = (user) => {
    return {
        type: actionTypes.SET_USER,
        user: user
    }
}

export const setSigninUser = () => {
    return {
        type: actionTypes.SET_SIGNIN_USER
    }
}

export const setWhichUserMode = () => {
    return {
        type: actionTypes.SET_WHICH_USER_MODE
    }
}
