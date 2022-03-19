import {LOADING} from "../constants/Common";

const initialState = {}
const LoadingReducer = (state = initialState, action) => {
    switch (action.type){
        case LOADING:
            return {
                ...state,
                loading: true
            }
        default:
            return {
                ...state,
                loading: false
            }
    }
}
export default LoadingReducer;
