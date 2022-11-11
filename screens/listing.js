import { Layout, Button,Text } from '@ui-kitten/components';

const ListingScreen = ({navigation}) => (
    <Layout style={{ flex: 1, justifyContent: 'center' }}>
      <Text category='h1'>Listing</Text>
      <Button onPress={() => {
        // navigation.navigate("Register")
      }}>
    {evaProps => <Text {...evaProps}>Scan</Text>}
    </Button>
    </Layout>
);

export default ListingScreen;