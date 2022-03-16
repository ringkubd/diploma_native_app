import React, { useState, useEffect } from 'react';
import {Button, Image, View, Platform, ImagePropTypes} from 'react-native';
import * as ImagePicker from 'expo-image-picker';

function PhotoPicker(props) {
    const [image, setImage] = useState(null);

    const pickImage = async () => {
        // No permissions request is necessary for launching the image library
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        console.log(result);

        if (!result.cancelled) {
            setImage(result.uri);
        }
    };
    useEffect(()=> {
        console.log(image)
    }, [image])

    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Button title="Select supporting document." onPress={pickImage} />
            {image && <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />}
        </View>
    );
}
PhotoPicker.propTypes = {
    onImageSelect: ImagePropTypes
}
export default PhotoPicker;
