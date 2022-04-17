import { StyleSheet, Text, View,TouchableOpacity, FlatList, Image } from 'react-native'
import React, { useState, useEffect } from 'react'
import { FULL_HEIGHT, FULL_WIDTH, PRIMARY_COLOR, PRIMARY_COLOR_WHITE } from '../constants/styles';
import { FontAwesome5 } from "@expo/vector-icons";
import { loanMediaApi } from "../apis/loanMedia"
import AppLoading from "../components/AppLoading"
import { SafeAreaView } from 'react-native-safe-area-context';

export default function Evidence({ navigation, route }) {
  const { loanId } = route.params
  const [ evidences, setEvidences ] = useState(null)
  const [isLoading,setIsLoading] = useState(true)
 
  useEffect(() => {
    setIsLoading(true)
    loanMediaApi.getAllEvidenceByLoanId(loanId)
       .then(res => {
         setEvidences(res.data.evidences)
       }).finally(() => setIsLoading(false))
  }, [])
  
  const EvidenceView = ({ item }) => (
      <View style={{ marginVertical : 10 }}>
        <Image 
          source={{ uri : item.imageUrl }}
          style={{
            width : FULL_WIDTH,
            height : FULL_HEIGHT / 1.4
          }}
        />
        <Text style={{
          padding : 10
        }}>{item.description}</Text>
      </View>
  )

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
          <Text style={{ fontSize : 20, color : PRIMARY_COLOR_WHITE, alignSelf : 'center'}}>Giấy báo học phí</Text>   
        </View>
      </View>
      <AppLoading isLoading={isLoading}/>
      <FlatList
        data={evidences}
        renderItem={EvidenceView}
        keyExtractor={(item) => item.id.toString()}
        showsVerticalScrollIndicator={false}
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
}
})