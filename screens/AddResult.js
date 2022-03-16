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
import * as ImagePicker from 'expo-image-picker';
import PhotoPicker from "../components/lib/PhotoPicker";


const formReducer = (state, action) => {
    if (action.type === FORM_INPUT_UPDATE) {
        const updatedValues = {
            ...state.inputValues,
            [action.input]: action.value
        };
        const updatedValidities = {
            ...state.inputValidities,
            [action.input]: action.isValid
        };
        let updatedFormIsValid = true;
        for (const key in updatedValidities) {
            updatedFormIsValid = updatedFormIsValid && updatedValidities[key];
        }
        return {
            formIsValid: updatedFormIsValid,
            inputValidities: updatedValidities,
            inputValues: updatedValues
        };
    }
    return state;
};


const AddResult = (props) => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState();
    const [student, setStudent] = useState({})
    const [image, setImage] = useState(null);

    const [results, setResults] = useState({
        semester : 1,
        student_id: student?.id,

    });


    const [formState, dispatchFormState] = useReducer(formReducer, {
        inputValues: {
            student_id: '',
            semester: '',
            gpa: '',
            status: '',
            failed_in_subject: '',
            attachment: '',
        },
        inputValidities: {
            student_id: false,
            semester: false,
            gpa: false,
            status: false,
            failed_in_subject: false,
            attachment: false,
        },
        formIsValid: false
    });
    useEffect(() => {
        if (error) {
            Alert.alert('An Error Occurred!', error, [{ text: 'Okay' }]);
        }
    }, [error]);

    useEffect(async () => {
        const user = JSON.parse(await AsyncStorage.getItem('@diploma_user') ?? "")
        if(user.token === "") props.navigation.navigate('Login')
        if (user.student === null) Alert.alert("Please login as student.")
        setStudent(user.student)
    }, [])


    const inputChangeHandler = useCallback((inputIdentifier, inputValue, inputValidity) => {
            dispatchFormState({
                type: FORM_INPUT_UPDATE,
                value: inputValue,
                isValid: inputValidity,
                input: inputIdentifier
            });
        },
        [dispatchFormState]
    )
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
                            />
                        </View>
                        <View style={styles.formControl}>
                            <Text style={styles.label}>GPA</Text>
                            <TextInput
                                style={styles.input}
                                value=""
                                keyboardType="numeric"
                                max={5}
                                min={0}
                            />
                        </View>

                        <View style={styles.formControl}>
                            <Text style={styles.label}>Status</Text>
                            <ModalSelector
                                initValue="Select Status!"
                                data={[
                                    {key: 'Passed', label: 'Passed'},
                                    {key: 'Referred', label: 'Referred'},
                                    {key: 'Dropout', label: 'Dropout'},
                                ]}
                                accessible={true}
                                cancelButtonAccessibilityLabel="Cancel"
                            />
                        </View>

                        <View style={styles.formControl}>
                            <Text style={styles.label}>Failed in Subject</Text>
                            <TextInput
                                style={styles.input}
                                value=""
                                keyboardType="numeric"
                            />
                        </View>
                        <View style={styles.formControl}>
                            <Text style={styles.label}>Mark/Result Sheet</Text>
                            <PhotoPicker />
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
