import React, { useEffect, useState,useContext } from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  FlatList,
  TouchableOpacity,
  Alert 
} from "react-native";
import {
  PRIMARY_COLOR,
  PRIMARY_COLOR_WHITE,
  PRIMARY_COLOR_BLACK,
  FULL_WIDTH,
  FULL_HEIGHT,
  SECONDARY_COLOR
} from "../constants/styles";
import { Icon } from "react-native-elements/dist/icons/Icon";
import InputSpinner from "react-native-input-spinner";
import { FontAwesome } from '@expo/vector-icons'; 
import { Button } from 'react-native-paper';
import { Ionicons,FontAwesome5 } from '@expo/vector-icons';
import { AppContext } from '../contexts/App';
import { vndFormat } from "../utils";
import { investmentApi } from "../apis/investment";
import { walletApi } from "../apis/wallet";
import { SafeAreaView } from 'react-native-safe-area-context';

export default function AdjustInvestment({ navigation,route }) {
    const [money, setMoney] = useState(500000);
    const [ wallet,setWallet ] = useState(null)
    const [limit, setLimit] = useState([
    {
      id: 1,
      limitMoney: 500000,
    },
    {
      id: 2,
      limitMoney: 1000000,
    },
    {
      id: 3,
      limitMoney: 2000000,
    },
    {
      id: 4,
      limitMoney: 5000000,
    },
    {
      id: 5,
      limitMoney: 10000000,
    },
    {
      id: 6,
      limitMoney: 20000000,
    },
  ]);
  const [isSelect,setSelect] = useState(null)
  const [rate,setRate] = useState(3/100)
  const [repayment,setRepayment] = useState(money+(money*rate))
  const { investmentId,availableInvest,investingMoney, total } = route.params;
  const { user } = useContext(AppContext);
  
  const setMoneyByPressBox = (item) => {
      setMoney(item.limitMoney);
  };

  const confirmInvestHandler = () => {
    if (wallet?.money - wallet?.totalPending >= parseInt(money)){    
      investmentApi.getOneById(investmentId).then(res => {
        investmentApi.checkValidMoney(res.data.Loan.id, money).then(res => {
          if (res.data.status) {
            investmentApi.updateById(investmentId,{
              total : money,
              percent : parseInt(money) / parseInt(total)
            }).finally(() => {
                Alert.alert(
                  "Thành công",
                  "Bạn đã điểu chỉnh mức đầu tư thành công",
                  [
                    { text: "Xác nhận" }
                  ]
                );
              })
          } else {
            Alert.alert(
              "Thất bại",
              `${res.data.message}`,
              [
                  { text: "Xác nhận" }
              ]
            );
          }
        })         
      })               
    } else {
      Alert.alert(
        "Thất bại",
        `Số dư ví không đủ.`,
        [
            { text: "Xác nhận" }
        ]
    );
    }
  }

  useEffect(() => {
    walletApi
      .getByUserId()
      .then(res => {
          setWallet(res.data)
      })
  }, [])

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
    <SafeAreaView
      style={{
        flex : 1,
        height : FULL_HEIGHT,
        backgroundColor : PRIMARY_COLOR_WHITE
      }}
    > 
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
          <Text style={{ fontSize : 20, color : PRIMARY_COLOR_WHITE, alignSelf : 'center'}}>Điều chỉnh mức đầu tư</Text>   
        </View>
      </View>
      <View style={{ 
          borderRadius : 10,
          elevation : 5,
          backgroundColor : PRIMARY_COLOR_WHITE,
          marginTop : 20,
          marginHorizontal : 10,
          padding : 15
       }}>
         <View style={{ flexDirection : 'row', justifyContent : 'space-between',alignItems : 'center' }}>
          <Text style={{ fontSize : 16 }}>Số dư khả dụng</Text>
          <Text style={{ fontSize : 20, fontWeight : 'bold', color : SECONDARY_COLOR }}>{vndFormat.format(wallet?.money - wallet?.totalPending)}</Text>
         </View>
         <View style={{ borderWidth : 0.6, borderColor : '#c4c7cc', marginTop : 15 }}/>
          <Text style={{ fontSize : 16, marginTop : 15 }}>Số tiền muốn đầu tư</Text>
          <View
            style={{
              alignItems: "center",
              justifyContent: "space-between",
              marginTop : 20
            }}
          >
              <InputSpinner
                skin={"clean"}
                fontSize={20}
                buttonFontSize={35}
                width={350}
                height={60}
                min={500000}
                max={wallet?.money - wallet?.totalPending}
                step={50000}
                value={money}
                onChange={(value) => {
                    setMoney(value)                   
                }}
              >
              </InputSpinner>
          </View>
          {/* <View
            style={{
              flexDirection: "row",
              alignSelf : 'center',
              alignItems : 'center',
              marginTop : 15,
            }}
          >
            <Icon
              name="exclamation-circle"
              type="font-awesome-5"
              containerStyle={{
                marginRight: 5,
              }}
              color={PRIMARY_COLOR}
              size={17}
            />
            <Text
              style={{
                fontSize: 16,
                color: PRIMARY_COLOR,
              }}
            >
              Khoảng đầu tư khả dụng : {vndFormat.format(availableInvest)}
            </Text>
          </View> */}
        <FlatList
          style={{marginTop : 20}}
          data={limit}
          numColumns={3}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
        />
      </View>
      <View
        style={styles.btnContainer}
      >    
        <Button
          style={styles.btnInvest}
          color={PRIMARY_COLOR}
          onPress={() => {
            Alert.alert(
              "Xác nhận",
              `Bạn muốn điểu chỉnh mức đầu tư thành ${vndFormat.format(money)} ?`,
              [ 
                {
                  text: "Xác nhận",
                  onPress: () => confirmInvestHandler(),
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
            >Xác nhận</Button> 
      </View>
    </SafeAreaView> 
  )
}

const styles = StyleSheet.create({
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
      loanInfoTxt : {
        marginTop : 10,
        fontSize : 15
      },
      btnInvest : {
        width : FULL_WIDTH / 1.4,
        borderRadius : 5,
        borderWidth : 1.2,
        alignSelf : 'center',
        borderColor : PRIMARY_COLOR,
      },
      btnContainer : {
        padding: 10,
        position : 'absolute',
        bottom : 10, 
        right : 0,
        left : 0,
        marginBottom : 20
      },
      topContainer : {
        height : FULL_HEIGHT * 0.3 / 4,
        backgroundColor : PRIMARY_COLOR,
        borderBottomLeftRadius : 25,
        borderBottomRightRadius : 25,
      },
})