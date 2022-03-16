import {createNativeStackNavigator} from "@react-navigation/native-stack";
import {TouchableOpacity, View, StyleSheet} from "react-native";
import Home from "../screens/home";
import {useCallback, useEffect, useState} from "react";
import {useSelector} from "react-redux";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Result from "../screens/Result";
import Login from "../screens/login";
import {Button, Text} from 'react-native-paper';
import { Menu } from 'react-native-paper';
import AddResult from "../screens/AddResult";
import title from "react-native-paper/src/components/Typography/Title";


const Stack = createNativeStackNavigator();


const UserNavigator = (props) => {
    const [login, setLogin] = useState(false)
    const user = useSelector((state) => state.auth)

    useEffect(() => {
        if (user.token !== ""){
            setLogin(true)
        }
        return {}
    }, [user]);

    useCallback(async ()=>{
        const user = await AsyncStorage.getItem('@diploma_user')
        if (user.token !== ""){
            setLogin(true)
        }
        return {}
    }, [])

    return (
        <Stack.Navigator screenOptions={{
            headerStyle: {
                backgroundColor: '#33ccff',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
                fontWeight: 'bold',
            },
        }}>
            {
                login ? (
                    <>
                        <Stack.Screen name="Home" component={Home} />
                        <Stack.Screen name="Result" component={Result} options={({navigation, route})=>({
                            headerRight: () => <TouchableOpacity><Button style={styles.button} mode='contained' onPress={() => navigation.navigate('AddResult')}>Add</Button></TouchableOpacity>,
                        })} />
                        <Stack.Screen name="AddResult" options={{
                            title: 'Add New Result'
                        }} component={AddResult} />
                    </>
                ) : <Stack.Screen name="Login" component={Login} options={() => {
                    title: false
                }} />
            }
        </Stack.Navigator>

    )
}

const styles = StyleSheet.create({
    button: {
        flexDirection: 'row',
        justifyContent: 'center',
        backgroundColor: 'blue',
        borderRadius: 10
    }
})

export  default UserNavigator;
