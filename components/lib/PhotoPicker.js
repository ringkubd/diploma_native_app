import React, { useState, useEffect } from 'react';
import {Button, Image, View, Platform, ImagePropTypes} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import PropTypes from 'prop-types'

function PhotoPicker(props) {
    const [image, setImage] = useState(null);
    const pickImage = async () => {
        let permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

        if (permissionResult.granted === false) {
            alert("Permission to access camera roll is required!");
            return;
        }
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 4],
            quality: 1,
            base64: true,
        });
        if (!result.cancelled) {
            let imageUri = `data:image/jpg;base64,${result.base64}`;
            setImage(imageUri)
            props.onImageSelect(result.base64)
        }
    };
    useEffect(()=> {
        if (props.image !== null){
            setImage(`data:image/jpg;base64,${props.image}`)
        }
    }, [])

    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Button title="Select supporting document." onPress={pickImage} />
            {image && <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />}
        </View>
    );
}
PhotoPicker.propTypes = {
    onImageSelect: PropTypes.func,
    image: PropTypes.string
}
export default PhotoPicker;
