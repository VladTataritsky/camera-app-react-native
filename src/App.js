import React, {useState, useCallback} from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import {RNCamera} from 'react-native-camera';
import CameraRoll from '@react-native-community/cameraroll';
import Icon from 'react-native-vector-icons/Ionicons';

const androidCameraPermissionOptions = {
  title: 'Permission to use camera',
  message: 'We need your permission to use your camera',
  buttonPositive: 'Ok',
  buttonNegative: 'Cancel',
};

const CameraApp = () => {
  const [isFlashEnabled, toggleFlash] = useState(false);
  const [isFrontCamera, toggleCameraType] = useState(false);
  const {Type, FlashMode} = RNCamera.Constants;

  const takePicture = useCallback(async camera => {
    if (!(await hasAndroidPermission())) {
      return;
    }

    const options = {quality: 1, base64: true};
    const data = await camera.takePictureAsync(options);
    CameraRoll.save(data.uri, {type: 'photo'});
  }, []);

  return (
    <View style={styles.container}>
      <RNCamera
        style={styles.preview}
        type={isFrontCamera ? Type.front : Type.back}
        flashMode={isFlashEnabled ? FlashMode.on : FlashMode.off}
        captureAudio={false}
        androidCameraPermissionOptions={androidCameraPermissionOptions}>
        {({camera, status}) => {
          if (status !== 'READY') return <Text>Pending</Text>;
          return (
            <View style={styles.action_pannel}>
              <TouchableOpacity
                onPress={() => toggleFlash(!isFlashEnabled)}
                style={styles.action_button}>
                <Icon name={isFlashEnabled ? 'flash' : 'flash-off'} size={40} />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => takePicture(camera)}
                style={styles.action_button}>
                <Icon name="camera" size={40} />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => toggleCameraType(!isFrontCamera)}
                style={styles.action_button}>
                <Icon name="md-sync" size={40} />
              </TouchableOpacity>
            </View>
          );
        }}
      </RNCamera>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'black',
  },
  action_pannel: {
    flex: 0,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.4)',
    justifyContent: 'space-around',
  },
  preview: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  action_button: {
    flex: 0,
    justifyContent: 'center',
    alignItems: 'center',
    width: 70,
    height: 70,
    backgroundColor: 'rgba(255, 255, 255, 1)',
    borderRadius: 35,
    padding: 10,
    alignSelf: 'center',
    margin: 16,
  },
});

export default CameraApp;
