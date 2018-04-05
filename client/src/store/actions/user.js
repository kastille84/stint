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

export const setUserType = (type) => {
    return {
        type: actionTypes.SET_USER_TYPE,
        userType: type
    }
}

export const setUserId = (id) => {
    return {
        type: actionTypes.SET_USER_ID,
        userId: id
    }
}

export const setUserChild = (child) => {
    return {
        type: actionTypes.SET_USER_CHILD,
        child: child
    }
}

export const setSigninUser = () => {
    return {
        type: actionTypes.SET_SIGNIN_USER
    }
}

export const setWhichUserMode = (val) => {
    return {
        type: actionTypes.SET_WHICH_USER_MODE,
        val: val
    }
}
