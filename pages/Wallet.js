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
  FULL_WIDTH,
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

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      style={{
        backgroundColor: PRIMARY_COLOR_WHITE,
      }}
    >
      <View style={{ flexDirection : 'row', justifyContent : 'space-between', margin : 15, marginHorizontal : 20, flex : 1,alignItems : 'center', marginTop : 60 }}>
        <View>
          <Text
            style={{
              fontSize: 16,
              fontWeight : 'bold',
              color: PRIMARY_COLOR_BLACK,
            }}
          >
            Hello Thái, 
          </Text>
          <Text
            style={{
              fontSize: 15,
              opacity : 0.6,
              color: PRIMARY_COLOR_BLACK,
            }}
          >
            Your available balance : 
          </Text>
        </View>
        
        <Text
          style={{
            fontSize: 22,
            fontWeight : 'bold',
            color: PRIMARY_COLOR_BLACK,
          }}
        >
          {currencyFormat(money)}
        </Text>
      </View>
      <View
        style={{
          flexDirection: "row",
        }}
      >
        <View style={{ marginHorizontal : 20 }}>
          <TouchableOpacity style={styles.box} onPress={() => navigation.navigate("DepositMoney")}>
            <Icon
              name="plus"
              type="font-awesome-5"
              color={PRIMARY_COLOR}
              size={20}
            />
            <Text style={styles.textButton}>Deposit</Text>
          </TouchableOpacity>       
        </View>
        <View style={{ marginHorizontal : 20 }}>
          <TouchableOpacity style={styles.box}>
              <Icon
                name="arrow-down"
                type="font-awesome-5"
                color={PRIMARY_COLOR}
                size={20}
              />
            <Text style={styles.textButton}>Withdraw</Text>
          </TouchableOpacity>
          
        </View>
      </View>

      <View
        style={{
          borderTopLeftRadius: 30,
          borderTopRightRadius: 30,
          backgroundColor: PRIMARY_COLOR,
          marginTop: 20,
        }}
      > 
        <View style={{
           flexDirection: "row",
           justifyContent: "space-evenly",
           paddingVertical: 25,
         }}> 
          <View
            style={{
              flexDirection: "row",
              borderRadius: 10,
              padding: 10,
              backgroundColor: PRIMARY_COLOR_WHITE,
            }}
          >
            <View style={{ marginHorizontal : 10 }}>
              <Text style={styles.textIncome}>Income</Text>
              <Text style={styles.textMoneyInOut}>{upMoney}</Text>
            </View>
            <View style={{marginHorizontal : 10, borderWidth : 2 , height : 30, width : 30, borderRadius : 30, borderColor : PRIMARY_COLOR , alignSelf : 'center' }}>
              <Icon
                name="arrow-up-right"
                type="feather"
                color={PRIMARY_COLOR}
                size={25}
              />
            </View>      
          </View>

          <View
            style={{
              flexDirection: "row",
              borderRadius: 10,
              padding: 10,
              backgroundColor: PRIMARY_COLOR_WHITE,
            }}
          >
            <View style={{ marginHorizontal : 10 }}>
              <Text style={styles.textSpent}>Spent</Text>
              <Text style={styles.textMoneyInOut}>{downMoney}</Text>
            </View>
            <View style={{ marginHorizontal : 10,borderWidth : 2 , height : 30, width : 30, borderRadius : 30, borderColor : 'red' , alignSelf : 'center' }}>
              <Icon
                name="arrow-down-left"
                type="feather"
                color='red'
                size={25}
              />
            </View>
            </View>
        </View>
        <View
          style={{
            backgroundColor: PRIMARY_COLOR_WHITE,
            borderTopLeftRadius : 30,
            borderTopEndRadius : 30
          }}
        >
          <View
            style={{
              flexDirection: "row",
              paddingTop: 15,
              paddingHorizontal: 25,
            }}
          >
            <Text
              style={{
                fontSize: 17,
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
                  fontSize: 17,
                  fontWeight : 'bold',
                  opacity : 0.8,
                  color : PRIMARY_COLOR_BLACK
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
            keyExtractor={(item) => item.id.toString()}
          />
        </View>
      </View>
    
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  textButton: {
    margin : 10,
    color: PRIMARY_COLOR_BLACK,
    fontSize: 18,
  },
  textMoneyInOut: {
    color: PRIMARY_COLOR_BLACK,
    fontSize: 15,
    fontWeight : 'bold',
    opacity : 0.7
  },
  textIncome: {
    color: PRIMARY_COLOR,
    fontSize: 16,
  },
  box: {
    elevation: 5,
    height: 60,
    borderRadius: 10,
    padding: 10,
    alignItems : 'center',
    justifyContent : 'center',
    backgroundColor: PRIMARY_COLOR_WHITE,
    flexDirection : 'row',
    width : (FULL_WIDTH / 2) - 40
  },
  iconWallet: {
    width: 50,
    height: 50,
  },
  textSpent: {
    color: 'red',
    fontSize: 16,
  },
});
