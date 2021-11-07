import React, { useState } from "react";
import {
  FlatList,
  Image,
  ImageBackground,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { Icon } from "react-native-elements";
import { TouchableOpacity } from "react-native-gesture-handler";
import NumberFormat from "react-number-format";
import {
  PRIMARY_COLOR,
  PRIMARY_COLOR_WHITE,
  PRIMARY_COLOR_BLACK,
} from "../constants/styles";

export default function Wallet({ route, navigation }) {
  //   const { id } = route.params;
  const [money, setMoney] = useState(1000000);
  const [upMoney, setUpMoney] = useState(150000);
  const [downMoney, setDownMoney] = useState(50000);

  const [listTrans, setlistTrans] = useState([
    {
      id: 1,
      shortcut: "TL",
      name: "Trần Long",
      type: "sent",
      money: "50000",
      time: "13 Mar 2020",
    },
    {
      id: 2,
      shortcut: "DPC",
      name: "Đinh Phú Cường",
      type: "recieve",
      money: "50000",
      time: "13 Mar 2020",
    },
    {
      id: 3,
      shortcut: "QT",
      name: "Quốc Thái",
      type: "recieve",
      money: "100000",
      time: "13 Mar 2020",
    },
  ]);

  const generateColor = () => {
    const randomColor = Math.floor(Math.random() * 16777215)
      .toString(16)
      .padStart(6, "0");
    return `#${randomColor}`;
  };

  const currencyFormat = (num) => {
    return "$" + num.toFixed(0).replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
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
                fontSize: 20,
              }}
            >
              {item.shortcut}
            </Text>
          </View>

          <View
            style={{
              marginBottom: "auto",
              marginTop: "auto",
              marginStart: 20,
            }}
          >
            <Text
              style={{
                fontSize: 20,
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

  return (
    <ScrollView
      style={{
        backgroundColor: PRIMARY_COLOR_WHITE,
      }}
    >
      <Text
        style={{
          fontSize: 18,
          marginTop: 20,
          marginEnd: "auto",
          marginStart: "auto",
          color: PRIMARY_COLOR_BLACK,
        }}
      >
        My balance:
      </Text>
      <Text
        style={{
          fontSize: 40,
          marginEnd: "auto",
          marginStart: "auto",
          marginBottom: 20,
          color: PRIMARY_COLOR_BLACK,
        }}
      >
        {currencyFormat(money)}
      </Text>

      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <View
          style={{
            marginStart: 40,
          }}
        >
          <TouchableOpacity style={styles.box}>
            <Icon
              name="plus"
              type="font-awesome-5"
              color={PRIMARY_COLOR}
              size={20}
            />
          </TouchableOpacity>
          <Text style={styles.textButton}>DEPOSIT</Text>
        </View>

        <View
          style={{
            marginStart: 40,
            marginEnd: 40,
          }}
        >
          <TouchableOpacity style={styles.box}>
            <Icon
              style={{
                elevation: 5,
              }}
              name="arrow-right"
              type="font-awesome-5"
              color={PRIMARY_COLOR}
              size={20}
            />
          </TouchableOpacity>
          <Text style={styles.textButton}>TRANSFER</Text>
        </View>

        <View
          style={{
            marginEnd: 40,
          }}
        >
          <TouchableOpacity style={styles.box}>
            <Icon
              style={{
                elevation: 5,
              }}
              name="arrow-down"
              type="font-awesome-5"
              color={PRIMARY_COLOR}
              size={20}
            />
          </TouchableOpacity>
          <Text style={styles.textButton}>WITHDRAW</Text>
        </View>
      </View>

      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          borderTopLeftRadius: 50,
          borderTopRightRadius: 50,
          marginTop: 30,
          padding: 30,
          backgroundColor: PRIMARY_COLOR,
        }}
      >
        <View
          style={{
            flexDirection: "row",
            borderRadius: 10,
            padding: 10,
            backgroundColor: PRIMARY_COLOR_WHITE,
          }}
        >
          <View>
            <Text style={styles.textIncome}>Income</Text>
            <Text style={styles.textMoneyInOut}>{upMoney}</Text>
          </View>
          <Icon
            containerStyle={{
              marginTop: 4,
              marginStart: 30,
            }}
            name="level-up-alt"
            type="font-awesome-5"
            color={"#00e600"}
            size={40}
          />
        </View>

        <View
          style={{
            flexDirection: "row",
            borderRadius: 10,
            padding: 10,
            backgroundColor: PRIMARY_COLOR_WHITE,
          }}
        >
          <View>
            <Text style={styles.textSpent}>Spent</Text>
            <Text style={styles.textMoneyInOut}>{downMoney}</Text>
          </View>
          <Icon
            containerStyle={{
              marginTop: 4,
              marginStart: 30,
            }}
            name="level-down-alt"
            type="font-awesome-5"
            color={"#e62e00"}
            size={40}
          />
        </View>
      </View>
      <View
        style={{
          backgroundColor: PRIMARY_COLOR_WHITE,
        }}
      >
        <View
          style={{
            flexDirection: "row",
            padding: 15,
          }}
        >
          <Text
            style={{
              fontSize: 20,
            }}
          >
            Transactions
          </Text>
          <View
            style={{
              flexDirection: "row-reverse",
              flex: 1,
            }}
          >
            <Text
              style={{
                fontSize: 20,
                color: "#00e6e6",
              }}
              onPress={() => navigation.navigate("History")}
            >
              See all
            </Text>
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
          keyExtractor={(item) => item.id}
        />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  textButton: {
    marginStart: "auto",
    marginEnd: "auto",
    marginTop: 3,
    color: PRIMARY_COLOR,
    fontStyle: "italic",
    fontSize: 12,
  },
  textMoneyInOut: {
    marginStart:10,
    color: PRIMARY_COLOR_BLACK,
    fontSize: 18,
  },
  textIncome: {
    color: "green",
    fontSize: 18,
    marginStart:10,
  },
  box: {
    marginStart: "auto",
    marginEnd: "auto",
    elevation: 5,
    height: 50,
    width: 50,
    borderRadius: 10,
    padding: 10,
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: PRIMARY_COLOR_WHITE,
  },
  iconWallet: {
    width: 50,
    height: 50,
  },
  textSpent: {
    marginStart:10,
    color: "red",
    fontSize: 18,
  },
});
