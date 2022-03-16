import {createStore, combineReducers, applyMiddleware} from 'redux';
import authReducer from "../reducers/auth_reducer";
import asyncFunctionMiddleware from "./asyncFunctionMiddleware";
const middlewareEnhancer = applyMiddleware(asyncFunctionMiddleware)

const rootReducer = combineReducers(
    {
        auth: authReducer
    }
)

const configureStore = () => {
    return createStore(rootReducer, middlewareEnhancer)
}
export default configureStore;
