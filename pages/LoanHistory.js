import { StyleSheet, Text, View,TouchableOpacity, Image, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import { FULL_HEIGHT, FULL_WIDTH, PRIMARY_COLOR, PRIMARY_COLOR_WHITE } from '../constants/styles';
import { FontAwesome5 } from "@expo/vector-icons";
import { loanHistoryApi } from '../apis/loanHistory';
import moment from 'moment';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function LoanHistory({ navigation, route }) {
    const { loanId } = route.params
    const [loanHistory,setLoanHistory] = useState(null)
   
    useEffect(() => {
        loanHistoryApi.findOneByLoanId(loanId).then(res => {
            setLoanHistory(res.data)
        })
    }, [])

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
                <Text style={{ fontSize : 20, color : PRIMARY_COLOR_WHITE, alignSelf : 'center'}}>Chứng thực bài vay</Text>   
                </View>
            </View>
            {
                loanHistory && (
                    <ScrollView>
                        <View style={{ margin : 20, elevation :5 , backgroundColor : PRIMARY_COLOR_WHITE , borderRadius : 10, padding : 10, flexDirection : 'row'}}>
                            <View style={{ flex : 0.35 }}>
                                <Image source={require('../assets/shield.png')} style={{ width : 100, height : 100 }}/>
                            </View> 
                            <View style={{ flex : 0.65 }}>
                                <Text style={{ fontSize : 15, fontWeight : 'bold' }}>{loanHistory?.description}</Text>
                                <Text style={{ marginTop : 15, fontSize : 15, opacity : 0.6 }}>Duyệt bởi : {loanHistory?.User?.firstname + ' ' + loanHistory?.User?.lastname}</Text>
                                <Text style={{ marginTop : 5, fontSize : 15, opacity : 0.6 }}>Ngày : {moment(loanHistory?.createdAt).format('DD/MM/YYYY')}</Text>                    
                            </View>   
                        </View>
                        {
                            loanHistory?.LoanHistoryImages?.map((item,index) => (
                                <View key={index} style={{ margin: 10, elevation : 5, borderRadius : 10, backgroundColor : PRIMARY_COLOR_WHITE }}>
                                    <Image 
                                    source={{ uri : item.imageUrl }}
                                    style={{
                                        width : FULL_WIDTH - 20,
                                        height : FULL_HEIGHT / 1.5
                                    }}
                                    />
                                    <Text style={{
                                    padding : 10
                                    }}>{item.description}</Text>
                                </View>
                            ))
                        }
                    </ScrollView>
                )                
            }      
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    topContainer : {
        height : FULL_HEIGHT * 0.3 / 4,
        backgroundColor : PRIMARY_COLOR,
        borderBottomLeftRadius : 25,
        borderBottomRightRadius : 25,
    }
})