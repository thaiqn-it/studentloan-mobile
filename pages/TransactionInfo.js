import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, View,TouchableOpacity } from 'react-native'
import { FULL_WIDTH, PRIMARY_COLOR, PRIMARY_COLOR_WHITE,FULL_HEIGHT } from '../constants/styles'
import { AntDesign,FontAwesome5 } from '@expo/vector-icons';
import { vndFormat } from '../utils';
import { transactionApi } from '../apis/transaction';
import moment from "moment"

export default function TransactionInfo({ navigation, route}) {
    const { transactionId } = route.params
    const [ transaction,setTransaction ] = useState({})

    useEffect(() => {
        transactionApi
            .getById(transactionId)
            .then(res => {
                setTransaction(res.data)
            })
    }, [])

    const convertType = (type) => {
        var result = "";
        switch(type) {
          case "TOPUP":
            result = "Nạp tiền"
            break;
          case "WITHDRAW":
            result = "Rút tiền"
            break;
          case "TRANSFER":
            result = "Chuyển tiền"
            break;
          case "RECEIVE":
            result = "Nhận tiền"
            break;
        }
        return result
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
                <Text style={{ fontSize : 20, color : PRIMARY_COLOR_WHITE, alignSelf : 'center'}}>Thông tin giao dịch</Text>   
                </View>
            </View>
            <View style={styles.mainContainer}>
                <View style={{ flexDirection : 'row', justifyContent: 'space-between', alignItems : 'center'}}>
                    <Text style={{ fontSize : 17, margin : 10 }}>SỐ TIỀN</Text>
                    <Text style={{ fontSize : 20, fontWeight : 'bold', marginHorizontal : 10}}>{vndFormat.format(transaction?.money)}</Text>
                </View>
                <View style={{ flexDirection : 'row', backgroundColor : '#47ffb3', margin : 10, borderRadius : 10, paddingHorizontal : 10 }}>
                    <View style={{ alignSelf : 'center', backgroundColor : '#03A678', borderRadius : 15}}>
                        <AntDesign name="check" size={20} color="white" />
                    </View>             
                    <Text style={{ fontSize : 17, margin : 10, opacity : 0.6 }}>{transaction?.status}</Text>
                </View>
                <View style={{ flexDirection : 'row', justifyContent : 'space-between', margin : 10}}>
                    <Text style={styles.leftText}>Giao dịch ngày</Text>
                    <Text style={styles.rightText}>{moment(transaction?.createdAt).format('DD/MM/YYYY')}</Text>
                </View>
                <View style={{ flexDirection : 'row', justifyContent : 'space-between', margin : 10}}>
                    <Text style={styles.leftText}>Hình thức giao dịch</Text>
                    <Text style={styles.rightText}>{convertType(transaction?.type)}</Text>
                </View>
                <View style={styles.line}/>
                <View style={{ flexDirection : 'row', justifyContent : 'space-between', margin : 10 }}>
                    <Text style={styles.leftText}>Nguồn tiền</Text>
                    <Text style={styles.rightText}>{transaction?.senderName}</Text>
                </View>
                <View style={styles.line}/>
                <View style={{ flexDirection : 'row', justifyContent : 'space-between', margin : 10 }}>
                    <Text style={styles.leftText}>Người nhận</Text>
                    <Text style={styles.rightText}>{transaction?.recipientName}</Text>
                </View>
                <View style={styles.line}/>
                <View style={{ flexDirection : 'row', justifyContent : 'space-between', margin : 10 }}>
                    <Text style={styles.leftText}>Phí giao dịch</Text>
                    <Text style={styles.rightText}>{vndFormat.format(transaction?.transactionFee)}</Text>
                </View>
            </View>
            <View style={styles.descriptionContainer}>
                <Text style={{ fontSize : 17, margin : 10, fontWeight : 'bold' }}>Mô tả</Text>
                <View style={styles.line}/>
                <Text style={{ fontSize : 17, margin : 10 }}>{transaction?.description}</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    mainContainer : {
        margin : 10,
        elevation : 5,
        backgroundColor : PRIMARY_COLOR_WHITE,
        borderRadius : 5,
        marginTop : 30
    },
    line : { 
        borderBottomWidth : 1, 
        borderBottomColor : '#dadee3',
        width : FULL_WIDTH / 1.1, 
        alignSelf : 'center',
    },
    leftText : {
        fontSize : 17,
        opacity : 0.6
    },
    rightText : {
        fontSize : 17,
        fontWeight : 'bold'
    },
    descriptionContainer : {
        margin : 10,
        elevation : 5,
        backgroundColor : PRIMARY_COLOR_WHITE,
        borderRadius : 5,
    },
    topContainer : {
        height : FULL_HEIGHT * 0.3 / 4,
        backgroundColor : PRIMARY_COLOR,
        borderBottomLeftRadius : 25,
        borderBottomRightRadius : 25,
    },
})
