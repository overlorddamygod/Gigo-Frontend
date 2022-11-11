import { Layout, Button, Text } from "@ui-kitten/components";
import { useState } from "react"
import Listing from "../components/listing";
import SafeAreaView from "../components/SafeAreaView";

const ListingScreen = ({ navigation }) => {
  const [listings, setListings] = useState([]);

  const getListings = async () => {
    try {
      const listings = await fetch("http://213.213.123.2/listings")
      setListings(listings);
    } catch (error) {
      console.error(error);
    }
  };
  
  return (
    <SafeAreaView>
    <Layout style={{ flex: 1, padding: 10 }}>
        <Text category="h1">Listing</Text>
        <Listing
          name="Lorem Ipsum"
          price={200}
          imgUrl={"https://picsum.photos/200/300"}
        />
        <Listing
          name="Lorem Ipsum"
          price={200}
          imgUrl={"https://picsum.photos/200/300"}
        />
      </Layout>
    </SafeAreaView>
  );
};

export default ListingScreen;
