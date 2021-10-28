import React, { useState,useRef,useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  Animated,
  Image,
  Dimensions,
  Pressable,
  TouchableOpacity,
} from "react-native";
import {
  PRIMARY_COLOR,
  PRIMARY_COLOR_WHITE,
  PRIMARY_COLOR_BLACK,
  FULL_HEIGHT,
  FULL_WIDTH
} from "../constants/styles";
import { Avatar } from "react-native-elements";
import { Icon } from "react-native-elements/dist/icons/Icon";
import Carousel from 'react-native-snap-carousel';
import HeaderBar from '../components/HeaderBar';
import * as Progress from 'react-native-progress';
import { Button } from 'react-native-paper';

const { width: windowWidth } = Dimensions.get("window");
const SLIDER_WIDTH = Dimensions.get('window').width;
const ITEM_WIDTH = Math.round(SLIDER_WIDTH - 30 * 0.9);
const ITEM_HEIGHT = Math.round(ITEM_WIDTH * 3 / 4);

export default function DetailPost({ navigation,route }) {
  // const {id} = route.params;
  const scrollY = useRef(new Animated.Value(0)).current;
  const carouselRef = useRef(null);

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

  const StudentInformationBox = () => {
    return(
      <View
        style={{
          backgroundColor: PRIMARY_COLOR_WHITE,
          borderRadius: 10,
          margin : 15,
          elevation : 5,
          marginTop : FULL_HEIGHT / 8,
        }}
      >
        <View
          style={{
            marginTop: 15,
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
              uri: "https://images.unsplash.com/photo-1612896488082-7271dc0ed30c?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8YmVhdXRpZnVsJTIwZmFjZXxlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&w=1000&q=80",
            }}
          />

          <View>
            <Text
              style={{
                marginTop: 20,
                fontSize: 18,
                color: "#6A6A6A",
              }}
            >
              Created by
            </Text>

            {/* name student */}
            <Text
              style={{
                fontSize: 23,
                fontWeight: "bold",
              }}
            >
              Nguyễn Trường Phi
            </Text>
          </View>
        </View>

        <Text
          style={{
            marginStart: 10,
            marginTop: 10,
            fontSize: 18,
            color: "#6A6A6A",
          }}
        >
          The tuition fee for the 8th term
        </Text>
        <View
          style={{
            marginTop: 20,
            marginStart: 10,
            flexDirection: "row",
            flexWrap: "wrap",
          }}
        >
          <View
            style={{
              flexDirection: "row",
            }}
          >
            <Icon
              onPress={viewProfileStudent}
              containerStyle={{}}
              name="hashtag"
              type="font-awesome-5"
              color={PRIMARY_COLOR_BLACK}
              size={20}
            />
            <Text
              style={{
                marginStart: 5,
                fontSize: 15,
              }}
            >
              Software Engineering
            </Text>
          </View>

          <View
            style={{
              flexDirection: "row",
            }}
          >
            <Icon
              onPress={viewProfileStudent}
              containerStyle={{
                marginStart: 20,
              }}
              name="map-marker-alt"
              type="font-awesome-5"
              color={PRIMARY_COLOR_BLACK}
              size={20}
            />
            <Text
              style={{
                marginStart: 5,
                fontSize: 15,
              }}
            >
              FPT Univercity, HCM
            </Text>
          </View>
        </View>

        <View style={{ padding : 15, flexDirection : 'row'}}>
              <View>
                <Text style={{  fontSize : 15  }}>2.000.000đ</Text>
                <Text style={{ opacity : 0.5,fontSize : 14 }}>Available for investment</Text>           
              </View>
              <View style={{  alignItems : 'flex-end', flex : 1, fontSize : 13 }}>
                <Text style={{  fontSize : 15  }}>22.000.000đ</Text>
                <Text style={{ opacity : 0.5,fontSize : 14 }}>Full amount</Text>  
              </View>
          </View>
          <Progress.Bar progress={0.8} width={FULL_WIDTH / 1.2} style={{ alignSelf : 'center', margin : 5, marginBottom : 25 }} color={PRIMARY_COLOR} />         

        <View
          style={{
            flexDirection: "row",
            flexWrap: "wrap",
            justifyContent: "center",
            marginBottom: 20,
          }}
        >     
          {/* expired date */}
          <View
            style={{
              alignItems: "center",
            }}
          > 
            <Text>This loan will be expired in</Text>
            <Text
              style={{
                fontSize: 20,
                fontWeight: "bold",
              }}
            >
              October 31, 2021
            </Text>
           
          </View>
        </View>
      </View>
    )
  }

  const LoanInformationBox = () => {
    return (
      <View
      style={{
        marginTop: 10,
        borderRadius: 10,
        margin : 15,
        backgroundColor: PRIMARY_COLOR_WHITE,
        elevation : 5
      }}
    >
      <View
        style={{
          flexDirection: "row",
          marginStart: 25,
          marginTop: 20,
        }}
      >
        <Icon
          name="comment-dollar"
          type="font-awesome-5"
          color={PRIMARY_COLOR_BLACK}
          size={25}
        />
        <Text
          style={{
            marginTop: "auto",
            marginStart: 10,
            fontSize: 18,
          }}
        >
          What you get!
        </Text>
      </View>

      <View
        style={{
          alignItems: "center",
        }}
      >
        <Text
          style={{
            fontSize: 15,
            marginTop: 20,
          }}
        >
          While students are still studying:
        </Text>

        <Text
          style={{
            marginTop: 10,
            fontSize: 18,
            fontWeight: "bold",
            color: PRIMARY_COLOR,
          }}
        >
          100.000 VNĐ/ month
        </Text>

        <Text
          style={{
            fontSize: 15,
            marginTop: 18,
          }}
        >
          After students graduate
        </Text>
        <Text
          style={{
            fontSize: 15,
          }}
        >
          you will have interest rate:
        </Text>

        <View
          style={{
            flexDirection: "row",
          }}
        >
          <Text
            style={{
              fontSize: 18,
              fontWeight: "bold",
              color: PRIMARY_COLOR,
            }}
          >
            3%/ month
          </Text>
        </View>

        <Text
          style={{
            fontSize: 15,
            marginTop: 20,
          }}
        >
          This student is expected to graduate on:
        </Text>

        {/* ExpectedGraduationDay */}
        <Text
          style={{
            marginTop: 10,
            fontSize: 18,
            fontWeight: "bold",
            color: PRIMARY_COLOR,
          }}
        >
          December 31, 2025
        </Text>

        <Text
          style={{
            fontSize: 15,
            marginTop: 20,
          }}
        >
          This student undertakes to pay off
        </Text>
        <Text
          style={{
            fontSize: 15,
          }}
        >
          the following debt after:
        </Text>

        <Text
          style={{
            marginTop: 10,
            fontSize: 18,
            marginBottom: 40,
            fontWeight: "bold",
            color: PRIMARY_COLOR,
          }}
        >
          December 31, 2029
        </Text>
      </View>
    </View>
    )
  }

  const DescriptionBox = () => {
    return (
      
      <View
        style={{
          marginTop: 10,
          borderRadius: 10,
          margin : 15,
          backgroundColor: PRIMARY_COLOR_WHITE,
          elevation : 5
        }}
      >
        <View
          style={{
            flexDirection: "row",
            marginStart: 25,
            marginTop: 20,
          }}
        >
          <Icon
            name="question-circle"
            type="font-awesome-5"
            color={PRIMARY_COLOR_BLACK}
            size={25}
          />
          <Text
            style={{
              marginTop: "auto",
              marginStart: 10,
              fontSize: 18,
            }}
          >
            Why do I create this post?
          </Text>
        </View>

        <Text
          style={{
            flexWrap: "wrap",
            marginTop: 25,
            fontSize: 17,
            marginStart: 20,
            marginEnd: 20,
            marginBottom: 20,
          }}
        >
          I am a person who is positive about every aspect of life. There are
          many things I like to do, to see, and to experience. I like to read, I
          like to write; I like to think, I like to dream; I like to talk, I
          like to listen. I like to see the sunrise in the morning, I like to
          see the moonlight at night; I like to feel the music flowing on my
          face, I like to smell the wind coming from the ocean.
          {"\n"}
          {"\n"}I like to look at the clouds in the sky with a blank mind, I
          like to do thought experiment when I cannot sleep in the middle of the
          night. I like flowers in spring, rain in summer, leaves in autumn, and
          snow in winter. I like to sleep early, I like to get up late; I like
          to be alone, I like to be surrounded by people. I like country’s
          peace, I like metropolis’ noise; I like the beautiful west lake in
          Hangzhou, I like the flat cornfield in Champaign. I like delicious
          food and comfortable shoes; I like good books and romantic movies. I
          like the land and the nature, I like people. And, I like to laugh.
          {"\n"}
          {"\n"}I always wanted to be a great writer, like Victor Hugo who wrote
          "Les Miserable", or like Roman Roland who wrote "John Christopher".
          They have influenced millions of people through their books. I also
          wanted to be a great psychologist, like William James or Sigmund
          Freud, who could read people’s mind. Of course, I am nowhere close to
          these people, yet.
          {"\n"}
          {"\n"}I am just someone who does some teaching, some research, and
          some writing. But my dream is still alive.
        </Text>
      </View>

    )
  }

  const AchievementsBox = () => {
    return (
      <View
        style={{
          marginTop: 10,
          borderRadius: 10,
          margin : 15,
          backgroundColor: PRIMARY_COLOR_WHITE,
          elevation : 5
        }}
      >
        <View
          style={{
            flexDirection: "row",
            marginStart: 25,
            marginTop: 20,
          }}
        >
          <Icon
            name="star-half-alt"
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
            My achievements
          </Text>
        </View>    
        <View>
          <Carousel
            layout={'tinder'}
            ref={carouselRef}
            data={dataArchieve}
            renderItem={renderItem}
            sliderWidth={ITEM_WIDTH}
            itemWidth={ITEM_WIDTH - 30}
          />
        </View>
        
  
      </View>
    )
  }

  const DemandNoteBox = () => {
    return (   
      <View
        style={{
          marginTop: 10,
          borderRadius: 10,
          margin : 15,
          backgroundColor: PRIMARY_COLOR_WHITE,
          elevation : 5,
          marginBottom : FULL_HEIGHT / 14
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

  const ScrollBox = () => {
    return(
      <Animated.ScrollView
        onScroll={Animated.event(
          [{ nativeEvent : { contentOffset : { y : scrollY }}}],
          { useNativeDriver : true }
        )}
        style={{
          backgroundColor: '#F2F5FA',
        }}
      > 

      <StudentInformationBox />
      <LoanInformationBox />
      <DescriptionBox />
      <AchievementsBox />
      <DemandNoteBox />
    </Animated.ScrollView>
    )
  }

  const viewProfileStudent = () => {
    console.log("Nguyễn Trường Phi");
  };

  const [dataArchieve, setDataArchieve] = useState([
    {
      id: "item2",
      image: "https://i.imgur.com/N3nQ9CS.jpg",
      title: "màu 1",
    },
    {
      id: "item3",
      image: "https://i.imgur.com/AzdYlDM.jpg",
      title: "màu 2",
    },
    {
      id: "item1",
      image: "https://i.imgur.com/s7GgEa8.jpg",
      title: "màu 3",
    },
    {
      id: "item6",
      image: "https://i.imgur.com/1O1Kd6T.jpg",
      title: "màu 4",
    },
    {
      id: "item4",
      image: "https://i.imgur.com/eNuhvpN.jpg",
      title: "màu 5",
    },

    {
      id: "item5",
      image: "https://i.imgur.com/jEiBmma.jpg",
      title: "màu 6",
    },
  ]);

  async function clickViewButton() {
    console.log("Test button");
  }

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

  return (
    <View>
      <HeaderBar 
        scrollY={scrollY} 
        navigation={navigation} 
      />
      <ScrollBox />
      <Animated.View
        style={[styles.btnContainer, { transform : [{ translateY : bottomTranslate }]}]}
      >    
      <Button
        style={[styles.btnInvest,{opacity}]}
        color={PRIMARY_COLOR}
        onPress={() => navigation.navigate("BackSelection")}
          >Invest</Button> 
      </Animated.View>
    </View>
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
    elevation : 10
  }
});
