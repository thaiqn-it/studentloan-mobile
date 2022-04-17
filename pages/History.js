import React, { useState,useRef,useContext,useEffect } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  FlatList,
  Image,
  ActivityIndicator
} from "react-native";
import {
  PRIMARY_COLOR,
  PRIMARY_COLOR_WHITE,
  PRIMARY_COLOR_BLACK,
  SECONDARY_COLOR,
  FULL_WIDTH,
  FULL_HEIGHT,
} from "../constants/styles";
import * as Animatable from 'react-native-animatable';
import { AntDesign,Ionicons } from '@expo/vector-icons';
import { AppContext } from '../contexts/App';
import { vndFormat } from '../utils'
import { walletApi } from '../apis/wallet';
import { transactionApi } from '../apis/transaction';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function Home({ route, navigation }) {
  const { user } = useContext(AppContext);
  const [isDown,setIsDown] = useState(true)
  const [transaction,setTransaction] = useState([])
  const [loading,setLoading] = useState(false)

  //animable
  const topContainerRef = useRef(null)
  const WithdrawMoneyRef = useRef(null)
  const EarnedMoneyRef = useRef(null)
  const InvestMoneyRef = useRef(null)

  useEffect(() => {
    setLoading(true)
    walletApi
        .getByUserId(user.id)
        .then(res => {
            transactionApi
            .getByWalletId(res.data.id)
            .then(res => {
                setTransaction(res.data)
            })
        .finally(() => {
          setLoading(false)
        })
        })
  }, [])

  const convertType = (type) => {
    var result = "";
    switch(type) {
      case "TOPUP":
        result = "Nạp tiền"
        break;
      case "WITHDRAW":
        result = "Rút tiền"
        break;
      case "TRANSFER":
        result = "Chuyển tiền"
        break;
      case "RECEIVE":
        result = "Nhận tiền"
        break;
    }
    return result
  }

  return (
    <SafeAreaView style={{ height : FULL_HEIGHT, backgroundColor : PRIMARY_COLOR_WHITE, flex : 1 }}>
        <Animatable.View style={styles.topContainer} ref={topContainerRef}>
          <View style={{ padding : 10,flexDirection : 'row', justifyContent : 'center',alignItems : 'center' }}>     
            <View style={{ 
              position : 'absolute',
              left : 15,
              alignSelf : 'center'
            }}>
              <AntDesign name="arrowleft" size={28} color="white" onPress={() => navigation.goBack()}/>
            </View>
            <Text style={{ 
              fontSize : 18, 
              color : PRIMARY_COLOR_WHITE,
              fontWeight : 'bold'
            }}>Lịch sử giao dịch</Text>   
          </View>

          <View style={{ flexDirection : 'row', paddingHorizontal : 15 }}>
            <View>
              <View style={{ 
                  height : 40,
                  width : FULL_WIDTH - 80,
                  borderRadius : 10,
                  backgroundColor : '#FFA15D',
                  marginTop : 5,
                  marginRight : 10,
                  justifyContent : 'center',
                  zIndex : 200
                }}>
                  <View style={{ flexDirection : 'row', justifyContent : "space-between", paddingHorizontal : 10}}>
                    <Text style={{ color : PRIMARY_COLOR_WHITE,fontSize : 16 }}>Top-Up Money</Text>
                    <Text style={{ color : PRIMARY_COLOR_WHITE,fontSize : 16 , fontWeight : 'bold'  }}>20.000đ</Text>
                  </View>
              </View>
              <Animatable.View ref={WithdrawMoneyRef} style={{ 
                  height : 40,
                  width : FULL_WIDTH - 80,
                  borderRadius : 10,
                  backgroundColor : '#FFA15D',
                  marginTop : 5,
                  marginRight : 10,
                  justifyContent : 'center',
                  zIndex : 100,
                  position : 'absolute'
                }}>
                  <View style={{ flexDirection : 'row', justifyContent : "space-between", paddingHorizontal : 10}}>
                    <Text style={{ color : PRIMARY_COLOR_WHITE,fontSize : 16 }}>Withdraw Money</Text>
                    <Text style={{ color : PRIMARY_COLOR_WHITE,fontSize : 16 , fontWeight : 'bold'  }}>20.000đ</Text>
                  </View>
              </Animatable.View>
              <Animatable.View ref={EarnedMoneyRef} style={{ 
                  height : 40,
                  width : FULL_WIDTH - 80,
                  borderRadius : 10,
                  backgroundColor : '#FFA15D',
                  marginTop : 5,
                  marginRight : 10,
                  justifyContent : 'center',
                  zIndex : 100,
                  position : 'absolute'
                }}>
                  <View style={{ flexDirection : 'row', justifyContent : "space-between", paddingHorizontal : 10}}>
                    <Text style={{ color : PRIMARY_COLOR_WHITE,fontSize : 16 }}>Earned Money</Text>
                    <Text style={{ color : PRIMARY_COLOR_WHITE,fontSize : 16, fontWeight : 'bold'  }}>20.000đ</Text>
                  </View>
              </Animatable.View>
              <Animatable.View ref={InvestMoneyRef} style={{ 
                  height : 40,
                  width : FULL_WIDTH - 80,
                  borderRadius : 10,
                  backgroundColor : '#FFA15D',
                  marginTop : 5,
                  marginRight : 10,
                  justifyContent : 'center',
                  zIndex : 100,
                  position : 'absolute'
                }}>
                  <View style={{ flexDirection : 'row', justifyContent : "space-between", paddingHorizontal : 10}}>
                    <Text style={{ color : PRIMARY_COLOR_WHITE,fontSize : 16 }}>Invested Money</Text>
                    <Text style={{ color : PRIMARY_COLOR_WHITE,fontSize : 16, fontWeight : 'bold'   }}>20.000đ</Text>
                  </View>
              </Animatable.View>
            </View>
            <TouchableOpacity style={{ zIndex : 200 }} onPress={() => {
                if(isDown) {
                  setIsDown(false)
                  topContainerRef.current.transitionTo({ height : 250 }, 400)
                  WithdrawMoneyRef.current.transitionTo({ translateY : 45 }, 400)
                  EarnedMoneyRef.current.transitionTo({ translateY : 90 }, 450)
                  InvestMoneyRef.current.transitionTo({ translateY : 135 }, 500)
                } else {
                  setIsDown(true)
                  topContainerRef.current.transitionTo({ height : FULL_HEIGHT * 0.5 / 3,}, 400)
                  WithdrawMoneyRef.current.transitionTo({ translateY : 0 }, 500)
                  EarnedMoneyRef.current.transitionTo({ translateY : 0 }, 400)
                  InvestMoneyRef.current.transitionTo({ translateY : 0 }, 300)
                }              
            }}>
                <View style={{ 
                  height : 40,
                  width : 40,
                  borderRadius : 40,
                  backgroundColor : '#FFA15D',
                  marginTop : 5,
                  alignItems : 'center',
                  justifyContent : 'center',
                }}>
                  {
                    isDown === true 
                    ?
                    <Ionicons name="md-chevron-down-sharp" size={30} color={PRIMARY_COLOR_WHITE} />
                    :
                    <Ionicons name="md-chevron-up-sharp" size={30} color={PRIMARY_COLOR_WHITE} />
                  }
                  
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
            opacity : 0.15,
            borderRadius : 10,
          }}/> 
        </Animatable.View>
        {
          loading
          ?
          (
            <ActivityIndicator size={'large'} style={{ marginTop : 50 }} color={PRIMARY_COLOR}/>
          )
          :
          (
            <ScrollView 
              style={{ marginTop : 30 }} 
              showsVerticalScrollIndicator={false}
              contentContainerStyle={{ paddingBottom: FULL_HEIGHT / 30 }}
              onScrollBeginDrag={() => {
                setIsDown(true)
                topContainerRef.current.transitionTo({ height : FULL_HEIGHT * 0.5 / 3,}, 400)
                WithdrawMoneyRef.current.transitionTo({ translateY : 0 }, 500)
                EarnedMoneyRef.current.transitionTo({ translateY : 0 }, 400)
                InvestMoneyRef.current.transitionTo({ translateY : 0 }, 300)
              }}>
                { transaction?.map(item => {
                  return(
                    <View key={item.date}>
                      <Text style={{ fontSize : 20, fontWeight : 'bold', marginHorizontal : 15 }}>{item.date}</Text>
                      {
                        item.transaction.map(data =>{
                          return(
                            <TouchableOpacity key={data.id} style={styles.transactionItem} onPress={() => navigation.navigate("TransactionInfo", {
                                transactionId : data.id
                            })}>
                              <View style={{ flex : 0.15 }}>
                                {
                                  data.description === "Paypal" 
                                  ? (        
                                    <Image 
                                      style={{ height : 50, width : 50, borderRadius : 50, elevation : 5 }}
                                      source={{ uri : 'https://play-lh.googleusercontent.com/iQ8f5plIFy9rrY46Q2TNRwq_8nCvh9LZVwytqMBpOEcfnIU3vTkICQ6L1-RInWS93oQg' }}/>                 
                                  ) 
                                  :(
                                    <View style={styles.nameIcon}>
                                      <Text>QT</Text>
                                    </View>
                                  )
                                }          
                              </View>
                              <View style={{ flex : 0.85 }}>
                                <View style={{ flexDirection : 'row' }}>
                                  <Text style={{ fontSize : 16, fontWeight : 'bold' , color : PRIMARY_COLOR_BLACK, flex : 0.6}}>{data.description}</Text>
                                  {
                                    data.type === "TOPUP"
                                    &&
                                    (
                                      <Text style={{ fontSize : 16, fontWeight : 'bold', color : 'green', flex : 0.4, textAlign : 'right' }}>+{vndFormat.format(data.money)}</Text>
                                    )
                                  } 
                                  {
                                    data.type === "RECEIVE"
                                    &&
                                    (
                                      <Text style={{ fontSize : 16, fontWeight : 'bold', color : 'green', flex : 0.4, textAlign : 'right' }}>+{vndFormat.format(data.money)}</Text>
                                    )
                                  }
                                  {
                                    data.type === "TRANSFER"
                                    &&
                                    (
                                      <Text style={{ fontSize : 16, fontWeight : 'bold', color : 'red', flex : 0.4, textAlign : 'right' }}>-{vndFormat.format(data.money)}</Text>
                                    )
                                  }
                                  {
                                    data.type === "WITHDRAW"
                                    &&
                                    (
                                      <Text style={{ fontSize : 16, fontWeight : 'bold', color : 'red', flex : 0.4, textAlign : 'right' }}>-{vndFormat.format(data.money)}</Text>
                                    )
                                  }
                                </View>
                                <View style={{ flexDirection : 'row' }}>
                                  <Text style={{ marginTop : 3, fontSize : 16, opacity : 0.6 , flex : 0.5}}>{data.date}</Text>
                                  <Text style={{ marginTop : 3, fontSize : 16,  color : PRIMARY_COLOR_BLACK, flex : 0.5, textAlign : 'right' }}>{convertType(data.type)}</Text>
                                </View>                                                             
                              </View>
                            </TouchableOpacity>
                          )
                        })
                      }
                    </View>
                  )
                })}        
            </ScrollView>
          )
        }
        
        
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  topContainer : {
      height : FULL_HEIGHT * 0.5 / 3,
      backgroundColor : PRIMARY_COLOR,
      borderBottomLeftRadius : 25,
      borderBottomRightRadius : 25,
  },
  nameIcon : {
    height : 45,
    width : 45,
    borderRadius : 45,
    backgroundColor : PRIMARY_COLOR,
    alignItems : 'center',
    justifyContent : 'center'
  },
  transactionItem : {
    margin : 10,
    backgroundColor : PRIMARY_COLOR_WHITE,
    elevation : 5,
    padding : 10,
    paddingVertical : 15,
    flexDirection : 'row',
    justifyContent : 'space-between',
    borderRadius : 5,
  }
});
