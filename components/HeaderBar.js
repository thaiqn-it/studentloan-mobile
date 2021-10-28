import React, { useRef, useEffect } from 'react'
import { StyleSheet, Text, Animated } from 'react-native'
import { Header } from 'react-native-elements';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { PRIMARY_COLOR_WHITE } from '../constants/styles';
import {
    FontAwesome5,
  } from "@expo/vector-icons";
import { Icon } from 'react-native-elements/dist/icons/Icon';
export default function HeaderBar({ scrollY,navigation, right}) {
    const CONTAINER_HEIGHT = 50; 
    const offsetAnim = useRef(new Animated.Value(0)).current;
    const clampedScroll = Animated.diffClamp(
        Animated.add(
          scrollY.interpolate({
            inputRange : [0, 1],
            outputRange : [0 ,1],
            extrapolateLeft : 'clamp',
          }),
          offsetAnim,
        ),
        0,
        CONTAINER_HEIGHT
      )

      var _clampScrollValue = 0;
      var _offsetValue = 0;
      var _scrollValue = 0

      useEffect(() => {
        scrollY.addListener(({value}) => {
          const diff = value - _scrollValue;
          _scrollValue = value;
          _clampScrollValue = Math.min(
            Math.max(_clampScrollValue * diff, 0),
            CONTAINER_HEIGHT
          )
        });
        offsetAnim.addListener(({value}) => {
          _offsetValue = value
        })
      }, [])

      const headerTranslate = clampedScroll.interpolate({
        inputRange : [0, CONTAINER_HEIGHT],
        outputRange : [0, -CONTAINER_HEIGHT],
        extrapolate : 'clamp'
      })

    return (
        <Animated.View style={[styles.header,{ transform : [{ translateY : headerTranslate }] }]}>
          <Header
            containerStyle={{
              backgroundColor: PRIMARY_COLOR_WHITE,
              elevation : 5
            }}
            placement="left"
            leftComponent={
              <TouchableOpacity
                style={{
                  alignItems: "center",
                  flexDirection: "row",
                }}
                onPress={() => {
                  navigation.goBack();
                }}
            >
              <FontAwesome5
                name={"chevron-left"}
                size={20}
                style={{ width: 30 }}
                color={"black"}
              />
              <Text
                style={{
                  fontSize: 20,
                  marginLeft: -5,
                }}
              >
                Back
              </Text>
            </TouchableOpacity>
          }
            leftContainerStyle={{ flex: 4, flexDirection: "row" }}
            rightComponent={
              right
            }
        />
      </Animated.View>
    )
}

const styles = StyleSheet.create({
    header : {
        position : 'absolute',
        zIndex : 100,
        top : 0,
        left : 0,
        right : 0,
        height : 50
    },
})
