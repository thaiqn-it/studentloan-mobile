import React, { useEffect, useState} from 'react'
import { StyleSheet, Text, View,FlatList,TouchableOpacity } from 'react-native'
import { FULL_HEIGHT, FULL_WIDTH, PRIMARY_COLOR, PRIMARY_COLOR_BLACK, PRIMARY_COLOR_WHITE, PRIMARY_FONT } from '../constants/styles';
import { Avatar } from 'react-native-elements';
import { Icon } from 'react-native-elements/dist/icons/Icon';
import * as Progress from 'react-native-progress';

export default function MyInvestment() {
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
                    <Text style={{ backgroundColor : '#dadee3', paddingLeft : 3,paddingRight : 3 , opacity : 0.8,borderRadius : 5, color : PRIMARY_COLOR }}>Processing</Text>
                </View>
              </View>
              <View style={styles.line}/>
              <View style={{ padding : 15, flexDirection : 'row'}}>
                  <View>
                    <Text style={{  fontSize : 15  }}>2.000.000đ</Text>
                    <Text style={{ opacity : 0.5,fontSize : 13 }}>Earned</Text>           
                  </View>
                  <View style={{  alignItems : 'flex-end', flex : 1, fontSize : 13 }}>
                    <Text style={{  fontSize : 15  }}>22.000.000đ</Text>
                    <Text style={{ opacity : 0.5,fontSize : 13 }}>Full amount</Text>  
                  </View>
              </View>
              <Progress.Bar progress={0.8} width={FULL_WIDTH / 1.2} style={{ alignSelf : 'center', margin : 5, marginBottom : 25 }} color={PRIMARY_COLOR} />    
              <View style={styles.line}/>
              <View style={{ padding : 15, flexDirection : 'row'}}>
                  <View>
                    <Text style={{  fontSize : 15  }}>Next repayment in</Text>    
                  </View>
                  <View style={{  alignItems : 'flex-end', flex : 1, fontSize : 13 }}>
                    <Text style={{  fontSize : 15  }}>20/12/2021</Text>
                  </View>
              </View>
          </TouchableOpacity>
        );
      }

    return (
        <View>
            <FlatList
                data={filterdData}
                renderItem={_renderItem}
                keyExtractor={(item) => item.id.toString()}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ paddingTop : FULL_HEIGHT / 9 , paddingBottom : 10 }}
            />
        </View>
    )
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
})
