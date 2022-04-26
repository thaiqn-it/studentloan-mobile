import { StyleSheet, Text, View,TouchableOpacity,Alert } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context';
import { FULL_HEIGHT, PRIMARY_COLOR_WHITE, PRIMARY_COLOR, FULL_WIDTH } from '../constants/styles';
import { FontAwesome5 } from "@expo/vector-icons";
import { Input } from 'react-native-elements';
import { Button } from 'react-native-paper';
import { userApi } from '../apis/user';

export default function ResetPassword({ navigation, route }) {
    const [ newPasw, setNewPasw ] = useState('')
    const [ confirmPasw, setConfirmPasw ] = useState('')

    //error
    const [ newPassError, setNewPassError ] = useState('')
    const [ confirmPassError, setConfirmPassError ] = useState('')

    const { email } = route.params

    const changePassword = () => {
        if (newPasw && confirmPasw) {
            if ( newPasw === confirmPasw) {
                const data = {
                    newPassword : newPasw,
                    email
                }
                userApi.resetPassword(data).then(res => {
                    Alert.alert(
                        "Thành công",
                        "Đổi mật khẩu thành công",
                        [
                          { text: "Xác nhận", onPress : () => navigation.navigate("Login")}
                        ]
                    );;
                }).catch(err => {
                    setNewPassError("")
                    setConfirmPassError("")
                })
                setNewPassError("")
                setConfirmPassError("")
            } else { 
                setNewPassError("Mật khẩu xác nhận không khớp với mật khẩu mới !")
                setConfirmPassError("Mật khẩu xác nhận không khớp với mật khẩu mới !")         
            }
        } else {
            setNewPassError("Không thể để trống")
            setConfirmPassError("Không thể để trống") 
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
            <Text style={{ fontSize : 20, color : PRIMARY_COLOR_WHITE, alignSelf : 'center'}}>Tạo mật khẩu mới</Text>   
            </View>
        </View>
        <View style={{ margin : 10, marginTop : 20 }}>
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
                    >Xác nhận</Button> 
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