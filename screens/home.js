import { Layout, Button,Text } from '@ui-kitten/components';
import Listing from '../components/listing';

const HomeScreen = ({navigation}) => (
    <Layout style={{ flex: 1, padding: 10 }}>
      {/* <Text category='h1'>Home</Text> */}
      <Button onPress={() => {
        navigation.navigate("Listing")
      }}>
    {evaProps => <Text {...evaProps}>Listings</Text>}
    </Button>
    {/* <Layout style={{
      display: "grid",
      // gridColumns: 2

    }}> */}

    {/* </Layout> */}
    </Layout>
);

export default HomeScreen;