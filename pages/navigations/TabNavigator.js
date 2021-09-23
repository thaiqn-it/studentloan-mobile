import React from "react";
import { View, Text } from 'react-native'
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { PRIMARY_COLOR } from "../../constants/styles";
import Home from "../Home"
const Tab = createBottomTabNavigator();

const TabNavigator = () => {
    return (
        <Tab.Navigator
            initialRouteName={"Home"} 
            screenOptions={({ route }) => ({
                tabBarIcon: ({ focused, color, size }) => {
                let iconName;
                let iconType = "material";
                if (route.name === "Home") {
                    iconName = "trending-up";
                }
                if (route.name === "Profile") {
                    iconName = "person-outline";
                }
                if (route.name === "Search") {
                    iconName = "search";
                }
                if (route.name === "Cart") {
                    iconType = "antdesign";
                    iconName = "shoppingcart";
                }
                return <Icon name={iconName} type={iconType} />;
                },
            })}
            tabBarOptions={{
                activeTintColor: PRIMARY_COLOR,
                inactiveTintColor: "gray",
            }}
            >
                <Tab.Screen name={"Home"} component={Home} />
                
            </Tab.Navigator>
    )
}

export default TabNavigator
