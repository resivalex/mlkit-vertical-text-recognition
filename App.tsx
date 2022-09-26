import React, {useState, useRef} from 'react'
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import { Camera, CameraType } from 'expo-camera';
import MlkitOcr, { MlkitOcrResult } from 'react-native-mlkit-ocr';

export default function App() {
  const [result, setResult] = React.useState<
    MlkitOcrResult | undefined
    >();
  const [image, setImage] = React.useState<any>();
  const [_permission, _requestPermission] = Camera.useCameraPermissions();
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
        const uri = response.uri
        console.error(uri)
        setResult(await MlkitOcr.detectFromUri(uri));
      } catch (e) {
        console.error(e);
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
          {result && (
            <View>
              {result?.map((item: any, index: number) => (
                <Text key={index}>{item.text}</Text>
              ))}
            </View>
          )}
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
