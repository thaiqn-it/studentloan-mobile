import React, { useState, useEffect, useRef } from "react";
import { Animated,StyleSheet, Text, SafeAreaView, Image,View  } from "react-native";
import * as Animatable from 'react-native-animatable';
import HeaderBar from '../components/HeaderBar';
import { Icon,Avatar } from "react-native-elements";
import * as Progress from 'react-native-progress';
import {
  FlatList,
  ScrollView,
  TouchableOpacity,
} from "react-native-gesture-handler";
import {
  FULL_HEIGHT,
  FULL_WIDTH,
  PRIMARY_COLOR,
  PRIMARY_COLOR_BLACK,
  PRIMARY_COLOR_WHITE,
} from "../constants/styles";
import LottieView from 'lottie-react-native';
import { HANDWAVE_LOTTIE } from '../constants/files'
import { Button } from 'react-native-paper';
import { FontAwesome } from '@expo/vector-icons';
import Swiper from 'react-native-swiper'
import { MaterialIcons,Entypo } from '@expo/vector-icons';

export default function Home({ route, navigation }) {
  const scrollY = useRef(new Animated.Value(0)).current;

  const ScrollBox = () => {
    return(
      <Animated.ScrollView contentContainerStyle={{ paddingTop : FULL_HEIGHT / 9 , paddingBottom : 10 }}
          onScroll={Animated.event(
            [{ nativeEvent : { contentOffset : { y : scrollY }}}],
            { useNativeDriver : true }
          )}>
          <View style={{ marginHorizontal : 15 }}>
            <View style={{ flexDirection : 'row', alignItems : 'center' }}>
              <Text style={{ fontSize : 18, fontWeight : 'bold' }}>Hello, Nguyễn Quốc Thái</Text>
              <LottieView source={HANDWAVE_LOTTIE} style={styles.lottie} autoPlay loop speed={1.2}/>
            </View> 
            <Text style={{ fontSize : 16 }}>Welcome back to Student Loan</Text>
          </View>
          <View style={{marginTop : 20, margin : 10, elevation : 5, backgroundColor : PRIMARY_COLOR, borderRadius : 5}}>
            <Text style={{marginTop : 10, fontSize : 18, color : PRIMARY_COLOR_WHITE, fontWeight : 'bold', textAlign : 'center' }}>Please pass the IDENTITY VERIFICATION</Text>
            <Button
              style={styles.btnStart}
              color={PRIMARY_COLOR_WHITE}
                  >START</Button> 
          </View>
          <Swiper index={0} style={{ height : 220 }} showsButtons={true} showsPagination={false} loop={false}
            nextButton={
              <View style={{ 
                height : 30, 
                width : 30, 
                backgroundColor : PRIMARY_COLOR_WHITE, 
                borderRadius : 15,
                alignItems : 'center', 
                justifyContent : 'center',
                elevation: 2, 
                right : -10
              }}>
                  <MaterialIcons name="keyboard-arrow-right" size={25} color="black" />
              </View>
            }
            prevButton={
              <View style={{ 
                height : 30, 
                width : 30, 
                backgroundColor : PRIMARY_COLOR_WHITE, 
                borderRadius : 15,
                alignItems : 'center', 
                justifyContent : 'center',
                elevation: 2, 
                left : -10
              }}>
                  <MaterialIcons name="keyboard-arrow-left" size={25} color="black" />
              </View>
            }>
            <View style={styles.listView}>
              <View style={{ flexDirection : 'row', alignItems : 'center', margin : 10 }}>
                <Image style={{ height : 50 , width : 50}} source={{ uri : 'https://cdn.iconscout.com/icon/free/png-256/wallet-2125271-1787223.png'}}/>
                <View style={{ marginLeft : 10 }}>
                  <Text style={{ fontSize : 15, fontWeight : 'bold'}}>My Wallet</Text>
                  <Text style={{ fontSize : 15, opacity : 0.7 }}>20.000.000vnđ</Text>
                </View>
              </View>
              <View style={styles.line}/>
              <Text style={{ fontSize : 15, margin : 10, marginHorizontal : 25 }}>Last payment on 20/10/2021</Text>
              <Button
                  style={styles.btnMyWallet}
                  color={PRIMARY_COLOR}
                    >MY WALLET</Button> 
            </View>
            <View style={styles.listView}>
              <View style={{ flexDirection : 'row', alignItems : 'center', margin : 10 }}>
                <Image style={{ height : 50 , width : 50}} source={{ uri : 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRR7tmnvJD4gkC_fmohLFIen_cuX5Bgk27t5w&usqp=CAU'}}/>
                <View style={{ marginLeft : 10 }}>
                  <Text style={{ fontSize : 15, fontWeight : 'bold'}}>My Investment</Text>
                  <Text style={{ fontSize : 15, opacity : 0.7 }}>You haven't invested yet</Text>
                </View>
              </View>
              <View style={styles.line}/>
              <Text style={{ fontSize : 15, margin : 10, marginHorizontal : 25 }}>View available loan for investing.</Text>
              <Button
                style={styles.btnMyWallet}
                color={PRIMARY_COLOR}
                  >INVEST</Button> 
            </View>
            <View style={styles.listView}>
              <View style={{ flexDirection : 'row', alignItems : 'center', margin : 10 }}>
                <Image style={{ height : 50 , width : 50}} source={{ uri : 'data:image/png;base64,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'}}/>
                <View style={{ marginLeft : 10 }}>
                  <Text style={{ fontSize : 15, fontWeight : 'bold'}}>Today earning</Text>
                  <Text style={{ fontSize : 15, opacity : 0.7 }}>You haven't earned today</Text>
                </View>
              </View>
              <View style={styles.line}/>
              <Text style={{ fontSize : 15, margin : 10, marginHorizontal : 25 }}>View schedule for receiving money from loan.</Text>
              <Button
                  style={styles.btnMyWallet}
                  color={PRIMARY_COLOR}
                    >CALENDAR</Button> 
            </View>
          </Swiper>
          <View>
            <Text>Oncompleting</Text>
            <View>
            <TouchableOpacity
              onPress={() => navigation.navigate("DetailPost")}
              style={styles.oncompletingStyle}>
                <View style={{ flexDirection : 'row', padding : 15}}> 
                  <View style={{ flexDirection : 'row', alignContent : 'flex-start' }}>
                    <Avatar
                      rounded
                      size={50}
                      source={{
                        uri:
                          'https://images.unsplash.com/photo-1612896488082-7271dc0ed30c?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8YmVhdXRpZnVsJTIwZmFjZXxlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&w=1000&q=80',
                      }}
                    />
                    <View style={{ marginLeft : 10 }}>
                      <Text style={{ fontSize : 15 }}>THAI</Text>
                      <Text style={{ opacity : 0.5,fontSize : 13 }}>FPT</Text>
                      <Text style={{ opacity : 0.5,fontSize : 13 }}>Công nghệ thông tin</Text>
                    </View>         
                  </View>
                  <View style={{ alignItems : 'flex-end', flex : 1,}}>
                      <Text style={{ backgroundColor : '#dadee3', paddingLeft : 3,paddingRight : 3 , opacity : 0.8,borderRadius : 5 }}>Expired in</Text>
                      <Text>12 days</Text>
                  </View>
                </View>
                <View style={styles.line}/>
                <View style={{ padding : 15, flexDirection : 'row'}}>
                    <View>
                      <Text style={{  fontSize : 15  }}>2.000.000đ</Text>
                      <Text style={{ opacity : 0.5,fontSize : 13 }}>Available for investment</Text>           
                    </View>
                    <View style={{  alignItems : 'flex-end', flex : 1, fontSize : 13 }}>
                      <Text style={{  fontSize : 15  }}>22.000.000đ</Text>
                      <Text style={{ opacity : 0.5,fontSize : 13 }}>Full amount</Text>  
                    </View>
                </View>
                <Progress.Bar progress={0.8} width={FULL_WIDTH / 1.2} style={{ alignSelf : 'center', margin : 5, marginBottom : 25 }} color={PRIMARY_COLOR} />    
            </TouchableOpacity>
            </View>
        </View>
      </Animated.ScrollView>
    )
  }
  return (
    <View>
      <HeaderBar 
          scrollY={scrollY} 
          navigation={navigation} 
          right={
          <TouchableOpacity
            style={{ marginRight: 10 }}
          >
            <Icon
              name="search"
              type={"fontawesome"}
              size={30}
              color="white"
            />
          </TouchableOpacity>
        }/>
        <ScrollBox />
    </View>
  );
}

const styles = StyleSheet.create({
  lottie : {
    justifyContent : 'center',
    width: 40, 
    height: 40,
    marginLeft : 5,
  },
  btnStart : {
    width : FULL_WIDTH / 1.3,
    borderRadius : 5,
    borderWidth : 1.2,
    alignSelf : 'center',
    borderColor : PRIMARY_COLOR_WHITE,
    margin : 20
  },
  btnMyWallet : {
    width : FULL_WIDTH / 1.3,
    borderRadius : 5,
    borderWidth : 1.2,
    alignSelf : 'center',
    borderColor : PRIMARY_COLOR,
    margin : 10,
    marginTop : 20
  },
  listView : {
    height : 200,
    width : FULL_WIDTH - 20,
    backgroundColor : PRIMARY_COLOR_WHITE,
    margin : 10,
    borderRadius : 5,
    elevation : 5
  },
  line : { 
    borderBottomWidth : 1, 
    borderBottomColor : '#dadee3',
    width : FULL_WIDTH / 1.1, 
    alignSelf : 'center' 
  },
  oncompletingStyle : {
    margin : 10,
    borderRadius: 20,
    backgroundColor: PRIMARY_COLOR_WHITE,
    elevation : 5,
  }
});
