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

export const setSigninUser = (bool) => {
    return {
        type: actionTypes.SET_SIGNIN_USER,
        bool: bool
    }
}

export const setWhichUserMode = (val) => {
    return {
        type: actionTypes.SET_WHICH_USER_MODE,
        val: val
    }
}

export const setEditChild = (child) => {
    return {
        type:actionTypes.SET_EDIT_CHILD,
        child: child
    }
}

export const setUpdateChild = (child) => {
    return {
        type: actionTypes.SET_UPDATE_CHILD,
        child: child
    }
}
export const setEditMode = (bool) => {
    return {
        type: actionTypes.SET_EDIT_MODE,
        bool: bool
    }
}
export const setDeleteChild = (id) => {
    return {
        type: actionTypes.SET_DELETE_CHILD,
        id: id
    }
}

// CHORES
export const addToChoreList = (choreText) => {
    return {
        type: actionTypes.ADD_TO_CHORELIST,
        choreText: choreText
    }
}

export const setEditChore = (chore) => {
    return {
        type: actionTypes.SET_EDIT_CHORE,
        chore: chore
    }
}

export const editTheChoreList = (oldChoreText, choreText) => {
    return {
        type: actionTypes.EDIT_THE_CHORELIST,
        oldChoreText: oldChoreText,
        choreText: choreText
    }
}

export const setDeleteChore = (chore) => {
    return {
        type: actionTypes.SET_DELETE_CHORE,
        chore: chore
    }
}