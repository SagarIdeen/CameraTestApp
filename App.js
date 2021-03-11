import React, {useState} from 'react';
import {
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
  Image,
  ImageBackground,
} from 'react-native';
import {RNCamera} from 'react-native-camera';

let camera;

function App(props) {
  const [pic, setPic] = useState(null);
  const takePicture = async () => {
    if (camera) {
      const options = {quality: 0.5, base64: true};
      const data = await camera.takePictureAsync(options);
      // console.log(data.path);
      setPic(data.uri);
    }
  };

  console.log(pic);
  return (
    <View style={{flex: 1, backgroundColor: 'black'}}>
      {pic === null ? (
        <View style={{flex: 1}}>
          <RNCamera
            ref={(ref) => {
              camera = ref;
            }}
            style={{flex: 1, justifyContent: 'flex-end', alignItems: 'center'}}
            type={RNCamera.Constants.Type.back}
            flashMode={RNCamera.Constants.FlashMode.on}
          />
          <View
            style={{flex: 0, flexDirection: 'row', justifyContent: 'center'}}>
            <TouchableOpacity onPress={takePicture} style={styles.capture}>
              <Text style={{fontSize: 14}}> SNAP </Text>
            </TouchableOpacity>
          </View>
        </View>
      ) : (
        <ImageBackground style={{flex: 1}} source={{uri: pic}} />
      )}
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'black',
  },
  preview: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  capture: {
    flex: 0,
    backgroundColor: '#fff',
    borderRadius: 5,
    padding: 15,
    paddingHorizontal: 20,
    alignSelf: 'center',
    margin: 20,
  },
});
export default App;
