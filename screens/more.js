import { Layout, Button,Text } from '@ui-kitten/components';

const MoreScreen = ({navigation}) => (
    <Layout style={{ flex: 1, justifyContent: 'center' }}>
      <Text category='h1'>More</Text>
      <Button onPress={() => {
        // navigation.navigate("Register")
      }}>
    {evaProps => <Text {...evaProps}>BUTTON</Text>}
    </Button>
    </Layout>
);

export default MoreScreen;