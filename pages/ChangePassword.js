import { StyleSheet, Text, View,TouchableOpacity,Alert } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context';
import { FULL_HEIGHT, PRIMARY_COLOR_WHITE, PRIMARY_COLOR, FULL_WIDTH } from '../constants/styles';
import { FontAwesome5 } from "@expo/vector-icons";
import { Input } from 'react-native-elements';
import { Button } from 'react-native-paper';
import { userApi } from '../apis/user';

export default function ChangePassword({ navigation }) {
    const [ currPasw, setCurrPasw ] = useState('')
    const [ newPasw, setNewPasw ] = useState('')
    const [ confirmPasw, setConfirmPasw ] = useState('')

    //error
    const [ currPassError, setCurrPassError ] = useState('')
    const [ newPassError, setNewPassError ] = useState('')
    const [ confirmPassError, setConfirmPassError ] = useState('')

    const changePassword = () => {
        if (currPasw && newPasw && confirmPasw) {
            if ( newPasw === confirmPasw) {
                const data = {
                    password : currPasw,
                    newPassword : newPasw
                }
                userApi.changePassword(data).then(res => {
                    Alert.alert(
                        "Thành công",
                        "Đổi mật khẩu thành công",
                        [
                          { text: "Xác nhận", onPress : () => navigation.navigate("HomeTab")}
                        ]
                    );;
                }).catch(err => {
                    setCurrPassError("Mật khẩu hiện tại không đúng")
                    setNewPassError("")
                    setConfirmPassError("")
                })
                setCurrPassError("")
                setNewPassError("")
                setConfirmPassError("")
            } else { 
                setCurrPassError("")
                setNewPassError("Mật khẩu xác nhận không khớp với mật khẩu mới !")
                setConfirmPassError("Mật khẩu xác nhận không khớp với mật khẩu mới !")         
            }
        } else {
            setNewPassError("Không thể để trống")
            setConfirmPassError("Không thể để trống") 
            setCurrPassError("Không thể để trống")
        }
     
    }

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
            <Text style={{ fontSize : 20, color : PRIMARY_COLOR_WHITE, alignSelf : 'center'}}>Đổi mật khẩu</Text>   
            </View>
        </View>
        <View style={{ margin : 10, marginTop : 20 }}>
            <Text style={styles.informationText}>Mật khẩu hiện tại :</Text>
            <Input
                value={currPasw}
                onChangeText={setCurrPasw}
                placeholder='Nhập mật khẩu hiện tại'
                inputContainerStyle={{ borderBottomWidth : 0, height : 50 }}
                containerStyle= {styles.input}
                secureTextEntry={true}
                errorMessage={currPassError}
            />
            <Text style={styles.informationText}>Mật khẩu mới :</Text>
            <Input
                value={newPasw}
                onChangeText={setNewPasw}
                placeholder='Nhập mật khẩu mới'
                inputContainerStyle={{ borderBottomWidth : 0, height : 50 }}
                containerStyle= {styles.input}
                secureTextEntry={true}
                errorMessage={newPassError}
            />
            <Text style={styles.informationText}>Xác nhận mật khẩu mới :</Text>
            <Input
                value={confirmPasw}
                onChangeText={setConfirmPasw}
                placeholder='Nhập xác nhận mật khẩu mới'
                inputContainerStyle={{ borderBottomWidth : 0, height : 50 }}
                containerStyle= {styles.input}
                secureTextEntry={true}
                errorMessage={confirmPassError}
            />
            <Button
                style={[styles.btn]}
                color={PRIMARY_COLOR}
                onPress={() => changePassword()}
                    >Đổi mật khẩu</Button> 
        </View>
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
    input :{ 
        borderWidth : 1 , 
        borderRadius : 10, 
        height : 50, 
        width : FULL_WIDTH - 40, 
        margin : 10,
        borderColor : '#a6aaad',
    },
    informationText : {
        marginLeft : 10,
        fontSize : 16,
        marginTop : 15
    },
    btn : {
        width : FULL_WIDTH / 1.2,
        borderRadius : 5,
        borderWidth : 1.2,
        alignSelf : 'center',
        borderColor : PRIMARY_COLOR,
        marginTop : 30
    },
})