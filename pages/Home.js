import React, { useState } from "react";
import { StyleSheet, Text, View, SafeAreaView } from "react-native";
import SearchBar from "react-native-elements/dist/searchbar/SearchBar-ios";
import Carousel from "react-native-snap-carousel";
import ProgressCircle from "react-native-progress-circle";

export default function Home() {
  const [dataItems, setDataItems] = useState([
    {
      name: "Nguyễn Trường Phi",
      school: "FPT University",
      sesmester: "8",
      major: "Software Engineering",
      money: "25.000.000 VNĐ",
      description: "Đạt full 1500locs môn lab web",
      processStatus: 100,
    },
    {
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

  return (
    <SafeAreaView style={{ flex: 1, paddingTop: 50 }}>
      <Text style={styles.header}>Explore</Text>
      <SearchBar
        platform="android"
        placeholder="Type here to search"
        onChangeText={setSearchValue}
        value={searchValue}
      />
      <View style={{ flex: 1, flexDirection: "row", justifyContent: "center" }}>
        <Carousel
          data={dataItems}
          sliderWidth={350}
          itemWidth={350}
          itemHeight={500}
          renderItem={_renderItem}
          onSnapToItem={(index) => this.setState({ activeIndex: index })}
        />
      </View>
    </SafeAreaView>
  );
}

function _renderItem({ item, index }) {
  return (
    <View
      style={{
        backgroundColor: "rgba(41, 163, 41,0.5)",
        borderRadius: 20,
        height: 250,
        marginLeft: 20,
        marginTop: 10,
      }}
    >
      <Text
        style={{
          fontSize: 25,
          marginLeft: 10,
          marginTop: 5,
        }}
      >
        {item.name}
      </Text>

      <View
        style={{
          flexDirection: "row",
          flexWrap: "wrap",
        }}
      >
        <Text
          style={{
            marginTop: 5,
            marginLeft: 10,
          }}
        >
          School: {item.school}
        </Text>

        <Text
          style={{
            marginTop: 5,
            marginLeft: 10,
          }}
        >
          Major: {item.major}
        </Text>
        <Text
          style={{
            marginTop: 5,
            marginLeft: 10,
          }}
        >
          Ses: {item.sesmester}
        </Text>
      </View>

      <View
        style={{
          borderRadius: 20,
          flex: 1,
          marginTop: 10,
          backgroundColor: "rgb(230, 255, 230)",
          flexDirection: "row",
          flexWrap: "wrap",
        }}
      >
        <Text
          style={{
            marginLeft: 10,
            fontSize: 30,
            marginRight: 20,
          }}
        >
          {item.money}
        </Text>

        <ProgressCircle
          percent={70}
          radius={30}
          borderWidth={8}
          color="#3399FF"
          shadowColor="#999"
          bgColor="#fff"
        >
          <Text style={{ fontSize: 17 }}>{"30%"}</Text>
        </ProgressCircle>

        <Text></Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    fontSize: 50,
    marginLeft: 10,
    marginTop: 20,
    fontStyle: "normal",
  },
});
