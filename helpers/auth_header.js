import {getUser} from "../local_storage/user_storage";

export function authHeader() {
    // return authorization header with jwt token
    let user = getUser();

    if (user && user.token) {
        return { 'Authorization': 'Bearer ' + user.token };
    } else {
        return {};
    }
}
