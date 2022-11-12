import {
  Layout,
  Button,
  Text,
  Card,
  Input,
  Avatar,
} from "@ui-kitten/components";
import { useState, useEffect } from "react";
import Listing from "../components/listing";
import useUserStore from "../store";
import { StyleSheet, View } from "react-native";
import SafeAreaView from "../components/SafeAreaView";
import { width, height } from "../constant/size";
import { axiosInstance } from "../utils/axios";
import { BASE_URL_NOSLASH } from "../constant/urls";

const ListingScreen = ({ navigation }) => {
  const user = useUserStore((state) => state);

  return (
    // <SafeAreaView>
    <Layout style={{ flex: 1, padding: 10 }}>
      {/* <Text category="h1">Listing</Text> */}
      {user.role == "Enterprise" ? (
        <UserList />
      ) : (
        <CompanyList navigation={navigation} />
      )}
    </Layout>
    // </SafeAreaView>
  );
};

const CompanyList = ({ navigation }) => {
  const [listings, setListings] = useState([]);
  const [searchInput, setSearchInput] = useState("");

  const getListings = async () => {
    try {
      const { data } = await axiosInstance.get("/wsystem/company-list/");
      setListings(data);
    } catch (error) {
      console.error(error);
    }
  };

  const SearchCompany = async (e) => {
    try {
      console.log(e);
      setSearchInput(e);
      const { data } = await axiosInstance.get(
        `/wsystem/company-list/?search=${e}`
      );
      setListings(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getListings();

    return () => {};
  }, []);
  return (
    <>
      <Input
        style={styles.mg10}
        value={searchInput}
        placeholder="Search Company"
        size="large"
        onChangeText={SearchCompany}
      ></Input>
      {listings.map((listing) => {
        return (
          <Listing key={listing.id} listing={listing} navigation={navigation} />
        );
      })}
    </>
  );
};

const UserList = () => {
  const [users, setusers] = useState([]);
  const [searchInput, setSearchInput] = useState('')

  const getUsers = async () => {
    try {
      const { data } = await axiosInstance.get("/wsystem/company-user/");
      setusers(data);
      console.log('data is ',data)
      // console.lo
    } catch (error) {
      console.error(error);
    }
  };
  const SearchUser = async (e) => {
    try {
      console.log(e);
      setSearchInput(e);
      const { data } = await axiosInstance.get(
        `/wsystem/company-user/?search=${e}`
      );
      
      setusers(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getUsers();

    return () => {};
  }, []);
  return (
    <>
     <Input
        style={styles.mg10}
        value={searchInput}
        placeholder="Search Users"
        size="large"
        onChangeText={SearchUser}
      ></Input>
      {users.length > 0 ? users.map((user) => {
        return (
          <Card key={user?.customer?.id}>
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <Avatar
                source={{
                  uri: user?.customer?.avatar,
                }}
                style={{
                  height: 50,
                  width: 50,
                }}
              />
              <View style={{marginLeft:10}}>
                <Text category="h6">{user?.customer?.username}</Text>
                <Text style={{marginVertical:4}}>{user?.customer?.email}</Text>
                <Text style={{backgroundColor:'#e1f2e8',padding:7,color:'#005659',marginVertical:4}}>Subscribed Date : {user?.subscribed_date}</Text>
              </View>
            </View>
          </Card>
        );
      }):
      <View style={{marginTop:height*0.03,display:'flex',flexDirection:'row',justifyContent:'center'}}>
        <Text style={{fontWeight:'bold'}}>No Users Yet</Text>
      </View>
      
      }
    </>
    // </SafeAreaView>
  );
};

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
    flexDirection: "row",
  },
});

export default ListingScreen;
