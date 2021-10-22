import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Image,
  Dimensions,
  Pressable,
  TouchableOpacity,
} from "react-native";
import {
  PRIMARY_COLOR,
  PRIMARY_COLOR_WHITE,
  PRIMARY_COLOR_BLACK,
} from "../constants/styles";
import { Avatar } from "react-native-elements";
import { Icon } from "react-native-elements/dist/icons/Icon";
import { LinearProgress } from "react-native-elements";
import Carousel from "react-native-anchor-carousel";

const { width: windowWidth } = Dimensions.get("window");
const ITEM_WIDTH = 0.7 * windowWidth;
const SEPARATOR_WIDTH = 10;
export default function DetailPost({ route, navigation }) {
  const {id} = route.params;

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
    
  }

  function renderItem({ item, index }) {
    const { image, title } = item;
    return (
      <Pressable activeOpacity={1} style={styles.item}>
        <Image source={{ uri: image }} style={styles.image} />
        <View style={styles.lowerContainer}>
          <View style={styles.lowerLeft}>
            <Text style={styles.titleText} numberOfLines={2}>
              {title}
            </Text>
          </View>
          <TouchableOpacity style={styles.button} onPress={clickViewButton}>
            <Text style={styles.buttonText}>View</Text>
          </TouchableOpacity>
        </View>
      </Pressable>
    );
  }

  return (
    <ScrollView
      style={{
        backgroundColor: PRIMARY_COLOR,
        flex: 1,
      }}
    >
      <View
        style={{
          backgroundColor: PRIMARY_COLOR_WHITE,
          borderRadius: 8,
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
                fontSize: 22,
                color: "#6A6A6A",
              }}
            >
              Created by
            </Text>

            {/* name student */}
            <Text
              style={{
                fontSize: 25,
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
            marginTop: 20,
            fontSize: 25,
            color: "#6A6A6A",
          }}
        >
          The tuition fee for the 8th term
        </Text>

        <View
          style={{
            marginStart: 10,
            flexDirection: "row",
          }}
        >
          <Text
            style={{
              fontWeight: "bold",
              fontSize: 20,
              marginTop: 20,
            }}
          >
            Read more about me
          </Text>
          <Icon
            onPress={viewProfileStudent}
            containerStyle={{
              marginTop: 25,
              marginStart: 10,
            }}
            name="arrow-right"
            type="font-awesome-5"
            color={PRIMARY_COLOR_BLACK}
            size={20}
          />
        </View>

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

        {/* processStatus */}
        <View
          style={{
            marginTop: 30,
            marginStart: 10,
            marginEnd: 10,
          }}
        >
          <LinearProgress
            variant="determinate"
            value={0.8}
            color={PRIMARY_COLOR}
          />
        </View>

        <View
          style={{
            flexDirection: "row",
            flexWrap: "wrap",
            marginTop: 30,
            justifyContent: "center",
            marginBottom: 30,
          }}
        >
          {/* money */}
          <View
            style={{
              alignItems: "center",
            }}
          >
            <Text
              style={{
                fontSize: 20,
                fontWeight: "bold",
              }}
            >
              18.550.000 VNĐ
            </Text>
            <Text>/ 25.000.000 VNĐ</Text>
          </View>

          {/* backers */}
          <View
            style={{
              alignItems: "center",
              marginStart: 10,
            }}
          >
            <Text
              style={{
                fontSize: 20,
                fontWeight: "bold",
              }}
            >
              4
            </Text>
            <Text>Backers</Text>
          </View>

          {/* expired date */}
          <View
            style={{
              alignItems: "center",
              marginStart: 10,
            }}
          >
            <Text
              style={{
                fontSize: 20,
                fontWeight: "bold",
              }}
            >
              October 31, 2021
            </Text>
            <Text>this article expires</Text>
          </View>
        </View>
      </View>

      <View
        style={{
          marginTop: 10,
          borderRadius: 8,
          backgroundColor: PRIMARY_COLOR_WHITE,
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
            size={30}
          />
          <Text
            style={{
              marginTop: "auto",
              marginStart: 10,
              fontSize: 20,
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
              fontSize: 25,
              fontWeight: "bold",
              color: PRIMARY_COLOR,
            }}
          >
            100.000 VNĐ/ month
          </Text>

          <Text
            style={{
              fontSize: 15,
              marginTop: 20,
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
                fontSize: 35,
                fontWeight: "bold",
                color: PRIMARY_COLOR,
              }}
            >
              3
            </Text>
            <Text
              style={{
                marginTop: 17,
                fontSize: 20,
                fontWeight: "bold",
                color: PRIMARY_COLOR,
              }}
            >
              %/month
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
              fontSize: 25,
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
              fontSize: 25,
              marginBottom: 40,
              fontWeight: "bold",
              color: PRIMARY_COLOR,
            }}
          >
            December 31, 2029
          </Text>
        </View>
      </View>

      <View
        style={{
          marginTop: 10,
          borderRadius: 8,
          backgroundColor: PRIMARY_COLOR_WHITE,
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
            size={30}
          />
          <Text
            style={{
              marginTop: "auto",
              marginStart: 10,
              fontSize: 20,
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

      <View
        style={{
          marginTop: 10,
          backgroundColor: PRIMARY_COLOR_WHITE,
          borderRadius: 8,
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
            size={30}
          />
          <Text
            style={{
              marginStart: 10,
              fontSize: 20,
            }}
          >
            My achievements
          </Text>
        </View>

        <View style={styles.container}>
          <Carousel
            keyExtractor={(item) => item?.id}
            style={styles.carousel}
            data={dataArchieve}
            renderItem={renderItem}
            itemWidth={ITEM_WIDTH}
            separatorWidth={SEPARATOR_WIDTH}
            inActiveScale={1}
            inActiveOpacity={1}
            containerWidth={windowWidth}
          />
        </View>
      </View>

      <View
        style={{
          marginTop: 10,
          backgroundColor: PRIMARY_COLOR_WHITE,
          borderRadius: 8,
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
            name="file-alt"
            type="font-awesome-5"
            color={PRIMARY_COLOR_BLACK}
            size={30}
          />
          <Text
            style={{
              marginStart: 10,
              fontSize: 20,
            }}
          >
            My demand notes
          </Text>
        </View>

        <View style={styles.container}>
          <Carousel
            keyExtractor={(item) => item?.id}
            style={styles.carousel}
            data={dataArchieve}
            renderItem={renderItem}
            itemWidth={ITEM_WIDTH}
            separatorWidth={SEPARATOR_WIDTH}
            inActiveScale={1}
            inActiveOpacity={1}
            containerWidth={windowWidth}
          />
        </View>
      </View>

      <View
        style={{
          borderTopLeftRadius: 8,
          borderTopRightRadius: 8,
          marginTop: 10,
          backgroundColor: PRIMARY_COLOR_WHITE,
        }}
      >

        <TouchableOpacity style={styles.buttonBack} onPress={() => navigation.navigate('BackSelection', id)}>
          <Text style={styles.buttonTextBack}>Back this post!</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    alignItems: "flex-start",
    height: "auto",
    borderRadius: 8,
    borderTopWidth: 20,
    borderBottomWidth: 20,
    borderColor: PRIMARY_COLOR_WHITE,
  },
  carousel: {
    paddingLeft:10,
    width: windowWidth,
    height: ITEM_WIDTH + 100,
    flexGrow: 0,
  },
  item: {
    backgroundColor: "white",
    height: "98%",
    borderRadius: 5,
    borderColor: "#EAECEE",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.18,
    shadowRadius: 1.0,
    elevation: 1,
  },
  image: {
    width: "100%",
    aspectRatio: 1,
    backgroundColor: "#EBEBEB",
  },
  lowerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 12,
  },
  lowerLeft: {
    width: "50%",
  },
  titleText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "black",
    marginTop: 4,
  },

  button: {
    width: "40%",
    flexDirection: "row",
    marginLeft: 10,
    borderWidth: StyleSheet.hairlineWidth,
    borderRadius: 4,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 10,
    paddingHorizontal: 5,
    borderColor: PRIMARY_COLOR,
  },
  buttonBack: {
    width: "50%",
    flexDirection: "row",
    marginLeft:"auto",
    marginRight:"auto",
    marginTop:20,
    marginBottom:20,
    borderWidth: StyleSheet.hairlineWidth,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 10,
    paddingHorizontal: 5,
    backgroundColor:PRIMARY_COLOR,
    borderColor: PRIMARY_COLOR,
  },
  buttonText: {
    fontWeight: "bold",
    fontSize: 16,
    color: PRIMARY_COLOR,
  },
  buttonTextBack: {
    fontWeight: "bold",
    fontSize: 24,
    color: PRIMARY_COLOR_WHITE,
  },
});
