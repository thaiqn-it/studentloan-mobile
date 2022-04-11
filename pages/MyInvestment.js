import React, { useEffect, useState,useContext } from 'react'
import { StyleSheet, Text, View,FlatList,TouchableOpacity, Image } from 'react-native'
import { FULL_HEIGHT, FULL_WIDTH, PRIMARY_COLOR, PRIMARY_COLOR_BLACK, PRIMARY_COLOR_WHITE, PRIMARY_FONT } from '../constants/styles';
import { Avatar } from 'react-native-elements';
import { Icon } from 'react-native-elements/dist/icons/Icon';
import * as Progress from 'react-native-progress';
import { FontAwesome5 } from "@expo/vector-icons";
import { investmentApi } from '../apis/investment';

export default function MyInvestment({ navigation }) {
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

          {
            id: 6,
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
            id: 7,
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
            id: 8,
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
        investmentApi
          .findAllByInvestorId()
          .then(res => {
            setDataItems(res.data)
          })
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
        const totalPaid = parseInt(item.Loan.totalMoney) + parseInt(item.Loan.totalMoney * item.Loan.interest * item.Loan.duration)
        const totalReceive = totalPaid * item.percent
        const paidReceive = (parseInt(item.Loan.PaidMoney) * item.percent)
        const paidPercent = ((paidReceive / totalReceive) * 100).toFixed(0)
      
        return (
          <TouchableOpacity
            onPress={() => navigation.navigate("DetailPost", {
              id : item.Loan.id
            })}
            style={styles.container}>
              <Image source={{ 
                uri: item.Loan.Student.User.profileUrl ? item.Loan.Student.User.profileUrl : 'https://images.unsplash.com/photo-1511367461989-f85a21fda167?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NXx8cHJvZmlsZXxlbnwwfHwwfHw%3D&w=1000&q=80'
               }}
                     style={{ width : FULL_WIDTH / 2 - 10, height : 100, alignSelf : 'center',borderTopLeftRadius : 5, borderTopRightRadius : 5 }}/> 
              <View style={{ flexDirection : 'row', alignContent : 'flex-start', paddingVertical : 10, paddingHorizontal : 5 }}>
                <View style={{ marginLeft : 10 }}>
                  <Text style={{ fontSize : 14 , width : FULL_WIDTH / 2 - 30}}>{item.Loan.Student.User.firstname + " " + item.Loan.Student.User.lastname}</Text>
                  <Text style={{ opacity : 0.5,fontSize : 12,width : FULL_WIDTH / 2 - 30 }}>{item.Loan.Student.SchoolMajor.School.name}</Text>
                </View>         
              </View>
              <Progress.Bar progress={paidPercent/100} width={FULL_WIDTH / 2 - 20} style={{ alignSelf : 'center', margin : 5}} color={PRIMARY_COLOR} />  
              <Text style={{ fontSize : 12, alignSelf : 'center', margin : 5 }}>Sinh viên đã trả {paidPercent}% khoảng vay</Text>  
          </TouchableOpacity>
        );
      }
    return (
        <View>
            <View style={styles.topContainer}>
              <View style={{ padding : 10,flexDirection : 'row', zIndex : 200, justifyContent : 'center' }}>     
                <TouchableOpacity
                  style={{ flexDirection : 'row', alignSelf : 'center', position : 'absolute', left : 20, alignItems : 'center' }}
                  onPress={() => {
                    navigation.goBack(); 
                  }}
                >
                    <FontAwesome5
                      name={"chevron-left"}
                      size={20}
                      style={{ width: 30 }}
                      color={"white"}
                    />     
                </TouchableOpacity>     
                <Text style={{ fontSize : 20, color : PRIMARY_COLOR_WHITE, alignSelf : 'center'}}>Các khoản đầu tư</Text>   
              </View>
            </View>
            <FlatList
                numColumns={2}
                data={filterdData}
                renderItem={_renderItem}
                keyExtractor={(item) => item.id.toString()}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ paddingBottom : 120, marginTop : 10 }}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container : {
        margin : 5,
        borderRadius: 5,
        backgroundColor: PRIMARY_COLOR_WHITE,
        elevation : 5,
        flex : 0.48
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
      },
      topContainer : {
        height : FULL_HEIGHT * 0.3 / 4,
        backgroundColor : PRIMARY_COLOR,
        borderBottomLeftRadius : 25,
        borderBottomRightRadius : 25,
      },
})
