import { Button, Divider, Input, Text } from "@ui-kitten/components";
import React, { useState } from "react";
import SafeAreaView from "../components/SafeAreaView";
import useUserStore from "../store";
import { axiosInstance } from "../utils/axios";
import showToast from "../utils/toast";
import { AsyncStorage, View } from "react-native";
import { height, width } from "../constant/size";

const RewardScreen = ({ navigation,route: { params } }) => {
  const [weight, setWeight] = React.useState(1);
  const [sending, setSending] = useState(false)
  const user = useUserStore((store) => store);
  console.log("params is ", params);

  
  const send = async () => {
    setSending(true)
    try {
      const pk = await AsyncStorage.getItem(`pk_${user.name}`);
      console.log("PRIVATE KEY", pk);

      const { data } = await axiosInstance.post("/users/transfer-coin/", {
        iroha_name: params.data,
        private_key: pk,
      });
      console.log("SENT", data);
      setSending(false)

     navigation.navigate("Home");
      showToast("Successfully sent");
    } catch (err) {
      setSending(false)
      console.log("SEND ERROR", err.response?.data);
      showToast("Error sending");
    }
  };
  return (
    <View
      style={{
        paddingHorizontal: width * 0.04,
        paddingVertical: width * 0.07,
        backgroundColor: "#f5faf7",
        borderColor: "#e1f2e8",
        borderWidth: 1,
      }}
    >
      <Text category="h6">Confirm Your Reward Transfer</Text>
      <View style={{marginTop: height*0.04,marginBottom:6 ,display:'flex',justifyContent:'space-between',flexDirection:'row'}}>
        <Text  style={{fontWeight:'bold'}}>To</Text>
        <Text style={{ }}>{params.data}</Text></View>
        <Divider/>
      <View style={{marginTop: height*0.04 ,marginBottom:6 ,display:'flex',justifyContent:'space-between',flexDirection:'row'}}>
        <Text style={{fontWeight:'bold'}}>Mohor Coin</Text>
        <Text style={{ }}>0.5</Text></View>
        <Divider/>
      {/* <Input
        value={weight}
        placeholder="Weight"
        style={{ marginTop: 5 }}
        onChangeText={(nextValue) => setWeight(nextValue)}
      ></Input> */}
      <Button style={{ marginTop: height*0.05 }} onPress={send}>
        {sending ?'Transferring ...':'Send'}
      </Button>
      <Text style={{
        fontSize:12,
        marginTop:9,
        color:'#555'

      }}>This will transfer 0.5 Mohorcoin from your account</Text>
    </View>
  );
};

export default RewardScreen;
