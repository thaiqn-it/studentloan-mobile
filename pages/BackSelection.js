import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  FlatList,
  TouchableOpacity,
} from "react-native";
import {
  PRIMARY_COLOR,
  PRIMARY_COLOR_WHITE,
  PRIMARY_COLOR_BLACK,
  FULL_WIDTH,
} from "../constants/styles";
import { Icon } from "react-native-elements/dist/icons/Icon";
import InputSpinner from "react-native-input-spinner";
import { FontAwesome } from '@expo/vector-icons'; 
import { Button } from 'react-native-paper';

export default function BackSelection({route, navigation}) {

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
  const [rate,setRate] = useState(3/100)
  const [repayment,setRepayment] = useState(money+(money*rate))

  const setMoneyByPressBox = (item) => {
    setMoney(item.limitMoney);
  };

  useEffect(() => {
    setRepayment(money+(money*rate))
  }, [money])

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
    <ScrollView
      style={{
        backgroundColor: PRIMARY_COLOR_WHITE,
      }}
    > 
       <View style={{ marginTop : 50, marginLeft : 20}}>
        <Text style={{
          fontSize : 15,
          color : '#a6a9ad'
        }}>
          AMOUNT
        </Text>
      </View>
      <View
        style={{
          alignItems: "center",
          justifyContent: "space-between",
          marginTop : 20
        }}
      >
          <InputSpinner
            skin={"clean"}
            fontSize={18}
            buttonFontSize={32}
            width={350}
            height={50}
            children={<FontAwesome style={{ marginRight : 20 }} name="dollar" size={20} color="gray" />}
            min={50000}
            step={50000}
            value={money}
            onChange={(value) => {
              setMoney(value)
            }}
          />
      </View>
      <View/>
        <View
          style={{
            flexDirection: "row",
            alignSelf : 'center',
            alignItems : 'center',
            marginTop : 10,
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
            fontSize: 15,
            color: PRIMARY_COLOR,
          }}
        >
          Available amount : 7,405.98 $
        </Text>
      </View>
      <View style={{ marginTop : 20, marginLeft : 20}}>
        <Text style={{
          fontSize : 15,
          color : '#a6a9ad'
        }}>
          CHOOSE YOUR AMOUNT
        </Text>
      </View>

      <View
        style={{
          backgroundColor: PRIMARY_COLOR_WHITE,
          borderRadius: 10,
          margin : 10,
          elevation : 3,
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
      <View style={{ marginTop : 20, marginLeft : 20}}>
        <Text style={{
          fontSize : 15,
          color : '#a6a9ad'
        }}>
          INVEST INFORMATION
        </Text>
      </View>
      <View
        style={{
          backgroundColor: PRIMARY_COLOR_WHITE,
          borderRadius: 10,
          margin : 10,
          elevation : 3,
          padding : 20,
          flexDirection : 'row'
        }}
      >
        <View style={{ justifyContent : 'flex-start' }}>
          <Text style={{ fontSize : 15 }}>Annual Interest Rate</Text>
          <Text style={styles.loanInfoTxt}>Penalty Rate</Text>
          <Text style={styles.loanInfoTxt}>Total Repayment</Text>
          <Text style={styles.loanInfoTxt}>Repayment Date</Text>
        </View>
        <View style={{ alignItems : 'flex-end',flex : 1 }}>
          <Text style={{ fontSize : 15 }}>{rate * 100}%</Text>
          <Text style={styles.loanInfoTxt}>15%</Text>
          <Text style={styles.loanInfoTxt}>{repayment} $</Text>
          <Text style={styles.loanInfoTxt}>01/03/2022</Text>
        </View>
      </View>
      <View
        style={styles.btnContainer}
      >    
        <Button
          style={styles.btnInvest}
          color={PRIMARY_COLOR}

            >Confirm</Button> 
      </View>
    </ScrollView> 
  );  
}

const styles = StyleSheet.create({
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
  }
});
