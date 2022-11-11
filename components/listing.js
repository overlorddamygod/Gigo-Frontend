import { Card, Text } from "@ui-kitten/components"
import { Image } from 'react-native';

const Listing = ({ navigation, listing }) => {
  return (
    <Card onPress={() => {
      navigation.navigate("Company", { listing })
    }}>
        <Image style={{height:100}} source={{
            uri: listing.avatar
        }}/>
        <Text category="h5">{listing.name}</Text>
        <Text>{listing.detail}</Text>
  
        <Text>Rs. {listing.monthly_fee}</Text>
    </Card>
  )
}

export default Listing