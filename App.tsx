import React, {useState, useRef} from 'react'
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import { Camera, CameraType } from 'expo-camera';

export default function App() {
  const [loading, setLoading] = React.useState<boolean>(false);
  // const [result, setResult] = React.useState<
  //   Types.MlkitOcrResult | undefined
  //   >();
  const [result, setResult] = React.useState<any>();
  const [image, setImage] = React.useState<any>();
  const [permission, requestPermission] = Camera.useCameraPermissions();
  const [type, setType] = useState(CameraType.back);
  const cameraRef = useRef(null)

  function toggleCameraType() {
    setType((current) => (
      current === CameraType.back ? CameraType.front : CameraType.back
    ));
  }

  const startAction = async () => {
    const cameraComponent: any = cameraRef.current
    try {
      const response = await cameraComponent.takePictureAsync()
      try {
        setImage(response);
        // setResult(await MlkitOcr.detectFromUri(response.assets[0].uri));
        setResult([{text: 'some text'}])
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    } catch (err) {
      console.error(err)
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.cameraContainer}>
        <Camera ref={cameraRef} style={styles.camera} type={type}>
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={styles.button}
              onPress={toggleCameraType}>
              <Text style={styles.text}>Flip Camera</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.button}
              onPress={startAction}>
              <Text style={styles.text}>OCR</Text>
            </TouchableOpacity>
          </View>
        </Camera>
      </View>
      {image && (
        <View style={styles.imageContainer}>
          <Image
            style={styles.image}
            source={{uri: image.uri}}
          />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  },
  camera: {
  },
  cameraContainer: {
    flex: 1,
    width: '100%',
    padding: 20
  },
  button: {
    backgroundColor: 'blue',
    padding: 15,
    width: 100,
    opacity: 0.5
  },
  buttonContainer: {
    width: 300,
    height: 400
  },
  text: {
    color: 'white'
  },
  image: {
    width: '100%',
    flex: 1
  },
  imageContainer: {
    flex: 1,
    width: '100%',
    padding: 20
  }
});
