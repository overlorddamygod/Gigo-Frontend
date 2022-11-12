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
import CompanyScreen from "../screens/company";
import RedeemScreen from "../screens/redeem";
import SubscriptionScreen from "../screens/subscription";

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
      <MainStack.Screen name="Company" component={CompanyScreen} options={{
        headerShown: true
      }} />
      <MainStack.Screen name="Subscription" component={SubscriptionScreen} options={{
        headerShown: true
      }} />
      <MainStack.Screen name="Reward" component={RewardScreen} options={{
        headerShown: true
      }} />
      <MainStack.Screen name="Redeem" component={RedeemScreen} options={{
        headerShown: true
      }} />
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
