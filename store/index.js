import {createStore, combineReducers, applyMiddleware} from 'redux';
import authReducer from "../reducers/auth_reducer";
import asyncFunctionMiddleware from "./asyncFunctionMiddleware";
import LoadingReducer from "../reducers/LoadingReducer";
const middlewareEnhancer = applyMiddleware(asyncFunctionMiddleware)

const rootReducer = combineReducers(
    {
        auth: authReducer,
        loading: LoadingReducer
    }
)

const configureStore = () => {
    return createStore(rootReducer, middlewareEnhancer)
}
export default configureStore;
