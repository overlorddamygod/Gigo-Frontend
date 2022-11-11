import {
  Text,
  Input,
  Spinner,
  Select,
  SelectItem,
  IndexPath,
  Button,
} from "@ui-kitten/components";
import { useState } from "react";
import SafeAreaView from "../components/SafeAreaView";
import showToast from "../utils/toast";
import ROLES from "../constant/roles";
import { axiosInstance } from "../utils/axios";
import { View, StyleSheet, AsyncStorage, Image } from "react-native";
import { height, width } from "../constant/size";
import LogoIcon from "../assets/logo_a.png";

const RegisterScreen = ({ navigation }) => {
  const [username, setUsername] = useState("overlord123");
  const [email, setEmail] = useState("overlord123@gmail.com");
  const [password1, setPassword1] = useState("overlord123");
  const [password2, setPassword2] = useState("overlord123");
  const [registering, setRegistering] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(new IndexPath(0));

  const initRegister = async () => {
    if (!username.trim()) {
      showToast("Please enter your username");
      return;
    }
    if (!email.trim()) {
      showToast("Please enter your email");
      return;
    }
    if (!password1 || !password2) {
      showToast("Please enter your password");
      return;
    }
    if (password1 != password2) {
      showToast("Provided passwords do not match");
      return;
    }
    setRegistering(true);
    try {
      const { data } = await axiosInstance.post("users/register/", {
        username: username,
        email: email,
        password: password1,
        password_confirm: password2,
        role: ROLES[selectedIndex.row],
      });
      console.log("Register", { data });
      showToast("Registered successfully. Please Log in.");

      await AsyncStorage.setItem(`pk_${data.data.username}`, data.private_key);
      setTimeout(() => {
        navigation.navigate("Login");
      }, 500);
      // setToken(data.access)
    } catch (err) {
      // console.log(JSON.stringify(err))
      console.log(err.response?.data?.detail);
      showToast(err.response?.data?.detail);
    } finally {
      setRegistering(false);
    }
  };
  return (
    <SafeAreaView>
      <View style={styles.container}>
        <View style={styles.center}>
         <View style={{display:'flex',flexDirection:'row',alignItems:'center'}}>
         <Image
            style={styles.logo}
            source={LogoIcon}
          />
          <Text
            category="h2"
            style={{ color: "#444",  ...styles.mg10 }}
          >
            Register
          </Text>
        
         </View>
        </View>
    <View style={{marginTop:height*0.02}}>
    <Input
          value={username}
          style={styles.mg10}
          size="large"
          placeholder="Username"
          onChangeText={(nextValue) => setUsername(nextValue)}
        ></Input>
        <Input
          value={email}
          style={styles.mg10}
          size="large"
          placeholder="Email"
          onChangeText={(nextValue) => setEmail(nextValue)}
        ></Input>
        <Input
          value={password1}
          placeholder="Password"
          style={styles.mg10}
          size="large"
          type=""
          onChangeText={(nextValue) => setPassword1(nextValue)}
        ></Input>
        <Input
          value={password2}
          placeholder="Confirm Password"
          style={styles.mg10}
          size="large"
          onChangeText={(nextValue) => setPassword2(nextValue)}
        ></Input>
        <Select
          selectedIndex={selectedIndex}
          size="large"
          value={ROLES[selectedIndex.row]}
          onSelect={(index) => {
            setSelectedIndex(index);
          }}
        >
          {ROLES.map((role) => {
            return <SelectItem key={role} title={role} value={role} />;
          })}
        </Select>
    </View>
        <Button
          style={{
            marginTop: 20,
            backgroundColor: "#02BA76",
            borderColor: "#02BA76",
          }}
          onPress={initRegister}
        >
          {registering ? "Loading..." : "Register"}
        </Button>

        {/* <Text>
              Already have an account?
              <Text
                style={{ color: "#222", fontWeight: "bold" }}
                onPress={() => {
                  navigation.goBack();
                }}
              >
                {" "}
                Login
              </Text>
            </Text> */}
        <Text
          style={{
            marginTop: 20,
            textAlign: "center",
            fontWeight: "medium",
            fontSize: 18,
          }}
        >
          Already have an account?
          <Text
            style={{ color: "#02BA76", fontWeight: "bold", fontSize: 19 }}
            onPress={() => {
              navigation.goBack();
            }}
          >
            {" "}
            Login
          </Text>
        </Text>
      </View>
    </SafeAreaView>
  );
};

export default RegisterScreen;

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
    marginVertical: 7,
  },
  center: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  logo: {
    width: 80,
    height: 80,
  },
});
