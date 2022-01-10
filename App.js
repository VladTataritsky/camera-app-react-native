import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  PermissionsAndroid,
  Platform,
} from 'react-native';
import {RNCamera} from 'react-native-camera';
import CameraRoll from '@react-native-community/cameraroll';
import Icon from 'react-native-vector-icons/FontAwesome';

const App = () => {
  const [isFlashEnabled, toggleFlash] = useState(false);
  const hasAndroidPermission = async () => {
    const permission = PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE;

    const hasPermission = await PermissionsAndroid.check(permission);
    if (hasPermission) {
      return true;
    }

    const status = await PermissionsAndroid.request(permission);
    return status === 'granted';
  };
  const takePicture = async function (camera) {
    if (Platform.OS === 'android' && !(await hasAndroidPermission())) {
      return;
    }

    const options = {quality: 0.5, base64: true};
    const data = await camera.takePictureAsync(options);
    CameraRoll.save(data.uri, {type: 'photo'});
  };

  return (
    <View style={styles.container}>
      <RNCamera
        style={styles.preview}
        type={RNCamera.Constants.Type.back}
        flashMode={
          isFlashEnabled
            ? RNCamera.Constants.FlashMode.on
            : RNCamera.Constants.FlashMode.off
        }
        androidCameraPermissionOptions={{
          title: 'Permission to use camera',
          message: 'We need your permission to use your camera',
          buttonPositive: 'Ok',
          buttonNegative: 'Cancel',
        }}>
        {({camera, status}) => {
          if (status !== 'READY') return <Text>Pending</Text>;
          return (
            <View style={styles.action_pannel}>
              <TouchableOpacity
                onPress={() => toggleFlash(!isFlashEnabled)}
                style={styles.action_button}>
                <Icon name="flash" size={34} textAlign={'center'} />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => takePicture(camera)}
                style={styles.action_button}>
                <Icon name="camera" size={34} />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => getPhotos()}
                style={styles.action_button}>
                <Icon name="rotate-left" size={34} />
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

export default App;
