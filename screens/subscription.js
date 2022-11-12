import { Text, Layout, Button } from "@ui-kitten/components";
import { useState, useEffect } from "react";
import { View } from "react-native";
import Listing from "../components/listing";
import { axiosInstance } from "../utils/axios";
import showToast from "../utils/toast";

const SubscriptionScreen = ({ navigation }) => {
  const [subscribedCompany, setSubscribedCompany] = useState(null);
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

    const subscribe = async () => {
      // call subscribe api with company id
      try {
        const { data } = await axiosInstance.post("/wsystem/subscribe-company/", {
          company_id: subscribedCompany.id,
        });
        console.log("SUBSCRIBE", data);
        showToast("Subscribedddd");
      } catch (err) {
        console.log("SUBSCRIBE ERROR", err.response?.data);
        showToast("Failed to subscribe", err.response?.data);
      }
    };
    const unsubscribe = async () => {
      // call subscribe api with company id
      try {
        const { data } = await axiosInstance.post("/wsystem/unsubscribe-company/", {
          company_id: subscribedCompany.id,
        });
        console.log("Unsubscribed", data);
        showToast("Unsubscribeddddd");
      } catch (err) {
        console.log("Unsubscribed ERROR", err.response?.data);
        showToast("Failed to Unsubscribed", err.response?.data);
      }
    };

  return (
    <Layout style={{ flex: 1, padding: 10 }}>
      {/* <Text>{JSON.stringify(subscribedCompany)}</Text> */}
      {/* <Text category="h1">Listing</Text> */}
      {subscribedCompany ? (
        <>
          <Listing listing={subscribedCompany} />
          {!subscribedCompany?.have_i_subscribed ? (
            <Button onPress={subscribe}>Subscribe</Button>
          ) : (
            <Button onPress={unsubscribe}>Unsubscribe</Button>
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
        <View style={{
            flex:1,
            justifyContent:"center",
            alignItems:"center"
        }}>
            <Text style={{
                marginVertical:10
            }} category="h6">Have not subscribed to any company</Text>
            <Button onPress={() => navigation.navigate("Listing")}>Wanna Subscribe?</Button>
        </View>
      )}
    </Layout>
  );
};

export default SubscriptionScreen;
