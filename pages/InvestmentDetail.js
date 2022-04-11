import React,{ useEffect,useState,useRef } from 'react'
import { StyleSheet, Text, View,Pressable,Image, TouchableOpacity,StatusBar, ActivityIndicator,Alert } from 'react-native'
import { FULL_HEIGHT, FULL_WIDTH, PRIMARY_COLOR, PRIMARY_COLOR_BLACK, PRIMARY_COLOR_WHITE, SECONDARY_COLOR } from '../constants/styles'
import { Avatar } from 'react-native-elements';
import { Calendar,Agenda } from 'react-native-calendars';
import * as Animatable from 'react-native-animatable';
import { FlatList, ScrollView } from 'react-native-gesture-handler';
import { FontAwesome5,Feather,FontAwesome } from "@expo/vector-icons";
import { vndFormat } from "../utils/index"
import { investmentApi } from '../apis/investment';
import { loanScheduleApi } from '../apis/loanSchedule';
import { Button } from 'react-native-paper';
import moment from 'moment';

export default function InvestmentDetail({ navigation, route }) {
    const portfolloView = useRef(null)
    const calendarView = useRef(null)
    const reportView = useRef(null)
    const portfolloText = useRef(null)
    const calendarText= useRef(null)
    const reportText = useRef(null)
    const plate = useRef(null)

    const { investmentId,availableInvest } = route.params;
    const [ investment, setInvestment ] = useState(null)
    const [ loanSchedules, setLoanSchedules ] = useState(null)

    useEffect(() => {
        investmentApi
            .getOneById(investmentId)
            .then(res => {
                setInvestment(res.data)
                loanScheduleApi.getAllByLoanId(res.data.loanId).then(res => {
                    setLoanSchedules(res.data)
                })
            })
    }, [])

    const cancelInvest = () => {
        investmentApi.updateById(investment.id, {
            status : 'CANCEL'
        })
    }

    const PortfolloView = () => {
        return (
            <View>
                {
                    investment !== null 
                    ?
                    (
                        <ScrollView 
                            style={[
                                investment?.status === 'PENDING' 
                                ? 
                                { height : FULL_HEIGHT - (StatusBar.currentHeight + 40 + FULL_HEIGHT * 0.3 / 4) - FULL_HEIGHT / 10 }
                                :
                                { height : FULL_HEIGHT - (StatusBar.currentHeight + 40 + FULL_HEIGHT * 0.3 / 4) }
                            ]} 
                            showsVerticalScrollIndicator={false}
                        >
                            <View style={{ height : 'auto', elevation : 5, marginHorizontal : 10, borderRadius : 10, padding : 10, marginVertical : 15, backgroundColor : PRIMARY_COLOR_WHITE }}>
                                <View style={{ flexDirection : 'row'}}>
                                    <View style={{ flex : 0.6 }}>
                                        <Text style={{ fontWeight : 'bold', fontSize : 18 }}>Kế hoạch đầu tư</Text>
                                        <Text style={{ fontSize : 15, opacity : 0.6, marginTop : 5 }}>Đã đầu tư ngày {moment(investment.createdAt).format('DD/MM/YYYY')}</Text>
                                    </View>
                                    <View style={{ flex : 0.4, alignItems : 'flex-end', justifyContent : 'flex-start' }}>
                                        <Text style={{ fontSize : 17, color : SECONDARY_COLOR }}>Đang chờ</Text>
                                    </View>               
                                </View>  
                                <View style={{ margin : 15 , backgroundColor : '#e3dede', borderRadius : 5, padding : 10 }}>
                                    <Text style={{ textAlign : 'center', opacity : 0.8, fontSize : 14 }}>Khoản vay vẫn đang được kêu gọi đầu tư, bạn có thể điều chỉnh khoản đầu tư của mình. </Text>
                                </View>  
                                <View style={{ flexDirection : 'row', justifyContent : 'space-between', alignItems : 'center', marginBottom : 5 }}>
                                    <Text style={{ fontSize : 16 }}>Số tiền đã đầu tư : </Text>
                                    <Text style={{ fontSize : 16 }}>{vndFormat.format(investment.total)}</Text>    
                                </View> 
                                <View style={styles.line}/>
                                <View style={{ flexDirection : 'row',justifyContent : 'space-around'}}>
                                    <View style={{ margin : 5}}>
                                        <Text style={{ fontSize : 15, textAlign : 'center',opacity : 0.7 }}>Tiền lãi</Text>
                                        <Text style={{ fontSize : 16, textAlign : 'center',marginTop : 5, color : PRIMARY_COLOR, fontWeight : 'bold' }}>{vndFormat.format(investment.total * investment.Loan.interest * investment.Loan.duration)}</Text>
                                    </View>
                                    <View style={{ margin : 5}}>
                                        <Text style={{ fontSize : 15, textAlign : 'center',opacity : 0.7 }}>Lãi suất</Text>
                                        <Text style={{ fontSize : 16, textAlign : 'center',marginTop : 5, color : PRIMARY_COLOR, fontWeight : 'bold' }}>{investment.Loan.interest * 100}%</Text>
                                    </View>
                                    <View style={{ margin : 5 }}>
                                        <Text style={{ fontSize : 15, textAlign : 'center',opacity : 0.7 }}>Tiền phạt</Text>
                                        <Text style={{ fontSize : 16, textAlign : 'center',marginTop : 5, color : PRIMARY_COLOR, fontWeight : 'bold' }}>{vndFormat.format(0)}</Text>
                                    </View>
                                </View>    
                            </View>
                            <View style={{ height : 'auto',marginBottom : 10, elevation : 5, marginHorizontal : 10, borderRadius : 10, padding : 10, backgroundColor : PRIMARY_COLOR_WHITE, paddingVertical : 15 }}>
                                <Text style={{ fontWeight : 'bold', fontSize : 18 }}>Kỳ hạn vay</Text>  
                                <View style={styles.line}/>
                                <View style={styles.rowView}>
                                    <Text style={{ fontSize : 16 }}>Thời gian : </Text>
                                    <Text style={{ fontSize : 15, fontWeight : 'bold' }}>{investment.Loan.duration} tháng</Text>
                                </View> 
                                <View style={styles.rowView}>
                                    <Text style={{ fontSize : 16 }}>Ngày bắt đầu (dự kiến) : </Text>
                                    <Text style={{ fontSize : 15, fontWeight : 'bold' }}>{moment(investment.Loan.loanStartAt).format('DD/MM/YYYY')}</Text>
                                </View> 
                                <View style={styles.rowView}>
                                    <Text style={{ fontSize : 16 }}>Ngày kết thúc (dự kiến) : </Text>
                                    <Text style={{ fontSize : 15, fontWeight : 'bold'}}>{moment(investment.Loan.loanEndAt).format('DD/MM/YYYY')}</Text>
                                </View>    
                            </View>
                            <View style={{ height : 'auto',marginBottom : 15, elevation : 5, marginHorizontal : 10, borderRadius : 10, padding : 10, backgroundColor : PRIMARY_COLOR_WHITE, paddingVertical : 15 }}>
                                <Text style={{ fontWeight : 'bold', fontSize : 18 }}>Thông tin giao dịch</Text>  
                                <View style={styles.line}/>
                                {
                                    investment?.transactionId
                                    ?
                                    (
                                        <TouchableOpacity style={styles.transactionItem} onPress={() => navigation.navigate("TransactionInfo", {
                                            transactionId : data.id
                                        })}>
                                        <View style={{ flex : 0.15 }}>       
                                            {/* // <Image 
                                            //     style={{ height : 50, width : 50, borderRadius : 50, elevation : 5 }}
                                            //     source={{ uri : 'https://play-lh.googleusercontent.com/iQ8f5plIFy9rrY46Q2TNRwq_8nCvh9LZVwytqMBpOEcfnIU3vTkICQ6L1-RInWS93oQg' }}/>                  */}
                                            <View style={styles.nameIcon}>
                                                <Text>QT</Text>
                                            </View>
                                        </View>
                                        <View style={{ flex : 0.85 }}>                  
                                            <View style={{ flexDirection : 'row' }}>
                                                <Text style={{ fontSize : 15 , color : SECONDARY_COLOR, flex : 0.6, fontWeight : 'bold' }}>Chuyển tiền đến Nguyễn Quốc Thái</Text>
                                                <Text style={{ fontSize : 15, fontWeight : 'bold', color : 'red', flex : 0.4, textAlign : 'right', alignSelf : 'flex-start' }}>-{vndFormat.format(200000000)}</Text>     
                                            </View>
                                            <View style={{ flexDirection : 'row' }}>
                                                <Text style={{ marginTop : 3, fontSize : 15, opacity : 0.6 , flex : 0.5}}>12/3/2022</Text>
                                                <Text style={{ marginTop : 3, fontSize : 15, fontWeight : 'bold' , color : PRIMARY_COLOR_BLACK, textAlign : 'right', flex : 0.5 }}>Chuyển tiền</Text>
                                            </View>
                                        </View>
                                    </TouchableOpacity>
                                    )
                                    :
                                    (
                                        <Text>Chưa có giao dịch nào</Text>
                                    )
                                }                            
                            </View>                          
                        </ScrollView>
                    )
                    :
                    (
                        <ActivityIndicator size="large" color={PRIMARY_COLOR}/>
                    )
                }
            </View>
            
        )
    }

    const CalendarView = () => {
        // const [items,setItems] = useState({})

        // const timeToString = (time) => {
        //     const date = new Date(time);
        //     return date.toISOString().split('T')[0];
        //   }
          
        // const loadItems = (day) => {
        //     setTimeout(() => {
        //       for (let i = -15; i < 85; i++) {
        //         const time = day.timestamp + i * 24 * 60 * 60 * 1000;       
        //         const strTime = timeToString(time);
        //         if (!items[strTime]) {
        //           items[strTime] = [];
        //           const numItems = Math.floor(Math.random() * 3 + 1);
        //           for (let j = 0; j < numItems; j++) {
        //             items[strTime].push({
        //               name: 'Item for ' + strTime + ' #' + j,
        //               height: Math.max(50, Math.floor(Math.random() * 150))
        //             });
        //           }
        //         }
        //       }
        //       const newItems = {};
        //       Object.keys(items).forEach(key => {
        //         newItems[key] = items[key];
        //       });
        //       setItems(newItems);
        //     }, 1000);
        //   }

        const scheduleItem = ({item}) => (
            <View style={{ marginTop : 20, backgroundColor : PRIMARY_COLOR_WHITE, elevation : 2, marginHorizontal : 20, borderLeftWidth : 4, borderLeftColor : PRIMARY_COLOR, borderRadius : 5, padding : 10 }}>       
                <View style={{ flexDirection : 'row', justifyContent : 'space-between' }}>
                    <Text style={{ fontWeight : 'bold', fontSize : 15}}>{moment(item.startAt).format('DD/MM/YYYY')} - {moment(item.endAt).format('DD/MM/YYYY')}</Text>
                    {
                        item.status === 'ONGOING'
                        ?
                        <Image source={require('../assets/schedule-ongoing.png')} style={{ height : 20, width : 20 }}/>
                        :
                        (
                            item.status === 'COMPLETED'
                            ?
                            (
                                <Image source={require('../assets/schedule-completed.png')} style={{ height : 30, width : 30 }}/>
                            )
                            :
                            (
                                <Image source={require('../assets/schedule-incompleted.png')} style={{ height : 30, width : 30 }}/>
                            )
                        )
                        
                    }
                </View>
                <Text style={{ marginTop: 20, fontSize : 17, fontWeight : 'bold', color : PRIMARY_COLOR }}>{vndFormat.format(item.money * investment.percent + item.penaltyMoney * investment.percent )}</Text>
                <View style={{ flexDirection : 'row', marginTop : 5, justifyContent : 'space-between' }}>
                    <Text style={{ fontSize : 15, opacity : 0.5 }}>Tiền lãi : {vndFormat.format(item.money * investment.percent * investment.Loan.interest * investment.Loan.duration)}</Text>
                    <Text style={{ fontSize : 15, opacity : 0.5 }}>Tiền phạt : {vndFormat.format(item.penaltyMoney * investment.percent )}</Text>
                </View>           
            </View>
        )

        return(
            <FlatList 
                data={loanSchedules}
                renderItem={scheduleItem}
                keyExtractor={(item) => item.id.toString()}     
                contentContainerStyle={[
                    investment?.status === 'PENDING'
                    ?
                    { paddingBottom : FULL_HEIGHT / 10 + 20 }
                    :
                    { paddingBottom : 20 }
                ]} 
            />        
        )
    }

    const ReportView = () => {
        const data = [
            {
                id : 1,
                image : [
                    {
                        id : 1,
                        url : 'https://cf.shopee.vn/file/1914a912309e52aab0a18c52de021495',
                    },
                    {
                        id : 2,
                        url : 'https://cf.shopee.vn/file/1914a912309e52aab0a18c52de021495',
                    },
                    {
                        id : 3,
                        url : 'https://cf.shopee.vn/file/1914a912309e52aab0a18c52de021495',
                    },
                    {
                        id : 4,
                        url : 'https://cf.shopee.vn/file/1914a912309e52aab0a18c52de021495',
                    },
                    {
                        id : 5,
                        url : 'https://cf.shopee.vn/file/1914a912309e52aab0a18c52de021495',
                    },
                ],
                description : 'Report something about loan of student. Something 1',
                date : '24/2/2021',
            },
            {
                id : 2,
                image : '',
                description : 'Report something about loan of student. Something 21',
                date : '25/2/2021',
            },
            {
                id : 3,
                image : '',
                description : 'Report something about loan of student. Something jijjsisjdjkjdssklkdjklsdjjk',
                date : '23/2/2021',
            },
            {
                id : 4,
                image : '',
                description : 'Report something about loan of student. Exosdsmjd sdhuwdd shduwidhj',
                date : '22/2/2021',
            },
            {
                id : 5,
                image : '',
                description : 'Report something about loan of student',
                date : '21/2/2021',
            },
        ]

        const ReportBlock = ({item}) => {
            return(
                <View style={styles.reportContainer}>
                    <Text style={{ margin : 10, fontWeight : 'bold', fontSize : 17, opacity : 0.8}}>{item.date}</Text>
                    <View style={{ flexDirection : 'row', width : FULL_WIDTH - 40}}>
                        <Image source={{ uri : 'https://cf.shopee.vn/file/1914a912309e52aab0a18c52de021495'}} style={{ width : (FULL_WIDTH / 3) - 20, height : (FULL_WIDTH / 3) - 20, marginLeft : 10}}/>
                        <Image source={{ uri : 'https://cf.shopee.vn/file/1914a912309e52aab0a18c52de021495'}} style={{ width : (FULL_WIDTH / 3) - 20, marginLeft : 10}}/>
                        <View style={{ width : (FULL_WIDTH / 3) - 20,alignItems : 'center', justifyContent : 'center', backgroundColor : '#dadee3', height : (FULL_WIDTH / 3) - 20, marginLeft : 10}}>
                            <Text style={{ fontSize : 25}}>+3</Text>
                        </View>
                    </View>       
                    <Text style={{ margin : 10, fontSize : 16}}>{item.description}</Text>
                </View>  
            )
        }

        return(
            <View style={{ height : FULL_HEIGHT / 1.3,marginTop : 10, paddingBottom : 20, backgroundColor : PRIMARY_COLOR_WHITE}}>
                <FlatList 
                    data={data}
                    renderItem={ReportBlock}
                    keyExtractor={(item) => item.id.toString()}
                    showsVerticalScrollIndicator={false}
                />
            </View>
        )
    }

    return (
        <View style={{ height : FULL_HEIGHT, backgroundColor : PRIMARY_COLOR_WHITE, flex : 1}}>
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
                <Text style={{ fontSize : 20, color : PRIMARY_COLOR_WHITE, alignSelf : 'center'}}>Quản lý khoản vay</Text>   
                </View>
            </View>
            <View style={{ flexDirection : 'row', marginTop : 15, marginHorizontal : 25 }}>
                <Pressable onPress={() => {
                    portfolloView.current.transitionTo({ translateX : 0 })
                    calendarView.current.transitionTo({ translateX : 0 })
                    // reportView.current.transitionTo({ translateX : 0 })
                    plate.current.transitionTo({ translateX : 0 })
                    portfolloText.current.transitionTo({ opacity : 1, scale : 1.1 })
                    calendarText.current.transitionTo({ opacity : 0.4, scale : 1 })
                    // reportText.current.transitionTo({ opacity : 0.4, scale : 1})
                }}>
                    <Animatable.Text ref={portfolloText} style={[{ fontSize : 15,color : PRIMARY_COLOR_BLACK,fontWeight : 'bold' }]}>Thông tin</Animatable.Text>
                </Pressable>
                <Pressable onPress={() => {
                    portfolloView.current.transitionTo({ translateX : -(FULL_WIDTH) })
                    calendarView.current.transitionTo({ translateX : -(FULL_WIDTH) })
                    // reportView.current.transitionTo({ translateX : 0 })
                    plate.current.transitionTo({ translateX : 87 })
                    portfolloText.current.transitionTo({ opacity : 0.4, scale : 1})
                    calendarText.current.transitionTo({ opacity : 1, scale : 1.1})
                    // reportText.current.transitionTo({ opacity : 0.4, scale : 1 })
                }}>
                    <Animatable.Text ref={calendarText} style={{ fontSize : 15, marginLeft : 20,color : PRIMARY_COLOR_BLACK,fontWeight : 'bold',opacity : 0.4 }}>Lịch trình</Animatable.Text>
                </Pressable>
                {/* <Pressable onPress={() => {
                    portfolloView.current.transitionTo({ translateX : -(FULL_WIDTH) })
                    calendarView.current.transitionTo({ translateX : -(2 * FULL_WIDTH) })
                    reportView.current.transitionTo({ translateX : -(2 * FULL_WIDTH) })
                    plate.current.transitionTo({ translateX : 160 })
                    portfolloText.current.transitionTo({ opacity : 0.4, scale : 1})
                    calendarText.current.transitionTo({ opacity : 0.4, scale : 1})
                    reportText.current.transitionTo({ opacity : 1 , scale : 1.1})
                }}>
                    <Animatable.Text ref={reportText} style={{ fontSize : 15, marginLeft : 20,color : PRIMARY_COLOR_BLACK,fontWeight : 'bold',opacity : 0.4  }}>Report</Animatable.Text>
                </Pressable>              */}
            </View>
            <Animatable.View ref={plate} style={{ width : 10, backgroundColor : SECONDARY_COLOR, height : 5, borderRadius : 5, marginHorizontal : 50  }}/>
            <View style={{flexDirection : 'row'}}>
                <Animatable.View ref={portfolloView} style={{ width : FULL_WIDTH, height : FULL_HEIGHT - (StatusBar.currentHeight + 40 + FULL_HEIGHT * 0.3 / 4) }}> 
                    <PortfolloView />
                </Animatable.View>
                <Animatable.View ref={calendarView} style={{ width : FULL_WIDTH, height : FULL_HEIGHT - (StatusBar.currentHeight + 40 + FULL_HEIGHT * 0.3 / 4) }}>
                    <CalendarView />
                </Animatable.View>
                <Animatable.View ref={reportView} style={{ width : FULL_WIDTH, backgroundColor : PRIMARY_COLOR_WHITE }}>
                    <ReportView />
                </Animatable.View>             
            </View>
            {
                investment?.status === 'PENDING' && (
                <View
                    style={styles.btnContainer}
                    >  
                            <Button
                                style={styles.btnInvest}
                                color={PRIMARY_COLOR}
                                onPress={() => navigation.navigate("AdjustInvestment", {
                                investmentId : investment.id,
                                availableInvest,
                                investingMoney : investment.total,
                                total : investment.Loan.totalMoney
                            })}
                                >Điều chỉnh</Button>  
                            <Button
                                onPress={() => {
                                    Alert.alert(
                                        "Xác nhận",
                                        `Bạn muốn hủy bỏ đầu tư ?`,
                                        [ 
                                        {
                                            text: "Xác nhận",
                                            onPress: () => cancelInvest(),
                                        },
                                        {
                                            text: "Hủy",
                                        },                
                                        ],
                                        {
                                        cancelable : true
                                        }
                                    )
                                    }}
                                style={[styles.btnInvest, {borderColor : SECONDARY_COLOR}]}
                                color={SECONDARY_COLOR}
                                >Hủy đầu tư</Button>      
                    </View>
                )
            }       
        </View>
    )
}

