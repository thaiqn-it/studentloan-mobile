import React, { useState,useEffect,useContext } from "react";
import { useIsFocused } from "@react-navigation/native";
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
import { walletApi } from '../apis/wallet'
import { vndFormat } from '../utils'
import { SafeAreaView } from 'react-native-safe-area-context';
import { AppContext } from '../contexts/App';

export default function Wallet({ route, navigation }) {
  const { user } = useContext(AppContext);
  const [ account,setAccount ] = useState(0)
  const isFocused = useIsFocused();

  useEffect(() => {
    walletApi
      .getByUserId()
      .then(res => {
        setAccount(res.data)
      })
  }, [isFocused])

  return (
    <SafeAreaView style={{ height : FULL_HEIGHT,backgroundColor : PRIMARY_COLOR_WHITE,flex : 1 }}>
      <View style={styles.topContainer}>
        <View style={styles.profileContainer}>
          <View style={{ flexDirection : 'row' }}>
              {
                user.profileUrl
                ?
                (
                    <Avatar
                        rounded
                        size={50}
                        source={{
                            uri: user.profileUrl,
                        }}
                    />
                )
                :
                (
                    <Avatar
                        rounded
                        size={90}
                        source={{
                            uri: "https://i.pinimg.com/originals/51/f6/fb/51f6fb256629fc755b8870c801092942.png",
                        }}
                    />
                )

            }
            <View style={{ alignSelf : 'center', marginLeft : 15}}>
              <Text style={{ fontSize : 16 }}>{user.firstName + " " + user.lastName}</Text>
              <Text style={{ fontSize : 16 }}>{user.email}</Text>
            </View>  
          </View>
        </View>
        <View style={{ alignSelf : 'center', alignItems : 'center', marginTop : FULL_HEIGHT / 7 }}>
          <Text style={{ color : PRIMARY_COLOR_WHITE, fontSize : 20 }}>
            S??? d?? v??
          </Text>
          <Text style={{ color : PRIMARY_COLOR_WHITE, fontSize : 40,fontWeight : 'bold'}}>
            {vndFormat.format(account.money - account.totalPending)}
          </Text>  
          <Text style={{ color : PRIMARY_COLOR_WHITE, fontSize : 16, marginTop : 10, opacity : 0.8, fontWeight : 'bold' }}>
            ( ??ang ch??? gi???i quy???t : {vndFormat.format(account.totalPending)} )
          </Text> 
        </View>
        <View style={{ alignSelf : 'center', alignItems : 'center', marginTop : FULL_HEIGHT / 8,flexDirection : "row" }}>
          <SimpleLineIcons name="reload" size={20} color="white" />
          <Pressable onPress={() => navigation.navigate("History")}>
            <Text style={{ color : PRIMARY_COLOR_WHITE, fontSize : 18, margin : 10 }}>
              L???ch s??? giao d???ch
            </Text>
          </Pressable>
        </View>
        
        <View style={styles.buttonContainer}>
          <TouchableOpacity onPress={() => navigation.navigate("DepositMoney", {
            accountId : account.id
          })}>
            <View style={{ alignItems : 'center', marginRight : 30 }}>
              <View style={styles.button}>
                  <Image source={require('../assets/top-up.png')} style={{ width : 30, height : 30, tintColor : PRIMARY_COLOR_WHITE }}/>
              </View>
              <Text style={{ marginTop : 5, fontSize : 16 }}>N???p ti???n</Text>
           </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate("WithdrawMoney")}>
            <View style={{ alignItems : 'center', marginLeft : 30  }}>
              <View style={styles.button}>
                  <Image source={require('../assets/withdraw.png')} style={{ width : 30, height : 30, tintColor : PRIMARY_COLOR_WHITE }}/>
              </View>
              <Text style={{ marginTop : 5, fontSize : 16 }}>R??t ti???n</Text>
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
    </SafeAreaView>
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
    bottom : - 40,
    position : 'absolute',
    flexDirection : 'row',
    alignSelf : 'center',
    zIndex : 1000,
    elevation : 5
  }
});
