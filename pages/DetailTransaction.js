import React, { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";
import {
  FULL_HEIGHT,
  FULL_WIDTH,
  PRIMARY_COLOR,
  PRIMARY_COLOR_BLACK,
  PRIMARY_COLOR_WHITE,
} from "../constants/styles";
import { Icon } from "react-native-elements";

export default function DetailTransaction({route,navigation}) {
  const [currentBalance, setCurrentBalance] = useState(90000);
  const [status, setstatus] = useState("Successful");
  const [personInfo, setpersonInfo] = useState({
    id: 1,
    name: "Nguyễn Nguyên Bình",
    phoneNum: "0979821437",
  });
  const [detailTrans, setdetailTrans] = useState({
    id: 111120211730,
    type: "Scan QR",
    money: 90000,
    time: "17:30",
    date: "11/11/2021",
    source: "Vietcom Bank",
    fee: 3000,
  });
  const [user, setuser] = useState({
    id: 9236123,
    name: "Trần Long",
    phone: "1900 8081",
  });

  function setIcon(type) {
    if (type == "Transfer") return "arrow-forward-outline";
    if (type == "Deposit") return "add-outline";
    if (type == "Withdraw") return "arrow-down-outline";
    if (type == "Scan QR") return "scan-outline";
    if (type == "Request QR") return "qr-code-outline";
    if (type == "Successful") return "checkmark-done-outline";
    if (type == "Fail") return "close-outline";
    else return "alert-circle-outline";
  }
  function setIconColor(type) {
    if (type == "Transfer") return "red";
    if (type == "Deposit") return "green";
    if (type == "Withdraw") return PRIMARY_COLOR;
    if (type == "Scan QR") return "#ff5c33";
    if (type == "Request QR") return PRIMARY_COLOR_BLACK;
    if (type == "Successful") return "green";
    if (type == "Fail") return "red";
    else return "#ff5c33";
  }
  function setMoney(money, type) {
    if (type == "Deposit" || type == "Request QR")
      return "+ " + currencyFormat(money);
    else return "- " + currencyFormat(money);
  }
  function setBackgroundColorStatusView(type) {
    if (type == "Successful") return "#e6ffe6";
    if (type == "Fail") return "#ffebe6";
    else return "#ff5c33";
  }
  const currencyFormat = (num) => {
    return "$" + num.toFixed(0).replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
  };
  return (
    <View
      style={{
        height: "100%",
        padding: 10,
      }}
    >
      <ScrollView>
        <View
          style={{
            borderRadius: 20,
            backgroundColor: PRIMARY_COLOR_WHITE,
            borderWidth: 0.5,
            borderColor: "#cccccc",
          }}
        >
          <View
            style={{
              flexDirection: "row",
            }}
          >
            <Icon
              name={setIcon(detailTrans.type)}
              type={"ionicon"}
              color={setIconColor(detailTrans.type)}
              style={{
                margin: 20,
              }}
              size={80}
            />
            <View
              style={{
                marginTop: 20,
              }}
            >
              <Text
                style={{
                  color: "#999999",
                  fontSize: 15,
                }}
              >
                {detailTrans.type}
              </Text>
              <Text
                style={{
                  color: PRIMARY_COLOR_BLACK,
                  fontSize: 18,
                }}
              >
                {setMoney(detailTrans.money, detailTrans.type)}
              </Text>
              <Text
                style={{
                  color: "#999999",
                  fontSize: 15,
                }}
              >
                Transaction ID:
              </Text>
              <Text
                style={{
                  color: PRIMARY_COLOR,
                  fontSize: 15,
                }}
              >
                {detailTrans.id}
              </Text>
            </View>
          </View>
          <View
            style={{
              flexDirection: "row",
              marginStart: 20,
              borderRadius: 8,
              padding: 8,
              marginEnd: 20,
              marginBottom: 20,
              backgroundColor: setBackgroundColorStatusView(status),
            }}
          >
            <Icon
              name={setIcon(status)}
              type={"ionicon"}
              color={setIconColor(status)}
              size={20}
            />
            <Text
              style={{
                marginStart: 5,
              }}
            >
              {status}
            </Text>
          </View>

          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              marginStart: 20,
              marginEnd: 20,
            }}
          >
            <Text style={styles.labelDetailTrans}>Time</Text>
            <Text style={styles.infoDetailTrans}>{detailTrans.time}</Text>
          </View>

          <View style={styles.horizontalLine} />

          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              marginStart: 20,
              marginEnd: 20,
            }}
          >
            <Text style={styles.labelDetailTrans}>Date</Text>
            <Text style={styles.infoDetailTrans}>{detailTrans.date}</Text>
          </View>
          <View style={styles.horizontalLine} />

          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              marginStart: 20,
              marginEnd: 20,
            }}
          >
            <Text style={styles.labelDetailTrans}>Fee</Text>
            <Text style={styles.infoDetailTrans}>
              {currencyFormat(detailTrans.fee)}
            </Text>
          </View>
          <View style={styles.horizontalLine} />

          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              marginStart: 20,
              marginEnd: 20,
              marginBottom: 20,
            }}
          >
            <Text style={styles.labelDetailTrans}>Method</Text>
            <Text style={styles.infoDetailTrans}>{detailTrans.source}</Text>
          </View>
        </View>

        <Text
          style={{
            margin: 10,
            fontSize: 18,
            fontWeight: "bold",
            color: "#595959",
          }}
        >
          Trader Information:
        </Text>
        <View
          style={{
            borderRadius: 20,
            backgroundColor: PRIMARY_COLOR_WHITE,
            marginTop: 10,
            borderWidth: 0.5,
            borderColor: "#cccccc",
          }}
        >
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              marginTop: 20,
              marginStart: 20,
              marginEnd: 20,
            }}
          >
            <Text style={styles.labelDetailTrans}>Name</Text>
            <Text style={styles.infoDetailTrans}>{user.name}</Text>
          </View>
          <View style={styles.horizontalLine} />

          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              marginStart: 20,
              marginEnd: 20,
              marginBottom: 20,
            }}
          >
            <Text style={styles.labelDetailTrans}>Phone number</Text>
            <Text style={styles.infoDetailTrans}>{user.phone}</Text>
          </View>
        </View>
      </ScrollView>
      <View
        style={{
          position: "absolute",
          flexDirection: "row",
          bottom: 0,
          backgroundColor: PRIMARY_COLOR_WHITE,
          justifyContent: "center",
          width: FULL_WIDTH,
        }}
      >
        <TouchableOpacity style={styles.buttonFooterReset}
         onPress={()=>navigation.goBack(null)}>
          <Text style={styles.textButtonRest}>Back</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  labelDetailTrans: {
    fontSize: 16,
    color: "#999999",
  },
  infoDetailTrans: {
    fontSize: 15,
    fontWeight: "bold",
    color: PRIMARY_COLOR_BLACK,
  },
  horizontalLine: {
    borderBottomColor: "#e6e6e6",
    borderBottomWidth: 1,
    width: "95%",
    marginStart: "auto",
    marginEnd: "auto",
    marginTop: 15,
    marginBottom: 15,
  },
  buttonFooterReset: {
    height: FULL_HEIGHT / 17,
    width: FULL_WIDTH / 2.5,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#999999",
    margin: 10,
  },
  textButtonRest: {
    color: "#999999",
    fontSize: 18,
    fontWeight: "bold",
  },
});
