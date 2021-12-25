import React,{ useEffect,useState,useRef } from 'react'
import { StyleSheet, Text, View,Pressable,Image } from 'react-native'
import { FULL_HEIGHT, FULL_WIDTH, PRIMARY_COLOR, PRIMARY_COLOR_BLACK, PRIMARY_COLOR_WHITE } from '../constants/styles'
import { Avatar } from 'react-native-elements';
import { Calendar,Agenda } from 'react-native-calendars';
import * as Animatable from 'react-native-animatable';
import { FlatList, ScrollView } from 'react-native-gesture-handler';

export default function InvestmentDetail() {
    const portfolloView = useRef(null)
    const calendarView = useRef(null)
    const reportView = useRef(null)
    const portfolloText = useRef(null)
    const calendarText= useRef(null)
    const reportText = useRef(null)
    const plate = useRef(null)

    useEffect(() => {
        
    }, [])

    const PortfolloView = () => {
        return (
            <View>
                <View style={{ height : 'auto', backgroundColor : PRIMARY_COLOR_WHITE, elevation : 2, marginHorizontal : 10, borderRadius : 15, padding : 10, marginTop : 15}}>
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
                                <Text style={{ fontSize : 16 }}>Nguyễn Quốc Thái</Text>
                                <Text style={{ opacity : 0.5,fontSize : 14 }}>FPT University</Text>
                                <Text style={{ opacity : 0.5,fontSize : 14 }}>Công nghệ thông tin</Text>
                            </View>         
                        </View>
                        <View style={{ alignItems : 'flex-end', flex : 1,}}>
                            <Text style={{ backgroundColor : '#dadee3', paddingLeft : 3,paddingRight : 3 , opacity : 0.8,borderRadius : 5, color : PRIMARY_COLOR }}>Processing</Text>
                        </View>
                    </View>
                    <View style={styles.line}/>
                    <View style={{ flexDirection : 'row',justifyContent : 'space-around'}}>
                        <View style={{ margin : 10}}>
                            <Text style={{ fontSize : 15, textAlign : 'center',opacity : 0.5 }}>Total earned</Text>
                            <Text style={{ fontSize : 17, textAlign : 'center',marginTop : 5 }}>22000000$</Text>
                        </View>
                        <View style={{ margin : 10}}>
                            <Text style={{ fontSize : 15, textAlign : 'center',opacity : 0.5 }}>Invested</Text>
                            <Text style={{ fontSize : 17, textAlign : 'center',marginTop : 5, color : PRIMARY_COLOR_BLACK }}>20000000$</Text>
                        </View>
                    </View>  
                    <View style={{ flexDirection : 'row',justifyContent : 'space-around'}}>
                        <View style={{ margin : 10}}>
                            <Text style={{ fontSize : 15, textAlign : 'center',opacity : 0.5 }}>Profit ($)</Text>
                            <Text style={{ fontSize : 17, textAlign : 'center',marginTop : 5,color : PRIMARY_COLOR }}>+20000$</Text>
                        </View>
                        <View style={{ margin : 10}}>
                            <Text style={{ fontSize : 15, textAlign : 'center',opacity : 0.5 }}>Penalty ($)</Text>
                            <Text style={{ fontSize : 17,color : 'red', textAlign : 'center',marginTop : 5 }}>+0$</Text>
                        </View>
                    </View>              
                </View>
                <View style={{ margin : 10,borderRadius: 20,backgroundColor: PRIMARY_COLOR_WHITE,elevation : 2,}}>
                    <View style={{ padding : 15, flexDirection : 'row'}}>
                        <View>
                            <Text style={{  fontSize : 15  }}>Penalty Rate</Text>    
                            <Text style={{  fontSize : 15, marginTop : 5  }}>Interest</Text>    
                        </View>
                        <View style={{  alignItems : 'flex-end', flex : 1, fontSize : 13 }}>
                            <Text style={{  fontSize : 15  }}>15%</Text>
                            <Text style={{  fontSize : 15, marginTop : 5  }}>1.5%</Text>
                        </View>
                    </View>
                    <View style={styles.line}/>
                    <View style={{ padding : 15, flexDirection : 'row'}}>
                        <View>
                            <Text style={{  fontSize : 15 }}>Period</Text>    
                            <Text style={{  fontSize : 15, marginTop : 5  }}>Start in</Text>    
                            <Text style={{  fontSize : 15, marginTop : 5  }}>End in</Text>     
                        </View>
                        <View style={{  alignItems : 'flex-end', flex : 1, fontSize : 13 }}>
                            <Text style={{  fontSize : 15 }}>12 months</Text>
                            <Text style={{  fontSize : 15, marginTop : 5  }}>2/1/2021</Text>
                            <Text style={{  fontSize : 15, marginTop : 5  }}>12/2/2022</Text>
                        </View>
                    </View>
                </View>
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

        

        return(
            <View style={{ marginTop : 10, backgroundColor : PRIMARY_COLOR_WHITE, elevation : 2, marginLeft : 20, borderLeftWidth : 4, borderLeftColor : PRIMARY_COLOR }}>       
                <View style={{ flexDirection : 'row' }}>
                    <View style={{ alignItems : 'center', justifyContent : 'center',flex : 2, paddingVertical : 10 }}>
                        <Text style={{ fontSize : 20 }}>09</Text>
                        <Text style={{ fontSize : 16, opacity : 0.6 }}>Fri</Text>
                    </View>
                    <View style={{ height : 45, width : 2, backgroundColor : '#dadee3', alignSelf : 'center'}}/>
                    <View style={{ alignItems : 'center', justifyContent : 'center',flex : 8 }}>
                        <Text style={{ fontSize : 20, color : PRIMARY_COLOR }}>500.000$</Text>
                        <Text>Tiền lãi : 20.000$</Text>
                    </View>
                </View>
            </View>
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
        <View style={{ height : FULL_HEIGHT, backgroundColor : PRIMARY_COLOR_WHITE}}>
            <View style={styles.topContainer}>
                <View style={{ backgroundColor : PRIMARY_COLOR_WHITE, elevation : 5, flex : 0.66, borderTopLeftRadius : 10, borderBottomLeftRadius : 10, flexDirection : 'row', justifyContent : 'space-around' }}>
                    <View style={{ alignSelf : 'center'}}>
                        <Text style={{ fontSize : 14, opacity : 0.6 }}>Next repayment in</Text>
                        <Text style={{ fontSize : 14, opacity : 0.6, marginTop : 10 }}>Monthly earn</Text>
                    </View>
                    <View style={{ alignItems : 'flex-end', alignSelf : 'center'}}>
                        <Text style={{ fontSize : 15}}>23/12/2021</Text>
                        <Text style={{ fontSize : 15, marginTop : 10 }}>50000$</Text>
                    </View>
                </View>
                <View style={styles.earnMoney}>
                    <View style={{  
                        width:'100%',
                        height : 80,
                        borderRadius: 20,
                        backgroundColor: PRIMARY_COLOR_WHITE,
                        alignItems : 'center',
                        justifyContent : 'center',
                        elevation : 2
                    }}>
                        <Text style={{ fontSize : 15, opacity : 0.5, color : PRIMARY_COLOR_BLACK}}>Earned</Text>
                        <Text style={{ fontSize : 18, color : PRIMARY_COLOR}}>28733737đ</Text>
                    </View>            
                </View>
            </View>        
            <View style={{ flexDirection : 'row', marginTop : 15, marginHorizontal : 25 }}>
                <Pressable onPress={() => {
                    portfolloView.current.transitionTo({ translateX : 0 })
                    calendarView.current.transitionTo({ translateX : 0 })
                    reportView.current.transitionTo({ translateX : 0 })
                    plate.current.transitionTo({ translateX : 0 })
                    portfolloText.current.transitionTo({ opacity : 1, scale : 1.1 })
                    calendarText.current.transitionTo({ opacity : 0.4, scale : 1 })
                    reportText.current.transitionTo({ opacity : 0.4, scale : 1})
                }}>
                    <Animatable.Text ref={portfolloText} style={[{ fontSize : 15,color : PRIMARY_COLOR_BLACK,fontWeight : 'bold' }]}>Portfollo</Animatable.Text>
                </Pressable>
                <Pressable onPress={() => {
                    portfolloView.current.transitionTo({ translateX : -(FULL_WIDTH) })
                    calendarView.current.transitionTo({ translateX : -(FULL_WIDTH) })
                    reportView.current.transitionTo({ translateX : 0 })
                    plate.current.transitionTo({ translateX : 80 })
                    portfolloText.current.transitionTo({ opacity : 0.4, scale : 1})
                    calendarText.current.transitionTo({ opacity : 1, scale : 1.1})
                    reportText.current.transitionTo({ opacity : 0.4, scale : 1 })
                }}>
                    <Animatable.Text ref={calendarText} style={{ fontSize : 15, marginLeft : 20,color : PRIMARY_COLOR_BLACK,fontWeight : 'bold',opacity : 0.4 }}>Schedule</Animatable.Text>
                </Pressable>
                <Pressable onPress={() => {
                    portfolloView.current.transitionTo({ translateX : -(FULL_WIDTH) })
                    calendarView.current.transitionTo({ translateX : -(2 * FULL_WIDTH) })
                    reportView.current.transitionTo({ translateX : -(2 * FULL_WIDTH) })
                    plate.current.transitionTo({ translateX : 160 })
                    portfolloText.current.transitionTo({ opacity : 0.4, scale : 1})
                    calendarText.current.transitionTo({ opacity : 0.4, scale : 1})
                    reportText.current.transitionTo({ opacity : 1 , scale : 1.1})
                }}>
                    <Animatable.Text ref={reportText} style={{ fontSize : 15, marginLeft : 20,color : PRIMARY_COLOR_BLACK,fontWeight : 'bold',opacity : 0.4  }}>Report</Animatable.Text>
                </Pressable>             
            </View>
            <Animatable.View ref={plate} style={{ width : 10, backgroundColor : PRIMARY_COLOR, height : 5, borderRadius : 5, marginHorizontal : 50  }}/>
            <View style={{flexDirection : 'row'}}>
                <Animatable.View ref={portfolloView} style={{ width : FULL_WIDTH }}> 
                    <PortfolloView />
                </Animatable.View>
                <Animatable.View ref={calendarView} style={{ width : FULL_WIDTH }}>
                    <CalendarView />
                </Animatable.View>
                <Animatable.View ref={reportView} style={{ width : FULL_WIDTH, backgroundColor : PRIMARY_COLOR_WHITE }}>
                    <ReportView />
                </Animatable.View>             
            </View>
            
        </View>
    )
}

const styles = StyleSheet.create({
    line : { 
        borderBottomWidth : 1, 
        borderBottomColor : '#dadee3',
        width : FULL_WIDTH / 1.2, 
        alignSelf : 'center' 
    },
    topContainer : {
        width : FULL_WIDTH - 20,
        borderColor : PRIMARY_COLOR,
        borderWidth : 1,
        marginTop : 50,
        alignSelf : 'center',
        flexDirection : 'row',
        borderRadius : 10,
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
      }
   
})
