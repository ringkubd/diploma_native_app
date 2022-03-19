import React, {useEffect, useState} from 'react';
import {View, StyleSheet, Text, TouchableOpacity, Button} from "react-native";
import {useSelector} from "react-redux";
import Card from "../components/UI/Card";
import {LinearGradient} from "expo-linear-gradient";

const Home = (props) => {
    const user = useSelector((state) => state.auth)
    const [loggedUser, setLoggedUser] = useState([])
    useEffect(() => {
        if (user.token !== ""){
            setLoggedUser(user.user)
        }
    }, [user]);

    const onButtonPress = (routeName) => {
        props.navigation.navigate(routeName)
    }
    return (
        <LinearGradient colors={['#33ccff', '#006666']} style={styles.screen}>
            <TouchableOpacity onPress={()=> onButtonPress('Result')}>
                <Card style={styles.card}>
                    <Text style={styles.text}>Result</Text>
                </Card>
            </TouchableOpacity>
            <TouchableOpacity>
                <Card style={styles.card}>

                </Card>
            </TouchableOpacity>
            <TouchableOpacity>
                <Card style={styles.card}>

                </Card>
            </TouchableOpacity>
        </LinearGradient>
    )
}
const styles = StyleSheet.create({
    screen: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        flexWrap: "wrap"
    },
    card: {
        height: 150,
        width: 150,
        padding: 10,
        margin: 10,
        alignSelf: 'flex-end',
        backgroundColor: '#eee',
        color: '#000'
    },
    text: {
        flex: 1,
        color: '#000',
        textAlign: 'center',
        justifyContent: 'center',
        alignItems: 'center',
        fontFamily: 'work-sans-bold',
        textAlignVertical: 'center',
        fontSize: 30
    }
});
export default Home;
