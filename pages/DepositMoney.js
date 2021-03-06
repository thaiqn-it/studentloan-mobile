import React,{ useState,useEffect,useRef,useContext } from 'react'
import { useIsFocused } from "@react-navigation/native";
import { StyleSheet, Text, View,FlatList,TouchableOpacity,StatusBar,Pressable,KeyboardAvoidingView,Modal,Image } from 'react-native'
import { FULL_HEIGHT, PRIMARY_COLOR, PRIMARY_FONT,PRIMARY_COLOR_WHITE, FULL_WIDTH,SECONDARY_COLOR,PRIMARY_COLOR_BLACK } from '../constants/styles'
import { Entypo } from '@expo/vector-icons';
import LottieView from 'lottie-react-native';
import { CHANGE_LOTTIE } from '../constants/files'
import InputSpinner from "react-native-input-spinner";
import { FontAwesome,FontAwesome5,Ionicons } from '@expo/vector-icons'; 
import { CheckBox,Input } from 'react-native-elements'
import { Button } from 'react-native-paper';
import RBSheet from "react-native-raw-bottom-sheet";
import { paypalApi } from "../apis/paypal.js";
import WebView from 'react-native-webview';
import { walletApi } from '../apis/wallet';
import { transactionApi } from '../apis/transaction';
import { vndFormat } from '../utils'
import { SafeAreaView } from 'react-native-safe-area-context';

export default function DepositMoney({ navigation, route }) {
    const addCardRef = useRef();
    const [isUsedLater,setUsedLater] = useState(false)
    const [money, setMoney] = useState(50000);
    const [paypalUrl, setPaypalUrl] = useState("")
    const [modalVisible, setModalVisible] = useState(false)
    const isFocused = useIsFocused();
    const [ wallet,setWallet ] = useState(0)
    // Linking.openURL('https://res.cloudinary.com/larrytran/image/upload/v1648740774/pdf/contract_gbuhj4.pdf');

    // useEffect(() => {
    //     console.log(FileSystem.documentDirectory);
    //     FileSystem.downloadAsync('https://res.cloudinary.com/larrytran/image/upload/v1648740774/pdf/contract_gbuhj4.pdf', FileSystem.documentDirectory + 'small.mp4', {})
    //     .then(({ uri }) => {
    //         console.log('Finished downloading to ', uri);
    //       })
    //       .catch(error => {
    //         console.error(error);
    //       });
    // }, [])
  
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
            })
    }, [isFocused])

    const setMoneyByPressBox = (item) => {
        setMoney(item.limitMoney);
    };

    const checkOutHandler = () => {
        paypalApi
            .topup(money)
            .then(res => {
                setPaypalUrl(res.data)
                setModalVisible(true)
            }).catch(err => {
                Alert.alert("Kh??ng th??? th???c hi???n", err.response.data.error);
            })
    }

    const paypalStateChange = (navState) => {
        const { url, title } = navState
        if (title === "Success") {
            let splitUrl = url.split('?');
            let splitOrtherHalf = splitUrl[1].split('&');
            let paymentId = splitOrtherHalf[0].replace("paymentId=", "");
            let data = {
                money,
                type : "TOPUP",
                description : "N???p ti???n v??o v??",
                status : "SUCCESS",
                walletId : wallet.id,
                paypalTransaction : paymentId,
                recipientName : 'V?? c???a t??i',
                senderName : 'Paypal',
                transactionFee : 0
            }
            transactionApi
                .create(data)
                .then(res => {
                    const transactionId = res.data.id
                    walletApi.update(money,wallet.id).then(res => {                             
                        navigation.navigate("TransactionInfo",{
                            transactionId
                        })
                    })
                })
        } else if (title === "Cancel") {
            setModalVisible(!modalVisible)
            navigation.navigate("DepositMoney")
        }
    }

    const PaypalLoading = () => (
        <View style={{ height : FULL_HEIGHT - StatusBar.currentHeight,backgroundColor : PRIMARY_COLOR_WHITE, justifyContent : 'center'}}>
            <Image 
                style={{height : 150, width : FULL_WIDTH}} 
                source={{ uri : 'https://tuhocmmo.com/wp-content/uploads/2017/07/paypal-logo.png' }}
            />
        </View>
    )

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
                <Text style={{ fontSize : 20, color : PRIMARY_COLOR_WHITE, alignSelf : 'center'}}>N???p ti???n</Text>   
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
                            S??? d?? kh??? d???ng
                        </Text>
                        <Text style={{
                            fontWeight : 'bold',
                            fontSize : 20,
                            alignSelf : 'center',
                            color : SECONDARY_COLOR
                        }}>
                            {vndFormat.format(wallet?.money - wallet?.totalPending)}
                        </Text>
                    </View>
                    <View style={{ marginTop : 25, marginLeft : 25}}>
                        <Text style={{
                            fontSize : 18,
                            color : '#b6a9ad'
                        }}>
                            S??? ti???n mu???n n???p
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
                    {/* <View style={{ marginLeft : 25}}>
                        <Text style={{
                            fontSize : 18,
                            color : '#b6a9ad'
                        }}>
                            Ch???n th???
                        </Text>
                    </View> */}
                    {/* <TouchableOpacity style={{ 
                        backgroundColor : PRIMARY_COLOR_WHITE,
                        borderRadius : 10,
                        marginHorizontal : 10,
                        elevation : 5,
                        flexDirection : 'row',
                        alignItems : 'center',
                        justifyContent : 'center',
                        paddingVertical : 15,
                        marginTop : 15
                    }}>
                        <Ionicons name="md-add-circle-outline" size={25} color={SECONDARY_COLOR} />
                        <Text style={{ color : SECONDARY_COLOR, fontSize : 18, marginLeft : 5 }}>Th??m th???</Text>
                    </TouchableOpacity> */}
                </View>
            </KeyboardAvoidingView>
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
            >   
                <View style={{ height : FULL_HEIGHT - StatusBar.currentHeight, width : FULL_WIDTH, backgroundColor : PRIMARY_COLOR_WHITE}}>
                    <Entypo style={{ alignSelf : 'flex-end' }} name="cross" size={30} color="black" onPress={() => setModalVisible(!modalVisible)}/>
                    <WebView 
                        source={{ uri : paypalUrl }}
                        startInLoadingState={true}
                        renderLoading={() => <PaypalLoading />}
                        onNavigationStateChange={paypalStateChange}  
                    />
                   
                </View>        
            </Modal>
            <View
                style={styles.btnContainer}
            >    
                <Button
                style={styles.btnConfirm}
                color={PRIMARY_COLOR}
                onPress={checkOutHandler}
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
