import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Login from "../Login";
import Home from "../Home";
import TabNavigator from "../navigations/TabNavigator";
import DetailPost from "../DetailPost";
import BackSelection from "../BackSelection";

const Stack = createStackNavigator();

export default function AppStack() {
  return (
    <Stack.Navigator initialRouteName={"DetailPost"}>
      <Stack.Screen
        name={"Login"}
        component={Login}
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
        name={"DetailPost"}
        component={DetailPost}
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
        name={"BackSelection"}
        component={BackSelection}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
}
