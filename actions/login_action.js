import {LOGIN_ERROR, LOGIN_START, LOGIN_SUCCESS} from "../constants/user_constants";
import * as Device from 'expo-device';
import {API_URL, DEV_API_URL} from "@env"

const login = (email, password) => {
    return async dispatch => {
        const response = await fetch(
            `${API_URL}/login`,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                },
                body: JSON.stringify({
                    email: email,
                    password: password,
                    device_name: Device.deviceName ?? "1234"
                })
            }
        );
        if (!response.ok) {
            const errorResData = await response.json();
            const errorId = errorResData.message;
            let message = 'Something went wrong!';
            if (errorId === 'EMAIL_NOT_FOUND') {
                message = 'This email could not be found!';
            } else if (errorId === 'INVALID_PASSWORD') {
                message = 'This password is not valid!';
            }
            throw new Error(message);
        }
        dispatch({type: LOGIN_START})
        const resData = await response.json();
        if (resData.status !== 'failed'){
            dispatch({ type: LOGIN_SUCCESS, token: resData.token, user: resData.user });
        }else{
            dispatch({type: LOGIN_ERROR, message: resData.error})
            dispatch({type: 'INPUT_CHANGE', message: resData.error, isValid: false})
        }

    };
}

export {login};
