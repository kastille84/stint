// import actiontype
import * as actionTypes from '../actions/actionTypes';

const initialState = {
    userType: null,
    userId: null,
    whichUserMode: false,
    user: null,
    isRegistered: false,
    isSignedIn: false, // temp true, return to false
    isVerified: false,
    editMode: null,
    editChild: null
}

const reducer = (state = initialState, action) => {
    let user = '';
    let children = '';
    let childrenArr = [];
    let choreArr = [];

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
        case actionTypes.SET_USER_CHILD:
            const updatedUser = {...state.user};
                updatedUser.children.push(action.child);
            return {
                ...state,
                user: updatedUser
            }
        case actionTypes.SET_USER_TYPE:
            return {
                ...state,
                userType: action.userType
            }
        case actionTypes.SET_USER_ID:
            return {
                ...state,
                userId: action.userId
            }
        case actionTypes.SET_SIGNIN_USER:
            return {
                ...state,
                isSignedIn: true
            }
        case actionTypes.SET_WHICH_USER_MODE:
            return {
                ...state,
                whichUserMode: action.val
            }
        case actionTypes.SET_EDIT_CHILD:
            return {
                ...state,
                editChild: action.child
            }
        case actionTypes.SET_UPDATE_CHILD:
            user = {...state.user};
            children = [...state.user.children];
            childrenArr = children.map(child => {
                if (child._id === action.child._id) {
                    return action.child;
                }
                return child;
            })
            user['children'] = childrenArr;
            return {
                ...state,
                user: user
            }
        case actionTypes.SET_EDIT_MODE:
            return {
                ...state,
                editMode: action.bool
            }
        case actionTypes.SET_DELETE_CHILD:
            user = {...state.user};
            children = [...state.user.children];
            childrenArr = children.filter(child => {
                return child._id !== action.id
            })
            user['children'] = childrenArr;
            return {
                ...state,
                user: user
            }
        // CHORES
        case actionTypes.ADD_TO_CHORELIST:
            choreArr = [...state.user.choreList];
            choreArr.push(action.choreText);
            user = {...state.user};
            user['choreList'] = choreArr;
            return {
                ...state,
                user: user
            }
        default:
            return state;
    }
}

export default reducer;