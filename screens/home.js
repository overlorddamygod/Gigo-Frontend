import { Layout, Button,Text } from '@ui-kitten/components';

const HomeScreen = ({navigation}) => (
    <Layout style={{ flex: 1, justifyContent: 'center' }}>
      <Text category='h1'>USERS</Text>
      <Button onPress={() => {
        navigation.navigate("Register")
      }}>
    {evaProps => <Text {...evaProps}>BUTTON</Text>}
    </Button>
    </Layout>
);

export default HomeScreen;