import React,{ useState,useEffect,useRef,useContext } from 'react'
import { useIsFocused } from "@react-navigation/native";
import { StyleSheet, Text, View,FlatList,TouchableOpacity,ScrollView,Pressable,KeyboardAvoidingView,Alert } from 'react-native'
import { FULL_HEIGHT, PRIMARY_COLOR, PRIMARY_FONT,PRIMARY_COLOR_WHITE, FULL_WIDTH,SECONDARY_COLOR,PRIMARY_COLOR_BLACK } from '../constants/styles'
import { Entypo } from '@expo/vector-icons';
import LottieView from 'lottie-react-native';
import { CHANGE_LOTTIE } from '../constants/files'
import InputSpinner from "react-native-input-spinner";
import { FontAwesome,FontAwesome5,Ionicons } from '@expo/vector-icons'; 
import { CheckBox,Input } from 'react-native-elements'
import { Button } from 'react-native-paper';
import RBSheet from "react-native-raw-bottom-sheet";
import { walletApi } from '../apis/wallet';
import { transactionApi } from '../apis/transaction';
import { configApi } from '../apis/systemconfig';
import { vndFormat } from '../utils'
import { paypalApi } from '../apis/paypal'
import { SafeAreaView } from 'react-native-safe-area-context';

const WithdrawMoney = ({ navigation, route }) => {
    const payoutRef = useRef();
    const [isUsedLater,setUsedLater] = useState(false)
    const [money, setMoney] = useState(50000);
    const [ fee, setFee ] = useState(0)
    const [ wallet,setWallet ] = useState(0)
    const [ email,setEmail ] = useState("")
    const isFocused = useIsFocused();
    const [ transactionFee, setTransactionFee ] = useState(0)
    const [limit, setLimit] = useState([
        {
          id: 1,
          limitMoney: 50000,
        },
        {
          id: 2,
          limitMoney: 100000,
        },
        {
          id: 3,
          limitMoney: 200000,
        },
        {
          id: 4,
          limitMoney: 500000,
        },
        {
          id: 5,
          limitMoney: 1000000,
        },
        {
          id: 6,
          limitMoney: 20000000,
        },
      ]);
    const [isSelect,setSelect] = useState(null)
    const [check,setCheck] = useState(false)

    useEffect(() => {
        walletApi
            .getByUserId()
            .then(res => {
                setWallet(res.data)
                configApi
                    .getTransactionFee()
                    .then(res => {
                        setTransactionFee(res.data.transactionFee)
                    })               
            })
    }, [isFocused])

    useEffect(() => {
        const FEE = money*transactionFee
        setFee(FEE)
    }, [money,transactionFee])
 
    const setMoneyByPressBox = (item) => {
        setMoney(item.limitMoney);
    };

    const transferMoney = () => {
        payoutRef.current.close()
        if (wallet?.money - wallet?.totalPending > money) {
            paypalApi
                .transfer(email,money,wallet.id)
                .then(res => {
                    const data = {
                        money : money,
                        type : "WITHDRAW",
                        description : `Chuy???n ti???n v??o v?? paypal` ,
                        status : "SUCCESS",
                        walletId : wallet.id,
                        paypalTransaction : res.data.payoutId,
                        recipientName : 'Paypal',
                        senderName : 'V?? c???a t??i',
                        transactionFee : fee
                    }
                    transactionApi
                        .create(data)
                        .then(res => {
                            const transactionId = res.data.id
                            walletApi.update(-money,wallet.id).then(res => {
                                navigation.navigate("TransactionInfo", {
                                    transactionId
                                })
                            }).catch(err => {
                            
                            })
                        }).catch(err => {
                        
                        })
                }).catch(err => {
                    Alert.alert("Kh??ng th??? th???c hi???n", err.response.data.error);
                })
        } else {
            Alert.alert(
                "Th???t b???i",
                `S??? d?? v?? kh??ng ????? ????? th???c hi???n.`,
                [
                    { text: "X??c nh???n" }
                ]
              );
        }
    }
    const renderItem = ({ item }) => (
        <TouchableOpacity
          style={[isSelect === item.id ? styles.boxSelect : styles.boxUnselect]}
          onPress={() => {
            setMoneyByPressBox(item)
            setSelect(item.id)
          }}
        >
          <Text style={[isSelect === item.id ? styles.textBoxSelect : styles.textBoxUnselect]}>{vndFormat.format(item.limitMoney)}</Text>
        </TouchableOpacity>
      );
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
                <Text style={{ fontSize : 20, color : PRIMARY_COLOR_WHITE, alignSelf : 'center'}}>R??t ti???n</Text>   
                </View>
            </View>
            <KeyboardAvoidingView behavior={'height'}>
                <View showsVerticalScrollIndicator={false}>
                    <View style={{ flexDirection : 'row', marginTop : 20, justifyContent : 'space-between', marginHorizontal : 25 }}>
                        <Text style={{
                            opacity : 0.6,
                            alignSelf : 'center',
                            fontSize : 18
                        }}>
                            S??? kh??? d???ng
                        </Text>
                        <Text style={{
                            fontWeight : 'bold',
                            fontSize : 20,
                            alignSelf : 'center',
                            color : SECONDARY_COLOR
                        }}>
                            {vndFormat.format(wallet.money - wallet?.totalPending)}
                        </Text>
                    </View>
                    <View style={{ marginTop : 25, marginLeft : 25}}>
                        <Text style={{
                            fontSize : 18,
                            color : '#b6a9ad'
                        }}>
                            S??? ti???n mu???n r??t
                        </Text>
                    </View>
                    <View
                        style={{
                            alignItems: "center",
                            justifyContent: "space-between",
                            marginTop : 15
                        }}>
                        <InputSpinner
                            skin={"clean"}
                            fontSize={20}
                            buttonFontSize={35}
                            width={350}
                            height={60}
                            min={50000}
                            max={wallet?.money - wallet?.totalPending}
                            step={10000}
                            value={money}
                            onChange={(value) => {
                                setMoney(value)
                            }}
                        />
                    </View>
                    <View
                        style={{
                            backgroundColor: PRIMARY_COLOR_WHITE,
                            borderRadius: 10,
                            margin : 10,
                            padding : 10
                        }}
                    >
                        <FlatList
                        data={limit}
                        numColumns={3}
                        renderItem={renderItem}
                        keyExtractor={(item) => item.id}
                        />
                    </View>
                    <Text style={{
                        fontSize : 14,
                        fontWeight : 'bold',
                        marginHorizontal : 30,
                        marginTop : 10
                    }}>
                        Bi???u ph?? r??t ti???n l?? {transactionFee*100}% * t???ng s??? ti???n r??t / 1 l???n r??t
                    </Text>
                    <View style={{
                        marginHorizontal : 25,
                        borderRadius : 10,
                        backgroundColor : PRIMARY_COLOR_WHITE,
                        elevation : 4,
                        padding : 15,
                        marginTop : 10
                    }}>
                        <View style={{ flexDirection : 'row', justifyContent : 'space-between' }}>
                            <Text style={{ fontSize : 16 }}>S??? ti???n nh???n ???????c</Text>
                            <Text style={{ fontSize : 16, color : PRIMARY_COLOR, fontWeight : 'bold' }}>{vndFormat.format(money - fee)}</Text>
                        </View>     
                        <View style={{ flexDirection : 'row', justifyContent : 'space-between', marginTop : 15 }}>
                            <Text style={{ fontSize : 16 }}>Ph?? h??? th???ng</Text>
                            <Text style={{ fontSize : 16, color : PRIMARY_COLOR, fontWeight : 'bold' }}>{vndFormat.format(fee)}</Text>
                        </View>           
                    </View>
                    <RBSheet
                        ref={payoutRef}
                        keyboardAvoidingViewEnabled={true}
                        closeOnDragDown={true}
                        closeOnPressMask={true}
                        height={FULL_HEIGHT / 2.5}
                        customStyles={{
                            container : {
                                borderTopLeftRadius : 20,
                                borderTopRightRadius : 20
                            }
                        }}
                    >   
                        <View style={{ flexDirection : 'row', alignItems : 'center', justifyContent : 'space-between', marginHorizontal : 20}}>                 
                            <View style={{ flexDirection : 'row', alignItems : 'center'}}>
                                <Ionicons name="arrow-back-outline" size={25} color="black" onPress={() => addCardRef.current.close()} />
                                <Text style={{ fontSize : 20, fontWeight : 'bold', marginLeft : 10}}>Nh???p th??ng tin</Text>      
                            </View>
                            <TouchableOpacity onPress={() => transferMoney()}>
                                <Entypo 
                                    name="check" 
                                    size={28} 
                                    color={SECONDARY_COLOR} 
                                />
                            </TouchableOpacity>
                        </View>
                        <View style={{ borderWidth : 0.6, borderColor : '#c4c7cc', marginTop : 15, marginHorizontal : 20 }}/>
                        <ScrollView showsVerticalScrollIndicator={false} style={{ marginVertical : 10 }}>
                            <Text style={styles.labelBankCard}>?????a ch??? email t??i kho???n paypal: </Text>
                            <Input
                                placeholder='paypal@gmail.com'
                                inputContainerStyle={{ borderBottomWidth : 0, height : 50 }}
                                containerStyle= {styles.input}
                                onChangeText={setEmail}
                                value={email}
                            />
                            <CheckBox
                                title='L??u email cho l???n s??? d???ng sau ?'
                                checked={isUsedLater}
                                onPress={() => setUsedLater(!isUsedLater)}
                                checkedColor={PRIMARY_COLOR}
                                containerStyle={{ backgroundColor : PRIMARY_COLOR_WHITE , borderWidth : 0 }}
                            />
                            <Text style={{
                                fontSize : 14,
                                opacity : 0.7,
                                marginHorizontal : 25
                            }}>Vui l??ng nh???p ?????a ch??? email c???a v?? paypal ???? ????ng k?? c???a b???n. S??? ti???n s??? ???????c chuy???n ?????n v?? paypal c???a email ???? cung c???p.</Text>
                        </ScrollView>
                    </RBSheet>               
                </View>
            </KeyboardAvoidingView>
            <View
                style={styles.btnContainer}
            >    
                <Button
                style={styles.btnConfirm}
                color={PRIMARY_COLOR}
                onPress={() => payoutRef.current.open()}        
                    >X??c nh???n</Button> 
            </View>
        </SafeAreaView>
  )
}

