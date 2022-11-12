import { Button, Card, Text } from "@ui-kitten/components";
import React from "react";
import { Image, View } from "react-native";
import VoucherIcon from "../assets/voucher.png";
import MohorCoin from "../assets/mohorcoin.png";

const RedeemCard = ({title, mohorCoin}) => {
  return (
    <Card
        style={{ margin: 5 }}
        footer={() => {
          return <Button onPress={() => {}}>Redeem</Button>;
        }}
      >
        <View
          style={{
            display: "flex",
            flexDirection: "row",
          }}
        >
          <View
            style={{
              width: "17%",
            }}
          >
            <Image source={VoucherIcon} style={{ width: 50, height: 50 }} />
          </View>
          <View
            style={{
              flex: 1,

            }}
          >
            <Text category="h6">{title}</Text>
            <Text>
              {mohorCoin} MohorCoin{" "}
              <Image
                style={{
                  width: 20,
                  height: 20,
                }}
                source={MohorCoin}
              />
            </Text>
          </View>
        </View>
      </Card>
  )
}

export default RedeemCard