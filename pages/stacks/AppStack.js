import React from 'react'
import { createStackNavigator } from "@react-navigation/stack";
import Login from '../Login';
import TabNavigator from '../navigations/TabNavigator';

const Stack = createStackNavigator();

export default function AppStack() {
    return (
        <Stack.Navigator initialRouteName={"Login"}>
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
        </Stack.Navigator>
    )
}

