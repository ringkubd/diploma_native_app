import React, {useCallback, useEffect, useReducer, useState} from 'react';
import {
    View,
    StyleSheet,
    Text,
    KeyboardAvoidingView,
    ScrollView,
    Alert,
    ActivityIndicator,
    Button,
    TextInput
} from "react-native";
import {LinearGradient} from "expo-linear-gradient";
import {Card} from "react-native-paper";
import Colors from "../constants/Corols";
import AsyncStorage from "@react-native-async-storage/async-storage";
import ModalSelector from 'react-native-modal-selector';
import PhotoPicker from "../components/lib/PhotoPicker";


const AddResult = (props) => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState();
    const [student, setStudent] = useState({})
    const [image, setImage] = useState(null);

    const [results, setResults] = useState({
        semester : 1,
        student_id: student?.id,
        attachment: image,
        gpa: 0,
        failed_in_subject: 0,
        status: 'Passed',
    });
    const [resultsValidation, setResultsValidation] = useState({
        semester : false,
        attachment: false,
        gpa: false,
        failed_in_subject: false,
        status: false,
    });


    useEffect(() => {
        if (error) {
            Alert.alert('An Error Occurred!', error, [{ text: 'Okay' }]);
        }
    }, [error]);

    useEffect(async () => {
        const user = JSON.parse(await AsyncStorage.getItem('@diploma_user') ?? "")
        if(user.token === "") props.navigation.navigate('Login')
        if (user.user.student === null) Alert.alert("Please login as student.")
        setStudent(user.user.student )
        setResults({
            ...results,
            student_id: user.user?.student?.id
        })
    }, [])


    const inputChangeHandler = (key, value) => {
        setResultsValidation({
            ...resultsValidation,
            [key] : value === "" ? true : false

        })
        setResults({
            ...results, [key] : value
        })
    }

    const onImageSelect = (base64Image) => {
        setImage(base64Image)
        setResults({
            ...results,
            attachment: base64Image
        })
        setResultsValidation({
            ...resultsValidation,
            attachment: base64Image === "" ? true : false

        })
    }

    const onSubmitHandler = () => {

    }

    return (
        <KeyboardAvoidingView
            behavior="padding"
            style={styles.screen}>
            <LinearGradient colors={['#33ccff', '#006666']} style={styles.gradient}>
                <Card style={styles.authContainer}>
                    <ScrollView>
                        <View style={styles.formControl}>
                            <Text style={styles.label}>Semester</Text>
                            <ModalSelector
                                initValue="Select Semester!"
                                selectedKey={results.semester}
                                data={[
                                    {key: 1, label: '1st semester'},
                                    {key: 2, label: '2nd semester'},
                                    {key: 3, label: '3rd semester'},
                                    {key: 4, label: '4th semester'},
                                    {key: 5, label: '5th semester'},
                                    {key: 6, label: '6th semester'},
                                    {key: 7, label: '7th semester'},
                                    {key: 8, label: '8th semester'},
                                ]}

                                accessible={true}
                                cancelButtonAccessibilityLabel="Cancel"
                                onChange={(selected) => {inputChangeHandler('semester',selected.key)}}
                            />
                            {
                                resultsValidation.semester ? (<Text>Please select a semester.</Text>) : null
                            }
                        </View>
                        <View style={styles.formControl}>
                            <Text style={styles.label}>GPA</Text>
                            <TextInput
                                style={styles.input}
                                value={results.gpa}
                                keyboardType="numeric"
                                onChangeText={(text) => {inputChangeHandler('gpa',text)}}
                                maxLength={4}
                                min={0}
                            />
                            {
                                resultsValidation.semester ? (<Text>Please select a semester.</Text>) : null
                            }
                        </View>

                        <View style={styles.formControl}>
                            <Text style={styles.label}>Status</Text>
                            <ModalSelector
                                initValue="Select Status!"
                                selectedKey={results.status}
                                data={[
                                    {key: 'Passed', label: 'Passed'},
                                    {key: 'Referred', label: 'Referred'},
                                    {key: 'Dropout', label: 'Dropout'},
                                ]}
                                accessible={true}
                                onChange={(selected) => {inputChangeHandler('status',selected.key)}}
                                cancelButtonAccessibilityLabel="Cancel"
                            />
                            {
                                resultsValidation.status && (<Text>Please select a Status.</Text>)
                            }
                        </View>

                        <View style={styles.formControl}>
                            <Text style={styles.label}>Failed in Subject</Text>
                            <TextInput
                                style={styles.input}
                                value={results.failed_in_subject.toString()}
                                keyboardType="numeric"
                                onChangeText={(text) => {inputChangeHandler('failed_in_subject',text)}}
                            />
                        </View>
                        <View style={styles.formControl}>
                            <Text style={styles.label}>Mark/Result Sheet</Text>
                            <PhotoPicker onImageSelect={onImageSelect} image={results.attachment} />
                            {
                                resultsValidation.attachment && (<Text>Please upload valid image.</Text>)
                            }
                        </View>

                        <View style={styles.buttonContainer}>
                            {isLoading ? (
                                <ActivityIndicator size="small" color={Colors.primary} />
                            ) : (
                                <Button
                                    title='Add'
                                    color={Colors.primary}
                                    onPress={() => {}}
                                />
                            )}
                        </View>
                    </ScrollView>
                </Card>
            </LinearGradient>
        </KeyboardAvoidingView>
    )
}
const styles = StyleSheet.create({
    screen: {
        flex: 1,
    },
    gradient: {
        flex: 1,
        // justifyContent: 'center',
        alignItems: 'center',
        paddingTop: 10
    },
    authContainer: {
        width: '90%',
        maxWidth: 400,
        maxHeight: '95%',
        padding: 20
    },
    buttonContainer: {
        marginTop: 10
    },
    formControl: {
        width: '100%'
    },
    label: {
        fontFamily: 'work-sans-bold',
        marginVertical: 8
    },
    input: {
        paddingHorizontal: 2,
        paddingVertical: 5,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 5,
        paddingLeft: 5
    },
    errorContainer: {
        marginVertical: 5
    },
    errorText: {
        fontFamily: 'work-sans-regular',
        color: 'red',
        fontSize: 13
    }
});
export default AddResult;
