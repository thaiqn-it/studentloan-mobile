import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  FlatList,
} from "react-native";
import ProgressCircle from "react-native-progress-circle";
import { SearchBar, Avatar } from "react-native-elements";
import { Icon } from "react-native-elements/dist/icons/Icon";
import SectionedMultiSelect from "react-native-sectioned-multi-select";
import {PRIMARY_COLOR, PRIMARY_COLOR_WHITE} from '../constants/styles'

export default function Home({ navigation }) {
  const [items, setItems] = useState([
    // this is the parent or 'item'
    {
      name: "IT",
      id: 1,
      // these are the children or 'sub items'
      children: [
        {
          name: "SE",
          id: 1,
        },
        {
          name: "GD",
          id: 2,
        },
        {
          name: "AI",
          id: 3,
        },
        {
          name: "IoT",
          id: 4,
        },
        {
          name: "SI",
          id: 5,
        },
      ],
    },
    {
      name: "Kinh doanh",
      id: 2,
      children: [
        {
          name: "asdasd",
          id: 6,
        },
        {
          name: "GadD",
          id: 7,
        },
        {
          name: "AeqweI",
          id: 8,
        },
        {
          name: "IoTdqwe",
          id: 9,
        },
        {
          name: "SI2312",
          id: 10,
        },
      ],
    },
  ]);
  const [selectedItems, setSelectedItems] = useState("");

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
      status: "active",
      experiedDay: "03/10/2021",
      processStatus: 80,
    },
    {
      id: 3,
      name: "Lương Thanh Hà",
      school: "FPT University",
      sesmester: "7",
      major: "Software Engineering",
      money: "25.000.000 VNĐ",
      status: "active",
      experiedDay: "03/10/2021",
      processStatus: 55,
    },
    {
      id: 4,
      name: "Đinh Phú Cường",
      school: "FPT University",
      sesmester: "8",
      major: "Software Engineering",
      money: "25.000.000 VNĐ",
      status: "active",
      experiedDay: "03/10/2021",
      processStatus: 95,
    },
  ]);
  const [searchValue, setSearchValue] = useState("");

  function _renderItem({ item }) {
    return (
      <View
        style={{
          padding:15,
          borderRadius: 20,
          backgroundColor: PRIMARY_COLOR_WHITE,
          marginTop: 20,
          marginStart: 10,
          marginEnd: 10,
          flexDirection: "row",
        }}
      >
        <Avatar
          rounded
          containerStyle={{
            margin:10,
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
              style={styles.textItem}
            >
              Name: {item.name}
            </Text>
            <Text
              style={styles.textItem}
            >
              School: {item.school}
            </Text>
            <Text
              style={styles.textItem}
            >
              Ses: {item.sesmester}
            </Text>
            <Text
             style={styles.textItem}
            >
              Major: {item.major}
            </Text>

            <View
              style={{
                borderBottomColor: PRIMARY_COLOR,
                borderBottomWidth: 1,
                marginTop: 10,
              }}
            />
          </View>

          <View
            style={{
              flexDirection: "row",
            }}
          >
            <View>
              <Text
                style={{
                  fontSize: 20,
                  marginTop: "auto",
                  color:PRIMARY_COLOR,
                  marginBottom: "auto",
                }}
              >
                {item.money}
              </Text>

              <View
                style={{
                  flexDirection: "row",
                }}
              >
                <Icon
                  containerStyle={{
                    marginBottom: "auto",
                    marginTop: "auto",
                  }}
                  name="clock"
                  type="font-awesome-5"
                  color={PRIMARY_COLOR}
                  size={15}
                />

                <Text
                  style={{
                    marginBottom: 3,
                    marginStart: 5,
                    fontSize: 15,
                    color:PRIMARY_COLOR,
                  }}
                >
                  {item.experiedDay}
                </Text>
              </View>
            </View>

            <View
              style={{
                marginTop: 10,
                marginLeft: 20,
                marginBottom: 10,
              }}
            >
              <ProgressCircle
                containerStyle={{}}
                percent={item.processStatus}
                radius={25}
                borderWidth={5}
                color={PRIMARY_COLOR}
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
            alignItems: "center",
            justifyContent: "center",
            marginStart: "auto",
            marginEnd: "auto",
          }}
        >
          <Icon
            name="angle-right"
            type="font-awesome-5"
            color={PRIMARY_COLOR}
            size={20}
            onPress={() => navigation.navigate("DetailPost", item)}
          />
        </View>
      </View>
    );
  }

  return (
    <SafeAreaView style={{ backgroundColor:PRIMARY_COLOR,flex: 1, paddingTop: 50 }}>
      <SearchBar
        platform="ios"
        containerStyle={{
          marginTop: 10,
          marginEnd: 10,
          marginStart: 10,
          borderRadius:10,
          backgroundColor:PRIMARY_COLOR
        }}
        cancelButtonProps={{
          color:PRIMARY_COLOR_WHITE
        }}
        placeholder="Type here to search"
        onChangeText={setSearchValue}
        value={searchValue}
      />
      <SectionedMultiSelect
        items={items}
        IconRenderer={Icon}
        colors={{
          primary: "#00b359",
        }}
        uniqueKey="id"
        subKey="children"
        selectText="Press here to filter major!"
        showDropDowns={true}
        readOnlyHeadings={true}
        onSelectedItemsChange={setSelectedItems}
        selectedItems={selectedItems}
      />
      <FlatList
        data={dataItems}
        renderItem={_renderItem}
        idExtractor={(item) => item.id}
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
  textItem:{
    color: PRIMARY_COLOR,
    marginStart: 5,
    fontSize:15,
  }
});
