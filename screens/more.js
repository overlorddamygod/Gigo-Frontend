import { Layout, Button, Text } from "@ui-kitten/components";
import useUserStore from "../store";

const MoreScreen = ({ navigation }) => {
  const user = useUserStore((store) => store);

  return (
    <Layout style={{ flex: 1,  }}>
      <Text category="h1">{user.name}</Text>
      <Text category="h1">{user.email}</Text>
      <Button
        onPress={() => {
          user.logout()
          // navigation.navigate("Register")
        }}
      >
        {(evaProps) => <Text {...evaProps}>Logout</Text>}
      </Button>
    </Layout>
  );
};
export default MoreScreen;
