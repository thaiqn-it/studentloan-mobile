import { StyleSheet, Text, View, TouchableOpacity,ActivityIndicator } from 'react-native'
import React, { useState } from 'react'
import PDFReader from 'rn-pdf-reader-js'
import * as Linking from 'expo-linking';
import * as FileSystem from 'expo-file-system';
import { FULL_HEIGHT, PRIMARY_COLOR, PRIMARY_COLOR_WHITE, SECONDARY_COLOR } from '../constants/styles';
import { FontAwesome5 } from "@expo/vector-icons";
import { SafeAreaView } from 'react-native-safe-area-context';
import { AntDesign } from '@expo/vector-icons';

export default function ContractDetail({ navigation, route }) {
    const [ loading,setLoading ] = useState(false)
    const { contractUrl,investmentId } = route.params
    
    return (
        <SafeAreaView style={{ backgroundColor : PRIMARY_COLOR_WHITE, flex : 1 }}>
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
                <Text style={{ fontSize : 20, color : PRIMARY_COLOR_WHITE, alignSelf : 'center'}}>Hợp đồng</Text>   
            </View>
        </View>
        <View style={{ margin : 5 , flexDirection :'row' }}>
            <TouchableOpacity style={{ alignItems : "center", flexDirection : 'row',padding : 10, backgroundColor : SECONDARY_COLOR , borderRadius : 10 }} onPress={() => {
                navigation.navigate("InvestmentDetail",{
                    investmentId
                })
            }}>
                <AntDesign name="eyeo" size={18} color="white" />
                <Text style={{ fontSize :15, fontWeight : 'bold', color : PRIMARY_COLOR_WHITE, marginLeft : 5}}>Xem khoản đầu tư</Text>
            </TouchableOpacity>
            <TouchableOpacity style={{alignItems : "center",  flexDirection : 'row',padding : 10, backgroundColor : SECONDARY_COLOR , borderRadius : 10, marginLeft : 10 }} onPress={() => {
                Linking.openURL(contractUrl)
            }}>
                <AntDesign name="download" size={18} color="white" />
                <Text style={{ fontSize :15, fontWeight : 'bold', color : PRIMARY_COLOR_WHITE, marginLeft : 5}}>Tải xuống</Text>
            </TouchableOpacity>
        </View>
            {
                loading
                &&
                <ActivityIndicator size={'large'} color={PRIMARY_COLOR}/>
            }  
            <PDFReader
                onLoad={() => setLoading(!loading)}
                onLoadEnd={() => setLoading(!loading)}
        
                source={{
                    uri: contractUrl
                }}
            />     
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    topContainer : {
        height : FULL_HEIGHT * 0.3 / 4,
        backgroundColor : PRIMARY_COLOR,
        borderBottomLeftRadius : 25,
        borderBottomRightRadius : 25,
    },
})