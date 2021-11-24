import React, { useState, useEffect, useRef } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Icon } from "react-native-elements";
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

export default function Home({ route, navigation }) {
  const [uncompletedInfo, setuncompletedInfo] = useState([
    {
      id: 1,
      name: "Verify Email",
    },
    {
      id: 2,
      name: "Missing Address",
    },
    {
      id: 3,
      name: "Missing Job",
    },
  ]);
  const [button, setbutton] = useState([
    {
      id: 1,
      name: "Calendar",
      link: "",
    },
    {
      id: 2,
      name: "Button 2",
      link: "",
    },
    {
      id: 3,
      name: "Button 3",
      link: "",
    },
    {
      id: 4,
      name: "Button 4",
      link: "",
    },
    {
      id: 5,
      name: "Button 5",
      link: "",
    },
    {
      id: 6,
      name: "Button 6",
      link: "",
    },
    {
      id: 7,
      name: "Button 7",
      link: "",
    },
    {
      id: 8,
      name: "Button 8",
      link: "",
    },
  ]);
  const [money, setmoney] = useState(1500000);
  function renderUncompleteInfo({ item }) {
    return (
      <TouchableOpacity
        style={{
          flexDirection: "row",
          justifyContent: "center",
          height: FULL_HEIGHT / 17,
          borderRadius: 10,
          borderColor: "#fdecea",
          backgroundColor: "#fdecea",
          borderWidth: 1,
          margin: 2,
          padding: 10,
        }}
      >
        <Icon name="alert-circle-outline" type="ionicon" color="#f55448" />
        <Text style={styles.textMissingInfo}>{item.name}</Text>
      </TouchableOpacity>
    );
  }
  const currencyFormat = (num) => {
    return "$" + num.toFixed(0).replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
  };
  function renderButton({ item }) {
    return (
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate(item.link)}
      >
        <Text style={styles.textButton}>{item.name}</Text>
      </TouchableOpacity>
    );
  }
  function checkIsCompleteInfo(item) {
    const lengthCheck = item.length;
    if (lengthCheck > 0) {
      return (
        <View style={styles.section}>
          <Text
            style={{
              fontSize: 17,
              marginBottom: 20,
              marginStart: 10,
              fontWeight: "bold",
              color: PRIMARY_COLOR_BLACK,
            }}
          >
            There are something you have to complete!
          </Text>
          <FlatList
            data={uncompletedInfo}
            horizontal
            renderItem={renderUncompleteInfo}
            keyExtractor={(item) => item.id.toString()}
          />
          <View style={styles.buttonInvest1}>
            <Text style={styles.textInvest1}>INVEST</Text>
          </View>
        </View>
      );
    } else {
      return (
        <View style={styles.section}>
          <Text
            style={{
              fontSize: 17,
              marginBottom: 20,
              marginStart: 10,
              fontWeight: "bold",
              color: PRIMARY_COLOR_BLACK,
            }}
          >
            Start your bussiness!
          </Text>
          <TouchableOpacity
            style={styles.buttonInvest}
            onPress={() => navigation.navigate("Invest")}
          >
            <Text style={styles.textInvest}>INVEST</Text>
          </TouchableOpacity>
        </View>
      );
    }
  }
  return (
    <View
      style={{
        padding: 10,
      }}
    >
      <ScrollView>
        <Text style={styles.headerText}>Welcome back,</Text>
        <Text style={styles.headerText}>Nguyễn Trường Phi</Text>
        <View style={styles.horizontalLine} />
        {checkIsCompleteInfo(uncompletedInfo)}

        <View style={styles.section}>
          <Text
            style={{
              fontSize: 17,
              marginBottom: 20,
              marginStart: 10,
              fontWeight: "bold",
              color: PRIMARY_COLOR_BLACK,
            }}
          >
            The balance
          </Text>
          <Text
            style={{
              marginStart: "auto",
              marginEnd: "auto",
              fontSize: 30,
              color: PRIMARY_COLOR_BLACK,
            }}
          >
            {currencyFormat(money)}
          </Text>
          <TouchableOpacity
            style={styles.buttonInvest}
            onPress={() => navigation.navigate("Wallet")}
          >
            <Text style={styles.textInvest}>DEPOSIT</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.section}>
          <Text
            style={{
              fontSize: 17,
              marginBottom: 20,
              marginStart: 10,
              fontWeight: "bold",
              color: PRIMARY_COLOR_BLACK,
            }}
          >
            Month summary
          </Text>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <View
              style={{
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Text
                style={{
                  marginBottom: 5,
                  fontSize: 17,
                  color: PRIMARY_COLOR,
                }}
              >
                Earn
              </Text>
              <View
                style={{
                  borderRadius: 100,
                  borderWidth: 1,
                  height: 80,
                  width: 80,
                  justifyContent: "center",
                  alignItems: "center",
                  borderColor: PRIMARY_COLOR,
                }}
              >
                <Text
                  style={{
                    fontSize: 15,
                    color: PRIMARY_COLOR,
                    fontWeight: "bold",
                  }}
                >
                  {currencyFormat(500)}
                </Text>
              </View>
              <Text
                style={{
                  marginTop: 5,
                  fontSize: 17,
                  color: PRIMARY_COLOR,
                }}
              >
                Money
              </Text>
            </View>
            {/* end section 1 */}
            <View
              style={{
                justifyContent: "center",
                alignItems: "center",
                marginStart: 20,
              }}
            >
              <Text
                style={{
                  fontSize: 17,
                  marginBottom: 5,
                  color: PRIMARY_COLOR,
                }}
              >
                Successfully Backed
              </Text>
              <View
                style={{
                  borderRadius: 100,
                  borderWidth: 1,
                  height: 80,
                  width: 80,
                  justifyContent: "center",
                  alignItems: "center",
                  borderColor: PRIMARY_COLOR,
                }}
              >
                <Text
                  style={{
                    fontSize: 17,
                    color: PRIMARY_COLOR,
                    fontWeight: "bold",
                  }}
                >
                  {3}
                </Text>
              </View>
              <Text
                style={{
                  marginTop: 5,
                  fontSize: 17,
                  color: PRIMARY_COLOR,
                }}
              >
                Students
              </Text>
            </View>
            {/* end section 2 */}
            <View
              style={{
                justifyContent: "center",
                alignItems: "center",
                marginStart: 20,
              }}
            >
              <Text
                style={{
                  fontSize: 17,
                  marginBottom: 5,
                  color: PRIMARY_COLOR,
                }}
              >
                Investing
              </Text>
              <View
                style={{
                  borderRadius: 100,
                  borderWidth: 1,
                  height: 80,
                  width: 80,
                  justifyContent: "center",
                  alignItems: "center",
                  borderColor: PRIMARY_COLOR,
                }}
              >
                <Text
                  style={{
                    fontSize: 17,
                    color: PRIMARY_COLOR,
                    fontWeight: "bold",
                  }}
                >
                  {2}
                </Text>
              </View>
              <Text
                style={{
                  marginTop: 5,
                  fontSize: 17,
                  color: PRIMARY_COLOR,
                }}
              >
                Students
              </Text>
            </View>
            {/* end section 3 */}
          </View>
        </View>
        <View style={styles.horizontalLine} />

        <FlatList
          data={button}
          renderItem={renderButton}
          contentContainerStyle={{
            marginStart: "auto",
            marginEnd: "auto",
          }}
          numColumns={2}
          keyExtractor={(item) => item.id.toString()}
        />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  headerText: {
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 10,
    marginStart: "auto",
    marginEnd: "auto",
  },
  horizontalLine: {
    borderBottomColor: "#CFCFCF",
    margin: 15,
    width: "85%",
    marginStart: "auto",
    marginEnd: "auto",
    borderBottomWidth: 1,
  },
  section: {
    borderBottomColor: "#CFCFCF",
    backgroundColor: PRIMARY_COLOR_WHITE,
    borderBottomWidth: 1,
    marginTop: 15,
    elevation: 2,
    borderRadius: 10,
    padding: 10,
  },
  textMissingInfo: {
    fontSize: 17,
    marginStart: 5,
    color: "#964534",
  },
  buttonInvest: {
    borderRadius: 10,
    borderWidth: 1,
    width: 150,
    height: 50,
    borderColor: PRIMARY_COLOR,
    backgroundColor: PRIMARY_COLOR_WHITE,
    justifyContent: "center",
    alignItems: "center",
    marginStart: "auto",
    marginEnd: "auto",
    marginBottom: 10,
    marginTop: 20,
  },
  textInvest: {
    color: PRIMARY_COLOR,
    fontWeight: "900",
    fontSize: 15,
  },
  button: {
    borderRadius: 10,
    width: 150,
    height: 50,
    backgroundColor: PRIMARY_COLOR,
    justifyContent: "center",
    alignItems: "center",
    margin: 10,
  },
  textButton: {
    color: PRIMARY_COLOR_WHITE,
    fontWeight: "bold",
    fontSize: 15,
  },
  buttonInvest1: {
    borderRadius: 10,
    borderWidth: 1,
    width: 150,
    height: 50,
    borderColor: "#999999",
    backgroundColor: PRIMARY_COLOR_WHITE,
    justifyContent: "center",
    alignItems: "center",
    marginStart: "auto",
    marginEnd: "auto",
    marginBottom: 10,
    marginTop: 20,
  },
  textInvest1: {
    color: "#999999",
    fontWeight: "900",
    fontSize: 15,
  },
});
