import { Layout, Button, Text, ButtonGroup } from "@ui-kitten/components";
import { Camera, CameraType } from "expo-camera";
import { TouchableOpacity } from "react-native-gesture-handler";
import { BarCodeScanner } from "expo-barcode-scanner";
import { useState, useEffect } from "react";
import { View, Image } from "react-native";
import useUserStore from "../store";
import {  BASE_URL_NOSLASH } from "../constant/urls";
import { height } from "../constant/size";

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
        <ButtonGroup style={{
          borderWidth:0,
          marginBottom: 10
        }} >
          <Button
            onPress={() => {
              setActive(QrTabStates.SCAN);
            }}
            style={{

              opacity: active === QrTabStates.SCAN ? 1 : 0.5,
            }}
            // appearance={active == QrTabStates.SCAN ? "filled" : "outline"}
          >
            Scan QR
          </Button>
          <Button
            onPress={() => {
              setActive(QrTabStates.MYQR);
            }}
            style={{
              backgroundColor:'#02BA76',
              borderColor:'#02BA76',
              opacity: active === QrTabStates.MYQR ? 1 : 0.5,

            }}
            // appearance={active == QrTabStates.MYQR ? "filled" : "outline"}
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
                {/* <Text>Flip Camera</Text> */}
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
  const user = useUserStore((store) => store)
  return (
    <>
      {/* <Text>My QR</Text> */}
      <Layout style={{
        flex:1,
        backgroundColor:"#333",
        justifyContent:"center",
        alignItems:"center",
        padding:20,
        marginTop:height*0.1,
        borderTopEndRadius:height*0.1,
        borderTopStartRadius:height*0.1
        // height: 100,
        // width:100,
      }}>
        <View
        style={{
          background:'white',
          height: height * 0.26,
           width:height * 0.26 ,
        }}
        >
        <Image
          style={{ height:'100%',backgroundColor:'white'}}
          source={{
            uri: BASE_URL_NOSLASH + user.qrCode,
          }}
        />
        </View>
       <View style={{marginTop:20}}>
       <Text  style={{color:'white',textAlign:'center'}} category="h6">{user.name}</Text>
       <Text  style={{color:'white'}} category="h6">{user.email}</Text>
       </View>
        {/* <Text>{user.name}</Text> */}
      </Layout>
    </>
  );
};

export default ScanScreen;
