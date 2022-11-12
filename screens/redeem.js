import { Button, Card, Input, Text } from "@ui-kitten/components";
import React from "react";
import SafeAreaView from "../components/SafeAreaView";
import useUserStore from "../store";
import { axiosInstance } from "../utils/axios";
import showToast from "../utils/toast";
import { AsyncStorage, Image, View } from "react-native";
import VoucherIcon from "../assets/voucher.png";

const RedeemScreen = ({ route: { params } }) => {
  const user = useUserStore((store) => store);

  return (
    // <SafeAreaView>
    <>
      <Card>
        <View
          style={{
            display: "flex",
            flexDirection: "row",
          }}
        >
          <View>
            <Image source={VoucherIcon} style={{ width: 50, height: 100 }} />
          </View>
          <View>
            <Text>Bigmart 10% off voucher</Text>
            <Text>10 MohorCoin</Text>
          </View>
        </View>
      </Card>
    </>
    // </SafeAreaView>
  );
};

export default RedeemScreen;
