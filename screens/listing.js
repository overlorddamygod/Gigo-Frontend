import { Layout, Button, Text,Input } from "@ui-kitten/components";
import { useState, useEffect} from "react"
import {StyleSheet} from 'react-native'
import Listing from "../components/listing";
import SafeAreaView from "../components/SafeAreaView";
import { width,height } from "../constant/size";
import { axiosInstance } from "../utils/axios";

const ListingScreen = ({ navigation }) => {
  const [listings, setListings] = useState([]);
  const [searchInput, setSearchInput] = useState('')

  const getListings = async () => {
    try {
      const {data} = await axiosInstance.get("/wsystem/company-list/")
      setListings(data);
    } catch (error) {
      console.error(error);
    }
  };

  const SearchCompany = async(e)=>{
    try {
      console.log(e)
      setSearchInput(e)
      const {data} = await axiosInstance.get(`/wsystem/company-list/?search=${e}`)
      setListings(data);
      
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    getListings();

  }, [])
  

  return (
    // <SafeAreaView>
    <Layout style={{ flex: 1, padding: 10 }}>
   <Input
          style={styles.mg10}
          value={searchInput}
          placeholder="Search Company"
          size="large"
          onChangeText={SearchCompany}
        ></Input>       
         {listings.map(listing => {
          return <Listing key={listing.id} listing={listing} navigation={navigation} />
        })}
    </Layout>
    // </SafeAreaView>
  );
};

export default ListingScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    height: "100%",
    display: "flex",
    paddingHorizontal: width * 0.03,
    justifyContent: "center",
    flexDirection: "column",
  },
  mg10: {
    marginVertical: 10,
  },
  center: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    flexDirection:'row'
  },
 
});
