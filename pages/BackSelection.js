import React, { useState } from "react";
import { StyleSheet, Text, View, ScrollView, FlatList } from "react-native";
import {
  PRIMARY_COLOR,
  PRIMARY_COLOR_WHITE,
  PRIMARY_COLOR_BLACK,
} from "../constants/styles";
import { Icon } from "react-native-elements/dist/icons/Icon";

export default function BackSelection() {
  const [money, setMoney] = useState(400000);
  const [limit, setLimit] = useState([
    {
      id: 1,
      limitMoney: 50000,
    },
    {
      id: 1,
      limitMoney: 200000,
    },
    {
      id: 1,
      limitMoney: 400000,
    },
    {
      id: 1,
      limitMoney: 600000,
    },
    {
      id: 1,
      limitMoney: 800000,
    },
    {
      id: 1,
      limitMoney: 1000000,
    },
  ]);

  const renderItem = ({ item }) => (
    <View
      style={styles.box}
    >
      <Text
      style={styles.textBox}>{item.limitMoney}</Text>
      <Text style={styles.textBox}> VNĐ</Text>
    </View>
  );

  return (
    <ScrollView
      style={{
        backgroundColor: PRIMARY_COLOR,
      }}
    >
      <View
        style={{
          flexDirection: "row",
          marginTop: 150,
          marginLeft: "auto",
          marginRight: "auto",
        }}
      >
        <Icon
          name="plus"
          containerStyle={{
            marginRight: 20,
            marginTop: 12,
          }}
          type="font-awesome-5"
          color={PRIMARY_COLOR_WHITE}
          size={25}
          onPress={() => setMoney(money + 50000)}
        />

        <Text
          style={{
            fontSize: 35,
            color: PRIMARY_COLOR_WHITE,
          }}
        >
          {money}
        </Text>

        <Text
          style={{
            fontSize: 35,
            color: PRIMARY_COLOR_WHITE,
            marginLeft: 10,
          }}
        >
          VNĐ
        </Text>
        <Icon
          name="minus"
          containerStyle={{
            marginLeft: 20,
            marginTop: 12,
          }}
          type="font-awesome-5"
          color={PRIMARY_COLOR_WHITE}
          size={25}
          onPress={() => setMoney(money - 50000)}
        />
      </View>

      <View
        style={{
          height: 1,
          marginLeft: "auto",
          marginRight: "auto",
          marginTop: 5,
          marginBottom: 10,
          width: "50%",
          backgroundColor: PRIMARY_COLOR_WHITE,
        }}
      />

      <View
        style={{
          flexDirection: "row",
          marginLeft: "auto",
          marginRight: "auto",
        }}
      >
        <Icon
          name="exclamation-circle"
          type="font-awesome-5"
          containerStyle={{
            marginRight: 5,
            marginTop: 2,
          }}
          color={PRIMARY_COLOR_WHITE}
          size={13}
        />
        <Text
          style={{
            fontSize: 13,
            color: PRIMARY_COLOR_WHITE,
          }}
        >
          Make sure you choose the right limit
        </Text>
      </View>

      <FlatList
        contentContainerStyle={{
          backgroundColor: PRIMARY_COLOR_WHITE,
          marginTop:30,
          paddingTop:20,
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
        }}
        data={limit}
        numColumns={3}
        renderItem={renderItem}
      />

      {/* <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          paddingStart: 10,
          paddingEnd: 10,
          marginTop: 30,
        }}
      >
        <View style={styles.box} onTouchStart={() => setMoney(400000)}>
          <Text style={styles.textBox}>400000 VNĐ</Text>
        </View>
        <View style={styles.box} onTouchStart={() => setMoney(400000)}>
          <Text style={styles.textBox}>400000 VNĐ</Text>
        </View>
        <View style={styles.box} onTouchStart={() => setMoney(400000)}>
          <Text style={styles.textBox}>400000 VNĐ</Text>
        </View>
      </View> */}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  textBox: {
    fontSize: 17,
    fontWeight: "bold",
    color: PRIMARY_COLOR_WHITE,
  },
  box: {
    margin:5,
    height: 120,
    width: 120,
    borderRadius: 10,
    flex:1,
    flexDirection:"row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: PRIMARY_COLOR,
  },
});
