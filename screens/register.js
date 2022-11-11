import {
  Text,
  Input,
  Spinner,
} from "@ui-kitten/components";
import { Button } from "react-native";
import { useState } from "react";
import SafeAreaView from "../components/SafeAreaView";
import showToast from "../utils/toast";

const RegisterScreen = ({navigation}) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password1, setPassword1] = useState("");
  const [password2, setPassword2] = useState("");
  const [registering, setRegistering] = useState(false);

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
      // TODO: Register user
    } catch (err) {
    } finally {
      setTimeout(() => {
        setRegistering(false);
        
      }, 2000);
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
          <Button
            title="Register"
            appearance="outline"
            onPress={initRegister}
          />
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
