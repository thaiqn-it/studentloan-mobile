import React, { useState,useRef,useEffect,useContext } from "react";
import {
  StyleSheet,
  Text,
  View,
  Animated,
  Image,
  Dimensions,
  Pressable,
  TouchableOpacity,
  StatusBar,
  ActivityIndicator,
  Alert
} from "react-native";
import {
  PRIMARY_COLOR,
  PRIMARY_COLOR_WHITE,
  PRIMARY_COLOR_BLACK,
  FULL_HEIGHT,
  FULL_WIDTH,
  SECONDARY_COLOR
} from "../constants/styles";
import { Avatar,ListItem } from "react-native-elements";
import { Icon } from "react-native-elements/dist/icons/Icon";
import Carousel from 'react-native-snap-carousel';
import HeaderBar from '../components/HeaderBar';
import * as Progress from 'react-native-progress';
import { Button } from 'react-native-paper';
import { PanGestureHandler, ScrollView } from "react-native-gesture-handler";
import * as Animatable from 'react-native-animatable';
import {
  FontAwesome5,
} from "@expo/vector-icons";
import { loanApi } from "../apis/loan";
import { investmentApi } from "../apis/investment";
import moment from "moment";
import { Video, AVPlaybackStatus } from 'expo-av';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useIsFocused } from "@react-navigation/native";
import { AppContext } from '../contexts/App';

const { width: windowWidth } = Dimensions.get("window");
const SLIDER_WIDTH = Dimensions.get('window').width;
const ITEM_WIDTH = Math.round(SLIDER_WIDTH - 30 * 0.9);
const ITEM_HEIGHT = Math.round(ITEM_WIDTH * 3 / 4);

