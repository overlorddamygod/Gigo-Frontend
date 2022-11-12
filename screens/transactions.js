import { Button, Input, Text } from "@ui-kitten/components";
import React, { useEffect, useState } from "react";
import SafeAreaView from "../components/SafeAreaView";
import useUserStore from "../store";
import { axiosInstance } from "../utils/axios";
import showToast from "../utils/toast";
import { AsyncStorage, StyleSheet, View } from "react-native";
import { width } from "../constant/size";

const TransactionsScreen = ({ navigation }) => {
  const [transactions, setTransactions] = useState([]);
  const user = useUserStore((store) => store);

  // 'users/account-transactions/'

  const getTransactions = async () => {
    const pk = await AsyncStorage.getItem(`pk_${user.name}`);
    if (pk){
      try {
        const { data } = await axiosInstance.post(
          "/users/account-transactions/",
          {
            private_key: pk,
          }
        );
        console.log("transaction is ", data.transactions);
        setTransactions(data.transactions);
      } catch (error) {
        console.error(error);
      }
    }
  
  };
  useEffect(() => {
    getTransactions();
  }, []);

//   function timeConverter(UNIX_timestamp){
//     var a = new Date(UNIX_timestamp * 1000);
//     var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
//     var year = a.getFullYear();
//     var month = months[a.getMonth()];
//     var date = a.getDate();
//     var hour = a.getHours();
//     var min = a.getMinutes();
//     var sec = a.getSeconds();
//     var time = date + ' ' + month + ' ' + year + ' ' + hour + ':' + min + ':' + sec ;
//     return time;
//   }
  
  return (
    <View style={{ padding: width * 0.05 }}>
      {transactions.length > 0 ? (
        transactions.map((li, index) => (
          <View
            key={index}
            style={{
              backgroundColor: "#f5faf7",
              borderWidth:1,
              borderColor: "#e1f2e8",
              padding: width * 0.05,
            }}
          >
            <View style={styles.dflex}>
              <Text style={{fontWeight:'bold'}}>From </Text>
              <Text>{li.srcAccountId}</Text>
            </View>
            <View style={styles.dflex}>
              <Text style={{fontWeight:'bold'}}>To </Text>
              <Text>{li.destAccountId}</Text>
            </View>
            <View style={styles.dflex}>
              <Text style={{fontWeight:'bold'}}>Amount </Text>
              <Text>{li.amount} <Text style={{fontWeight:'bold'}}>Mohorcoin</Text></Text>
            </View>
            <View style={styles.dflex}>
              <Text style={{fontWeight:'bold'}}>Date Created </Text>
              <Text>{li.timestamp} <Text style={{fontWeight:'bold'}}></Text></Text>
            </View>
          </View>
        ))
      ) : (
        <View>
          <Text category="h6">No Transactions Yet</Text>
        </View>
      )}
    </View>
  );
};

export default TransactionsScreen;

const styles = StyleSheet.create({
  dflex: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical:3,
    
  },
});
