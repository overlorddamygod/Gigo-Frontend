import { Layout, Button, Text, Card,Input } from "@ui-kitten/components";
import { useState, useEffect } from "react";
import Listing from "../components/listing";
import useUserStore from "../store";
import { StyleSheet } from "react-native";
import SafeAreaView from "../components/SafeAreaView";
import { width, height } from "../constant/size";
import { axiosInstance } from "../utils/axios";

const ListingScreen = ({ navigation }) => {
  const user = useUserStore((state) => state);

  return (
    // <SafeAreaView>
    <Layout style={{ flex: 1, padding: 10 }}>
      {/* <Text category="h1">Listing</Text> */}
      {user.role == "Enterprise" ? <UserList /> : <CompanyList navigation={navigation} />}
    </Layout>
    // </SafeAreaView>
  );
};

const CompanyList = ({navigation}) => {
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

  const getUsers = async () => {
    try {
      const { data } = await axiosInstance.get("/wsystem/company-user/");
      setusers(data);
      // console.lo
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
      {users.map((user) => {
        return (
          <Card key={user.customer.id}>
            <Text>{user.customer.username}</Text>
            <Text>{user.customer.email}</Text>
            <Text>{user.customer.avatar}</Text>
          </Card>
        );
      })}
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
