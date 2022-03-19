import React, {useEffect, useState} from 'react';
import {View, StyleSheet, Text, Image, TouchableOpacity, Modal, Alert, Button} from "react-native";
import {useDispatch, useSelector} from "react-redux";
import { getResult } from '../services/result_service'
import {DataTable} from "react-native-paper";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {API_BASE} from "@env"
import ImageView from "react-native-image-viewing";
import {LOADING, LOADING_DONE} from "../constants/Common";

const attachmentImages = (attachment) => {
    let images = []
    if (attachment.length > 0){
        for (let i=0; i < attachment.length; i++){
            images.push({
                uri: API_BASE + attachment[i].attachment
            })
        }
    }
    return images;
}

const Result = (props) => {
    const user = useSelector((state) => state.auth);
    const [token, setToken] = useState("");
    const [results, setResults] = useState("");
    const [loading, setLoading] = useState(true);
    const [modelVisible, setModelVisible] = useState(false);
    const dispatch = useDispatch();


    useEffect(async () => {
        let cancel = false;
        const user = JSON.parse(await AsyncStorage.getItem('@diploma_user') ?? "")
        if (user.student === null) Alert.alert("Please login as student.")
        if (user.token !== "") {
            setToken(user.token)
        }
        return  () => {
            cancel = true;
        }
    }, [user])

    useEffect( async () => {
        let cancel = false;
        if (token !== "") {
            dispatch({type: LOADING})
            await getResult(token).then((r) => {
                if (cancel) return;
                setResults(r.data)
                setLoading(false)
                dispatch({type: LOADING_DONE})
            })
        }
        return  () => {
            cancel = true;
        }
    }, [token])

    const showSlider = () => {
        setModelVisible(!modelVisible)
    }

    return (
        <View style={styles.screen}>
            <DataTable>
                <DataTable.Header style={styles.header}>
                    <DataTable.Title sortDirection='descending'>Sem</DataTable.Title>
                    <DataTable.Title>GPA</DataTable.Title>
                    <DataTable.Title>Status</DataTable.Title>
                    <DataTable.Title>F.Sub</DataTable.Title>
                    <DataTable.Title>Attach</DataTable.Title>
                </DataTable.Header>
                {
                    results?.length > 0 &&
                    results?.map((result) => {
                        return (
                            <DataTable.Row key={result.id}>
                                <DataTable.Cell>{result.semester}</DataTable.Cell>
                                <DataTable.Cell>{result.gpa}</DataTable.Cell>
                                <DataTable.Cell>{result.status}</DataTable.Cell>
                                <DataTable.Cell>{result.failed_in_subject}</DataTable.Cell>
                                <DataTable.Cell>
                                    <Modal
                                        visible={modelVisible}
                                        transparent={true}
                                        onRequestClose={() => {
                                            Alert.alert("Modal has been closed.");
                                            setModelVisible(!modelVisible);
                                        }}
                                    >
                                        <ImageView
                                            images={attachmentImages(result.attachments)}
                                            imageIndex={0}
                                            visible={true}
                                            onRequestClose={() => showSlider()}
                                        />
                                    </Modal>
                                    {result.attachments.map((attach) => {
                                        return (
                                            <TouchableOpacity onPress={() => showSlider()} key={attach.id}>
                                                <Image style={{width: 40, height: 20}} source={{uri: `${API_BASE}${attach.attachment}`}} />
                                            </TouchableOpacity>
                                        )
                                    })}

                                </DataTable.Cell>
                            </DataTable.Row>

                        )
                    })
                }
            </DataTable>

        </View>
    )
}
const styles = StyleSheet.create({
    screen: {
        flex: 1,
        width: '100%',
        alignItems: "center",
        alignSelf: 'center'
    },
    container: {
        width: '80%',
    },
    header: {
        backgroundColor: '#A0F1BD',
    }
});
export default Result;
