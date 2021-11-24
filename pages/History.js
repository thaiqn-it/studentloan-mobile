import React, { useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  FlatList,
} from "react-native";
import { Icon } from "react-native-elements/dist/icons/Icon";
import NumberFormat from "react-number-format";
import {
  PRIMARY_COLOR,
  PRIMARY_COLOR_WHITE,
  PRIMARY_COLOR_BLACK,
} from "../constants/styles";

export default function Home({ route, navigation }) {
  //   const { id } = route.params;
  const [isPress, setisPress] = useState(false)
  const [recMoney, setRecMoney] = useState();
  const [category, setcategory] = useState([
    {
      id: 1,
      name: "All",
    },
    {
      id: 2,
      name: "Recieve",
    },
    {
      id: 3,
      name: "Sent",
    },
  ]);
  const [listMonth, setlistMonth] = useState([
    {
      id: 122021,
      name: "Dec. 2021",
    },
    {
      id: 112021,
      name: "Nov. 2021",
    },
    {
      id: 102021,
      name: "Oct. 2021",
    },
  ]);
  const [listTrans, setlistTrans] = useState([
    {
      id: 1,
      shortcut: "TL",
      name: "Trần Long",
      type: "sent",
      money: "50000",
      time: "05 Dec 2021",
    },
    {
      id: 2,
      shortcut: "DPC",
      name: "Đinh Phú Cường",
      type: "recieve",
      money: "50000",
      time: "27 Nov 2021",
    },
    {
      id: 3,
      shortcut: "QT",
      name: "Quốc Thái",
      type: "recieve",
      money: "100000",
      time: "15 Oct 2021",
    },
  ]);

  const generateColor = () => {
    const randomColor = Math.floor(Math.random() * 16777215)
      .toString(16)
      .padStart(6, "0");
    return `#${randomColor}`;
  };

  const isSentMoney = (num, type) => {
    if (type == "sent") {
      return (
        <NumberFormat
          renderText={(text) => (
            <Text
              style={{
                marginBottom: "auto",
                marginTop: "auto",
                marginStart: "auto",
                marginEnd: 10,
                fontSize: 15,
              }}
            >
              -{text}
            </Text>
          )}
          value={num}
          displayType={"text"}
          thousandSeparator={true}
          prefix={"$"}
        />
      );
    } else {
      return (
        <NumberFormat
          renderText={(text) => (
            <Text
              style={{
                marginBottom: "auto",
                marginTop: "auto",
                marginStart: "auto",
                marginEnd: 10,
                fontSize: 15,
              }}
            >
              {text}
            </Text>
          )}
          value={num}
          displayType={"text"}
          thousandSeparator={true}
          prefix={"$"}
        />
      );
    }
  };

  function renderListTrans({ item }) {
    return (
      <View>
        <TouchableOpacity
          style={{
            flexDirection: "row",
            padding: 10,
          }}
          onPress={() => navigation.navigate("TransactionInfo")}
        >
          <View
            style={{
              backgroundColor: PRIMARY_COLOR_WHITE,
              height: 70,
              width: 70,
              justifyContent: "center",
              alignItems: "center",
              borderRadius: 80,
              elevation: 2,
            }}
          >
            <Text
              style={{
                color: generateColor(),
                fontWeight: "bold",
                fontSize: 17,
              }}
            >
              {item.shortcut}
            </Text>
          </View>

          <View
            style={{
              marginBottom: "auto",
              marginTop: "auto",
              marginStart: 17,
            }}
          >
            <Text
              style={{
                fontSize: 17,
                color: PRIMARY_COLOR_BLACK,
              }}
            >
              {item.name}
            </Text>
            <View
              style={{
                flexDirection: "row",
              }}
            >
              <Text
                style={{
                  marginTop: 10,
                  fontSize: 15,
                  color: item.type == "sent" ? "#ff3300" : PRIMARY_COLOR,
                }}
              >
                {item.type}
              </Text>
              <Text
                style={{
                  marginTop: 10,
                  marginStart: 5,
                  fontSize: 15,
                  color: PRIMARY_COLOR_BLACK,
                }}
              >
                at
              </Text>
              <Text
                style={{
                  marginTop: 10,
                  fontSize: 15,
                  marginStart: 5,
                  color: PRIMARY_COLOR_BLACK,
                }}
              >
                {item.time}
              </Text>
            </View>
          </View>
          {isSentMoney(item.money, item.type)}
        </TouchableOpacity>
        <View
          style={{
            marginTop: 5,
            marginBottom: 5,
            height: 1,
            borderRadius: 10,
            width: "90%",
            marginLeft: "auto",
            marginRight: "auto",
            backgroundColor: "#f2f2f2",
          }}
        />
      </View>
    );
  }

  function renderListMonth({ item }) {
    return (
      <View>
        <View
          style={{
            flexDirection: "row",
            backgroundColor: PRIMARY_COLOR,
          }}
        >
          <Text style={styles.textListMonth}>{item.name}</Text>
          <View
            style={{
              flexDirection: "row-reverse",
              flex: 1,
            }}
          >
            <View
              style={{
                padding: 5,
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                }}
              >
                <Icon
                  name="long-arrow-alt-up"
                  type="font-awesome-5"
                  color={"#00ff00"}
                  style={{
                    margin: 2,
                  }}
                  size={15}
                />
                <Text style={styles.textRecSpe}>Recieve: 150000</Text>
              </View>

              <View
                style={{
                  flexDirection: "row",
                }}
              >
                <Icon
                  name="long-arrow-alt-down"
                  type="font-awesome-5"
                  color={"red"}
                  style={{
                    margin: 2,
                  }}
                  size={15}
                />
                <Text style={styles.textRecSpe}>Spent: 50000</Text>
              </View>
            </View>
          </View>
        </View>
        <FlatList
          data={listTrans}
          contentContainerStyle={{
            borderRadius: 10,
            margin: 20,
            backgroundColor: PRIMARY_COLOR_WHITE,
            elevation: 4,
          }}
          renderItem={renderListTrans}
          keyExtractor={(item) => item.id.toString()}
        />
      </View>
    );
  }

  function renderListCategory({ item }) {
    return (
      <TouchableOpacity
        style={{
          borderRadius: 5,
          backgroundColor: PRIMARY_COLOR_WHITE,
          padding: 10,
          paddingHorizontal : 20,
          justifyContent: "center",
          margin: 5,
          elevation: 2,
        }}
      >
        <Text
          style={{
            fontSize: 15,
            color: PRIMARY_COLOR_BLACK
          }}
        >
          {item.name}
        </Text>
      </TouchableOpacity>
    );
  }
  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      style={{
        backgroundColor: PRIMARY_COLOR_WHITE,
      }}
    >
      <FlatList
        data={category}
        renderItem={renderListCategory}
        contentContainerStyle={{
          marginTop: 40,
        }}
        keyExtractor={(item) => item.id.toString()}
        horizontal
      />
      <FlatList
        data={listMonth}
        contentContainerStyle={{
          borderRadius: 10,
          backgroundColor: PRIMARY_COLOR_WHITE,
          elevation: 4,
          marginTop : 10
        }}
        renderItem={renderListMonth}
        keyExtractor={(item) => item.id.toString()}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  textListMonth: {
    fontSize: 18,
    fontWeight: "bold",
    color: PRIMARY_COLOR_WHITE,
    margin: 10,
  },
  textRecSpe: {
    fontSize: 15,
    marginHorizontal : 5,
    color: PRIMARY_COLOR_WHITE,
  },
});
