import {
  CardStyleInterpolators,
  createStackNavigator,
} from "@react-navigation/stack";
import { useState } from "react";

import BottomTabNavigator from "./bottomtab";
import ListingScreen from "../screens/listing";
import useUserStore from "../store";
import RewardScreen from "../screens/reward";
import RegisterScreen from "../screens/register";
import LoginScreen from "../screens/login";

const MainStack = createStackNavigator();

const LoggedIn = () => {
  return (
    <MainStack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <MainStack.Screen options={{
        // header
      }} name="BottomTab" component={BottomTabNavigator} />
      {/* <MainStack.Screen name="Listing" component={ListingScreen} /> */}
      <MainStack.Screen name="Reward" component={RewardScreen} />
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
      <MainStack.Screen name="Login" component={LoginScreen} />
      <MainStack.Screen name="Register" component={RegisterScreen} />
    </MainStack.Navigator>
  );
};

function MainNavigator() {
  const token = useUserStore((state) => state.token);

  const isLoggedIn = () => !!token
  // console.log("SAD",isLoggedIn)
  return <>{isLoggedIn() ? <LoggedIn /> : <NotLoggedIn />}</>;
}

export default MainNavigator;
