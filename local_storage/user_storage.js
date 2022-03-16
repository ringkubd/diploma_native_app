import AsyncStorage from '@react-native-async-storage/async-storage';

const storeUser = async(user) => {
    try {
        const jsonValue = JSON.stringify(user)
        await AsyncStorage.setItem('@diploma_user', jsonValue)
        return {
            success: true,
            message: 'Successfully added'
        }
    }catch(error){
        return {
            success: false,
            message: error
        }
    }
}
const getUser = async () => {
    try {
        const jsonValue = await AsyncStorage.getItem('@diploma_user')
        return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch(e) {
       return false;
    }
}
export {storeUser, getUser}
