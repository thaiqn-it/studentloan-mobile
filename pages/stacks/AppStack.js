import React from 'react'
import { createStackNavigator } from "@react-navigation/stack";
import Login from '../Login';
import TabNavigator from '../navigations/TabNavigator';
import Register from '../Register';
import ForgotPassword from '../ForgotPassword';
import Verification from '../Verification';
import ChangePassword from '../ChangePassword';
import Setting from '../Setting';


import {
    createCollapsibleStack,
    // disableExpoTranslucentStatusBar,
} from 'react-navigation-collapsible';

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
                    headerShown: true,
                }}
            />
                
        </Stack.Navigator>
    )
}

