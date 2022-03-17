import React, { useState,useRef,useContext,useEffect } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  FlatList,
  Image
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
import { accountApi } from '../apis/account';
import { transactionApi } from '../apis/transaction';

export default function Home({ route, navigation }) {
  const { user } = useContext(AppContext);
  const [isDown,setIsDown] = useState(true)
  const [transaction,setTransaction] = useState([])
  const [ account,setAccount ] = useState(0)

  //animable
  const topContainerRef = useRef(null)
  const WithdrawMoneyRef = useRef(null)
  const EarnedMoneyRef = useRef(null)
  const InvestMoneyRef = useRef(null)

  useEffect(() => {
    accountApi
        .getByUserId(user.id)
        .then(res => {
            setAccount(res.data)
        })
  }, [])

  useEffect(() => {
    transactionApi
        .getByAccountId(account.id)
        .then(res => {
            setTransaction(res.data)
        })
  }, [account])

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
    <View style={{ height : FULL_HEIGHT, backgroundColor : PRIMARY_COLOR_WHITE }}>
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
            }}>Transaction History</Text>   
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
            { transaction.map(item => {
              return(
                <View key={item.date}>
                  <Text style={{ fontSize : 20, fontWeight : 'bold', marginHorizontal : 15 }}>{item.date}</Text>
                  {
                    item.transaction.map(data =>{
                      return(
                        <TouchableOpacity key={data.id} style={styles.transactionItem} onPress={() => navigation.navigate("TransactionInfo", {
                            transactionId : data.id
                        })}>
                          <View style={{ flexDirection : 'row', flex : 0.6 }}>
                            {
                              data.targetName === "Paypal" 
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
                            <View style={{ justifyContent : 'center', marginLeft : 5 }}>
                              <Text style={{ fontSize : 16, fontWeight : 'bold' , color : SECONDARY_COLOR}}>{data.targetName}</Text>
                              <Text style={{ marginTop : 3, fontSize : 16, opacity : 0.6}}>{data.date}</Text>
                            </View>
                          </View>
                          <View style={{ justifyContent : 'center', alignItems : 'flex-end', flex : 0.3 }}>
                            {
                              data.type === "TOPUP" && "TRANSFER"
                              ?
                              (
                                <Text style={{ fontSize : 16, fontWeight : 'bold', color : 'green' }}>+{vndFormat.format(data.money)}</Text>
                              )
                              :
                              (
                                <Text style={{ fontSize : 16, fontWeight : 'bold', color : 'red' }}>-{vndFormat.format(data.money)}</Text>
                              )
                            }          
                            <Text style={{ marginTop : 3, fontSize : 16, fontWeight : 'bold' , color : PRIMARY_COLOR_BLACK }}>{convertType(data.type)}</Text>
                          </View>
                        </TouchableOpacity>
                      )
                    })
                  }
                </View>
              )
            })}        
        </ScrollView>
    </View>
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
    height : 50,
    width : 50,
    borderRadius : 50,
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
