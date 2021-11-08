import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, Text, View, Animated, FlatList,TouchableOpacity, TextInput } from 'react-native';
import { Avatar } from 'react-native-elements';
import { Icon } from 'react-native-elements/dist/icons/Icon';
import SectionedMultiSelect from 'react-native-sectioned-multi-select';
import { FULL_HEIGHT, FULL_WIDTH, PRIMARY_COLOR, PRIMARY_COLOR_BLACK, PRIMARY_COLOR_WHITE, PRIMARY_FONT } from '../constants/styles';
import * as Progress from 'react-native-progress';
import { Button } from 'react-native-paper';
import {
  FontAwesome5,
} from "@expo/vector-icons";
import { TouchableHighlight } from 'react-native-gesture-handler';
import * as Animatable from 'react-native-animatable';
import HeaderBar from '../components/HeaderBar';
import { MaterialIcons } from '@expo/vector-icons';

export default function Invest({ navigation }) {
  const [items, setItems] = useState([
    // this is the parent or 'item'
    {
      name: 'IT',
      id: 1,
      // these are the children or 'sub items'
      children: [
        {
          name: 'SE',
          id: 1,
        },
        {
          name: 'GD',
          id: 2,
        },
        {
          name: 'AI',
          id: 3,
        },
        {
          name: 'IoT',
          id: 4,
        },
        {
          name: 'SI',
          id: 5,
        },
      ],
    },
    {
      name: 'Kinh doanh',
      id: 2,
      children: [
        {
          name: 'asdasd',
          id: 6,
        },
        {
          name: 'GadD',
          id: 7,
        },
        {
          name: 'AeqweI',
          id: 8,
        },
        {
          name: 'IoTdqwe',
          id: 9,
        },
        {
          name: 'SI2312',
          id: 10,
        },
      ],
    },
  ]);
  const [selectedItems, setSelectedItems] = useState('');

  const [dataItems, setDataItems] = useState([]);
  const fetchData = () => {
    setDataItems([
      {
        id: 1,
        name: 'Nguyễn Trường Phi',
        school: 'FPT University',
        sesmester: '8',
        major: 'Software Engineering',
        money: '25.000.000 VNĐ',
        status: 'active',
        experiedDay: '09/11/2021',
        processStatus: 100,
      },
      {
        id: 2,
        name: 'Trần Long',
        school: 'FPT University',
        sesmester: '8',
        major: 'Software Engineering',
        money: '25.000.000 VNĐ',
        status: 'active',
        experiedDay: '03/10/2021',
        processStatus: 80,
      },
      {
        id: 3,
        name: 'Lương Thanh Hà',
        school: 'FPT University',
        sesmester: '7',
        major: 'Software Engineering',
        money: '25.000.000 VNĐ',
        status: 'active',
        experiedDay: '03/10/2021',
        processStatus: 55,
      },
      {
        id: 4,
        name: 'Đinh Phú Cường',
        school: 'FPT University',
        sesmester: '8',
        major: 'Software Engineering',
        money: '25.000.000 VNĐ',
        status: 'active',
        experiedDay: '03/10/2021',
        processStatus: 95,
      },
      {
        id: 5,
        name: 'Nguyễn Trường Phi',
        school: 'FPT University',
        sesmester: '8',
        major: 'Software Engineering',
        money: '25.000.000 VNĐ',
        status: 'active',
        experiedDay: '09/11/2021',
        processStatus: 100,
      },
    ]);
  };
  useEffect(() => {
    fetchData();
  }, []);
  
  const [searchValue, setSearchValue] = useState('');

  const filterdData = searchValue // based on text, filter data and use filtered data
    ? dataItems.filter(item => {
        const itemData = item.name.toUpperCase();
        const textData = searchValue.toUpperCase();
        return itemData.indexOf(textData) > -1;
      })
    : dataItems;

      const [isFocus,setFocus]=useState(false)
      const [isEdit,setEdit]=useState(false)
      const scrollY = useRef(new Animated.Value(0)).current;
      const input_tranlate_x = useRef(null)
      const listRef = useRef(null)

      const offsetAnim = useRef(new Animated.Value(0)).current;
      const clampedScroll = Animated.diffClamp(
        Animated.add(
          scrollY.interpolate({
            inputRange : [0, 1],
            outputRange : [0 ,1],
            extrapolateLeft : 'clamp',
          }),
          offsetAnim,
        ),
        0,
        10
      )

      const opacity = clampedScroll.interpolate({
        inputRange: [0, 10],
        outputRange: [0.9, 0],
      })  

      const ScrollToTop = () => {
        listRef.current.scrollToOffset({ animated: true, offset: 0 });
      }

      const onSearch = () => {
        input_tranlate_x.current.transitionTo({ zIndex : 200 ,scale : 1}, 1)
        setFocus(true)
        setEdit(true)
      } 

      const onBack = () => {
        input_tranlate_x.current.transitionTo({ zIndex : 0 ,scale : 0 }, 1)
        setFocus(false)
        setEdit(false)
      }

      useEffect(() => {
        input_tranlate_x.current.transitionTo({ scale : 0 },1)
      }, [])

  function _renderItem({ item }) {
    return (
      <TouchableOpacity
        onPress={() => navigation.navigate("DetailPost")}
        style={styles.container}>
          <View style={{ flexDirection : 'row', padding : 15}}> 
            <View style={{ flexDirection : 'row', alignContent : 'flex-start' }}>
              <Avatar
                rounded
                size={50}
                source={{
                  uri:
                    'https://images.unsplash.com/photo-1612896488082-7271dc0ed30c?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8YmVhdXRpZnVsJTIwZmFjZXxlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&w=1000&q=80',
                }}
              />
              <View style={{ marginLeft : 10 }}>
                <Text style={{ fontSize : 15 }}>{item.name.toUpperCase()}</Text>
                <Text style={{ opacity : 0.5,fontSize : 13 }}>{item.school}</Text>
                <Text style={{ opacity : 0.5,fontSize : 13 }}>Công nghệ thông tin</Text>
              </View>         
            </View>
            <View style={{ alignItems : 'flex-end', flex : 1,}}>
                <Text style={{ backgroundColor : '#dadee3', paddingLeft : 3,paddingRight : 3 , opacity : 0.8,borderRadius : 5 }}>Expired in</Text>
                <Text>12 days</Text>
            </View>
          </View>
          <View style={styles.line}/>
          <View style={{ padding : 15, flexDirection : 'row'}}>
              <View>
                <Text style={{  fontSize : 15  }}>2.000.000đ</Text>
                <Text style={{ opacity : 0.5,fontSize : 13 }}>Available for investment</Text>           
              </View>
              <View style={{  alignItems : 'flex-end', flex : 1, fontSize : 13 }}>
                <Text style={{  fontSize : 15  }}>22.000.000đ</Text>
                <Text style={{ opacity : 0.5,fontSize : 13 }}>Full amount</Text>  
              </View>
          </View>
          <Progress.Bar progress={0.8} width={FULL_WIDTH / 1.2} style={{ alignSelf : 'center', margin : 5, marginBottom : 25 }} color={PRIMARY_COLOR} />    
          <View style={styles.line}/>
          <View style={{ padding : 15, flexDirection : 'row' }}>
            <View>
                <Text style={{ marginBottom : 5,fontSize : 14 }}>Period</Text>
                <Text style={{ fontSize : 14 }}>Interest</Text>
            </View>
            <View style={{ flex : 1 , alignItems : 'flex-end' }}>
                <Text style={{ marginBottom : 5,fontSize : 14 }}>18 months</Text>
                <Text style={{ fontSize : 14 }}>3%</Text>
            </View>
          </View> 
          <Button
            style={styles.btnLogin}
            mode = "outlined"
            color={PRIMARY_COLOR}
          >Invest</Button>
      </TouchableOpacity>
    );
  }

  return (
    <View
      style={{ backgroundColor: '#F2F5FA' }}>
      <HeaderBar 
          scrollY={scrollY} 
          navigation={navigation} 
          right={
          <TouchableOpacity
            style={{ marginRight: 10 }}
            onPress={onSearch}
          >
            <Icon
              name="search"
              type={"fontawesome"}
              size={30}
              color="black"
            />
          </TouchableOpacity>
        }/>
      <Animatable.View 
        style={styles.input_box} ref={input_tranlate_x}>
        <TouchableHighlight
          activeOpacity={1}
          onPress={onBack}
          style={styles.back_icon_box}
          underlayColor="#ccd0d5">
            <Icon name="chevron-left" size={30} color={PRIMARY_COLOR_BLACK}/>
        </TouchableHighlight>
        <TextInput 
          placeholder="Search"
          clearButtonMode="always"
          value={searchValue}
          onChangeText={setSearchValue}
          style={styles.input}
          focusable={isFocus}
          editable={isEdit}/>
      </Animatable.View>
      {/* <SectionedMultiSelect
        items={items}
        readOnlyHeadings={false}
        IconRenderer={Icon}
        colors={{
          primary: PRIMARY_COLOR,
        }}
        uniqueKey="id"
        subKey="children"
        selectText="Press here to filter major!"
        showDropDowns={true}
        onSelectedItemsChange={setSelectedItems}
        SectionedMultiSelect={selectedItems}
      /> */}
      <Animated.FlatList
        onScroll={Animated.event(
          [{ nativeEvent : { contentOffset : { y : scrollY }}}],
          { useNativeDriver : true }
        )}
        onScrollBeginDrag={() => input_tranlate_x.current.transitionTo({ scale : 0 },1)}
        data={filterdData}
        renderItem={_renderItem}
        ref={listRef}
        keyExtractor={(item) => item.id.toString()}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingTop : FULL_HEIGHT / 9 , paddingBottom : 10 }}
      />
      <Animated.View style={[styles.toTopBotton,{opacity}]}>
        <TouchableOpacity onPress={ScrollToTop}>
          <MaterialIcons name="keyboard-arrow-up" size={40} color="black" />
        </TouchableOpacity>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container : {
    margin : 10,
    borderRadius: 20,
    backgroundColor: PRIMARY_COLOR_WHITE,
    elevation : 5,
  },
  line : { 
    borderBottomWidth : 1, 
    borderBottomColor : '#dadee3',
    width : FULL_WIDTH / 1.1, 
    alignSelf : 'center' 
  },
  btnLogin : {
    width : FULL_WIDTH / 1.2,
    borderRadius : 10,
    borderWidth : 1.2,
    alignSelf : 'center',
    padding: 5,
    marginBottom : 20,
    borderColor : PRIMARY_COLOR,
  },
  header : {
    position : 'absolute',
    zIndex : 100,
    top : 0,
    left : 0,
    right : 0,
    height : 50,
  },
  input_box : {
    height : 50,
    flexDirection : 'row',
    alignItems : 'center',
    position : 'absolute',
    top : 0,
    left : 0,
    backgroundColor : PRIMARY_COLOR_WHITE,
    width : FULL_WIDTH,
    marginTop : FULL_HEIGHT / 34,
    elevation : 5
  },
  back_icon_box : {
    width : 40,
    height : 40,
    borderRadius : 40,
    flexDirection : 'row',
    justifyContent : 'center',
    alignItems : 'center',
    marginRight : 5
  },
  input : {
    flex : 1,
    height : 40,
    backgroundColor : PRIMARY_COLOR_WHITE,
    borderRadius : 15,
    paddingHorizontal : 15,
    fontSize : 18
  },
  toTopBotton : {
    position : 'absolute',
    bottom : FULL_HEIGHT / 20,
    right : 15,
    height : 60,
    width : 60,
    borderRadius : 10,
    backgroundColor : '#dadee3',
    alignItems : 'center',
    justifyContent : 'center',
  }
});
