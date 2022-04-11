import { StyleSheet, Text, View,TouchableOpacity } from 'react-native'
import React from 'react'
import { FULL_HEIGHT, PRIMARY_COLOR, PRIMARY_COLOR_WHITE } from '../constants/styles';
import { FontAwesome5 } from "@expo/vector-icons";

export default function Evidence({ navigation, route }) {
  return (
    <View style={{ flex : 1, backgroundColor : PRIMARY_COLOR_WHITE }}>
      <View style={styles.topContainer}>
        <View style={{ padding : 10,flexDirection : 'row', zIndex : 200, justifyContent : 'center' }}>     
          <TouchableOpacity
            style={{ flexDirection : 'row', alignSelf : 'center', position : 'absolute', left : 20, alignItems : 'center' }}
            onPress={() => {
              navigation.goBack(); 
            }}
          >
              <FontAwesome5
                name={"chevron-left"}
                size={20}
                style={{ width: 30 }}
                color={"white"}
              />     
          </TouchableOpacity>     
          <Text style={{ fontSize : 20, color : PRIMARY_COLOR_WHITE, alignSelf : 'center'}}>Giấy báo học phí</Text>   
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  topContainer : {
    height : FULL_HEIGHT * 0.3 / 4,
    backgroundColor : PRIMARY_COLOR,
    borderBottomLeftRadius : 25,
    borderBottomRightRadius : 25,
}
})