import { Button, Card, Input, Text } from "@ui-kitten/components";
import React from "react";
import SafeAreaView from "../components/SafeAreaView";
import useUserStore from "../store";
import { axiosInstance } from "../utils/axios";
import showToast from "../utils/toast";
import { AsyncStorage, Image, View } from "react-native";
import VoucherIcon from "../assets/voucher.png";
import { width } from "../constant/size";
import MohorCoin from "../assets/mohorcoin.png";
import RedeemCard from "../components/RedeemCard";

const RedeemScreen = ({ route: { params } }) => {
  const user = useUserStore((store) => store);

  return (
    // <SafeAreaView>
    <>
      <RedeemCard title="Worldlink 15% off voucher" mohorCoin={10}/>
      <RedeemCard title="Bigmart 10% off voucher" mohorCoin={20}/>
      <RedeemCard title="Bigmart 10% off voucher" mohorCoin={30}/>
      <RedeemCard title="Bigmart 10% off voucher" mohorCoin={40}/>
    </>
    // </SafeAreaView>
  );
};

export default RedeemScreen;
