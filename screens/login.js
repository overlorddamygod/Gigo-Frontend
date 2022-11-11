import { Text, Input, Spinner } from "@ui-kitten/components";
import { Button } from "react-native";
import { useState } from "react";
import SafeAreaView from "../components/SafeAreaView";
import showToast from "../utils/toast";
import { axiosInstance } from "../utils/axios";
import useUserStore from "../store";

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState("pratik@gmail.com");
  const [password, setPassword] = useState("182blink");
  const [loading, setLoading] = useState(false);
  const setToken = useUserStore((store) => store.setToken)

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
      const {data} = await axiosInstance.post("/users/token/", {
        email: email,
        password: password
      })
      console.log("SADD", data.access)
      setToken(data.access)
    } catch (err) {
      // console.error(JSON.stringify(err))
      showToast("LOGIN ERROR");
    } finally {
      setLoading(false);
    }
  };
  return (
    <SafeAreaView>
      <Text>Login</Text>
      {loading ? (
        <Spinner />
      ) : (
        <>
          <Input
            value={email}
            placeholder="Email"
            onChangeText={(nextValue) => setEmail(nextValue)}
          ></Input>
          <Input
            value={password}
            placeholder="Password"
            onChangeText={(nextValue) => setPassword(nextValue)}
          ></Input>

          <Button title="Login" appearance="outline" onPress={initLogin} />

          <Text>
            Don't have an account?
            <Text
              style={{ color: "#222", fontWeight: "bold" }}
              onPress={() => {
                navigation.navigate("Register");
              }}
            >
              {" "}
              Register
            </Text>
          </Text>
        </>
      )}
    </SafeAreaView>
  );
};

export default LoginScreen;
