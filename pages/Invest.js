import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, Text, View, Animated, FlatList,TouchableOpacity, TextInput, Image } from 'react-native';
import { Avatar,CheckBox } from 'react-native-elements';
import { Icon } from 'react-native-elements/dist/icons/Icon';
import SectionedMultiSelect from 'react-native-sectioned-multi-select';
import { FULL_HEIGHT, FULL_WIDTH, PRIMARY_COLOR, PRIMARY_COLOR_BLACK, PRIMARY_COLOR_WHITE, SECONDARY_COLOR } from '../constants/styles';
import * as Progress from 'react-native-progress';
import { Button } from 'react-native-paper';
import * as Animatable from 'react-native-animatable';
import { MaterialIcons,AntDesign,Ionicons,Feather, Entypo } from '@expo/vector-icons';
import MultiSlider from '@ptomasroos/react-native-multi-slider';
import { vndFormat } from '../utils'
import RBSheet from "react-native-raw-bottom-sheet";
import { loanApi } from '../apis/loan';
import { ScrollView } from 'react-native-gesture-handler';
import { schoolApi } from '../apis/school';
import { majorApi } from '../apis/major';
import moment from 'moment';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function Invest({ navigation, route }) {
    const scrollY = useRef(new Animated.Value(0)).current;
    const input_tranlate_x = useRef(null)
    const listRef = useRef(null)
    const [isFilter,setIsFilter]=useState(false)
    const [multiSliderValue, setMultiSliderValue] = useState([50000, 100000000]);
    const [page,setPage] = useState(1)
    const [loans,setLoans] = useState([]);

    const topContainerRef = useRef(null)
    const pickerRef = useRef(null)
    const sortByRef = useRef(null)

    const [schoolFilter,setSchoolFilter] = useState([])
    const [majorFilter,setMajorFilter] = useState([])

    const [schools,setSchools] = useState([])
    const [majors,setMajors] = useState([])

    const [sort,setSort] = useState('')
    const [searchText,setSearchText] = useState('')

    const multiSliderValuesChange = values => setMultiSliderValue(values);

    const sortOption = [
      {
        id : 1,
        iconType : 'material-community',
        iconName : 'sort-numeric-descending',
        text : 'S??? ti???n gi???m d???n',
        code : 'moneyDown'
      },
      {
        id : 2,
        iconType : 'material-community',
        iconName : 'sort-numeric-ascending',
        text : 'S??? ti???n t??ng d???n',
        code : 'moneyUp'
      },
      {
        id : 3,
        iconType : 'feather',
        iconName : 'corner-left-up',
        text : 'M???i nh???t',
        code : 'lastest'
      },
      {
        id : 4,
        iconType : 'feather',
        iconName : 'corner-left-down',
        text : 'C?? nh???t',
        code : 'oldest'
      },
    ]

    useEffect(() => {
      loanApi.search({
        page
      }).then(res => {
        setLoans(res.data)
      })
    }, []);

    useEffect(() => {
      schoolApi.getAll().then((res) => {
        setSchools(res.data)
      })
      majorApi.getAll().then(res => {
        setMajors(res.data)
      })
    }, [])
    
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

    const searchHandler = () => {
      loanApi.search({
        page : 1,
        schools : schoolFilter,
        majors : majorFilter,
        minMoney : multiSliderValue[0],
        maxMoney : multiSliderValue[1],
        sort,
        text : searchText
      }).then(res => {
        setLoans(res.data)
        pickerRef.current.close()
        sortByRef.current.close()
      })
    }

    const sortItem = ({item}) => {   
      return (
        <TouchableOpacity style={{ flexDirection : 'row', marginVertical  : 10, marginHorizontal : 40, justifyContent : 'space-between', marginTop : 20 }} onPress={() => {
          setSort(item.code)
        }}>
          <View style={{ flexDirection : 'row'}}>
            <Icon 
              type={item.iconType} 
              name={item.iconName}
              color={PRIMARY_COLOR_BLACK}
            /> 
            <Text style={{ fontSize : 16, fontWeight : 'bold', marginLeft : 15 }}>{item.text}</Text>
          </View>
          {
            sort === item.code && (
              <Icon 
                type={'ionicon'} 
                name={'checkmark-circle-outline'}
                color={PRIMARY_COLOR}
              />
            )
          }            
        </TouchableOpacity>
      )
    }

  function _renderItem({ item }) {
    return (
      <TouchableOpacity
          onPress={() => navigation.navigate("DetailPost", { 
            id : item.id        
          })}
          style={styles.container}>
            <View style={{ flexDirection : 'row', padding : 15}}> 
              <View style={{ flexDirection : 'row', alignContent : 'flex-start', flex : 0.8 }}>
                <Avatar
                  rounded
                  size={50}
                  source={{
                    uri: item.Student.User.profileUrl ? item.Student.User.profileUrl : 'https://images.unsplash.com/photo-1511367461989-f85a21fda167?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NXx8cHJvZmlsZXxlbnwwfHwwfHw%3D&w=1000&q=80'
                  }}
                />
                <View style={{ marginLeft : 10 }}>
                  <Text style={{ fontSize : 15 }}>{item.Student.User.firstname + ' ' + item.Student.User.lastname}</Text>
                  <Text style={{ opacity : 0.5,fontSize : 13 }}>{item?.Student?.Information?.SchoolMajor?.School.name}</Text>
                  <Text style={{ opacity : 0.5,fontSize : 13 }}>{item?.Student?.Information?.SchoolMajor?.Major.name}</Text>
                </View>         
              </View>
              <View style={{ alignItems : 'flex-end', flex : 0.2}}>
                  <Text style={{ backgroundColor : '#dadee3', paddingLeft : 3,paddingRight : 3 , opacity : 0.8,borderRadius : 5 }}>K???t th??c</Text>
                  <Text style={{ textAlign : 'right'}}>trong {moment(item.postExpireAt).diff(new Date(),"days")} ng??y</Text>
              </View>
            </View>

            <View style={styles.line}/>
            <View style={{ padding : 15, flexDirection : 'row'}}>
                <View>
                  <Text style={{  fontSize : 15  }}>{item.AccumulatedMoney === null ? vndFormat.format(item.totalMoney) : vndFormat.format(item.totalMoney - item.AccumulatedMoney)}</Text>
                  <Text style={{ opacity : 0.5,fontSize : 13 }}>Kho???n ti???n c?? th??? ?????u t??</Text>           
                </View>
                <View style={{  alignItems : 'flex-end', flex : 1, fontSize : 13 }}>
                  <Text style={{  fontSize : 15  }}>{vndFormat.format(item.totalMoney)}</Text>
                  <Text style={{ opacity : 0.5,fontSize : 13 }}>T???ng ti???n</Text>  
                </View>
            </View>
            <Progress.Bar progress={item.AccumulatedMoney/item.totalMoney} width={FULL_WIDTH / 1.2} style={{ alignSelf : 'center', margin : 5, marginBottom : 25 }} color={PRIMARY_COLOR} />    
            <View style={styles.line}/>
            <View style={{ padding : 15, flexDirection : 'row' }}>
              <View>
                <Text style={{ marginBottom : 5,fontSize : 14 }}>L??i su???t</Text>
                <Text style={{ fontSize : 14 }}>Th???i h???n</Text>
                  
              </View>
              <View style={{ flex : 1 , alignItems : 'flex-end' }}>
                <Text style={{ marginBottom : 5,fontSize : 14 }}>{item.interest * 100}%</Text>
                <Text style={{ fontSize : 14 }}>{item.duration} th??ng</Text>
              </View>
            </View> 
        </TouchableOpacity>
    );
  }

  return (
    <SafeAreaView
      style={{ backgroundColor: '#F2F5FA', height : FULL_HEIGHT, flex : 1 }}>
      <View style={styles.topContainer} ref={topContainerRef}>
        <View style={{ padding : 10,flexDirection : 'row', justifyContent : 'center',alignItems : 'center', zIndex : 200 }}>     
          <TextInput
              style={styles.input}
              placeholder={'T??m ki???m'}
              value={searchText}
              onChangeText={(value) => setSearchText(value)}
              onSubmitEditing={() => searchHandler()}
          />
          <TouchableOpacity onPress={() => sortByRef.current.open()}
            style={{ marginRight: 10 }}
          >
            <MaterialIcons name="sort" size={25} color="white" />
          </TouchableOpacity>
          <TouchableOpacity
            style={{ marginRight: 10 }}
            onPress={() => pickerRef.current.open()}
          >
            <AntDesign name="filter" size={25} color="white" />
          </TouchableOpacity>     
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
        
        <RBSheet
            ref={pickerRef}
            keyboardAvoidingViewEnabled={true}
            closeOnDragDown={true}
            closeOnPressMask={true}
            height={FULL_HEIGHT * 2 / 3}
            customStyles={{
                container : {
                    borderTopLeftRadius : 20,
                    borderTopRightRadius : 20
                }
            }}
        >       
            <ScrollView style={styles.filterModal}>
              <View style={{ justifyContent : 'center' }}>
                <Text style={{
                  fontSize : 20,
                  fontWeight : 'bold',
                  alignSelf : 'center',
                  paddingVertical : 5
                }}>B??? l???c</Text>
                <TouchableOpacity
                  style={{ 
                    position : 'absolute',
                    left : 20
                  }}
                  onPress={() => pickerRef.current.close()}
                >
                  <AntDesign name="close" size={25} color="black" />
                </TouchableOpacity>
                <TouchableOpacity
                  style={{ 
                    position : 'absolute',
                    right : 20
                  }}
                  onPress={() => searchHandler()}
                >
                  <AntDesign name="check" size={25} color={SECONDARY_COLOR} />
                </TouchableOpacity> 
              </View>
              <View style={{ marginTop : 5 }}>
                <Text style={{ fontSize : 16, marginLeft : 25, fontWeight : 'bold', opacity : 0.6 }}>Kho???n ti???n</Text>
                <View style={{ marginHorizontal : 40, marginTop : 20 }}>
                  <View style={{ flexDirection : 'row', justifyContent : 'space-between'}}>
                    <Text style={{ fontSize : 15, fontWeight :'bold' }}>{vndFormat.format(multiSliderValue[0])}</Text>
                    <Text style={{ fontSize : 15, fontWeight :'bold' }}>{vndFormat.format(multiSliderValue[1])}</Text>
                  </View>            
                  <MultiSlider
                      values={[multiSliderValue[0], multiSliderValue[1]]}
                      sliderLength={FULL_WIDTH - 80}
                      onValuesChange={multiSliderValuesChange}
                      min={500000}
                      max={200000000}
                      step={50000}   
                      markerStyle={{ height : 20, width : 20}}
                    />
                </View>   
              </View>
              <View style={{ marginHorizontal : 15 }}>
                  <SectionedMultiSelect
                    items={schools}
                    IconRenderer={Icon}
                    uniqueKey="id"
                    searchPlaceholderText='Tr?????ng'
                    selectText="Ch???n tr?????ng"
                    showDropDowns={true}
                    onSelectedItemsChange={(selectedItems) => setSchoolFilter(selectedItems)}
                    selectedItems={schoolFilter}
                    confirmText={'Ch???n'}
                    selectedText={'???? ch???n'}
                  />
              </View>
              <View style={{ marginHorizontal : 15 }}>
                  <SectionedMultiSelect
                    items={majors}
                    IconRenderer={Icon}
                    uniqueKey="id"
                    searchPlaceholderText='Ng??nh'
                    selectText="Ch???n ng??nh"
                    showDropDowns={true}
                    onSelectedItemsChange={(selectedItems) => setMajorFilter(selectedItems)}
                    selectedItems={majorFilter}
                    confirmText={'Ch???n'}
                    selectedText={'???? ch???n'}
                  />
              </View>
                
              {/* <View style={{ marginTop : 20, flexDirection : 'row', justifyContent : 'space-between', marginHorizontal : 25 }}>
                <Text style={{ fontSize : 16, fontWeight : 'bold', opacity : 0.6, flex : 0.6 }}>Th???i h???n vay</Text>
                <TouchableOpacity style={{ alignItems : 'center', flexDirection : 'row', flex : 0.4, justifyContent : 'flex-end' }}>
                  <Text style={{ fontSize : 16, marginLeft : 25, fontWeight : 'bold', marginRight : 5 }}>36 th??ng</Text> 
                  <Feather name="edit" size={20} color={PRIMARY_COLOR} />
                </TouchableOpacity>
              </View> */}
            </ScrollView>
        </RBSheet>          

         <RBSheet
            ref={sortByRef}
            keyboardAvoidingViewEnabled={true}
            closeOnDragDown={true}
            closeOnPressMask={true}
            height={FULL_HEIGHT * 2 / 3}
            customStyles={{
                container : {
                    borderTopLeftRadius : 20,
                    borderTopRightRadius : 20
                }
            }}
        >       
            <View style={styles.filterModal}>
              <View style={{ justifyContent : 'center' }}>
                <Text style={{
                  fontSize : 20,
                  fontWeight : 'bold',
                  alignSelf : 'center',
                  paddingVertical : 5
                }}>S???p x???p</Text>
                <TouchableOpacity
                  style={{ 
                    position : 'absolute',
                    left : 20
                  }}
                  onPress={() => sortByRef.current.close()}
                >
                  <AntDesign name="close" size={25} color="black" />
                </TouchableOpacity>
                <TouchableOpacity
                  style={{ 
                    position : 'absolute',
                    right : 20
                  }}
                  onPress={() => searchHandler()}
                >
                  <AntDesign name="check" size={25} color={SECONDARY_COLOR} />
                </TouchableOpacity> 
              </View>
              <FlatList
                data={sortOption}
                renderItem={sortItem}
                keyExtractor={(item) => item.id.toString()}
                showsVerticalScrollIndicator={false}
              />
            </View>
        </RBSheet>        
      </View>
      {
        loans.length > 0
        ?
          <Animated.FlatList
            onScroll={Animated.event(
              [{ nativeEvent : { contentOffset : { y : scrollY }}}],
              { useNativeDriver : true }
            )}
            data={loans}
            renderItem={_renderItem}
            ref={listRef}
            keyExtractor={(item) => item.id.toString()}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ marginTop : 20 , paddingBottom : 50 }}
          />
        :
        <View style={{ justifyContent : 'center', flex : 1,alignItems : 'center' }}>
            <Image source={require('../assets/no-results.png')} style={{ height : FULL_HEIGHT / 2.3, width : FULL_WIDTH / 1.2  }}/>
            <Text style={{ fontWeight : 'bold', fontSize : 18, textAlign : 'center', marginTop : 30 }}>Kh??ng t??m th???y k???t qu??? n??o. Vui l??ng th??? l???i</Text>
        </View>
      }
      {
        loans.length > 0
        &&
        (
          <Animated.View style={[styles.toTopBotton,{opacity},{zIndex}]}>
            <TouchableOpacity onPress={ScrollToTop}>
              <MaterialIcons name="keyboard-arrow-up" size={40} color="black" />
            </TouchableOpacity>
          </Animated.View>
        )
      }    
    </SafeAreaView>
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
    borderBottomRightRadius : 25,
  },
  filterModal : {
    width : FULL_WIDTH,
    height : FULL_HEIGHT / 2,
    backgroundColor : PRIMARY_COLOR_WHITE,
  },
});