const styles = StyleSheet.create({
    lottie : {
        justifyContent : 'center',
        width: 30, 
        height: 30,
    },
    textBoxUnselect: {
        fontSize: 16,
        color: PRIMARY_COLOR_BLACK,
      },
      textBoxSelect : {
        fontSize: 16,
        color: PRIMARY_COLOR_WHITE,
      },
    boxUnselect : {
        margin: 5,
        height: 50,
        width: 50,
        flex: 1,
        borderRadius : 15,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: PRIMARY_COLOR_WHITE,
        borderWidth : 1,
        borderColor : '#babdc2'
      },
      boxSelect : {
        margin: 5,
        height: 50,
        width: 50,
        flex: 1,
        borderRadius : 15,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: SECONDARY_COLOR,
      },
    input :{ 
        borderWidth : 1 , 
        borderRadius : 10, 
        height : 50, 
        width : FULL_WIDTH - 40, 
        margin : 10,
        borderColor : '#a6aaad',
        alignSelf : 'center'
    },
    labelBankCard : {
        fontSize : 15,
        fontWeight : 'bold',
        opacity : 0.8,
        marginHorizontal : 25
    },
    btnConfirm : {
        width : FULL_WIDTH / 1.4,
        borderRadius : 5,
        borderWidth : 1.2,
        alignSelf : 'center',
        borderColor : PRIMARY_COLOR,
        marginBottom : 10
    },
    btnContainer : {
        backgroundColor: "white",
        padding: 10,
        position: "absolute",
        bottom: 0,
        left: 0,
        right : 0,
        elevation : 5,
    },
    topContainer : {
        height : FULL_HEIGHT * 0.3 / 4,
        backgroundColor : PRIMARY_COLOR,
        borderBottomLeftRadius : 25,
        borderBottomRightRadius : 25,
    },
})

export default WithdrawMoney