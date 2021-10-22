import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  FlatList,
  TouchableOpacity,
} from "react-native";
import {
  PRIMARY_COLOR,
  PRIMARY_COLOR_WHITE,
  PRIMARY_COLOR_BLACK,
} from "../constants/styles";
import { Icon } from "react-native-elements/dist/icons/Icon";

export default function BackSelection({route, navigation}) {
  const {id} = route.params;
  const [money, setMoney] = useState(400000);
  const [limit, setLimit] = useState([
    {
      id: 1,
      limitMoney: 50000,
    },
    {
      id: 2,
      limitMoney: 200000,
    },
    {
      id: 3,
      limitMoney: 400000,
    },
    {
      id: 4,
      limitMoney: 800000,
    },
    {
      id: 5,
      limitMoney: 16000000,
    },
    {
      id: 6,
      limitMoney: 28000000,
    },
  ]);

  const setMoneyByPressBox = (item) => {
    setMoney(item.limitMoney);
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.box}
      onPress={() => setMoneyByPressBox(item)}
    >
      <Text style={styles.textBox}>{item.limitMoney}</Text>
    </TouchableOpacity>
  );

  return (
    <ScrollView
      style={{
        backgroundColor: PRIMARY_COLOR,
        padding:15,
      }}
    >
      <View
        style={{
          flexDirection: "row",
          marginTop: 150,
        }}
      >
        <TouchableOpacity
          onPress={() => setMoney(money - 50000)}
          style={{
            marginStart:10,
            marginTop:5,
          }}
        >
          <Icon
            name="minus"
            containerStyle={{
              backgroundColor: PRIMARY_COLOR_WHITE,
              padding: 8,
              borderColor: PRIMARY_COLOR,
              borderRadius: 10,
            }}
            type="font-awesome-5"
            color={PRIMARY_COLOR}
            size={25}
          />
        </TouchableOpacity>

        <View
        style={{
          marginLeft: "auto",
          marginRight: "auto",
          flexDirection:"row",
        }}>
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
              marginLeft: 7,
            }}
          >
            VNĐ
          </Text>
        </View>

        <TouchableOpacity
          onPress={() => setMoney(money + 50000)}
          style={{
            marginEnd:10,
            marginTop:5,
          }}
        >
          <Icon
            name="plus"
            containerStyle={{
              backgroundColor: PRIMARY_COLOR_WHITE,
              padding: 8,
              borderColor: PRIMARY_COLOR,
              borderRadius: 10,
            }}
            type="font-awesome-5"
            color={PRIMARY_COLOR}
            size={25}
          />
        </TouchableOpacity>
      </View>

      <View
        style={{
          height: 1,
          marginLeft: "auto",
          marginRight: "auto",
          marginTop: 15,
          marginBottom: 10,
          width: "60%",
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

      <View
        style={{
          backgroundColor: PRIMARY_COLOR_WHITE,
          marginTop: 50,
          borderRadius: 20,
          paddingTop: 30,
        }}
      >
        <FlatList
          data={limit}
          contentContainerStyle={{
            marginLeft:10,
            marginRight:10,
            marginTop:20,
            marginBottom:20,
          }}
          numColumns={3}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
        />

        <View
          style={{
            flexDirection: "row",
          }}
        >
          <TouchableOpacity
            style={styles.buttonCancel}
            onPress={() => navigation.goBack(null)}
          >
            <Text style={styles.buttonText}>Cancel</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.buttonTopUp}
            onPress={() => navigation.navigate('Home')}
          >
            <Text style={styles.buttonTextTopUp}>Press to top up!</Text>
          </TouchableOpacity>
        </View>
      </View>
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
    elevation:5,
    margin: 10,
    height:100,
    width:50,
    borderRadius: 10,
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: PRIMARY_COLOR,
  },
  buttonCancel:{
    width: "30%",
    flexDirection: "row",
    marginLeft:20,
    marginTop: 40,
    marginBottom: 30,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor:PRIMARY_COLOR,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    padding:10,
    backgroundColor: PRIMARY_COLOR_WHITE,
  },
    buttonText: {
    fontWeight: "900",
    fontSize: 20,
    color: PRIMARY_COLOR_BLACK,
  },
  buttonTextTopUp: {
    fontWeight: "bold",
    fontSize: 20,
    color: PRIMARY_COLOR_WHITE,
  },
  buttonTopUp:{
    elevation:3,
    width: "50%",
    marginLeft:30,
    padding:10,
    marginTop: 40,
    marginBottom: 30,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: PRIMARY_COLOR,
  },
});
