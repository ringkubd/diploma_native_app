import {Alert, StyleSheet, Text, View} from 'react-native';
import configureStore from "./store";
import { Provider  as StoreProvider } from "react-redux";
import {Provider as PaperProvider, DefaultTheme as PaperTheme, Appbar} from 'react-native-paper';
import {NavigationContainer, DefaultTheme} from "@react-navigation/native";
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import * as Font from 'expo-font';
import {useEffect, useState} from "react";
import AppLoading from "expo-app-loading";
import AsyncStorage from "@react-native-async-storage/async-storage";
import UserNavigator from "./navigation/UserNavigator";
import { AntDesign } from '@expo/vector-icons';

const store = configureStore();
const Stack = createNativeStackNavigator();

const fetchFont = () => {
    return Font.loadAsync({
        'work-sans-bold': require('./assets/fonts/WorkSans-Bold.ttf'),
        'work-sans-regular': require('./assets/fonts/WorkSans-Regular.ttf'),
        'work-sans-extra-bold-italic': require('./assets/fonts/WorkSans-ExtraBoldItalic.ttf'),
    })
}

const MyTheme = {
    ...DefaultTheme,
    colors: {
        ...DefaultTheme.colors,
        primary: 'rgb(255, 45, 85)',
        background: 'rgb(242, 242, 242)',
        card: 'rgb(255, 255, 255)',
        text: 'rgb(28, 28, 30)',
        border: 'rgb(199, 199, 204)',
        notification: 'rgb(255, 69, 58)',
    },
};

const theme = {
    ...PaperTheme,
    roundness: 2,
    colors: {
        ...PaperTheme.colors,
        primary: 'tomato',
        accent: 'yellow',
    },
};


export default function App() {
    const [fontLoaded, setFontLoaded] = useState(false);
    const [fontLodingError, setFontLodingError] = useState("");
    const [login, setLogin] = useState(false);

    useEffect(async ()=>{

        // setLogin(true)
    }, [])

    if (!fontLoaded){
        return <AppLoading
            startAsync={fetchFont}
            onFinish={() => setFontLoaded(true)}
            onError={(error) => setFontLodingError(error)}
        />
    }
    return (
        <StoreProvider store={store}>
            <PaperProvider theme={PaperTheme} settings={{
                icon: props => <AntDesign {...props} />
            }}>
                <NavigationContainer theme={MyTheme}>
                    <UserNavigator />
                </NavigationContainer>
            </PaperProvider>
        </StoreProvider>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});
