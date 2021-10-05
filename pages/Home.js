import React, { useState } from "react";
import { StyleSheet, Text, View, SafeAreaView, FlatList } from "react-native";
import ProgressCircle from "react-native-progress-circle";
import { SearchBar, Avatar } from "react-native-elements";
import { Icon } from "react-native-elements/dist/icons/Icon";

export default function Home({ navigation }) {
  const [nameMajor, setNamemajor] = useState([
    {
      key: 1,
      label: "Software Engineer",
    },
    {
      key: 2,
      label: "Internet of Things",
    },
    {
      key: 3,
      label: "Internet of Things",
    },
    {
      key: 4,
      label: "Internet of Things",
    },
    {
      key: 5,
      label: "Internet of Things",
    },
  ]);

  const [dataItems, setDataItems] = useState([
    {
      id: 1,
      name: "Nguyễn Trường Phi",
      school: "FPT University",
      sesmester: "8",
      major: "Software Engineering",
      money: "25.000.000 VNĐ",
      status: "active",
      experiedDay: "09/11/2021",
      processStatus: 100,
    },
    {
      id: 2,
      name: "Trần Long",
      school: "FPT University",
      sesmester: "8",
      major: "Software Engineering",
      money: "25.000.000 VNĐ",
      description: "Đạt full 1500locs môn lab web",
      processStatus: 80,
    },
  ]);
  const [searchValue, setSearchValue] = useState("");

  function _renderItem({ item }) {
    return (
      <View
        style={{
          borderRadius: 20,
          backgroundColor: "#ffffff",
          marginTop: 20,
          marginStart: 10,
          marginEnd: 10,
          flexDirection: "row",
        }}
      >
        <Avatar
          rounded
          containerStyle={{
            marginStart: 10,
            marginBottom: "auto",
            marginTop: "auto",
          }}
          size="large"
          source={{
            uri: "https://images.unsplash.com/photo-1612896488082-7271dc0ed30c?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8YmVhdXRpZnVsJTIwZmFjZXxlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&w=1000&q=80",
          }}
        />

        <View
          style={{
            marginBottom: "auto",
            marginTop: "auto",
            marginLeft: 10,
          }}
        >
          <View>
            <Text
              style={{
                marginStart: 5,
              }}
            >
              - Name: {item.name}
            </Text>
            <Text
              style={{
                marginStart: 5,
              }}
            >
              - School: {item.school}
            </Text>
            <Text
              style={{
                marginStart: 5,
              }}
            >
              - Ses: {item.sesmester}
            </Text>
            <Text
              style={{
                marginStart: 5,
              }}
            >
              - Major: {item.major}
            </Text>

            <View
              style={{
                borderBottomColor: "#00b359",
                borderBottomWidth: 1,
                marginTop: 20,
              }}
            />
          </View>

          <View
            style={{
              flexDirection: "row",
            }}
          >
            <Text
              style={{
                fontSize: 20,
                marginTop:"auto",
                marginBottom:"auto"
              }}
            >
              {item.money}
            </Text>

            <View
            style={{
              marginTop:10,
              marginLeft:20,
              marginBottom:10,
            }}>
              <ProgressCircle
                containerStyle={{}}
                percent={item.processStatus}
                radius={25}
                borderWidth={5}
                color="#00b359"
                shadowColor="#999"
                bgColor="#fff"
              >
                <Text>{item.processStatus}%</Text>
              </ProgressCircle>
            </View>
          </View>
        </View>

        <View
        style={{
          alignItems:"center",
          justifyContent:"center",
          marginStart:"auto",
          marginEnd:"auto",
        }}>
          <Icon
            name="angle-right"
            type="font-awesome-5"
            color="#00b359"
            size={68}
          />
        </View>
      </View>
    );
  }

  return (
    <SafeAreaView style={{ paddingTop: 50 }}>
      <View
        style={{
          flexDirection: "row",
        }}
      >
        <Text style={styles.header}>Explore</Text>
      </View>
      <SearchBar
        platform="android"
        containerStyle={{
          marginTop: 10,
          marginEnd: 10,
          marginStart: 10,
          borderRadius: 200,
        }}
        placeholder="Type here to search"
        onChangeText={setSearchValue}
        value={searchValue}
      />
      <FlatList
        data={dataItems}
        renderItem={_renderItem}
        keyExtractor={(item) => item.id}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  header: {
    fontSize: 50,
    marginLeft: 10,
    marginTop: 20,
  },
  button: {
    backgroundColor: "#FFFF",
    borderRadius: 10,
  },
});
