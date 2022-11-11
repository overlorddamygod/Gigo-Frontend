import { Layout, Button,Text } from '@ui-kitten/components';

const HomeScreen = ({navigation}) => (
    <Layout style={{ flex: 1, justifyContent: 'center' }}>
      <Text category='h1'>Home</Text>
      <Button onPress={() => {
        navigation.navigate("Listing")
      }}>
    {evaProps => <Text {...evaProps}>Listings</Text>}
    </Button>
    </Layout>
);

export default HomeScreen;