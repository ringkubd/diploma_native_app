import {LOADING, LOADING_DONE} from "../constants/Common";

const Loading = (loading=false) => {
    return dispatch => {
        if (loading){
            dispatch({
                type: LOADING
            })
        }else{
            dispatch({
                type: LOADING_DONE
            })
        }
    }
}
export default Loading;
