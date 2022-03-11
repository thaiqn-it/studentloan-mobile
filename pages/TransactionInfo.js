import React from 'react'
import { StyleSheet, Text, View,TouchableOpacity } from 'react-native'
import { FULL_WIDTH, PRIMARY_COLOR, PRIMARY_COLOR_WHITE,FULL_HEIGHT } from '../constants/styles'
import { AntDesign,FontAwesome5 } from '@expo/vector-icons';
import { vndFormat } from '../utils';

export default function TransactionInfo({ navigation, route}) {
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
                    <Text style={{ fontSize : 20, fontWeight : 'bold', marginHorizontal : 10}}>{vndFormat.format(50000)}</Text>
                </View>
                <View style={{ flexDirection : 'row', backgroundColor : '#47ffb3', margin : 10, borderRadius : 10, paddingHorizontal : 10 }}>
                    <View style={{ alignSelf : 'center', backgroundColor : '#03A678', borderRadius : 15}}>
                        <AntDesign name="check" size={20} color="white" />
                    </View>             
                    <Text style={{ fontSize : 17, margin : 10, opacity : 0.6 }}>Thành công !</Text>
                </View>
                <View style={{ flexDirection : 'row', justifyContent : 'space-between', margin : 10}}>
                    <Text style={styles.leftText}>Giao dịch ngày</Text>
                    <Text style={styles.rightText}>20/10/2023</Text>
                </View>
                <View style={{ flexDirection : 'row', justifyContent : 'space-between', margin : 10}}>
                    <Text style={styles.leftText}>Hình thức giao dịch</Text>
                    <Text style={styles.rightText}>Nạp tiền vào ví</Text>
                </View>
                <View style={styles.line}/>
                <View style={{ flexDirection : 'row', justifyContent : 'space-between', margin : 10 }}>
                    <Text style={styles.leftText}>Nguồn tiền</Text>
                    <Text style={styles.rightText}>Paypal</Text>
                </View>
                <View style={styles.line}/>
                <View style={{ flexDirection : 'row', justifyContent : 'space-between', margin : 10 }}>
                    <Text style={styles.leftText}>Người nhận</Text>
                    <Text style={styles.rightText}>Ví của tôi</Text>
                </View>
                <View style={styles.line}/>
                <View style={{ flexDirection : 'row', justifyContent : 'space-between', margin : 10 }}>
                    <Text style={styles.leftText}>Phí giao dịch</Text>
                    <Text style={styles.rightText}>{vndFormat.format(0)}</Text>
                </View>
            </View>
            <View style={styles.descriptionContainer}>
                <Text style={{ fontSize : 17, margin : 10, fontWeight : 'bold' }}>Mô tả</Text>
                <View style={styles.line}/>
                <Text style={{ fontSize : 17, margin : 10 }}>Nạp tiền vào ví</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    mainContainer : {
        margin : 10,
        elevation : 5,
        backgroundColor : PRIMARY_COLOR_WHITE,
        borderRadius : 10,
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
        borderRadius : 10,
    },
    topContainer : {
        height : FULL_HEIGHT * 0.3 / 4,
        backgroundColor : PRIMARY_COLOR,
        borderBottomLeftRadius : 25,
        borderBottomRightRadius : 25,
    },
})
