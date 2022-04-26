import React, { useState, useEffect, useRef } from "react";
import { Animated,StyleSheet, Text, Image,View,Pressable,StatusBar, ActivityIndicator } from "react-native";
import * as Animatable from 'react-native-animatable';
import HeaderBar from '../components/HeaderBar';
import { Icon,Avatar,Badge } from "react-native-elements";
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
  SECONDARY_COLOR
} from "../constants/styles";
import {
  Ionicons,
  FontAwesome5,
  AntDesign
} from "@expo/vector-icons";
import AppLoading from '../components/AppLoading';
import { loanApi } from "../apis/loan";
import moment from "moment";
import Intl from "intl";
import 'intl/locale-data/jsonp/it-IT'
import io from "socket.io-client";
import { SafeAreaView } from 'react-native-safe-area-context';
import { notificationApi } from '../apis/notification';
import * as Notifications from 'expo-notifications';
import { useIsFocused } from "@react-navigation/native";
import 'moment/min/locales';

export default function Home({ route, navigation }) {
  const scrollY = useRef(new Animated.Value(0)).current;
  const newestText = useRef(null)
  const endingSoonText = useRef(null)
  const popularText = useRef(null)
  const newestView = useRef(null)
  const endingSoonView = useRef(null)
  const popularView = useRef(null)
  const closeBtn = useRef(null)
  const plate = useRef(null)
  const postContainerRef = useRef(null)
  const socket = useRef(io("ws://192.168.1.19:3000",{transports: ['websocket'], upgrade: false}));
  const [numNoti,setNumNoti] = useState(0)
  const isFocused = useIsFocused();

  var num = 0

  // useEffect(() => {
  //   socket.current.on("welcome", message => {
      
  //   })
 
  // }, [socket])

  useEffect(() => {
    notificationApi.getAllByUserId()
      .then(res => {
        setNumNoti(res.data.countNotRead)
      })
  }, [isFocused])
  
  useEffect(() => {  
    const subscription = Notifications.addNotificationReceivedListener(notification => {
      notificationApi.getAllByUserId()
        .then(res => {
          setNumNoti(res.data.countNotRead)
        })
      });
      return () => subscription.remove();
  }, [])
 
  moment.locale('vi')

  moment.updateLocale('vi', {
    relativeTime : {
        future: "trong %s",
        past: "%s trước",
        s  : 'vài giây trước',
        ss : '%d giây',
        m:  "1 phút",
        mm: "%d phút",
        h:  "1 giờ",
        hh: "%d giờ",
        d:  "1 ngày",
        dd: "%d ngày",
        w:  "1 tuần",
        ww: "%d tuần",
        M:  "1 tháng",
        MM: "%d tháng",
        y:  "1 năm",
        yy: "%d năm"
    }
});

  const vndFormat = new Intl.NumberFormat('it-IT', {
    style: 'currency',
    currency: 'VND',
  });

  const postItem = ({ item }) => {
    return(
      <TouchableOpacity
          onPress={() => navigation.navigate("DetailPost", { 
            id : item.id        
          })}
          style={styles.postStyle}>
            <View style={{ flexDirection : 'row', padding : 15}}> 
              <View style={{ flexDirection : 'row', alignContent : 'flex-start', flex : 0.8 }}>
                <Avatar
                  rounded
                  size={50}
                  source={{
                    uri: item.Student.User.profileUrl ? item.Student.User.profileUrl : 'https://images.unsplash.com/photo-1511367461989-f85a21fda167?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NXx8cHJvZmlsZXxlbnwwfHwwfHw%3D&w=1000&q=80'
                  }}
                />
                <View style={{ marginLeft : 10 }}>
                  <Text style={{ fontSize : 15 }}>{item.Student.User.firstname + ' ' + item.Student.User.lastname}</Text>
                  <Text style={{ opacity : 0.5,fontSize : 13 }}>{item.Student.Information.SchoolMajor.School.name}</Text>
                  <Text style={{ opacity : 0.5,fontSize : 13 }}>{item.Student.Information.SchoolMajor.Major.name}</Text>
                </View>         
              </View>
              <View style={{ alignItems : 'flex-end', flex : 0.2}}>
                  <Text style={{ backgroundColor : '#dadee3', paddingLeft : 3,paddingRight : 3 , opacity : 0.8,borderRadius : 5 }}>Kết thúc</Text>
                  <Text style={{ textAlign : 'right'}}>trong {moment(item.postExpireAt).diff(new Date(),"days")} ngày</Text>
              </View>
            </View>

            <View style={styles.line}/>
            <View style={{ padding : 15, flexDirection : 'row'}}>
                <View>
                  <Text style={{  fontSize : 15  }}>{item.AccumulatedMoney === null ? vndFormat.format(item.totalMoney) : vndFormat.format(item.totalMoney - item.AccumulatedMoney)}</Text>
                  <Text style={{ opacity : 0.5,fontSize : 13 }}>Khoản tiền có thể đầu tư</Text>           
                </View>
                <View style={{  alignItems : 'flex-end', flex : 1, fontSize : 13 }}>
                  <Text style={{  fontSize : 15  }}>{vndFormat.format(item.totalMoney)}</Text>
                  <Text style={{ opacity : 0.5,fontSize : 13 }}>Tổng tiền</Text>  
                </View>
            </View>
            <Progress.Bar progress={item.AccumulatedMoney/item.totalMoney} width={FULL_WIDTH / 1.2} style={{ alignSelf : 'center', margin : 5, marginBottom : 25 }} color={PRIMARY_COLOR} />    
            <View style={styles.line}/>
            <View style={{ padding : 15, flexDirection : 'row' }}>
              <View>
                <Text style={{ marginBottom : 5,fontSize : 14 }}>Lãi suất</Text>
                <Text style={{ fontSize : 14 }}>Thời hạn</Text>
                  
              </View>
              <View style={{ flex : 1 , alignItems : 'flex-end' }}>
                <Text style={{ marginBottom : 5,fontSize : 14 }}>{item.interest * 100}%/ tháng</Text>
                <Text style={{ fontSize : 14 }}>{item.duration} tháng</Text>
              </View>
            </View> 
        </TouchableOpacity>
    )
  }

  const NewestView = () => {
    const [loading,setLoading] = useState(true)
    const [loadingMore,setLoadingMore] = useState(false)
    const [data, setData] = useState([])
    const [page,setPage] = useState(1)

    const loadMore = () => {
      if (data.length >= 5) {
        setLoadingMore(true)
        setPage(page + 1)
      }   
    }

    useEffect(() => {
      loanApi.search({
        page,
        sort : 'lastest'
      }).then((res) => {  
        if (res.data) {
          setData(data.concat(res.data))   
        }    
      }).finally(() => {
        setLoading(false);
        setLoadingMore(false)
      });

      return () => {
        setData([]); 
      };
    }, [page])
  
    return(
      <View>
          {
            loading 
            ? 
            (
              <ActivityIndicator size="large" color={PRIMARY_COLOR}/>
            )
            :
            (
              <FlatList
                onMomentumScrollBegin={
                  (e) => {
                    if(e.nativeEvent.contentOffset.y <= 0){
                      postContainerRef.current.transitionTo({ translateY : 0, height : FULL_HEIGHT * 0.8 - 5 },600),
                      closeBtn.current.transitionTo({ opacity : 0})
                    }
                    else if(e.nativeEvent.contentOffset.y > 10){ 
                      postContainerRef.current.transitionTo({ translateY : - 150, height : FULL_HEIGHT - 50 },600)
                      closeBtn.current.transitionTo({ opacity : 1})
                    }
                  }       
                }
                data={data}
                renderItem={postItem}
                keyExtractor={(item) => item.id.toString()}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ paddingBottom : 100 }}
                ListFooterComponent={() => {
                  return loadingMore 
                  ? 
                  (
                    <View style={{ flexDirection : 'row', alignItems : 'center', justifyContent : 'center' }}>
                      <ActivityIndicator size={'small'} color={PRIMARY_COLOR}/>
                      <Text style={{ marginLeft : 5, fontSize : 15}}>Đang tải</Text>
                    </View>
                  )
                  :
                  null
                }}
                onEndReached={loadMore}
                onEndReachedThreshold={0}
              />
            )
          }
      </View> 
    )
  }

  const EndingSoonView = () => {
    const [loading,setLoading] = useState(true)
    const [data, setData] = useState(null)
    const [page,setPage] = useState(1)

    useEffect(() => {
      loanApi.search({
        page,
        sort : 'endingSoon'
      }).then((res) => {
        setData(res.data)
      }).finally(() => {
        setLoading(false);
      });

      return () => {
        setData({}); 
      };
    }, [isFocused])

    return(
      <View>
          {
            loading 
            ? 
            (
              <ActivityIndicator size="large" color={PRIMARY_COLOR}/>
            )
            :
            (
              <FlatList
                onMomentumScrollBegin={
                  (e) => {
                    if(e.nativeEvent.contentOffset.y <= 0){
                      postContainerRef.current.transitionTo({ translateY : 0,height : FULL_HEIGHT * 0.8 - 5 },600),
                      closeBtn.current.transitionTo({ opacity : 0})
                    }
                    else if(e.nativeEvent.contentOffset.y > 10){ 
                      postContainerRef.current.transitionTo({ translateY : - 150, height : FULL_HEIGHT - 50 },600)
                      closeBtn.current.transitionTo({ opacity : 1})
                    }
                  }       
                }
                data={data}
                renderItem={postItem}
                keyExtractor={(item) => item.id.toString()}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ paddingBottom : 100 }}
              />
            )
          }
      </View>
    )
  }

  const PopolarView = () => {
    const [loading,setLoading] = useState(true)
    const [data, setData] = useState(null)
    const [page,setPage] = useState(1)

    useEffect(() => {
      loanApi.search({
        page,
        sort : 'popular'
      }).then((res) => {
        setData(res.data)
      }).finally(() => {
        setLoading(false);
      });

      return () => {
        setData({}); 
      };
    }, [isFocused])

    return(
      <View>
          {
            loading 
            ? 
            (
              <ActivityIndicator size="large" color={PRIMARY_COLOR}/>
            )
            :
            (
              <FlatList
                onMomentumScrollBegin={
                  (e) => {
                    if(e.nativeEvent.contentOffset.y <= 0){
                      postContainerRef.current.transitionTo({ translateY : 0, height : FULL_HEIGHT * 0.8 - 5 },600),
                      closeBtn.current.transitionTo({ opacity : 0})
                    }
                    else if(e.nativeEvent.contentOffset.y > 10){ 
                      postContainerRef.current.transitionTo({ translateY : - 150, height : FULL_HEIGHT - 50 },600)
                      closeBtn.current.transitionTo({ opacity : 1})
                    }
                  }       
                }
                data={data}
                renderItem={postItem}
                keyExtractor={(item) => item.id.toString()}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ paddingBottom : 100 }}
              />
            )
          }
      </View>
    )
  }

  return (
    <SafeAreaView style={{ flex : 1, backgroundColor : PRIMARY_COLOR_WHITE }}>
        <View style={styles.topContainer}>
          <View style={{ padding : 10,flexDirection : 'row', alignItems : 'center', justifyContent : 'space-between', paddingHorizontal : 20 }}>         
            {/* <Image source={require('../assets/logo.png')} style={{ height : 50, width : 85}}/>   */}
            <Text style={{ fontSize : 22, color : PRIMARY_COLOR_WHITE, fontWeight : 'bold' }}>STUDENT LOAN</Text>    
            <TouchableOpacity onPress={() => navigation.navigate("Invest")} style={{ alignSelf : 'center' }}>
              <Ionicons name="search" size={25} color="white" />
            </TouchableOpacity>   
          </View>
          <View style={{ flexDirection : 'row', justifyContent : 'space-around', marginTop : 20 }}>
            <TouchableOpacity style={{ alignItems : 'center' }} onPress={() => navigation.navigate("Notification")}>
              <Image source={require('../assets/bell.png')} style={{ 
                height : 30,
                width : 30,
                tintColor : PRIMARY_COLOR_WHITE
              }}/>
              {
                numNoti > 0 && (
                  <Badge
                    value={numNoti}
                    status={"error"}
                    containerStyle={{ position: 'absolute', top: 0, right: 1 }}
                  />
                )
              }    
              <Text style={{ color : PRIMARY_COLOR_WHITE, marginTop : 10 }}>Thông báo</Text>
            </TouchableOpacity>
            <TouchableOpacity style={{ alignItems : 'center' }} onPress={() => navigation.navigate("Contract")}>
              <Image source={require('../assets/contract.png')} style={{ 
                height : 30,
                width : 30,
                tintColor : PRIMARY_COLOR_WHITE
              }}/>
              <Text style={{ color : PRIMARY_COLOR_WHITE, marginTop : 10 }}>Hợp đồng</Text>
            </TouchableOpacity>
            <TouchableOpacity style={{ alignItems : 'center' }} onPress={() => navigation.navigate("Analytic")}>
              <Image source={require('../assets/analytics.png')} style={{ 
                height : 30,
                width : 30,
                tintColor : PRIMARY_COLOR_WHITE
              }}/>
              <Text style={{ color : PRIMARY_COLOR_WHITE, marginTop : 10 }}>Thống kê</Text>
            </TouchableOpacity>
            <TouchableOpacity style={{ alignItems : 'center' }} onPress={() => navigation.navigate("Verify")}>
              <Image source={require('../assets/user-avatar.png')} style={{ 
                height : 30,
                width : 30,
                tintColor : PRIMARY_COLOR_WHITE
              }}/>
              <Text style={{ color : PRIMARY_COLOR_WHITE, marginTop : 10 }}>Xác thực</Text>
            </TouchableOpacity>
          </View> 
        </View>
        <View style={{ marginTop : 5 }}>
        <Animatable.View style={styles.postContainer} ref={postContainerRef}>
          <View style={{ flexDirection : 'row', marginTop : 15, marginHorizontal : 25 }}>
            <Pressable onPress={() => {
                newestView.current.transitionTo({ translateX : 0 })
                endingSoonView.current.transitionTo({ translateX : 0 })
                popularView.current.transitionTo({ translateX : 0 })
                plate.current.transitionTo({ translateX : 0 })
                newestText.current.transitionTo({ opacity : 1, scale : 1.1 })
                endingSoonText.current.transitionTo({ opacity : 0.4, scale : 1 })
                popularText.current.transitionTo({ opacity : 0.4, scale : 1})
            }}>
                <Animatable.Text ref={newestText} style={[{ fontSize : 15,color : PRIMARY_COLOR_BLACK,fontWeight : 'bold' }]}>Mới nhất</Animatable.Text>
            </Pressable>
            <Pressable onPress={() => {
                newestView.current.transitionTo({ translateX : -(FULL_WIDTH) })
                endingSoonView.current.transitionTo({ translateX : -(FULL_WIDTH) })
                popularView.current.transitionTo({ translateX : 0 })
                plate.current.transitionTo({ translateX : 90 })
                newestText.current.transitionTo({ opacity : 0.4, scale : 1})
                endingSoonText.current.transitionTo({ opacity : 1, scale : 1.1})
                popularText.current.transitionTo({ opacity : 0.4, scale : 1 })
            }}>
                <Animatable.Text ref={endingSoonText} style={{ fontSize : 15, marginLeft : 20,color : PRIMARY_COLOR_BLACK,fontWeight : 'bold',opacity : 0.4 }}>Sắp kết thúc</Animatable.Text>
            </Pressable>
            <Pressable onPress={() => {
                newestView.current.transitionTo({ translateX : -(FULL_WIDTH) })
                endingSoonView.current.transitionTo({ translateX : -(2 * FULL_WIDTH) })
                popularView.current.transitionTo({ translateX : -(2 * FULL_WIDTH) })
                plate.current.transitionTo({ translateX : 185 })
                newestText.current.transitionTo({ opacity : 0.4, scale : 1})
                endingSoonText.current.transitionTo({ opacity : 0.4, scale : 1})
                popularText.current.transitionTo({ opacity : 1 , scale : 1.1})
            }}>
                <Animatable.Text ref={popularText} style={{ fontSize : 15, marginLeft : 20,color : PRIMARY_COLOR_BLACK,fontWeight : 'bold',opacity : 0.4  }}>Phổ biến</Animatable.Text>
            </Pressable> 
            <Animatable.View ref={closeBtn} style={{ position : 'absolute', right : 0, alignSelf : 'center', opacity : 0 }}>
              <AntDesign onPress={() => {
                postContainerRef.current.transitionTo({ translateY : 0,height : FULL_HEIGHT * 0.8 - 5 },600),
                closeBtn.current.transitionTo({ opacity : 0 })
              }} name="closecircleo" size={25} color={SECONDARY_COLOR}/>            
            </Animatable.View>
        </View>
          <Animatable.View ref={plate} style={{ width : 15, backgroundColor : SECONDARY_COLOR, height : 5, borderRadius : 5, marginHorizontal : 50, marginBottom : 10 }}/>
          <View style={{flexDirection : 'row'}}>
              <Animatable.View ref={newestView} style={{ width : FULL_WIDTH }}> 
                  <NewestView />
              </Animatable.View>
              <Animatable.View ref={endingSoonView} style={{ width : FULL_WIDTH }}>
                  <EndingSoonView />
              </Animatable.View>
              <Animatable.View ref={popularView} style={{ width : FULL_WIDTH, backgroundColor : PRIMARY_COLOR_WHITE }}>
                  <PopolarView />
              </Animatable.View>             
          </View>
        </Animatable.View>
      </View>
    </SafeAreaView>
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
  postStyle : {
    margin : 10,
    borderRadius: 5,
    backgroundColor: PRIMARY_COLOR_WHITE,
    elevation : 5,
  },
  postContainer : {
    backgroundColor : PRIMARY_COLOR_WHITE,
    borderTopStartRadius : 20,
    borderTopEndRadius : 20,
    zIndex : 200,
    height : FULL_HEIGHT * 0.8 - 5
  },
  topContainer : {
    height : FULL_HEIGHT * 0.2,
    backgroundColor : PRIMARY_COLOR,
    borderBottomLeftRadius : 20,
    borderBottomRightRadius : 20,
  },
});
