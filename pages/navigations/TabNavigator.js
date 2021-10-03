import React from "react";
import { View, Text,StyleSheet } from 'react-native'
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { PRIMARY_COLOR, PRIMARY_FONT } from "../../constants/styles";
import { AntDesign,MaterialIcons,Feather } from '@expo/vector-icons';

import Home from "../Home"
import Setting from "../Setting";
const Tab = createBottomTabNavigator();
// const insets = useSafeArea()

const TabNavigator = () => {
    return (
        <Tab.Navigator            
            initialRouteName={"Home"} 
            tabBarOptions={{             
                showLabel: false,
            }}
            >   
                <Tab.Screen name={"Home"} component={Home} options={{
                    tabBarIcon: ({ focused }) => (
                        <View style={styles.navIcon}>
                            <AntDesign
                                name="home"
                                size={25}
                                color={focused ? PRIMARY_COLOR : 'black'}
                            />
                            { focused && <Text style={styles.navLabel}>Home</Text> }
                        </View>
                    ),
                }}/>
                <Tab.Screen name={"Loan"} component={Home} options={{
                    tabBarIcon: ({ focused }) => (
                        <View style={styles.navIcon}> 
                        <MaterialIcons
                            name="search"
                            size={25}
                            color={focused ? PRIMARY_COLOR : 'black'}
                            />
                        { focused && <Text style={styles.navLabel}>Loan</Text> }
                        </View>
                    )
                }}/>
                <Tab.Screen name={"Wallet"} component={Home} options={{
                    tabBarIcon: ({ focused }) => (
                        <View style={styles.navIcon}>
                            <AntDesign
                                name="wallet"
                                size={25}
                                color={focused ? PRIMARY_COLOR : 'black'}
                                />
                            { focused && <Text style={styles.navLabel}>Wallet</Text> }
                        </View>
                    )
                }}/>
                <Tab.Screen name={"Setting"} component={Setting} options={{
                    tabBarIcon: ({ focused }) => (
                        <View style={styles.navIcon}>
                        <Feather
                            name="settings"
                            size={25}
                            color={focused ? PRIMARY_COLOR : 'black'}
                        />
                        { focused && <Text style={styles.navLabel}>Setting</Text> }
                        </View>
                    )
                }}/>                   
            </Tab.Navigator>
    )
}

const styles = StyleSheet.create({
    navLabel : {
        fontSize : 10,
        color : PRIMARY_COLOR,
        fontFamily : PRIMARY_FONT,
    },
    navIcon : {  
        alignItems : 'center',
    },
})

export default TabNavigator
