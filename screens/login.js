import { Text, Input, Spinner, Button } from "@ui-kitten/components";
import { View, StyleSheet,Image } from "react-native";
import { useState } from "react";
import SafeAreaView from "../components/SafeAreaView";
import showToast from "../utils/toast";
import { axiosInstance } from "../utils/axios";
import useUserStore from "../store";
import { height, width } from "../constant/size";
import LogoIcon from "../assets/logo_a.png";

const LoadingIndicator = (props) => (
  <View style={[props.style, styles.indicator]}>
    <Spinner size="small" />
  </View>
);

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState("overlord123@gmail.com");
  const [password, setPassword] = useState("overlord123");
  const [loading, setLoading] = useState(false);
  const setToken = useUserStore((store) => store.setToken);

  const initLogin = async () => {
    if (!email.trim()) {
      showToast("Please enter your email");
      return;
    }
    if (!password) {
      showToast("Please enter your password");
      return;
    }
    setLoading(true);
    try {
      const { data } = await axiosInstance.post("/users/token/", {
        email: email,
        password: password,
      });
      console.log("SADD", data.access);
      setToken(data.access);
    } catch (err) {
      // console.error(JSON.stringify(err))
      showToast("LOGIN ERROR");
    } finally {
      setLoading(false);
    }
  };
  return (
    <SafeAreaView>
      <View style={styles.container}>
        <View style={styles.center}>
        <Image
            style={styles.logo}
            source={LogoIcon}
          />
         <View>
         <Text category="h2" style={{...styles.mg10}}>
            Welcome Back
          </Text>
          <Text category="h5" style={{color:'#333'}}>
            Login
          </Text>
         </View>
        </View>
        <View style={{marginTop:height*0.04}}>
        <Input
          style={styles.mg10}
          value={email}
          placeholder="Email"
          size="large"
          onChangeText={(nextValue) => setEmail(nextValue)}
        ></Input>
        <Input
          style={styles.mg10}
          value={password}
          keyboardType={'visible-password'}
          size="large"
          placeholder="Password"
          onChangeText={(nextValue) => setPassword(nextValue)}
        ></Input>
        </View>

        <Button

          style={{...styles.mg10,backgroundColor:'#02BA76',borderColor:'#02BA76'}}
          onPress={initLogin}
          accessoryLeft={loading && LoadingIndicator}
        >
          Login {/* {loading ?    <Spinner size='small'/>:'Login'} */}
        </Button>

        <Text style={{marginTop:20,textAlign:'center',fontWeight:'medium',fontSize:18}}>
          Don't have an account?
          <Text
            style={{ color: "#02BA76", fontWeight: "bold",fontSize:19 }}
            onPress={() => {
              navigation.navigate("Register");
            }}
          >
            {" "}
            Register
          </Text>
        </Text>
      </View>
    </SafeAreaView>
  );
};

export default LoginScreen;

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
  logo: {
    width: 80,
    height: 80,
  },
});
