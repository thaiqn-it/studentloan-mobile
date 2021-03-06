import { StyleSheet, Text, View,TouchableOpacity, FlatList } from 'react-native'
import React, { useEffect, useState } from 'react'
import { FULL_HEIGHT, PRIMARY_COLOR, PRIMARY_COLOR_WHITE } from '../constants/styles'
import { FontAwesome5 } from "@expo/vector-icons";
import { Icon } from 'react-native-elements';
import { notificationApi } from '../apis/notification';
import moment from 'moment';
import * as Linking from 'expo-linking'
import { SafeAreaView } from 'react-native-safe-area-context';
import { useIsFocused } from "@react-navigation/native";

export default function Notification({ navigation,route }) {
    const [notifications, setNotifications] = useState([])
    const isFocused = useIsFocused();

    useEffect(() => {
      notificationApi.getAllByUserId().then(res => {
          setNotifications(res.data.notifications)
      })
    }, [isFocused])

    const pressHandler = (item) => {
      Linking.openURL(item.redirectUrl)
      notificationApi.updateById(item.id, {
        isRead : true
      })
    }

    const notificationComponent = ({item}) => (
        <TouchableOpacity style={{ marginHorizontal : 25, borderRadius : 20, backgroundColor : '#F7F7FC', marginVertical : 10, flexDirection : 'row' }}
                      onPress={() => pressHandler(item)}>
          <View style={{ flex : 0.2 }}>
              <Icon 
                  style={{ backgroundColor : '#e3dff0', margin : 10, padding : 10, borderRadius : 10 }}
                  type='antdesign'
                  name='wallet'
                  color={PRIMARY_COLOR}
              />
          </View>
          <View style={{ flex : 0.8 }}>
              <View>
                  <Text style={{ fontWeight : 'bold', marginTop : 10, fontSize : 16, marginHorizontal : 5 }}>{item.description}</Text>   
              </View>
              <View style={{ alignContent : 'flex-end', marginTop : 20, marginBottom : 10, flexDirection : 'row', justifyContent : 'space-between'}}>
                  <Text style={{ fontSize : 15, marginHorizontal : 5, opacity : 0.5, alignSelf : 'center' }}>- {moment(item.createdAt).fromNow()}</Text>
                  {
                      !item.isRead && (
                          <View style={{ height : 6, width : 6 , backgroundColor : 'red', borderRadius : 10, alignSelf : 'center', marginRight : 20}}/>
                      )   
                  }             
              </View>
          </View>
      </TouchableOpacity>
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
          <Text style={{ fontSize : 20, color : PRIMARY_COLOR_WHITE, alignSelf : 'center'}}>Th??ng b??o</Text>   
        </View>
      </View>
      {
        notifications.length > 0
        ?
        <FlatList
          data={notifications}
          renderItem={notificationComponent}
          keyExtractor={(item) => item.id.toString()}
          showsVerticalScrollIndicator={false}
        />
        :
        <Text>B???n kh??ng c?? th??ng b??o n??o</Text>
      }
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