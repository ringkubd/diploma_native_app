import {LOGIN_ERROR, LOGIN_START, LOGIN_SUCCESS} from "../constants/user_constants";
import {storeUser} from "../local_storage/user_storage";

const initialState = {
    user: {},
    token: '',
    success: false,
    message: 'Login Pending'
}

const authReducer = (state= initialState, action) => {
    switch (action.type){
        case LOGIN_START:
            return {
                ...state,
                user: action.payload,
                success: false,
                message: 'Login Pending'
            }
            break;
        case LOGIN_ERROR:
            return {
                ...state,
                user: action.payload,
                success: false,
                message: 'Login failed',
                error: true
            }
            break;
        case LOGIN_SUCCESS:
            storeUser(action)
            return {
                ...state,
                user: action.user,
                token: action.token,
                success: true,
                message: 'Login Success'
            }
            break;
        default:
            return state;
    }
}
export default authReducer;
