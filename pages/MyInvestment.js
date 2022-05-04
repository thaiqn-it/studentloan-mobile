import React, { useEffect, useState,useContext } from 'react'
import { useIsFocused } from "@react-navigation/native";
import { StyleSheet, Text, View,FlatList,TouchableOpacity, Image } from 'react-native'
import { FULL_HEIGHT, FULL_WIDTH, PRIMARY_COLOR, PRIMARY_COLOR_BLACK, PRIMARY_COLOR_WHITE, PRIMARY_FONT } from '../constants/styles';
import { Avatar } from 'react-native-elements';
import { Icon } from 'react-native-elements/dist/icons/Icon';
import * as Progress from 'react-native-progress';
import { FontAwesome5 } from "@expo/vector-icons";
import { investmentApi } from '../apis/investment';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function MyInvestment({ navigation }) {
      const [dataItems, setDataItems] = useState([]);
      const isFocused = useIsFocused();

      useEffect(() => {
        investmentApi
          .findAllByInvestorId()
          .then(res => {
            setDataItems(res.data)
          })
      }, [isFocused]);


      const convertType = (type) => {
        var result = "";
        switch(type) {
          case "FUNDING":
            result = "Đang kêu gọi"
            break;
          case "FINISH":
            result = "Hoàn thành"
            break;
          case "ONGOING":
            result = "Đang tiến hành"
            break;
          case "FAIL":
            result = "Kêu gọi thất bại"
            break;
        }
        return result
      }
      

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
              <View style={{ position : 'absolute', top : 0, right : 0 , zIndex : 1000, backgroundColor : PRIMARY_COLOR_WHITE, borderRadius : 2, paddingHorizontal : 5}}>
                <Text style={{ fontWeight : 'bold', fontSize : 13 }}>{convertType(item.Loan.Status)}</Text>
              </View>
              <Image source={{ 
                uri: item.Loan.Student.User.profileUrl ? item.Loan.Student.User.profileUrl : 'https://images.unsplash.com/photo-1511367461989-f85a21fda167?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NXx8cHJvZmlsZXxlbnwwfHwwfHw%3D&w=1000&q=80'
               }}
                     style={{ width : FULL_WIDTH / 2.1, height : 100, alignSelf : 'center',borderTopLeftRadius : 5, borderTopRightRadius : 5 }}/> 
              <View style={{ flexDirection : 'row', alignContent : 'flex-start', paddingVertical : 10, paddingHorizontal : 5 }}>
                <View style={{ marginLeft : 10 }}>
                  <Text style={{ fontSize : 14 , width : FULL_WIDTH / 2 - 30}}>{item.Loan.Student.User.firstname + " " + item.Loan.Student.User.lastname}</Text>
                  <Text style={{ opacity : 0.5,fontSize : 12,width : FULL_WIDTH / 2 - 30 }}>{item.Loan.Student.Information.SchoolMajor.School.name}</Text>
                </View>         
              </View>
              <Progress.Bar progress={paidPercent/100} width={FULL_WIDTH / 2 - 20} style={{ alignSelf : 'center', margin : 5}} color={PRIMARY_COLOR} />  
              <Text style={{ fontSize : 12, alignSelf : 'center', margin : 5 }}>Sinh viên đã trả {paidPercent}% khoảng vay</Text>  
          </TouchableOpacity>
        );
      }
    return (
        <SafeAreaView style={{ flex : 1, backgroundColor : PRIMARY_COLOR_WHITE }}>
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
                data={dataItems}
                renderItem={_renderItem}
                keyExtractor={(item) => item.id.toString()}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ paddingBottom : 30, marginTop : 10 }}
            />
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container : {
        margin : 5,
        borderRadius: 5,
        backgroundColor: PRIMARY_COLOR_WHITE,
        elevation : 5,
        flex : 0.5
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
