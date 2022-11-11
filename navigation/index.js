import {
  CardStyleInterpolators,
  createStackNavigator,
} from "@react-navigation/stack";
import { useState } from "react";
import Register from "../screens/register";
import Login from "../screens/login";
import BottomTabNavigator from "./bottomtab";

const MainStack = createStackNavigator();

const LoggedIn = () => {
  return (
    <MainStack.Navigator
      screenOptions={{
        headerShown: true,
      }}
    >
      <MainStack.Screen name="BottomTab" component={BottomTabNavigator} />
    </MainStack.Navigator>
  );
};

const NotLoggedIn = () => {
  return (
    <MainStack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <MainStack.Screen name="Register" component={Register} />
      <MainStack.Screen name="Login" component={Login} />
    </MainStack.Navigator>
  );
};

function MainNavigator() {
  const [isLogged, setIsLogged] = useState(true);
  return <>{isLogged ? <LoggedIn /> : <NotLoggedIn />}</>;
}

export default MainNavigator;
