import React, { useRef,useEffect,useContext,useState } from "react";
import { View,StyleSheet, TouchableOpacity } from 'react-native'
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { FULL_HEIGHT, FULL_WIDTH, PRIMARY_COLOR, PRIMARY_COLOR_BLACK, PRIMARY_COLOR_WHITE, PRIMARY_FONT } from "../../constants/styles";
import { Icon } from 'react-native-elements';
import * as Animatable from 'react-native-animatable';

import Home from "../Home"
import Setting from "../Setting";
import { AppContext } from "../../contexts/App";
import Invest from "../Invest";
import MyInvestment from "../MyInvestment";
import Wallet from "../Wallet";

const TabbarArr = [
    { route: 'Trang chủ', label: 'Trang chủ', type: 'antdesign', icon: 'home',activeColor : PRIMARY_COLOR_WHITE, inActiveColor : PRIMARY_COLOR_BLACK, component: Home },
    { route: 'MyInvestment', label: 'Các khoản đầu tư', type: 'entypo', icon: 'text-document',activeColor : PRIMARY_COLOR_WHITE, inActiveColor : PRIMARY_COLOR_BLACK, component: MyInvestment },
    { route: 'Wallet', label: 'Ví', type: 'antdesign', icon: 'wallet',activeColor : PRIMARY_COLOR_WHITE, inActiveColor : PRIMARY_COLOR_BLACK, component: Wallet },
    { route: 'Setting', label: 'Cài đặt', type: 'feather', icon: 'settings',activeColor : PRIMARY_COLOR_WHITE, inActiveColor : PRIMARY_COLOR_BLACK, component: Setting },
  ];

const Tab = createBottomTabNavigator();

const BtnIcon = (props) => {
    const { item, onPress,accessibilityState } = props;
    const focused = accessibilityState.selected;
    const btnRef = useRef(null)
    const circleRef = useRef(null)
    const txtRef = useRef(null)

    const btnNormalAnimation = {
        translateY  :  5,   
        opacity : 0.5,
    }

    const btnFocusedAnimation = {
        scale : 1.2,
        translateY  : -15,
        opacity : 1,
    }

    useEffect(() => {
        if (focused) {
            btnRef.current.transitionTo({ 
                scale : 1.2,
                translateY  : -15,
                opacity : 1,
            },1200)
            circleRef.current.transitionTo({ scale : 1, translateY : 0,opacity : 1,backgroundColor : PRIMARY_COLOR,borderRadius : 25  },1200)
            txtRef.current.transitionTo({ opacity : 1 ,color : PRIMARY_COLOR, scale : 1 },1200)
        } else if (!focused) {
            btnRef.current.transitionTo({ 
                translateY  :  5,   
                opacity : 0.6,
                scale : 1
            },1200)
            circleRef.current.transitionTo({ scale : 0, translateY : -100,opacity : 0 },1200)
            txtRef.current.transitionTo({ scale : 0 },1200)
        }
    }, [focused])

    return(
        <TouchableOpacity
            onPress={onPress}
            activeOpacity={1}
            style={styles.container}
            >
            <Animatable.View
                ref={btnRef}
                duration={800}
                style={styles.container}>
                <View style={styles.navBtn}>
                    <Animatable.View
                        ref={circleRef}
                        style={
                           { ...StyleSheet.absoluteFillObject,borderRadius : 25 }                  
                        }>
                    </Animatable.View>
                    <Icon 
                        type={item.type} 
                        name={item.icon}
                        color={focused ? item.activeColor : item.inActiveColor}
                    />      
                </View>    
                <Animatable.Text 
                    ref={txtRef}
                    style={styles.navLabel}
                >
                    {item.label}
                </Animatable.Text>   
            </Animatable.View>             
        </TouchableOpacity>       
    )
}

const TabNavigator = () => {
    const { setUser,getUser } = useContext(AppContext)

    useEffect(() => {
        async function loadUser () {
          const data = await getUser()
          setUser({
            type : 'LOAD',
            data : data,
          })
        }   
        loadUser()
      }, [])

    return (
        <View style={{flex : 1, height : FULL_HEIGHT , width : FULL_WIDTH }}>
            <Tab.Navigator            
                initialRouteName={"Home"} 
                screenOptions={{             
                    tabBarShowLabel: false,
                    headerShown : false,
                    tabBarHideOnKeyboard: true,     
                }}
                >  
                {TabbarArr.map((item,index) => {
                    return (
                        <Tab.Screen key={index} name={item.route} component={item.component} options={{
                            tabBarButton: ( props ) => <BtnIcon { ...props } item={item}/>
                        }}/> 
                    )
                })}
                                    
            </Tab.Navigator>
        </View>
    )
}

const styles = StyleSheet.create({
    container : {
        flex : 1,
        alignItems : 'center',
        justifyContent : 'center'
    },
    navLabel : {
        fontSize : 10,
        color : PRIMARY_COLOR_BLACK,
        fontFamily : PRIMARY_FONT,
        textAlign : 'center',
        opacity : 0
    },
    navBtn : {
        alignItems : 'center',
        justifyContent : 'center',
        width : 50,
        height : 50,
        borderColor : PRIMARY_COLOR_WHITE,
    },
})

export default TabNavigator
