import React, { useState } from "react";
import {
  FlatList,
  Image,
  ImageBackground,
  ScrollView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Pressable
} from "react-native";
import { Icon,Avatar } from "react-native-elements";
import NumberFormat from "react-number-format";
import {
  PRIMARY_COLOR,
  PRIMARY_COLOR_WHITE,
  PRIMARY_COLOR_BLACK,
  FULL_WIDTH,
  FULL_HEIGHT,
} from "../constants/styles";
import { SimpleLineIcons } from '@expo/vector-icons';

export default function Wallet({ route, navigation }) {
  return (
    <View style={{ height : FULL_HEIGHT, marginTop : 20,backgroundColor : PRIMARY_COLOR_WHITE }}>
      <View style={styles.topContainer}>
        <View style={styles.profileContainer}>
          <View style={{ flexDirection : 'row' }}>
            <Avatar
              rounded
              size={50}
              source={{
                uri:
                  'https://images.unsplash.com/photo-1612896488082-7271dc0ed30c?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8YmVhdXRpZnVsJTIwZmFjZXxlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&w=1000&q=80',
              }}
            />
            <View>
              <Text>Nguyen Quoc Thai</Text>
              <Text>thai_dtm@yahoo.com.vn</Text>
            </View>  
          </View>
        </View>
        <View style={{ alignSelf : 'center', alignItems : 'center', marginTop : FULL_HEIGHT / 7 }}>
          <Text style={{ color : PRIMARY_COLOR_WHITE, fontSize : 20 }}>
            My Wallet Balance
          </Text>
          <Text style={{ color : PRIMARY_COLOR_WHITE, fontSize : 40,fontWeight : 'bold'}}>
            20.000.000 đ
          </Text>  
        </View>
        <View style={{ alignSelf : 'center', alignItems : 'center', marginTop : FULL_HEIGHT / 9,flexDirection : "row" }}>
          <SimpleLineIcons name="reload" size={20} color="white" />
          <Pressable onPress={() => navigation.navigate("History")}>
            <Text style={{ color : PRIMARY_COLOR_WHITE, fontSize : 18, margin : 10 }}>
              Transaction history
            </Text>
          </Pressable>
        </View>
        
        <View style={styles.buttonContainer}>
          <TouchableOpacity>
            <View style={{ alignItems : 'center', marginRight : 30 }}>
              <View style={styles.button}>
                  <Image source={require('../assets/top-up.png')} style={{ width : 30, height : 30, tintColor : PRIMARY_COLOR_WHITE }}/>
              </View>
              <Text style={{ marginTop : 5 }}>Top-Up</Text>
           </View>
          </TouchableOpacity>
          <TouchableOpacity>
            <View style={{ alignItems : 'center', marginLeft : 30  }}>
              <View style={styles.button}>
                  <Image source={require('../assets/withdraw.png')} style={{ width : 30, height : 30, tintColor : PRIMARY_COLOR_WHITE }}/>
              </View>
              <Text style={{ marginTop : 5 }}>Withdraw</Text>
            </View>
          </TouchableOpacity>
        </View>
        <View style={{
          position : 'absolute',
          bottom : -10,
          backgroundColor : PRIMARY_COLOR,
          height : 100,
          width : FULL_WIDTH / 1.1,
          alignSelf : 'center',
          opacity : 0.3,
          borderRadius : 10,
        }}/>
        <View style={{
          position : 'absolute',
          bottom : -20,
          backgroundColor : PRIMARY_COLOR,
          height : 100,
          width : FULL_WIDTH / 1.2,
          alignSelf : 'center',
          opacity : 0.2,
          borderRadius : 10,
        }}/>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  topContainer : {
    backgroundColor : PRIMARY_COLOR,
    height : FULL_HEIGHT * 3 / 4,
    borderBottomLeftRadius : 20,
    borderBottomRightRadius : 20,
    elevation : 5,
  },
  profileContainer : {
    marginTop : 40,
    backgroundColor : PRIMARY_COLOR_WHITE,
    borderRadius : 40,
    width : FULL_WIDTH * 4.5 / 5,
    alignSelf : 'center',
    padding : 10,
    elevation : 2
  },
  button : {
    width : 110,
    height : 60,
    backgroundColor : '#FFA15D', //#FFA15D
    borderRadius : 15,
    alignItems : 'center',
    justifyContent : 'center',
  },
  buttonContainer : {
    bottom : - 60,
    position : 'absolute',
    flexDirection : 'row',
    alignSelf : 'center',
    zIndex : 1000,
    elevation : 5
  }
});
