import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, Text, View, Animated, FlatList,TouchableOpacity, TextInput,StatusBar,Modal,ScrollView } from 'react-native';
import { Avatar,Slider } from 'react-native-elements';
import { Icon } from 'react-native-elements/dist/icons/Icon';
import SectionedMultiSelect from 'react-native-sectioned-multi-select';
import { FULL_HEIGHT, FULL_WIDTH, PRIMARY_COLOR, PRIMARY_COLOR_BLACK, PRIMARY_COLOR_WHITE, PRIMARY_FONT, SECONDARY_COLOR } from '../constants/styles';
import * as Progress from 'react-native-progress';
import { Button } from 'react-native-paper';
import { TouchableHighlight } from 'react-native-gesture-handler';
import * as Animatable from 'react-native-animatable';
import { MaterialIcons,AntDesign,Ionicons,Feather } from '@expo/vector-icons';
import MultiSlider from '@ptomasroos/react-native-multi-slider';

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
      const [isFilter,setIsFilter]=useState(false)
      const [multiSliderValue, setMultiSliderValue] = useState([50000, 100000000]);

      const multiSliderValuesChange = values => setMultiSliderValue(values);

      const yearStudies = [
        {
          id : 1,
          year : 'Tất cả'
        },
        {
          id : 2,
          year : 'Năm I'
        },
        {
          id : 3,
          year : 'Năm II'
        },
        {
          id : 4,
          year : 'Năm III'
        },
        {
          id : 5,
          year : 'Năm IV'
        },
        {
          id : 6,
          year : 'Năm IV+'
        },
      ]

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

      const zIndex = clampedScroll.interpolate({
        inputRange: [0, 10],
        outputRange: [100, -10],
      })  

      const ScrollToTop = () => {
        listRef.current.scrollToOffset({ animated: true, offset: 0 });
      }

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
      style={{ backgroundColor: '#F2F5FA', height : FULL_HEIGHT }}>
      <View style={styles.topContainer}>
        <View style={{ padding : 10,flexDirection : 'row', justifyContent : 'center',alignItems : 'center', zIndex : 200 }}>     
          <TextInput
              style={styles.input}
          />
          {/* <TouchableOpacity
            style={{ marginRight: 10 }}
          >
            <Icon
              name="search"
              type={"fontawesome"}
              size={25}
              color="white"
            />
          </TouchableOpacity>      */}
          <TouchableOpacity
            style={{ marginRight: 10 }}
          >
            <MaterialIcons name="sort" size={25} color="white" />
          </TouchableOpacity>
          <TouchableOpacity
            style={{ marginRight: 10 }}
            onPress={() => setIsFilter(true)}
          >
            <AntDesign name="filter" size={25} color="white" />
          </TouchableOpacity>     
          <Modal
            animationType="slide"
            transparent={true}
            visible={isFilter}
          >
            <View style={styles.filterModal}>
              <View style={{ justifyContent : 'center' }}>
                <Text style={{
                  fontSize : 20,
                  fontWeight : 'bold',
                  alignSelf : 'center',
                  paddingVertical : 10
                }}>Bộ lọc</Text>
                
                <TouchableOpacity
                  style={{ 
                    position : 'absolute',
                    right : 20
                  }}
                  onPress={() => setIsFilter(false)}
                >
                  <AntDesign name="close" size={24} color="black" />
                </TouchableOpacity> 
              </View>
              <TouchableOpacity style={{
                flexDirection : 'row',
                alignItems : 'center',
                borderWidth : 1,
                opacity : 0.5,
                marginHorizontal : 25,
                borderRadius : 25,
                paddingVertical : 10,
                paddingLeft : 10
              }}>
                <Ionicons name="search" size={24} color="black" />
                <Text style={{ fontSize : 18, marginLeft : 5 }}>Thêm trường</Text>
              </TouchableOpacity>
              <View style={{ marginTop : 10 }}>
                <Text style={{ fontSize : 16, marginLeft : 25, fontWeight : 'bold', opacity : 0.6 }}>Khoản tiền</Text>
                <View style={{ marginHorizontal : 40, marginTop : 20 }}>
                  <View style={{ flexDirection : 'row', justifyContent : 'space-between'}}>
                    <Text style={{ fontSize : 15, fontWeight :'bold' }}>{multiSliderValue[0]}</Text>
                    <Text style={{ fontSize : 15, fontWeight :'bold' }}>{multiSliderValue[1]}</Text>
                  </View>            
                  <MultiSlider
                      values={[multiSliderValue[0], multiSliderValue[1]]}
                      sliderLength={FULL_WIDTH - 80}
                      onValuesChange={multiSliderValuesChange}
                      min={50000}
                      max={100000000}
                      step={50000}   
                      markerStyle={{ height : 20, width : 20}}
                    />
                </View>   
              </View>
              <View style={{ marginTop : 20, flexDirection : 'row', justifyContent : 'space-between', marginHorizontal : 25 }}>
                <Text style={{ fontSize : 16, fontWeight : 'bold', opacity : 0.6 }}>Ngành</Text>
                <View style={{ alignItems : 'center', flexDirection : 'row' }}>
                  <Text style={{ fontSize : 16, marginLeft : 25, fontWeight : 'bold', marginRight : 10 }}>Công nghệ thông tin</Text> 
                  <Feather name="edit" size={20} color={PRIMARY_COLOR} />
                </View>
                
              </View>
              <View style={{ marginTop : 20, flexDirection : 'row', justifyContent : 'space-between', marginHorizontal : 25 }}>
                <Text style={{ fontSize : 16, fontWeight : 'bold', opacity : 0.6 }}>Chuyên ngành</Text>
                <View style={{ alignItems : 'center', flexDirection : 'row' }}>
                  <Text style={{ fontSize : 16, marginLeft : 25, fontWeight : 'bold', marginRight : 10 }}>Kỹ thuật phần mềm</Text> 
                  <Feather name="edit" size={20} color={PRIMARY_COLOR} />
                </View>
              </View>
              <View style={{ marginTop : 20 }}>
                <Text style={{ fontSize : 16, marginLeft : 25, fontWeight : 'bold', opacity : 0.6 }}>Năm học</Text>
                <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                  {
                    yearStudies.map(year =>{ 
                      return (
                        <TouchableOpacity key={year.id}>
                          <View style={styles.yearItems}>
                            <Text style={{ color : PRIMARY_COLOR_BLACK, alignSelf : 'center',fontSize : 16, zIndex : 200 }}>{year.year}</Text>
                          </View>
                        </TouchableOpacity>
                      )
                    })
                  }
                </ScrollView>
                
              </View>
            </View>
          </Modal>
        </View>

        <View style={{
          position : 'absolute',
          bottom : -10,
          backgroundColor : PRIMARY_COLOR,
          height : 100,
          width : FULL_WIDTH / 1.1,
          alignSelf : 'center',
          opacity : 0.3,
          borderRadius : 10,
        }}/> 
        <View style={{
          position : 'absolute',
          bottom : -20,
          backgroundColor : PRIMARY_COLOR,
          height : 100,
          width : FULL_WIDTH / 1.2,
          alignSelf : 'center',
          opacity : 0.15,
          borderRadius : 10,
        }}/> 
      </View>
     
      <Animated.FlatList
        onScroll={Animated.event(
          [{ nativeEvent : { contentOffset : { y : scrollY }}}],
          { useNativeDriver : true }
        )}
        data={filterdData}
        renderItem={_renderItem}
        ref={listRef}
        keyExtractor={(item) => item.id.toString()}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingTop : 20 , paddingBottom : 50 }}
      />
      <Animated.View style={[styles.toTopBotton,{opacity},{zIndex}]}>
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
    borderRadius: 5,
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
    backgroundColor : PRIMARY_COLOR,
    width : FULL_WIDTH,
    marginTop : FULL_HEIGHT / 34,
    zIndex : -100
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
    width : FULL_WIDTH - 100,
    height : 40,
    backgroundColor : PRIMARY_COLOR_WHITE,
    borderRadius : 5,
    marginRight : 10,
    paddingHorizontal : 5,
    fontSize : 18,
    marginLeft : 15
  },
  toTopBotton : {
    position : 'absolute',
    bottom : FULL_HEIGHT / 8,
    right : 15,
    height : 60,
    width : 60,
    borderRadius : 10,
    backgroundColor : '#dadee3',
    alignItems : 'center',
    justifyContent : 'center',
  },
  topContainer : {
    height : FULL_HEIGHT * 0.3 / 3,
    backgroundColor : PRIMARY_COLOR,
    borderBottomLeftRadius : 25,
    borderBottomRightRadius : 25
  },
  filterModal : {
    width : FULL_WIDTH,
    height : FULL_HEIGHT,
    backgroundColor : PRIMARY_COLOR_WHITE,
    borderTopLeftRadius : 25,
    borderTopRightRadius : 25
  },
  yearItems : {
    width : 80,
    height : 40 ,
    borderRadius : 5 , 
    borderWidth : 1.5,
    borderColor : '#b8b2b2',
    justifyContent : 'center',
    margin : 10,
    backgroundColor : '#f7f5f5'
  }
});
