import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Login from "../Login";
import TabNavigator from "../navigations/TabNavigator";
import Register from "../Register";
import ForgotPassword from "../ForgotPassword";
import Verification from "../Verification";
import ChangePassword from "../ChangePassword";
import Setting from "../Setting";
import Home from "../Home";
import DetailPost from "../DetailPost";
import BackSelection from "../BackSelection";
import {
  createCollapsibleStack,
  // disableExpoTranslucentStatusBar,
} from "react-navigation-collapsible";
import Profile from "../Profile";
import Onboarding from "../Onboarding";
import RegisterPhone from "../RegisterPhone";
import Invest from "../Invest";
import History from "../History";

const Stack = createStackNavigator();

export default function AppStack() {
  return (
    <Stack.Navigator initialRouteName={"Wallet"}>
      <Stack.Screen
        name={"Login"}
        component={Login}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name={"Onboarding"}
        component={Onboarding}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name={"HomeTab"}
        component={TabNavigator}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name={"Register"}
        component={Register}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name={"Forgot"}
        component={ForgotPassword}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name={"Verification"}
        component={Verification}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name={"ChangePassword"}
        component={ChangePassword}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name={"Setting"}
        component={Setting}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name={"Profile"}
        component={Profile}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name={"RegisterPhone"}
        component={RegisterPhone}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name={"Home"}
        component={Home}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name={"DetailPost"}
        component={DetailPost}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name={"BackSelection"}
        component={BackSelection}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name={"Invest"}
        component={Invest}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name={"History"}
        component={History}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
}