export default function DetailPost({ navigation,route }) {
  // const {id} = route.params;
  const scrollY = useRef(new Animated.Value(0)).current;
  const carouselRef = useRef(null);
  const { id } = route.params;
  const [post,setPost] = useState(null)
  const [isInvest,setIsInvest] = useState(null)
  const [isLoading,setIsLoading] = useState(true)
  const [investmentId,setInvesmentId] = useState('')
  const isFocused = useIsFocused();
  const { user, setUser, getUser } = useContext(AppContext);

  const isCloseToBottom = ({layoutMeasurement, contentOffset, contentSize}) => {
    const paddingToBottom = 50;
    return layoutMeasurement.height + contentOffset.y >=
      contentSize.height - paddingToBottom;
  };

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

    useEffect(() => {
      loanApi.getById(id).then(res => {
        setPost(res.data)
        investmentApi.checkExist(res.data.loan.id).then(res => {
          setIsInvest(res.data.isInvest)
          if (res.data.isInvest) {
            setInvesmentId(res.data.investmentId)
          }
        }).finally(() => {
          setIsLoading(!isLoading)
        })
      })
    }, [isFocused])

  const opacity = clampedScroll.interpolate({
    inputRange : [0, CONTAINER_HEIGHT - 20, CONTAINER_HEIGHT],
    outputRange : [1, 0.01 ,0],
    extrapolate : 'clamp'
  })  

  const bottomTranslate = clampedScroll.interpolate({
    inputRange : [0, CONTAINER_HEIGHT],
    outputRange : [0, CONTAINER_HEIGHT * 2],
    extrapolate : 'clamp'
  })
  
  const vndFormat = new Intl.NumberFormat('it-IT', {
    style: 'currency',
    currency: 'VND',
  });

  const ITEMS = [
    {
      id : 1,
      label : "Giấy báo học phí",
      route : "Evidence"
    },
    {
      id : 2,
      label : "Xác nhận từ hệ thống",
      route : "LoanHistory"
    },
  ];

  const DemandNoteBox = () => {
    return (   
      <View
        style={{
          marginTop: 10,
          backgroundColor: PRIMARY_COLOR_WHITE,
          elevation : 5,
          marginBottom : FULL_HEIGHT / 10
        }}
      >
        <View
          style={{
            flexDirection: "row",
            marginStart: 25,
            margin : 15,
            marginTop: 20,
            alignItems : 'center'
          }}
        >
          <Icon
            name="file-alt"
            type="font-awesome-5"
            color={PRIMARY_COLOR_BLACK}
            size={23}
          />
          <Text
            style={{
              marginStart: 10,
              fontSize: 18,
            }}
          >
            My demand notes
          </Text>
        </View>    
          <Carousel
            layout={'tinder'}
            ref={carouselRef}
            data={dataArchieve}
            renderItem={renderItem}
            sliderWidth={ITEM_WIDTH}
            itemWidth={ITEM_WIDTH - 30}
          />
      </View>
    )
  }

  const viewProfileStudent = () => {
    console.log("Nguyễn Trường Phi");
  };

  const [dataArchieve, setDataArchieve] = useState([
    {
      id: "1",
      image: "https://i.imgur.com/N3nQ9CS.jpg",
      title: "màu 1",
    },
    {
      id: "2",
      image: "https://i.imgur.com/AzdYlDM.jpg",
      title: "màu 2",
    },
  ]);

  function renderItem({ item, index }) {
    const { image, title } = item;
    return (
      <Pressable activeOpacity={1} style={styles.item}>
        <Image source={{ uri: image }} style={styles.image} />
        <View style={styles.lowerContainer}>
          <Text style={styles.titleText} numberOfLines={2}>
            {title}
          </Text>
        </View>
      </Pressable>
    );
  }
  const translateX = useRef(new Animated.Value(0)).current
  const [page,setPage] = useState(1)

  const onGesture = (event) => {
    if(event.nativeEvent.translationX < 0){
      if (page === 1){
        translateX.setValue(event.nativeEvent.translationX)
      } else if (page === 2) {
        translateX.setValue(event.nativeEvent.translationX - FULL_WIDTH)
      }
    } else if (event.nativeEvent.translationX > 0) {
      if (page === 2){
        translateX.setValue(event.nativeEvent.translationX - FULL_WIDTH)
      } else if (page === 3) {
        translateX.setValue(event.nativeEvent.translationX - 2*FULL_WIDTH)
      }
    }
  }

  const onGestureEnd = (event) => {
    if(event.nativeEvent.translationX < (-FULL_WIDTH / 3) && event.nativeEvent.translationX < 0){   
        if (page === 1) {
          Animated.timing(translateX,{
            toValue : -FULL_WIDTH,
            duration : 400,
            useNativeDriver : false
          }).start()
          setPage(2)
          tabPage.setValue(2)
        } else if (page === 2) {
          Animated.timing(translateX,{
            toValue : -2*FULL_WIDTH,
            duration : 400,
            useNativeDriver : false
          }).start()
          setPage(3)
          tabPage.setValue(3)
        }   
    } else if(event.nativeEvent.translationX > (FULL_WIDTH / 3) && event.nativeEvent.translationX > 0) {
        if (page === 2) {
          Animated.timing(translateX,{
            toValue : 0,
            duration : 400,
            useNativeDriver : false
          }).start()
          setPage(1)
          tabPage.setValue(1)
        } else if (page === 3) {
          Animated.timing(translateX,{
            toValue : -FULL_WIDTH,
            duration : 400,
            useNativeDriver : false
          }).start()
          setPage(2)
          tabPage.setValue(2)
        }
    } else {
      if (page === 1) {
        Animated.timing(translateX,{
          toValue : 0,
          duration : 400,
          useNativeDriver : false
        }).start()
      } else if (page === 2) {
        Animated.timing(translateX,{
          toValue : -FULL_WIDTH,
          duration : 400,
          useNativeDriver : false
        }).start()
      } else if (page === 3) {
        Animated.timing(translateX,{
          toValue : -2*FULL_WIDTH,
          duration : 400,
          useNativeDriver : false
        }).start()
      }
    } 
  }

  const tabTranslate = translateX.interpolate({
    inputRange: [0, FULL_WIDTH],
    outputRange: [1, -80],
  }) 

  const tabPage = useRef(new Animated.Value(page)).current

  const tabWidth = tabPage.interpolate({
    inputRange: [1 , 2 , 3],
    outputRange: [80, 80, 140],
  }) 

  return (
    <SafeAreaView style={{ flex : 1, backgroundColor : PRIMARY_COLOR_WHITE }}>
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
          <Text style={{ fontSize : 20, color : PRIMARY_COLOR_WHITE, alignSelf : 'center'}}>Thông tin khoảng vay</Text>   
        </View>
      </View>
      <View style={{ 
          height : 50,
          width : FULL_WIDTH, 
          backgroundColor : PRIMARY_COLOR_WHITE,
          marginTop : 5,
          flexDirection : 'row',
          alignItems : 'center',
          justifyContent : 'center',
          elevation: 2,
        }}>
          <TouchableOpacity 
            onPress={() => {
                translateX.setValue(0)
                setPage(1)
                tabPage.setValue(1)
            }} 
            style={{ padding : 5, justifyContent : 'center' }}>
            <Animated.View style={[{ 
              backgroundColor : SECONDARY_COLOR, 
              borderRadius : 20, 
              zIndex : 100, 
              height : 40,
              width : tabWidth,
              position : 'absolute',
              transform : [
                {
                  translateX : tabTranslate
                }
              ]
            }]}/>
            <Text style={{ fontSize : 16, marginHorizontal : 10, color : PRIMARY_COLOR_BLACK, zIndex : 150, fontWeight : page === 1 ? 'bold' : '100'}}>Bài viết</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            onPress={() => {
              translateX.setValue(-FULL_WIDTH)
              setPage(2)
              tabPage.setValue(2)
            }} 
            style={{ padding : 5 }}>
            <Text style={{ fontSize : 16, marginHorizontal : 10, color : PRIMARY_COLOR_BLACK, zIndex : 150, fontWeight : page === 2 ? 'bold' : '100' }}>Chi tiết</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            onPress={() => {
              translateX.setValue(-2*FULL_WIDTH)
              setPage(3)
              tabPage.setValue(3)
            }} 
            style={{ padding : 5 }}>
            <Text style={{ fontSize : 16, marginHorizontal : 10, zIndex : 150, fontWeight : page === 3 ? 'bold' : '100' }}>Thông tin thêm</Text>
          </TouchableOpacity>    
      </View>
            {
              post !== null 
              ?  
              (
                <View style={{ flexDirection : 'row' }}>
                  <PanGestureHandler onGestureEvent={onGesture} onEnded={onGestureEnd}>
                    <Animated.View style={{height : FULL_HEIGHT * 2.2 / 3, width : FULL_WIDTH,transform : [{ translateX : translateX }]}}>
                        <ScrollView
                          contentContainerStyle={{
                            paddingBottom : 20,
                          }}
                          showsVerticalScrollIndicator={false}
                        >
                          <View
                            style={{
                              marginTop: 5,
                              flexDirection: "row",
                            }}
                          >
                            <Avatar
                              rounded
                              containerStyle={{
                                margin: 10,
                              }}
                              size="large"
                              source={{
                                uri: post.loan.Student.User.profileUrl ? post.loan.Student.User.profileUrl : 'https://images.unsplash.com/photo-1511367461989-f85a21fda167?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NXx8cHJvZmlsZXxlbnwwfHwwfHw%3D&w=1000&q=80'
                              }}
                            />
          
                            <View style={{ flex : 1 }}>
                              <Text
                                style={{
                                  marginTop: 20,
                                  fontSize: 16,
                                  color: "#6A6A6A",
                                }}
                              >
                                Tạo bởi
                              </Text>
          
                              {/* name student */}
                              <Text
                                style={{
                                  fontSize: 20,
                                  fontWeight: "bold",
                                }}
                              >
                                {post.loan.Student.User.lastname + ' ' + post.loan.Student.User.firstname}
                              </Text>
                            </View>
                          </View>
                          <Text
                            style={{
                              marginHorizontal: 10,
                              marginTop: 5,
                              fontSize: 18,
                              color: PRIMARY_COLOR_BLACK,
                            }}
                          >
                            {post.loan.title}
                          </Text>
          
                          <View
                            style={{
                              marginTop: 20,
                              marginHorizontal: 10,
                              marginBottom : 10,
                              flexDirection: "row",
                              flexWrap: "wrap",
                            }}
                          >
                            <View
                              style={{
                                flexDirection: "row",
                                alignItems : 'center'
                              }}
                            >
                              <Icon
                                onPress={viewProfileStudent}
                                containerStyle={{
                                  opacity : 0.6
                                }}
                                name="hashtag"
                                type="font-awesome-5"
                                color={PRIMARY_COLOR_BLACK}
                                size={14}
                              />
                              <Text
                                style={{
                                  marginStart: 5,
                                  fontSize: 14,
                                  opacity : 0.6
                                }}
                              >
                                {post.loan.Student.Information.SchoolMajor.Major.name}
                              </Text>
                            </View>
          
                            <View
                              style={{
                                flexDirection: "row",
                                alignItems : 'center',
                              }}
                            >
                              <Icon
                                onPress={viewProfileStudent}
                                containerStyle={{
                                  marginStart: 20,
                                  opacity : 0.6
                                }}
                                name="map-marker-alt"
                                type="font-awesome-5"
                                color={PRIMARY_COLOR_BLACK}
                                size={14}
                              />
                              <Text
                                style={{
                                  marginStart: 5,
                                  fontSize: 14,
                                  opacity : 0.6
                                }}
                              >
                                {post.loan.Student.Information.SchoolMajor.School.name}
                              </Text>
                            </View>
                          </View>
                          <View style={styles.line}/>
                          <View style={{ padding : 15, flexDirection : 'row'}}>
                                <View>
                                  <Text style={{  fontSize : 16  }}>{post.loan.AccumulatedMoney === null ? vndFormat.format(post.loan.totalMoney) : vndFormat.format(post.loan.totalMoney - post.loan.AccumulatedMoney)}</Text>
                                  <Text style={{ opacity : 0.5,fontSize : 14 }}>Khoảng tiền có thể đầu tư</Text>           
                                </View>
                                <View style={{  alignItems : 'flex-end', flex : 1, fontSize : 13 }}>
                                  <Text style={{  fontSize : 16  }}>{vndFormat.format(post.loan.totalMoney)}</Text>
                                  <Text style={{ opacity : 0.5,fontSize : 14 }}>Tổng tiền</Text>  
                                </View>
                            </View>
                            <Progress.Bar progress={post.loan.AccumulatedMoney === null ? 0 : post.loan.AccumulatedMoney / post.loan.totalMoney} width={FULL_WIDTH / 1.2} style={{ alignSelf : 'center', margin : 5, marginBottom : 5 }} color={PRIMARY_COLOR} />         
                            <View style={{ padding : 15, flexDirection : 'row' }}>
                              <View>
                                  <Text style={{ marginBottom : 5,fontSize : 16 }}>Người ủng hộ</Text>
                                  {
                                    post?.loan.Status === 'FUNDING' && (
                                      <Text style={{ fontSize : 16 }}>Hết hạn trong</Text>
                                    )
                                  }           
                              </View>
                              <View style={{ flex : 1 , alignItems : 'flex-end' }}>
                                  <Text style={{ marginBottom : 5,fontSize : 16 }}>{post.loan.InvestorCount}</Text>
                                  {
                                    post?.loan.Status === 'FUNDING' && (
                                      <Text style={{ fontSize : 16 }}>trong {moment(post.loan.postExpireAt).diff(new Date(),"days")} ngày</Text>
                                    )
                                  }               
                              </View>
                            </View> 
                            <View style={styles.line}/>
                            <View style={{ marginHorizontal : 20 }}>
                                  {ITEMS.map((item, i) => (
                                      <ListItem
                                          onPress={() => navigation.navigate(item.route, {
                                            loanId : post.loan.id
                                          })}     
                                  
                                          bottomDivider
                                          key={i}            
                                      >
                                          <ListItem.Content>
                                              <ListItem.Title style={{ 
                                                  color:'black',
                                                  fontSize : 16
                                              }}>
                                                  {item.label}
                                              </ListItem.Title>
                                          </ListItem.Content>
                                          <ListItem.Chevron 
                                              size={20} 
                                              color="black"
                                              style={{ marginRight : 20 }}
                                          />
                                      </ListItem>
                                  ))}
                              </View>
               
                          <View
                            style={{
                              flexDirection: "row",
                              flexWrap: "wrap",
                              justifyContent: "center",
                              marginBottom: 20,
                              marginTop : 20
                            }}
                          >     
                            {/* expired date */}
                            
                            <View
                              style={{
                                alignItems: "center",
                              }}
                            > 
                              <Text style={{ fontSize : 16 }}>Bài gọi vốn hết hạn vào ngày</Text>
                              <Text
                                style={{
                                  fontSize: 17,
                                  fontWeight: "bold",
                                }}
                              >
                                {moment(post.loan.postExpireAt).format('DD-MM-YYYY')}
                              </Text>
                            
                            </View>
                          </View>
                        </ScrollView>
                    </Animated.View>               
                  </PanGestureHandler>
                  <PanGestureHandler onGestureEvent={onGesture} onEnded={onGestureEnd}>
                    <Animated.View style={{ backgroundColor : '#dadee3',height : FULL_HEIGHT * 2.2 / 3, width : FULL_WIDTH,transform : [{ translateX : translateX }]}}>
                      <ScrollView 
                        showsVerticalScrollIndicator={false}
                        contentContainerStyle={{ paddingBottom : 20 }}
                      >
                        <View
                          style={{
                            backgroundColor: PRIMARY_COLOR_WHITE,
                          }}
                        >
                          <View
                            style={{
                              flexDirection: "row",
                              marginHorizontal: 20,
                              marginTop: 20,
                              alignItems : 'center'
                            }}
                          >
                            <Icon
                              name="question-circle"
                              type="font-awesome-5"
                              color={SECONDARY_COLOR}
                              size={20}
                            />
                            <Text
                              style={{
                                marginTop: "auto",
                                marginStart: 10,
                                fontSize: 17,
                                fontWeight : 'bold',
                                color : SECONDARY_COLOR
                              }}
                            >
                              Tại sao lại có bài viết này ?
                            </Text>
                          </View>
        
                          <Text
                            style={{
                              flexWrap: "wrap",
                              marginTop: 20,
                              fontSize: 16,
                              marginHorizontal: 20,
                              marginBottom: 20,
                            }}
                          >
                            {post.loan.description}
                          </Text>
                        </View>
                        <View
                          style={{
                            marginTop: 5,
                            backgroundColor: PRIMARY_COLOR_WHITE,
                          }}
                        >
                          <View
                            style={{
                              flexDirection: "row",
                              marginHorizontal: 20,
                              marginTop: 20,
                              alignItems : 'center'
                            }}
                          >
                            <Icon
                              name="comment-dollar"
                              type="font-awesome-5"
                              color={SECONDARY_COLOR}
                              size={20}
                            />
                            <Text
                              style={{
                                marginTop: "auto",
                                marginStart: 10,
                                fontSize: 17,
                                fontWeight : 'bold',
                                color : SECONDARY_COLOR
                              }}
                            >
                              Những gì nhà đầu tư nhận được
                            </Text>
                          </View>
        
                          <View
                            style={{
                          
                            }}
                          > 
                            <View style={{ flexDirection : 'row', alignItems : 'center', marginTop : 15, justifyContent : "space-between", paddingHorizontal : 20 }}> 
                              <Text
                                style={{
                                  fontSize: 15,                 
                                }}
                              >
                                Tiền trả lúc còn học :
                              </Text>
          
                              <Text
                                style={{
                                  fontSize: 16,
                                  fontWeight: "bold",
                                  color: PRIMARY_COLOR,
                                }}
                              >
                                {vndFormat.format(post.loan.fixedMoney)} / tháng
                              </Text>
                            </View>
                            <View style={{ flexDirection : 'row', alignItems : 'center', marginTop : 15, justifyContent : "space-between", paddingHorizontal : 20 }}>
                              <Text
                                style={{
                                  color: PRIMARY_COLOR_BLACK,
                                  fontSize: 15,
                                }}
                              >
                                Lãi suất
                              </Text>
                              <Text
                                style={{
                                  fontSize: 16,
                                  fontWeight: "bold",
                                  color: PRIMARY_COLOR,
                                }}
                              >
                                {post.loan.interest * 100}% / tháng
                              </Text>
                            </View>
                            <View style={{ flexDirection : 'row', alignItems : 'center', marginTop : 15, justifyContent : "space-between", paddingHorizontal : 20 }}>
                              <Text
                                style={{
                                  fontSize: 15,
                                }}
                              >
                                Thời gian tốt nghiệp :
                              </Text>
                              <Text
                                style={{
                                  fontSize: 16,
                                  fontWeight: "bold",
                                  color: PRIMARY_COLOR,
                                }}
                              >
                                { post.loan.expectedGraduationTime } tháng
                              </Text>
                            </View>
                            <View style={{ flexDirection : 'row', alignItems : 'center', marginTop : 15, justifyContent : "space-between", paddingHorizontal : 20 }}>
                              <Text
                                style={{
                                  fontSize: 15,
                                  color : PRIMARY_COLOR_BLACK
                                }}
                              >
                                Thời hạn :
                              </Text>
                              <Text
                                style={{
                                  fontSize: 16,
                                  fontWeight: "bold",
                                  color: PRIMARY_COLOR,
                                }}
                              >
                                {post.loan.duration} tháng
                              </Text>
                            </View>
                            <View style={{ flexDirection : 'row', alignItems : 'center', marginVertical : 15, justifyContent : "space-between", paddingHorizontal : 20 }}>
                              <Text
                                style={{
                                  fontSize: 15,
                                  color : PRIMARY_COLOR_BLACK
                                }}
                              >
                                Lãi phạt :
                              </Text>
                              <Text
                                style={{
                                  fontSize: 16,
                                  fontWeight: "bold",
                                  color: PRIMARY_COLOR,
                                }}
                              >
                                { post.loan.penaltyFee * 100 }%
                              </Text>
                            </View>
                          </View>
                        </View>
                      </ScrollView>
                    </Animated.View>
                  </PanGestureHandler>
                  <PanGestureHandler onGestureEvent={onGesture} onEnded={onGestureEnd}>
                    <Animated.View style={{backgroundColor : '#dadee3',height : FULL_HEIGHT * 2.2 / 3, width : FULL_WIDTH, transform : [{ translateX : translateX }]}}>
                      <ScrollView
                        contentContainerStyle={{
                          backgroundColor :PRIMARY_COLOR_WHITE,
                          paddingBottom: 20 ,
                        }}
                      >               
                        {
                          post.loan.LoanMedia.map((item,index) => {
                            if (item.type === 'VIDEO') {
                              return (
                                <Video
                                style={styles.video}
                                source={{
                                  uri: 'http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4',
                                }}
                                useNativeControls
                                resizeMode="contain"
                                />
                              )
                            }
                          }) 
                        }
                        
                        <View
                          style={{
                            flexDirection: "row",
                            marginHorizontal: 20,
                          }}
                        >
                          <Icon
                            name="archive"
                            type="feather"
                            color={SECONDARY_COLOR}
                            size={20}
                          />
                          <Text
                            style={{
                              marginStart: 10,
                              fontSize: 16,
                              color : SECONDARY_COLOR,
                              fontWeight : 'bold'
                            }}
                          >
                            Thành tích cá nhân
                          </Text>
                        </View>   
                        {
                          post.loan.Student.Archievements.map((item,index) => (
                            <View key={index} style={{ marginVertical : 10 }}>
                              <Image 
                                source={{ uri : item.imageUrl }}
                                style={{
                                  width : FULL_WIDTH,
                                  height : FULL_HEIGHT / 3
                                }}
                              />
                              <Text style={{
                                padding : 10
                              }}>{item.description}</Text>
                            </View>
                          ))
                        }  
                      </ScrollView>
                    </Animated.View>
                  </PanGestureHandler>
                </View>
              )
              :
              (
                (
                  <ActivityIndicator size="large" color={PRIMARY_COLOR}/>
                )
              )
            }
      
          
      <Animated.View
        style={[styles.btnContainer, { transform : [{ translateY : bottomTranslate }]}]}
      >  
        {
          isLoading
          ?
          (
            <ActivityIndicator size="large" color={PRIMARY_COLOR}/>
          )
          : 
          (
            isInvest
            ?
            (        
              <Button
              style={[styles.btnInvest,{opacity}]}
              color={PRIMARY_COLOR}
              onPress={() => navigation.navigate("InvestmentDetail", {
                investmentId,
                availableInvest : post.loan.totalMoney - post.loan.AccumulatedMoney
              })}
                >Quản lý</Button> 
            )
            :
            (
              <Button
              style={[styles.btnInvest,{opacity}]}
              color={PRIMARY_COLOR}
              onPress={() => {
                if (user.status === 'VERIFIED') {
                  navigation.navigate("BackSelection", {
                    id,
                    availableInvest : post.loan.totalMoney - post.loan.AccumulatedMoney,
                    total : post.loan.totalMoney
                  })
                } else {
                  Alert.alert(
                    "Thất bại",
                    `Bạn phải xác thực tài khoản để có thể đầu tư.`,
                    [
                        { text: "OK" }
                    ]
                  );
                }      
              }}
                >Đầu tư</Button> 
            ) 
          ) 
        }
    
      </Animated.View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    alignItems: "flex-start",
    borderRadius: 8,
    borderTopWidth: 20,
    borderBottomWidth: 20,
    borderColor: PRIMARY_COLOR_WHITE,
  },
  item: {
    backgroundColor: "white",
    borderRadius: 10,
    borderColor: "#EAECEE",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.18,
    shadowRadius: 1.0,
    elevation: 2,
    marginVertical : 15
  },
  image: {
    aspectRatio: 1,
    backgroundColor: "#EBEBEB",
    borderTopRightRadius : 10, 
    borderTopLeftRadius : 10
  },
  lowerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 12,
  },
  titleText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "black",
    marginTop: 4,
  },
  btnInvest : {
    width : FULL_WIDTH / 1.4,
    borderRadius : 5,
    borderWidth : 1.2,
    alignSelf : 'center',
    borderColor : PRIMARY_COLOR,
  },
  btnContainer : {
    backgroundColor: "white",
    shadowOpacity: 0.1,
    shadowRadius: 2,
    padding: 10,
    position: "absolute",
    bottom: 0,
    left: 0,
    right : 0,
    elevation : 10,
    height : FULL_HEIGHT / 10,
    justifyContent : 'center'
  },
  line : { 
    borderBottomWidth : 0.95, 
    borderBottomColor : '#dadee3',
    width : FULL_WIDTH / 1.12, 
    alignSelf : 'center' ,
    marginTop : 10
  },
  topContainer : {
    height : FULL_HEIGHT * 0.3 / 4,
    backgroundColor : PRIMARY_COLOR,
    borderBottomLeftRadius : 25,
    borderBottomRightRadius : 25,
  },
  video: {
    alignSelf: 'center',
    width: 350,
    height: 250,
  },
});
