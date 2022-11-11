import { Card, Text } from "@ui-kitten/components"
import { Image } from 'react-native';

const Listing = ({ name, imgUrl, price }) => {
  return (
    <Card>
        <Image style={{height:100}} source={{
            uri: imgUrl
        }}/>
        <Text category="h5">{name}</Text>
        <Text>Rs. {price}</Text>
    </Card>
  )
}

export default Listing