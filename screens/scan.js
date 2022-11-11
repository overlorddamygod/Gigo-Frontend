import { Layout, Button,Text } from '@ui-kitten/components';

const ScanScreen = ({navigation}) => (
    <Layout style={{ flex: 1, justifyContent: 'center' }}>
      <Text category='h1'>Scan</Text>
      <Button onPress={() => {
        navigation.navigate("Register")
      }}>
    {evaProps => <Text {...evaProps}>Scan</Text>}
    </Button>
    </Layout>
);

export default ScanScreen;