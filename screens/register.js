import {
  Text,
  Input,
  Spinner,
  Select,
  SelectItem,
  IndexPath,
  Button
} from "@ui-kitten/components";
import { AsyncStorage } from "react-native";
import { useState } from "react";
import SafeAreaView from "../components/SafeAreaView";
import showToast from "../utils/toast";
import ROLES from "../constant/roles";
import { axiosInstance } from "../utils/axios";

const RegisterScreen = ({navigation}) => {
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
      const {data} = await axiosInstance.post("users/register/", {
        username: username,
        email: email,
        password: password1,
        password_confirm: password2,
        role: ROLES[selectedIndex.row],
      })
      console.log("Register", {data})
      showToast("Registered successfully. Please Log in.");

      await AsyncStorage.setItem(`pk_${data.data.username}`, data.private_key)
      setTimeout(() => {
        navigation.navigate("Login");
      }, 500);
      // setToken(data.access)
    } catch (err) {
      // console.log(JSON.stringify(err))
      console.log(err.response?.data?.detail)
      showToast(err.response?.data?.detail);
    } finally {
        setRegistering(false);
    }
  };
  return (
    <SafeAreaView>
      <Text>Register</Text>
      {registering ? (
        <Spinner/>
      ) : (
        <>
          <Input
            value={username}
            label={"Username"}
            placeholder="Username"
            type
            onChangeText={(nextValue) => setUsername(nextValue)}
          ></Input>
          <Input
            value={email}
            placeholder="Email"
            onChangeText={(nextValue) => setEmail(nextValue)}
          ></Input>
          <Input
            value={password1}
            placeholder="Password"
            onChangeText={(nextValue) => setPassword1(nextValue)}
          ></Input>
          <Input
            value={password2}
            placeholder="Confirm Password"
            onChangeText={(nextValue) => setPassword2(nextValue)}
          ></Input>
          <Select
           selectedIndex={selectedIndex}
           value={ROLES[selectedIndex.row]}
            onSelect={index => {
            setSelectedIndex(index)
          }}>
            {ROLES.map(role => {
              return <SelectItem key={role} title={role} value={role}/>
            })}
            </Select>
            <Button onPress={initRegister}>Register</Button>

          <Text>
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
            </Text>
        </>
      )}
    </SafeAreaView>
  );
};

export default RegisterScreen;
