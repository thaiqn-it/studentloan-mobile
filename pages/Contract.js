import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { FULL_HEIGHT, PRIMARY_COLOR, PRIMARY_COLOR_WHITE, SECONDARY_COLOR } from '../constants/styles';
import { FontAwesome5 } from "@expo/vector-icons";
import { vndFormat } from "../utils/index";
import { FlatList } from 'react-native-gesture-handler';
import { contractApi } from '../apis/contract';
import moment from 'moment'

export default function Contract({ navigation, route }) {
    const [contractList,setContractList] = useState([])

    useEffect(() => {
      contractApi.getByInvestorId().then(res => {
        setContractList(res.data.contracts)
      })
    }, [])
    
    const contractItem = ({item}) => (
        <TouchableOpacity style={styles.item} onPress={() => navigation.navigate("ContractDetail",{
          contractUrl : item.contractUrl
        })}>
            <View style={{ flexDirection : 'row' }}>
                <Text style={{ fontSize : 16 }}>Số hợp đồng : </Text>
                <Text style={{ fontSize : 16, fontWeight : 'bold' }}>{item.contractCode}</Text>
            </View>
            <View style={{ borderBottomWidth : 0.6, opacity : 0.2, marginVertical : 10 }}/>
            <View style={{ flexDirection : 'row', justifyContent : 'space-between' }}>
                <Text style={{ fontSize : 16, fontWeight : 'bold', color : SECONDARY_COLOR, flex : 0.65 }}>
                  {item.Investment.Loan.Student.User.firstName + " " + item.Investment.Loan.Student.User.lastName}
                </Text>
                <Text style={{ fontSize : 16, fontWeight : 'bold', flex : 0.35 }}>Đang thực hiện</Text>
            </View>
            <Text style={{ fontSize : 14, opacity : 0.5, marginTop: 5 }}>
              Từ {moment(item.Investment.Loan.loanStartAt).format("DD/MM/YYYY")} - {moment(item.Investment.Loan.loanEndAt).format("DD/MM/YYYY")} 
            </Text>
            <View style={{ flexDirection : 'row', justifyContent : 'space-between', marginTop : 15 }}>
                <Text style={{ fontSize : 16 }}>Khoản đầu tư</Text>
                <Text style={{ fontSize : 16 }}>{vndFormat.format(item.Investment.total)}</Text>
            </View>
            <View style={{ flexDirection : 'row', justifyContent : 'space-between', marginTop : 10 }}>
                <Text style={{ fontSize : 16 }}>Lãi suất</Text>
                <Text style={{ fontSize : 16 }}>{item.Investment.Loan.interest*100}%</Text>
            </View>
      </TouchableOpacity>
    )

  return (
    <View style={{ flex : 1, backgroundColor : PRIMARY_COLOR_WHITE }}>
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
          <Text style={{ fontSize : 20, color : PRIMARY_COLOR_WHITE, alignSelf : 'center'}}>Hợp đồng cho vay</Text>   
        </View>
      </View>
      {
        contractList.length > 0
        ?
        <FlatList
          data={contractList}
          renderItem={contractItem}
          keyExtractor={(item) => item.id.toString()}
          showsVerticalScrollIndicator={false}
        />
        :
        <Text>Bạn không có hợp đồng nào</Text>
      }     
    </View>
  )
}

const styles = StyleSheet.create({
    topContainer : {
        height : FULL_HEIGHT * 0.3 / 4,
        backgroundColor : PRIMARY_COLOR,
        borderBottomLeftRadius : 25,
        borderBottomRightRadius : 25,
    },
    item : {
        margin : 15,
        backgroundColor : PRIMARY_COLOR_WHITE,
        borderRadius : 5,
        elevation : 5,
        padding : 10
    }
})