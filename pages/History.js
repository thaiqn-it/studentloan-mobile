import React, { useState,useRef } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  FlatList,
} from "react-native";
import {
  PRIMARY_COLOR,
  PRIMARY_COLOR_WHITE,
  PRIMARY_COLOR_BLACK,
  FULL_WIDTH,
  FULL_HEIGHT,
} from "../constants/styles";
import * as Animatable from 'react-native-animatable';
import { AntDesign,Ionicons } from '@expo/vector-icons';

export default function Home({ route, navigation }) {
  const transactionData = [
    {
      id : 1,
      date : '23-10-2021',
      data : [
        {
          id : 1,
          name : 'Nguyễn Quốc Thái',
          timeAt : '10:32 AM',
          date : '23-10-2020',
          money : '30.000.000',
          type : 'top-up',
          status : 'up'
        },
        {
          id : 2,
          name : 'Nguyễn Quốc Thái II',
          timeAt : '10:35 AM',
          date : '23-10-2020',
          money : '20.000.000',
          type : 'withdraw',
          status : 'down'
        },
      ]
    },
    {
      id : 2,
      date : '2-1-2021',
      data : [
        {
          id : 3,
          name : 'Đinh Phú Cường',
          timeAt : '08:21 AM',
          date : '23-10-2020',
          money : '20.000.000',
          type : 'invest',
          status : 'down'
        },
        {
          id : 4,
          name : 'Nguyễn Quốc Thái III',
          timeAt : '10:35 AM',
          date : '23-10-2020',
          money : '20.000.000',
          type : 'withdraw',
          status : 'down'
        },
      ]
    },
    {
      id : 3,
      date : '22-4-2021',
      data : [
        {
          id : 5,
          name : 'Nguyễn Trường Phi',
          timeAt : '16:11 AM',
          date : '23-10-2020',
          money : '20.000.000',
          type : 'earned',
          status : 'up'
        },
        {
          id : 3,
          name : 'Đinh Phú Cường',
          timeAt : '08:21 AM',
          date : '23-10-2020',
          money : '20.000.000',
          type : 'invest',
          status : 'down'
        },
      ]
    },
  ]

  //state
  const [isDown,setIsDown] = useState(true)
  const [transaction,setTransaction] = useState(transactionData)

  //animable
  const topContainerRef = useRef(null)
  const WithdrawMoneyRef = useRef(null)
  const EarnedMoneyRef = useRef(null)
  const InvestMoneyRef = useRef(null)

  //component
  const transactionView = ({ item }) => {
    return(
      <View>
        <Text style={{ fontSize : 18, fontWeight : 'bold', marginHorizontal : 10 }}>{item.date}</Text>
        {
          item.data.map(data =>{
            return(
              <View style={styles.transactionItem}>
                <View style={{ flexDirection : 'row' }}>
                  <View style={styles.nameIcon}>
                    <Text>QT</Text>
                  </View>
                  <View style={{ justifyContent : 'center', marginLeft : 5 }}>
                    <Text style={{ fontSize : 16, fontWeight : 'bold' }}>{data.name}</Text>
                    <Text style={{ marginTop : 3, fontSize : 16, opacity : 0.6}}>{data.date}</Text>
                  </View>
                </View>
                <View style={{ justifyContent : 'center', alignItems : 'flex-end' }}>
                  <Text style={{ fontSize : 16, fontWeight : 'bold', color : 'green' }}>{data.money}</Text>
                  <Text style={{ marginTop : 3, fontSize : 16 }}>{data.type}</Text>
                </View>
              </View>
            )
          })
        }
      </View>
    )
  }

  return (
    <View style={{ height : FULL_HEIGHT, backgroundColor : PRIMARY_COLOR_WHITE, marginTop : 20 }}>
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
          <FlatList 
            data={transaction}
            renderItem={transactionView}
            keyExtractor={(item) => item.id.toString()}
            showsVerticalScrollIndicator={false}
          />
        
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
    borderRadius : 10
  }
});
