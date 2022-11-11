import { Layout, Button, Text } from "@ui-kitten/components";
import { Camera, CameraType } from "expo-camera";
import { TouchableOpacity } from "react-native-gesture-handler";
import { BarCodeScanner } from "expo-barcode-scanner";
import { useState, useEffect } from "react";

const ScanScreen = ({ navigation }) => {
  const [type, setType] = useState(CameraType.back);
  const [permission, requestPermission] = Camera.useCameraPermissions();
  const [scanned, setScanned] = useState(false);
  // if (!permission)
  // console.log("XXPER",permission)
  useEffect(() => {
    const onFocus = (data) => {
      requestPermission();
      console.log("BOOOO", permission, scanned, data)
      console.log("ZAZASASDASD")
      setScanned(false);
    }
    console.log("EFFECT",navigation)
    const unsubscribe = navigation.addListener("focus", onFocus)
    return () => {
      console.log("REMOVING")
      unsubscribe()
    };
  }, []);

  const onBarCodeScanned = (res) => {
    if (scanned) return
    console.log(res);
    // alert(res.data);
    setScanned(true);
    navigation.navigate("Reward", { data: res.data });
  };
  // if (!permission.granted) ...

  function toggleCameraType() {
    setType((current) =>
      current === CameraType.back ? CameraType.front : CameraType.back
    );
  }

  return (
    <Layout style={{ flex: 1, justifyContent: "center" }}>
      {/* <Text category="h1">Scan</Text> */}
      <Text>{JSON.stringify(permission)}</Text>
      {((permission?.granted)) ? (
        <Camera
          style={{
            flex: 1,
          }}
          barCodeScannerSettings={{
            barCodeTypes: [BarCodeScanner.Constants.BarCodeType.qr],
          }}
          type={type}
          onBarCodeScanned={onBarCodeScanned}
        >
          <Layout>
            <TouchableOpacity onPress={toggleCameraType}>
              <Text>Flip Camera</Text>
            </TouchableOpacity>
          </Layout>
        </Camera>
      ) : (
        <Text>Permission not granted</Text>
      )}
    </Layout>
  );
};

export default ScanScreen;
