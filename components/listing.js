import { Card, Text } from "@ui-kitten/components";
import { Image } from "react-native";
import { width } from "../constant/size";

const Listing = ({ navigation, listing }) => {
  return (
    <Card
      style={{ marginTop: 5 }}
      onPress={() => {
        navigation.navigate("Company", { listing });
      }}
    >
      <Image
        style={{ height: 100 }}
        source={{
          uri: listing.avatar,
        }}
      />
      <Text category="h5">{listing.name}</Text>
      <Text>{listing.detail}</Text>

      <Text
        style={{
          backgroundColor: "#e1f2e8",
          padding: 7,
          color: "#005659",
          marginVertical: 4,
          width:width*0.5
        }}
      >
          Monthly Fee : Rs.{listing.monthly_fee}
      </Text>
    </Card>
  );
};

export default Listing;
