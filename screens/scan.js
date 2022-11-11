import { Layout, Button, Text, ButtonGroup } from "@ui-kitten/components";
import { Camera, CameraType } from "expo-camera";
import { TouchableOpacity } from "react-native-gesture-handler";
import { BarCodeScanner } from "expo-barcode-scanner";
import { useState, useEffect } from "react";
import { View, Image } from "react-native";

const QrTabStates = {
  SCAN: "SCAN",
  MYQR: "MYQR",
};

const ScanScreen = ({ navigation }) => {
  const [active, setActive] = useState(QrTabStates.SCAN);

  // if (!permission)

  const onPress = () => {
    if (active === QrTabStates.SCAN) {
      setActive(QrTabStates.MYQR);
    } else if (active === QrTabStates.MYQR) {
      setActive(QrTabStates.SCAN);
    }
  };

  return (
    <Layout style={{ flex: 1, justifyContent: "center" }}>
      {/* <Text category="h1">Scan</Text> */}
      <View
        style={{
          // backgroundColor:"red",
          // justifyContent: "center",
          alignItems: "center",
        }}
      >
        <ButtonGroup>
          <Button
            onPress={() => {
              setActive(QrTabStates.SCAN);
            }}
            appearance={active == QrTabStates.SCAN ? "filled" : "outline"}
          >
            Scan QR
          </Button>
          <Button
            onPress={() => {
              setActive(QrTabStates.MYQR);
            }}
            appearance={active == QrTabStates.MYQR ? "filled" : "outline"}
          >
            My QR
          </Button>
        </ButtonGroup>
      </View>
      {active == QrTabStates.SCAN ? (
        <ScanQR navigation={navigation} />
      ) : (
        <MyQR />
      )}
      {/* <Text>{JSON.stringify(permission)}</Text> */}
    </Layout>
  );
};

const ScanQR = ({ navigation }) => {
  const [type, setType] = useState(CameraType.back);
  const [permission, requestPermission] = Camera.useCameraPermissions();
  const [scanned, setScanned] = useState(false);

  useEffect(() => {
    requestPermission();

    const unsubscribe = navigation.addListener("focus", onFocus);
    return () => {
      unsubscribe();
    };
  }, []);

  const onFocus = async (data) => {
    try {
      await requestPermission();
      setScanned(false);
      // console.log("BOOOO", permission, scanned, data)
    } catch (err) {
      console.error(err);
    }
    // console.log("ZAZASASDASD")
  };

  const onBarCodeScanned = (res) => {
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
    <>
      {permission?.granted ? (
        scanned ? (
          <Text>Already Scanned</Text>
        ) : (
          <Camera
            style={{
              flex: 1,
            }}
            barCodeScannerSettings={{
              barCodeTypes: [BarCodeScanner.Constants.BarCodeType.qr],
            }}
            type={type}
            onBarCodeScanned={scanned ? undefined : onBarCodeScanned}
          >
            <Layout>
              <TouchableOpacity onPress={toggleCameraType}>
                <Text>Flip Camera</Text>
              </TouchableOpacity>
            </Layout>
          </Camera>
        )
      ) : (
        <Text>Permission not granted</Text>
      )}
    </>
  );
};

const MyQR = () => {
  return (
    <>
      <Text>My QR</Text>
      <Layout style={{
        flex:1,
        backgroundColor:"red",
        justifyContent:"center",
        alignItems:"center",
        // height: 100,
        // width:100,
      }}>
        <Image
          style={{ height: "40%", width:"40%" }}
          source={{
            uri: "https://api.qrserver.com/v1/create-qr-code/?size=100x100&data=gigo://username",
          }}
        />
      </Layout>
    </>
  );
};

export default ScanScreen;
