import { Layout, Button, Text } from "@ui-kitten/components";
import { useState, useEffect} from "react"
import Listing from "../components/listing";
import SafeAreaView from "../components/SafeAreaView";
import { axiosInstance } from "../utils/axios";

const ListingScreen = ({ navigation }) => {
  const [listings, setListings] = useState([]);

  const getListings = async () => {
    try {
      const {data} = await axiosInstance.get("/wsystem/company-list/")
      setListings(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getListings();
  
    return () => {
      
    }
  }, [])
  

  return (
    // <SafeAreaView>
    <Layout style={{ flex: 1, padding: 10 }}>
        {/* <Text category="h1">Listing</Text> */}
        {listings.map(listing => {
          return <Listing key={listing.id} listing={listing} />
        })}
    </Layout>
    // </SafeAreaView>
  );
};

export default ListingScreen;
