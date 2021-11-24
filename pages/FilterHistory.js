import React, { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
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
import { Dimensions } from "react-native";
import { Icon } from "react-native-elements";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

export default function FilterHistory({ route, navigation }) {
  const [isClicked, setIsClicked] = useState("");
  const [listMonth, setlistMonth] = useState([
    {
      id: 111111,
      name: "All",
      isClick: "111111clicked",
    },
    {
      id: 122021,
      name: "Dec. 2021",
      isClick: "122021clicked",
    },
    {
      id: 112021,
      name: "Nov. 2021",
      isClick: "112021clicked",
    },
    {
      id: 102021,
      name: "Oct. 2021",
      isClick: "102021clicked",
    },
  ]);

  const clickedCategory = (item) => {
    setIsClicked(item.isClick);
  };

  const [listServices, setListServices] = useState([
    {
      id: 1,
      name: "Deposit",
      icon: "plus",
      color: "green",
      typeIcon: "font-awesome-5",
    },
    {
      id: 2,
      name: "Transfer",
      icon: "arrow-right",
      color: "red",
      typeIcon: "font-awesome-5",
    },
    {
      id: 3,
      name: "Withdraw",
      icon: "arrow-down",
      color: PRIMARY_COLOR,
      typeIcon: "font-awesome-5",
    },
    {
      id: 4,
      name: "Scan QR",
      icon: "scan-outline",
      color: "#ff5c33",
      typeIcon: "ionicon",
    },
    {
      id: 5,
      name: "Request QR",
      icon: "qr-code-outline",
      color: PRIMARY_COLOR_BLACK,
      typeIcon: "ionicon",
    },
  ]);
  const [status, setstatus] = useState([
    {
      id: 1,
      name: "All",
    },
    {
      id: 2,
      name: "Successful",
      icon: "checkmark-done-outline",
      color: "green",
      typeIcon: "ionicon",
    },
    {
      id: 3,
      name: "Fail",
      icon: "close-outline",
      color: "red",
      typeIcon: "ionicon",
    },
    {
      id: 4,
      name: "Processing",
      icon: "alert-circle-outline",
      color: "#ff5c33",
      typeIcon: "ionicon",
    },
  ]);

  function renderListMonth({ item }) {
    return (
      <TouchableOpacity
        style={{
          backgroundColor: PRIMARY_COLOR_WHITE,
          height: windowHeight / 17,
          width: windowWidth / 2.5,
          justifyContent: "center",
          alignItems: "center",
          borderColor: PRIMARY_COLOR_BLACK,
          elevation: 3,
          margin: 5,
          borderRadius: 10,
          borderColor: "#b3b3b3",
          borderWidth: 1,
          flexDirection: "row",
        }}
      >
        <Text>{item.name}</Text>
        <Icon
          name={item.icon}
          type={item.typeIcon}
          color={item.color}
          style={{
            marginStart: 8,
          }}
          size={18}
        />
      </TouchableOpacity>
    );
  }

  return (
    <View
      style={{
        height: "100%",
      }}
    >
      <ScrollView>
        <View style={styles.styleViewCategory}>
          <Text style={styles.headerFilter}>By Months</Text>
          <FlatList
            data={listMonth}
            contentContainerStyle={styles.styleFlatList}
            renderItem={renderListMonth}
            numColumns={2}
            keyExtractor={(item) => item.id}
          />
        </View>

        <View style={styles.styleViewCategory}>
          <Text style={styles.headerFilter}>By Services</Text>
          <FlatList
            data={listServices}
            contentContainerStyle={styles.styleFlatList}
            renderItem={renderListMonth}
            numColumns={2}
            keyExtractor={(item) => item.id}
          />
        </View>

        <View style={styles.styleViewCategory}>
          <Text style={styles.headerFilter}>By Status</Text>
          <FlatList
            data={status}
            contentContainerStyle={styles.styleFlatList}
            renderItem={renderListMonth}
            numColumns={2}
            keyExtractor={(item) => item.id}
          />
        </View>

        
      </ScrollView>
      <View
          style={{
            position: "absolute",
            flexDirection:"row",
            bottom: 0,
            backgroundColor: PRIMARY_COLOR_WHITE,
            justifyContent:"center",
            width:FULL_WIDTH
          }}
        >
          <TouchableOpacity
          style={styles.buttonFooterReset}>
              <Text
              style={styles.textButtonRest}>Reset</Text>
          </TouchableOpacity>

          <TouchableOpacity
          style={styles.buttonFooterApply}
          onPress={()=>navigation.navigate('History')}>
              <Text
              style={styles.textButtonApply}>Apply</Text>
          </TouchableOpacity>
        </View>
    </View>
  );
}

const styles = StyleSheet.create({
  headerFilter: {
    fontSize: 18,
    fontWeight: "bold",
    margin: 10,
  },
  styleFlatList: {
    alignItems: "center",
    margin: 10,
  },
  styleViewCategory: {
    backgroundColor: PRIMARY_COLOR_WHITE,
    marginTop: 10,
  },
  buttonFooterReset:{
      height:FULL_HEIGHT/17,
      width:FULL_WIDTH/2.5,
      justifyContent:"center",
      alignItems:"center",
      borderRadius:8,
      borderWidth:1,
      borderColor:"#999999",
      margin:10,
  },
  buttonFooterApply:{
    height:FULL_HEIGHT/17,
    width:FULL_WIDTH/2.5,
    justifyContent:"center",
    alignItems:"center",
    borderRadius:8,
    borderWidth:1,
    borderColor:PRIMARY_COLOR,
    backgroundColor:PRIMARY_COLOR,
    margin:10,
},
  textButtonRest:{
    color:"#999999",
    fontSize:18,
    fontWeight:"bold",
  },
  textButtonApply:{
    color:PRIMARY_COLOR_WHITE,
    fontSize:18,
    fontWeight:"bold",
  }
});
