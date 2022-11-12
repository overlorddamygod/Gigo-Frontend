import {
  Layout,
  Button,
  Divider,
  Text,
  List,
  ListItem,
  Avatar,
} from "@ui-kitten/components";
import { View } from "react-native";
import { height } from "../constant/size";
import { BASE_URL_NOSLASH } from "../constant/urls";
import useUserStore from "../store";

const MoreScreen = ({ navigation }) => {
  const user = useUserStore((store) => store);

  return (
    <Layout style={{ flex: 1 }}>
      <View
        style={{
          alignItems: "center",
          marginVertical: 15,
        }}
      >
        <Avatar
          source={{
            uri: BASE_URL_NOSLASH + user.avatar,
          }}
          style={{
            height: 100,
            width: 100,
          }}
        />
        <Text category="h4">{user.name}</Text>

        <Text>{user.email}</Text>
      </View>

      <Text style={{padding:height*0.02,fontWeight:'bold'}}>Transaction History </Text>
      <Divider/>
      <Text style={{padding:height*0.02,fontWeight:'bold'}}>Terms & Conditions </Text>
      <Divider/>
      <Text style={{padding:height*0.02,fontWeight:'bold'}}>Support </Text>
      <Divider/>
      <Text
        style={{padding:height*0.02,fontWeight:'bold',color:'#f66'}}
        onPress={() => {
          user.logout();
        }}
      >Logout</Text>
            <Divider/>

    </Layout>
  );
};

export default MoreScreen;