import {getUser} from "../local_storage/user_storage";
import {API_URL, DEV_API_URL} from "@env"

export const getResult = async (token) => {
    const url = `${DEV_API_URL}/result`
    return await fetch(url, {
        method: 'get',
        headers: {
            'Content-type': 'application/json',
            'Accept': 'application/json',
            'Authorization': `Bearer ${token}`,
        }
    }) .then(res => res.json())
}
