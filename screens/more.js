import { Layout, Button, Text, List, ListItem, Avatar } from "@ui-kitten/components";
import { View } from "react-native";
import { BASE_URL } from "../constant/urls";
import useUserStore from "../store";

const MoreScreen = ({ navigation }) => {
  const user = useUserStore((store) => store);

  return (
    <Layout style={{ flex: 1 }}>
      <View>
      <Avatar source={{
        uri: BASE_URL +user.avatar
      }}/>
        <Text category="h1">{user.name}</Text>
        <Text category="h1">{user.email}</Text>
      </View>

          <ListItem title={"Transaction History"} />
          <ListItem title={"Terms and Conditions"} />
          <ListItem title={"Support"} />
          <ListItem title={"Logout"} onPress={() => {
            user.logout();
          }}/>
    </Layout>
  );
};

export default MoreScreen;
