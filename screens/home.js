import { Layout, Button, Text } from "@ui-kitten/components";
import { useState, useEffect } from "react";
import { AsyncStorage, Image, TouchableOpacity } from "react-native";
import Listing from "../components/listing";
import { axiosInstance } from "../utils/axios";
import { View, StyleSheet } from "react-native";
import { height, width } from "../constant/size";
import useUserStore from "../store";
import MohorCoin from "../assets/mohorcoin.png";
import Voucher from "../assets/voucher.png";
import MoneyTransaction from "../assets/money-transaction.png";
import GarbageIcon from "../assets/garbage.png";
import GarbageTruck from "../assets/trash-truck.png";
import { TouchableHighlight } from "react-native-gesture-handler";
import Pressable from "react-native/Libraries/Components/Pressable/Pressable";

const HomeScreen = ({ navigation }) => {
  const [assetDetail, setAssetDetail] = useState(null);
  const user = useUserStore((store) => store);

  const getAssetDetail = async () => {
    const pk = await AsyncStorage.getItem(`pk_${user.name}`);
    if (pk ){
      try {
        console.log(user.name ,' key is ',pk)
        const { data } = await axiosInstance.post("/users/get-account-asset/", {
          private_key:pk
        });
        const trashcoin_detail = data.find(
          (li) => li.assetId === "mohorcoin#gigo"
        );
        setAssetDetail(trashcoin_detail);
      } catch (error) {
        // console.log(JSON.stringify(error))
        console.log(error?.response?.data);
        console.error("error is ", error);
      }
    }
 
  };
  useEffect(() => {
    if(user.name){

      getAssetDetail();
    }
    // set_key();

  }, [user.name]);

  const set_key=async ()=>{
    console.log('setting key of ',user.name)
    await AsyncStorage.setItem(`pk_${user.name}`, 'f101537e319568c765b2cc89698325604991dca57b9716b58016b253506cab70');

  }
  return (
    <Layout style={{ flex: 1, padding: 10 }}>
      <View style={styles.assetcard}>
        <View
          style={{
            backgroundColor: "#02BA76",
            borderRadius: 50,
            position: "absolute",
            height: 50,
            width: 50,
            zIndex: 2,
            right: -5,
            top: -10,
          }}
        ></View>
        <View
          style={{
            backgroundColor: "#02BA76",
            borderRadius: 50,
            position: "absolute",
            height: 30,
            width: 30,
            zIndex: 2,
            left: -5,
            bottom: -10,
          }}
        ></View>
        <View
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-around",
          }}
        >
          <Text category="h5">Hello, {user?.name}</Text>
          <Text style={{ color: "#444" }} category="h6">
            Mohor Balance
          </Text>
        </View>
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "flex-end",
          }}
        >
          <Image style={styles.mohor_logo} source={MohorCoin} />
          <Text
            style={{
              color: "#444",
              marginLeft: 10,
              marginBottom: height * 0.005,
            }}
            category="h4"
          >
            {assetDetail?.balance || 0.00}
          </Text>
        </View>
      </View>
      <View
        style={{
          marginTop: 10,
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <LinkCard
          label="Reedem Rewards"
          icon={Voucher}
          onPress={() => {
            navigation.navigate("Redeem");
          }}
        />
        <LinkCard
          label="Transactions"
          icon={MoneyTransaction}
          onPress={() => {
            navigation.navigate("Transactions");
          }}
        />
      </View>
      <View
        style={{
          marginTop: 10,
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        {user.role == "Customer" ? (
          <LinkCard
            label="My Subscription"
            icon={GarbageTruck}
            onPress={() => {
              navigation.navigate("Subscription");
            }}
          />
        ) : (
          <LinkCard
            label="Customers"
            icon={GarbageTruck}
            onPress={() => {
              navigation.navigate("Listing");
            }}
          />
        )}
        <LinkCard
          label="Pickup History"
          icon={GarbageIcon}
          onPress={() => {
            navigation.navigate("PickupHistory");
          }}
        />
      </View>
      <View
        style={{
          marginTop: 10,
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        {user.role == "Customer" && (
          <LinkCard
            label="Waste Company"
            icon={GarbageTruck}
            onPress={() => {
              navigation.navigate("Listing");
            }}
          />
        )}
        {/* <LinkCard label="Pickup History" icon={GarbageIcon} /> */}
      </View>
    </Layout>
  );
};

export default HomeScreen;

const LinkCard = ({ label, icon, onPress }) => {
  return (
    <TouchableOpacity style={styles.linkcard} onPress={onPress}>
      <View
        style={{
          display: "flex",
          alignItems: "center",
          flexDirection: "column",
        }}
      >
        <Image style={styles.linklogo} source={icon} />
        <Text style={{ marginTop: 10, color: "#333" }} category="h6">
          {label}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  assetcard: {
    backgroundColor: "#f5faf7",
    borderColor: "#e1f2e8",
    postion: "relative",
    borderWidth: 1,
    height: "20%",
    display: "flex",
    overflow: "hidden",
    padding: width * 0.05,
    borderRadius: width * 0.03,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  mohor_logo: {
    width: 50,
    height: 50,
  },
  linkcard: {
    backgroundColor: "#f5faf7",
    padding: 4,
    width: "49%",
    gap: 5,
    borderWidth: 1,
    borderColor: "#e1f2e8",
    height: height * 0.17,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  linklogo: {
    width: 50,
    height: 50,
  },
});
