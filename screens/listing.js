import { Layout, Button, Text, Card } from "@ui-kitten/components";
import { useState, useEffect } from "react";
import Listing from "../components/listing";
import SafeAreaView from "../components/SafeAreaView";
import useUserStore from "../store";
import { axiosInstance } from "../utils/axios";

const ListingScreen = ({ navigation }) => {
  const user = useUserStore((state) => state);

  return (
    // <SafeAreaView>
    <Layout style={{ flex: 1, padding: 10 }}>
      {/* <Text category="h1">Listing</Text> */}
      {}
      {user.role == "Enterprise" ? (
        <UserList />
      ) : (
        <CompanyList/>
      )}
    </Layout>
    // </SafeAreaView>
  );
};

const CompanyList = () => {
  const [listings, setListings] = useState([]);

  const getListings = async () => {
    try {
      const { data } = await axiosInstance.get("/wsystem/company-list/");
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
          <Card>
            <Text>{user.customer.username}</Text>
            <Text>{user.customer.email}</Text>
            <Text>{user.customer.avatar}</Text>
          </Card>
        );
      })}
    </>
  );
};

export default ListingScreen;
