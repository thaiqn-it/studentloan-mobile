import React,{ useState,useEffect } from 'react'
import { StyleSheet, Text, View,FlatList,TouchableOpacity,ScrollView,Pressable,KeyboardAvoidingView, } from 'react-native'
import { FULL_HEIGHT, PRIMARY_COLOR, PRIMARY_FONT,PRIMARY_COLOR_WHITE, FULL_WIDTH } from '../constants/styles'
import { Entypo } from '@expo/vector-icons';
import LottieView from 'lottie-react-native';
import { CHANGE_LOTTIE } from '../constants/files'
import InputSpinner from "react-native-input-spinner";
import { FontAwesome } from '@expo/vector-icons'; 
import { CheckBox,Input } from 'react-native-elements'
import { Button } from 'react-native-paper';

export default function DepositMoney() {
    const [money, setMoney] = useState(50000);
    const [limit, setLimit] = useState([
        {
          id: 1,
          limitMoney: 50000,
        },
        {
          id: 2,
          limitMoney: 200000,
        },
        {
          id: 3,
          limitMoney: 500000,
        },
        {
          id: 4,
          limitMoney: 1000000,
        },
      ]);
    const [isSelect,setSelect] = useState(null)
    const [check,setCheck] = useState(false)
 
    const setMoneyByPressBox = (item) => {
        setMoney(item.limitMoney);
    };

    const renderItem = ({ item }) => (
        <TouchableOpacity
          style={[isSelect === item.id ? styles.boxSelect : styles.boxUnselect]}
          onPress={() => {
            setMoneyByPressBox(item)
            setSelect(item.id)
          }}
        >
          <Text style={[isSelect === item.id ? styles.textBoxSelect : styles.textBoxUnselect]}>{item.limitMoney} $</Text>
        </TouchableOpacity>
      );

    return (
        <View style={{ backgroundColor : PRIMARY_COLOR_WHITE, height : FULL_HEIGHT }}>
            <KeyboardAvoidingView behavior={'height'}>
                <ScrollView showsVerticalScrollIndicator={false}>
                    <View style={{ flexDirection : 'row', marginTop : 50, justifyContent : 'space-between', marginHorizontal : 25 }}>
                        <Text style={{
                            opacity : 0.6,
                            alignSelf : 'center',
                        }}>
                            YOUR BALANCE
                        </Text>
                        <Text style={{
                            fontWeight : 'bold',
                            fontSize : 20,
                            alignSelf : 'center',
                            color : PRIMARY_COLOR
                        }}>
                            20.000.000 $
                        </Text>
                    </View>
                    <View style={{ flexDirection : 'row', marginTop : 20, justifyContent : 'space-between'}}>
                        <Pressable style={({ pressed }) => [{
                            opacity: pressed
                            ? 0.3
                            : 1,
                        }]}>
                            <View style={{ flexDirection : 'row',alignItems : 'center', marginHorizontal : 25 }}>
                                <Text style={{
                                    fontSize : 18,
                                    fontWeight : 'bold',
                                }}>Deposit</Text>
                                <Entypo name="chevron-down" size={18} color={PRIMARY_COLOR} style={{ marginLeft : 10 }}/>
                            </View>
                        </Pressable>
                        <View style={{ alignItems : 'center', marginHorizontal : 25 }}>
                            <LottieView source={CHANGE_LOTTIE} style={styles.lottie} autoPlay loop speed={0.8}/>
                        </View> 
                    </View>
                    <View style={{ marginTop : 25, marginLeft : 25}}>
                        <Text style={{
                            fontSize : 15,
                            color : '#a6a9ad'
                        }}>
                            CHOOSE YOUR AMOUNT
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
                            fontSize={18}
                            buttonFontSize={32}
                            width={350}
                            height={50}
                            children={<FontAwesome style={{ marginRight : 20 }} name="dollar" size={20} color="gray" />}
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
                        numColumns={2}
                        renderItem={renderItem}
                        keyExtractor={(item) => item.id}
                        />
                    </View>
                    <View style={{ marginLeft : 25 }}>
                        <Text style={{
                            fontSize : 15,
                            color : '#a6a9ad'
                        }}>
                            CHOOSE YOUR PAYMENT METHOD
                        </Text>
                    </View>
                    <View style={{ flexDirection : 'row', justifyContent : 'space-around', marginVertical : 10}}>
                        <CheckBox
                            title='Paypal'
                            checked={true}
                            containerStyle={{ width : FULL_WIDTH / 2 - 40, alignItems : 'center', borderColor : PRIMARY_COLOR }}
                            checkedColor={PRIMARY_COLOR}
                        />
                        <CheckBox
                            title='Stripe'
                            checked={check}
                            containerStyle={{ width : FULL_WIDTH / 2 - 40, alignItems : 'center'  }}
                        />
                    </View>   
                    <View style={{ width : FULL_WIDTH / 1.1, borderBottomWidth : 0.2 , alignSelf : 'center' }}/>
                    <View style={{ marginTop : 10 }}>
                        <Text style={styles.labelBankCard}>Number</Text>
                        <Input
                            placeholder='xxxx xxxx xxxx xxxx'
                            inputContainerStyle={{ borderBottomWidth : 0, height : 50 }}
                            containerStyle= {styles.input}
                        />
                        <Text style={styles.labelBankCard}>Owner Name</Text>
                        <Input
                            placeholder='Input Name'
                            inputContainerStyle={{ borderBottomWidth : 0, height : 50 }}
                            containerStyle= {styles.input}
                            autoCapitalize="characters"
                        />
                        <Text style={styles.labelBankCard}>Issued on</Text>
                        <Input
                            placeholder='Input Date'
                            inputContainerStyle={{ borderBottomWidth : 0, height : 50 }}
                            containerStyle= {styles.input}
                        />
                    </View>
                    <View style={{ paddingBottom : 60 }}>
                        <CheckBox
                            title='Save Card For Later ?'
                            checked={true}
                            checkedColor={PRIMARY_COLOR}
                            containerStyle={{ backgroundColor : PRIMARY_COLOR_WHITE , borderWidth : 0 }}
                        />
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>
            <View
                style={styles.btnContainer}
            >    
                <Button
                style={styles.btnConfirm}
                color={PRIMARY_COLOR}

                    >Confirm</Button> 
            </View>
        </View>

    )
}

const styles = StyleSheet.create({
    lottie : {
        justifyContent : 'center',
        width: 30, 
        height: 30,
    },
    textBoxUnselect: {
        fontSize: 15,
        color: '#babdc2',
        fontWeight : 'bold'
    },
    textBoxSelect : {
        fontSize: 15,
        color: PRIMARY_COLOR_WHITE,
    },
    boxUnselect : {
        margin: 10,
        height:60,
        width:50,
        flex: 1,
        borderRadius : 5,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: PRIMARY_COLOR_WHITE,
        borderWidth : 1,
        borderColor : '#babdc2'
    },
    boxSelect : {
        margin: 10,
        height:60,
        width:50,
        flex: 1,
        borderRadius : 5,
        justifyContent: "center",
        alignItems: "center",
        borderWidth : 1,
        borderColor : '#babdc2',
        backgroundColor: PRIMARY_COLOR,
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
    },
    btnContainer : {
        backgroundColor: "white",
        padding: 10,
        position: "absolute",
        bottom: 0,
        left: 0,
        right : 0,
        elevation : 10,
    },
})
