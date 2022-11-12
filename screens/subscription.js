import { Text, Layout, Button } from "@ui-kitten/components";
import { useState, useEffect } from "react";
import { View } from "react-native";
import Listing from "../components/listing";
import { axiosInstance } from "../utils/axios";

const SubscriptionScreen = ({ navigation }) => {
  const [subscribedCompany, setSubscribedCompany] = useState({});
  const getSubscribedCompanies = async () => {
    try {
      const { data } = await axiosInstance.get(
        "/wsystem/my-subscribed-company/"
      );
      setSubscribedCompany(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getSubscribedCompanies();
  }, []);

  return (
    <Layout style={{ flex: 1, padding: 10 }}>
      {/* <Text>{JSON.stringify(subscribedCompany)}</Text> */}
      {/* <Text category="h1">Listing</Text> */}
      {subscribedCompany ? (
        <>
          <Listing listing={subscribedCompany} />
          {!subscribedCompany?.have_i_subscribed ? (
            <Button onPress={() => {}}>Subscribe</Button>
          ) : (
            <Button onPress={() => {}}>Unsubscribe</Button>
          )}
          <View style={{
            marginVertical:15
          }}>
            <Text category="h6">Schedule</Text>
            <View>
                <Text>Monday</Text>
                <Text>10:00 AM - 11:00 AM</Text>
            </View>
          </View>
        </>
      ) : (
        <Text>No subscribed company</Text>
      )}
    </Layout>
  );
};

export default SubscriptionScreen;
