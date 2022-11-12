import {
  Layout,
  Button,
  Text,
  Card,
  Input,
  Avatar,
} from "@ui-kitten/components";
import { Image, View } from "react-native";
import { width, height } from "../constant/size";

const PickupHistoryScreen = ({ navigation }) => {
  return (
    <Layout
      style={{
        flex:1,
        paddingHorizontal: 10,
        paddingVertical: 5,
      }}
    >
      <PickupHistoryCard
        pickup={{
          trashWeight: 10,
          rewarded: true,
          is_segregated: true,
          date_created: new Date(),
          company: {
            name: "Company Name",
            logo: "https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_272x92dp.png",
          },

          customer: {
            name: "Customer Name",
            logo: "https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_272x92dp.png",
          },
        }}
      />
      <PickupHistoryCard
        pickup={{
          trashWeight: 5,
          rewarded: false,
          is_segregated: true,
          date_created: new Date(),
          company: {
            name: "Company Name",
            logo: "https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_272x92dp.png",
          },

          customer: {
            name: "Customer Name",
            logo: "https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_272x92dp.png",
          },
        }}
      />
    </Layout>
  );
};

const PickupHistoryCard = ({ pickup }) => {
  return (
    <Card
      style={{
        marginTop: 5,
        backgroundColor: "#f5faf7",
        borderColor: "#e1f2e8",
        // borderColor: pickup.rewarded ? "#00FF00" : "#FF0000",
      }}
      //   onPress={() => {
      //     navigation.navigate("Company", { listing });
      //   }}
    >
      <View
        style={{
          flexDirection: "row",
          display: "flex",
        }}
      >
        <View
          style={{
            flex: 1,
            // backgroundColor:"red"
          }}
        >
          <Text category="h6">{pickup.company.name}</Text>
          <Text>
            {pickup.date_created.getFullYear()}-{pickup.date_created.getMonth()}
            -{pickup.date_created.getDate()}
          </Text>
        </View>
        <View
          style={{
            paddingHorizontal: 10,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Text category="h6">{pickup.trashWeight} kg</Text>
        </View>
      </View>
    </Card>
  );
};

export default PickupHistoryScreen;
