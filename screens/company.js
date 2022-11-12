import { Layout, Button, Text } from "@ui-kitten/components";
import { useState, useEffect } from "react";
import Listing from "../components/listing";
import SafeAreaView from "../components/SafeAreaView";
import { axiosInstance } from "../utils/axios";
import showToast from "../utils/toast";

const CompanyScreen = ({ route: { params } }) => {
  const [is_subscribed, setIs_subscribed] = useState(params.listing.have_i_subscribed)
  const subscribe = async () => {
    // call subscribe api with company id
    try {
      const { data } = await axiosInstance.post("/wsystem/subscribe-company/", {
        company_id: params.listing.id,
      });
      console.log("SUBSCRIBE", data);
      showToast("Subscribedddd");
      setIs_subscribed(true)
    } catch (err) {
      console.log("SUBSCRIBE ERROR", err.response?.data);
      showToast("Failed to subscribe", err.response?.data);
    }
  };
  const unsubscribe = async () => {
    // call subscribe api with company id
    try {
      const { data } = await axiosInstance.post("/wsystem/unsubscribe-company/", {
        company_id: params.listing.id,
      });
      // console.log("Unsubscribed", data);
      showToast("Unsubscribeddddd");
      setIs_subscribed(false)
    } catch (err) {
      // console.log("Unsubscribed ERROR", err.response?.data);
      showToast("Failed to Unsubscribed", err.response?.data);
    }
  };
  return (
    <SafeAreaView>
      <Layout style={{ flex: 1, padding: 10 }}>
        {/* <Text category="h1">Listing</Text> */}
        <Listing listing={params.listing} />
        {!is_subscribed ? (
          <Button onPress={subscribe}>Subscribe</Button>
        ) : (
          <Button onPress={unsubscribe}>Unsubscribe</Button>
        )}
      </Layout>
    </SafeAreaView>
  );
};

export default CompanyScreen;