const styles = StyleSheet.create({
    line : { 
        borderBottomWidth : 1, 
        borderBottomColor : '#dadee3',
        width : FULL_WIDTH / 1.2, 
        alignSelf : 'center',
        marginVertical : 15
    },
    topContainer : {
        height : FULL_HEIGHT * 0.3 / 4,
        backgroundColor : PRIMARY_COLOR,
        borderBottomLeftRadius : 25,
        borderBottomRightRadius : 25,
    },
    earnMoney : { 
        backgroundColor : PRIMARY_COLOR_WHITE, 
        elevation : 5,
        flex : 0.34, 
        borderTopRightRadius : 10, 
        borderBottomRightRadius : 10,
        alignItems : 'center',
        padding : 5
    },
    item: {
        backgroundColor: 'white',
        flex: 1,
        borderRadius: 5,
        padding: 10,
        marginRight: 10,
        marginTop: 17
      },
      emptyDate: {
        height: 15,
        flex: 1,
        paddingTop: 30
      },
      reportContainer : {
        elevation : 5,
        margin : 10,
        backgroundColor : PRIMARY_COLOR_WHITE,
        borderRadius : 10
      },
      rowView : { 
        flexDirection : 'row', 
        justifyContent : 'space-between', 
        alignItems : 'center', 
        marginTop : 10 
    },
    transactionItem : {
        backgroundColor : PRIMARY_COLOR_WHITE,
        elevation : 5,
        padding : 5,
        paddingVertical : 10,
        flexDirection : 'row',
        justifyContent : 'space-between',
        borderRadius : 5,
    },
    nameIcon : {
        height : 45,
        width : 45,
        borderRadius : 45,
        backgroundColor : PRIMARY_COLOR,
        alignItems : 'center',
        justifyContent : 'center'
    },
    btnContainer : {
        backgroundColor: "white",
        shadowOpacity: 0.1,
        shadowRadius: 2,
        padding: 10,
        position: "absolute",
        bottom: 0,
        left: 0,
        right : 0,
        elevation : 10,
        height : FULL_HEIGHT / 10,
        justifyContent : 'center',
        flexDirection : 'row'
    },
        btnInvest : {
        width : FULL_WIDTH / 2 - 40,
        borderRadius : 5,
        borderWidth : 1.2,
        marginHorizontal : 20,
        alignSelf : 'center',
        borderColor : PRIMARY_COLOR,
    },
})
