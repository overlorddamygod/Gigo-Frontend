import {
  CardStyleInterpolators,
  createStackNavigator,
} from "@react-navigation/stack";
import { useState } from "react";
import Register from "../screens/register";
import Login from "../screens/login";
import BottomTabNavigator from "./bottomtab";
import ListingScreen from "../screens/listing";
import useUserStore from "../store";
import RewardScreen from "../screens/reward";

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
      <MainStack.Screen name="Listing" component={ListingScreen} />
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
      <MainStack.Screen name="Register" component={Register} />
      <MainStack.Screen name="Login" component={Login} />
    </MainStack.Navigator>
  );
};

function MainNavigator() {
  const isLoggedIn = useUserStore((state) => state.isLoggedIn);
  console.log("SAD",isLoggedIn)
  return <>{isLoggedIn() ? <LoggedIn /> : <NotLoggedIn />}</>;
}

export default MainNavigator;
