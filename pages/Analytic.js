import { StyleSheet, Text, View, TouchableOpacity,ScrollView } from 'react-native'
import React, { useState, useEffect } from 'react'
import { FontAwesome5 } from '@expo/vector-icons';
import { FULL_HEIGHT, FULL_WIDTH, PRIMARY_COLOR, PRIMARY_COLOR_BLACK, PRIMARY_COLOR_WHITE, SECONDARY_COLOR } from '../constants/styles';
import { BarChart } from "react-native-gifted-charts";
import { investmentApi } from "../apis/investment"

import Svg, { G,Circle } from 'react-native-svg'
import { vndFormat } from '../utils'
import { SafeAreaView } from 'react-native-safe-area-context';

export default function Analytic({ navigation, route }) {
    const [analytics, setAnalytics] = useState(null)

    const chartConfig = {
        backgroundGradientFrom: "#1E2923",
        backgroundGradientFromOpacity: 0,
        backgroundGradientTo: "#08130D",
        backgroundGradientToOpacity: 0.5,
        color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
        strokeWidth: 2, // optional, default 3
        barPercentage: 0.5,
        useShadowColorFromDataset: false // optional
      };
      const barData = [
        {value: 250, label: 'M'},
        {value: 500, label: 'T', frontColor: '#177AD5'},
        {value: 745, label: 'W', frontColor: '#177AD5'},
        {value: 320, label: 'T'},
        {value: 600, label: 'F', frontColor: '#177AD5'},
        {value: 256, label: 'S'},
        {value: 300, label: 'S'},
    ];
    //   const data = [
    //     {
    //       name: "Seoul",
    //       population: 2,
    //       color: "rgba(131, 167, 234, 1)",
    //       legendFontColor: "#7F7F7F",
    //       legendFontSize: 15
    //     },
    //     {
    //       name: "Toronto",
    //       population: 2,
    //       color: "#F00",
    //       legendFontColor: "#7F7F7F",
    //       legendFontSize: 15
    //     },
    //     {
    //       name: "Beijing",
    //       population: 4,
    //       color: "red",
    //       legendFontColor: "#7F7F7F",
    //       legendFontSize: 15
    //     },
    //     {
    //       name: "New York",
    //       population: 5,
    //       color: "#ffffff",
    //       legendFontColor: "#7F7F7F",
    //       legendFontSize: 15
    //     },
    //     {
    //       name: "Moscow",
    //       population: 11,
    //       color: "rgb(0, 0, 255)",
    //       legendFontColor: "#7F7F7F",
    //       legendFontSize: 15
    //     }
    //   ];

      const CIRCLE_LENGHT = 500
      const R = CIRCLE_LENGHT / (2 * Math.PI)

      useEffect(() => {
        investmentApi.count().then(res => {
            setAnalytics(res.data)
        })
      }, [])
      
    return (
        <SafeAreaView style={{ backgroundColor : PRIMARY_COLOR_WHITE, flex : 1 }}>
            <ScrollView style={{ backgroundColor : PRIMARY_COLOR_WHITE }}>
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
                    <Text style={{ fontSize : 20, color : PRIMARY_COLOR_WHITE, alignSelf : 'center'}}>Thống kê</Text>   
                    </View>
                </View>
                {/* <PieChart
                    data={data}
                    width={FULL_WIDTH}
                    height={FULL_HEIGHT / 3}
                    chartConfig={chartConfig}
                    accessor={"population"}
                    backgroundColor={"transparent"}
                    paddingLeft={"5"}
                
                    absolute
                /> */}
                <View style={styles.container}>
                    <Svg style={{ position : 'absolute' }}>  
                        <Circle stroke="#E6E7E8" cx={FULL_WIDTH / 4} cy={FULL_WIDTH / 3.5} r={R} strokeWidth={10} strokeLinecap="round"/>
                        <Circle
                            stroke={PRIMARY_COLOR}
                            cx={FULL_WIDTH / 4} 
                            cy={FULL_WIDTH / 3.5} 
                            r={R} 
                            strokeWidth={10}
                            strokeDasharray={CIRCLE_LENGHT}
                            strokeDashoffset={CIRCLE_LENGHT * (1 - (analytics?.loanOngoing / analytics?.total + analytics?.loanFinish / analytics?.total))}
                            strokeLinecap="round"
                        />
                        <Circle
                            stroke={SECONDARY_COLOR}
                            cx={FULL_WIDTH / 4} 
                            cy={FULL_WIDTH / 3.5} 
                            r={R} 
                            strokeWidth={10}
                            strokeDasharray={CIRCLE_LENGHT}
                            strokeDashoffset={CIRCLE_LENGHT * (1 - analytics?.loanFinish / analytics?.total)}
                            strokeLinecap="round"    
                        />                     
                    </Svg>
                    <View style={[StyleSheet.absoluteFillObject, {
                            position : 'absolute',
                            left : FULL_WIDTH / 4 - 95,
                            top : FULL_WIDTH / 4 - 25,
                            width : 200,
                            height : 50,
                        }]}>
                        <Text style={{
                            fontSize : 35,
                            fontWeight : 'bold',
                            color : PRIMARY_COLOR,
                            textAlign : 'center'
                        }}>{analytics?.total ? analytics?.total : 0}</Text>
                    </View>
                    <Text style={[StyleSheet.absoluteFillObject, {
                        position : 'absolute',
                        left : FULL_WIDTH / 4 - 35,
                        top : FULL_WIDTH / 4 + 20,
                        fontSize : 15,
                        color : PRIMARY_COLOR_BLACK,
                        opacity : 0.4,
                        fontWeight : 'bold'
                    }]}>Lượt đầu tư</Text>
                    <View style={{ position : 'absolute' , right : FULL_WIDTH / 9, top: FULL_WIDTH / 10}}>
                        <View style={{ flexDirection : 'row', alignItems : 'center' }}>
                            <View style={{ width : 20, height : 20, borderRadius : 20, backgroundColor : PRIMARY_COLOR }}/>
                            <View style={{ marginLeft : 10 }}>
                                <Text style={{ fontWeight : 'bold' }}>{(analytics?.loanOngoing / (analytics?.total ? analytics?.total : 0)).toFixed(3) * 100}%</Text>
                                <Text style={{ fontWeight : 'bold', opacity : 0.4 }}>Đang tiến hành</Text>
                            </View>        
                        </View>  
                        <View style={{ flexDirection : 'row', alignItems : 'center', marginTop : 15 }}>
                            <View style={{ width : 20, height : 20, borderRadius : 20, backgroundColor : SECONDARY_COLOR }}/>
                            <View style={{ marginLeft : 10 }}>
                                <Text style={{ fontWeight : 'bold' }}>{(analytics?.loanFinish / (analytics?.total ? analytics?.total : 0)).toFixed(3) * 100}%</Text>
                                <Text style={{ fontWeight : 'bold', opacity : 0.4 }}>Hoàn thành</Text>
                            </View>        
                        </View>  
                        <View style={{ flexDirection : 'row', alignItems : 'center', marginTop : 15 }}>
                            <View style={{ width : 20, height : 20, borderRadius : 20, backgroundColor : "#E6E7E8" }}/>
                            <View style={{ marginLeft : 10 }}>
                                <Text style={{ fontWeight : 'bold' }}>{(analytics?.pending / (analytics?.total ? analytics?.total : 0)).toFixed(3) * 100}%</Text>
                                <Text  style={{ fontWeight : 'bold', opacity : 0.4 }}>Đang chờ</Text>
                            </View>        
                        </View>           
                    </View>
                </View>
                <View style={{ backgroundColor : PRIMARY_COLOR, marginHorizontal : 20, borderRadius : 20, padding : 10, flexDirection : 'row', marginVertical : 10 }}>
                    <View style={{ flex : 0.5 }}>
                        <View style={{ marginVertical : 10, alignItems : 'center' }}>
                            <Text style={{ color : PRIMARY_COLOR_WHITE, fontWeight : 'bold', fontSize : 16 }}>{analytics?.totalInvestment ? vndFormat.format(analytics?.totalInvestment) : vndFormat.format(0)}</Text>
                            <Text style={{ color : PRIMARY_COLOR_WHITE, fontSize : 13, marginTop : 5 }}>Số tiền đã đầu tư</Text>             
                        </View>
                        <View style={{ marginVertical : 10, alignItems : 'center' }}>
                            <Text style={{ color : PRIMARY_COLOR_WHITE, fontWeight : 'bold', fontSize : 16 }}>{analytics?.interestReceived ? vndFormat.format(analytics?.interestReceived) : vndFormat.format(0)}</Text>
                            <Text style={{ color : PRIMARY_COLOR_WHITE, fontSize : 13, marginTop : 5 }}>Lãi đã nhận</Text>        
                        </View>
                    </View>
                    <View style={{ flex : 0.5 }}>
                        <View style={{ marginVertical : 10, alignItems : 'center' }}>
                            <Text style={{ color : PRIMARY_COLOR_WHITE, fontWeight : 'bold', fontSize : 16 }}>{analytics?.totalPending ? vndFormat.format(analytics?.totalPending) : vndFormat.format(0)}</Text>
                            <Text style={{ color : PRIMARY_COLOR_WHITE, fontSize : 13, marginTop : 5 }}>Số tiền đang chờ</Text>             
                        </View>
                        <View style={{ marginVertical : 10, alignItems : 'center' }}>
                            <Text style={{ color : PRIMARY_COLOR_WHITE, fontWeight : 'bold', fontSize : 16 }}>{analytics?.interestUnreceived ? vndFormat.format(analytics?.interestUnreceived) : vndFormat.format(0)}</Text>
                            <Text style={{ color : PRIMARY_COLOR_WHITE, fontSize : 13, marginTop : 5 }}>Lãi chưa nhận</Text>        
                        </View>
                    </View>
                </View>
                {/* <View style={{height : FULL_HEIGHT / 2.5 }}>
                    <Text>Số giao dịch trong tuần</Text>
                    <BarChart   
                        
                        barWidth={22}
                        noOfSections={3}
                        barBorderRadius={4}
                        frontColor="lightgray"
                        data={barData}
                        yAxisThickness={0}
                        xAxisThickness={0}
                    />
                </View> */}
            </ScrollView>
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
    container : {
        backgroundColor : PRIMARY_COLOR_WHITE,
        height : FULL_HEIGHT / 3.5  
    },
})