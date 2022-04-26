import React, { useState } from 'react'
import { 
    StyleSheet, 
    Text, 
    View,
    ImageBackground,
    TouchableOpacity
} from 'react-native'
import { FULL_HEIGHT, FULL_WIDTH, PRIMARY_COLOR, PRIMARY_COLOR_WHITE, PRIMARY_FONT } from '../constants/styles'
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from 'react-native-safe-area-context';
import { FontAwesome5 } from "@expo/vector-icons";
import { Input } from 'react-native-elements';
import { Button } from 'react-native-paper';
import { userApi } from '../apis/user';

export default function ForgotPassword() {
    const navigation = useNavigation()
    const [email, setEmail] = useState("");

    //test
    const recaptchaVerifier = React.useRef(null);
    const [phoneNumber, setPhoneNumber] = React.useState();
    const [verificationId, setVerificationId] = React.useState();
    const [verificationCode, setVerificationCode] = React.useState();

    const nextBtnHandler = async () => {
        userApi.forgotPassword(email).then(res => {
            if (res.data.secret) {
                navigation.navigate("Verification", {
                    secret : res.data.secret,
                    type : "FORGOT_PASSWORD",
                    email
                })
            }
        })
    }

    return (
        <SafeAreaView style={styles.container}>
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
                    <Text style={{ fontSize : 20, color : PRIMARY_COLOR_WHITE, alignSelf : 'center'}}>Quên mật khẩu</Text>   
                </View>
            </View>
            <View style={{ margin : 10, marginTop : 20 }}>
                <Text style={{ margin : 10, fontWeight : 'bold', fontSize : 16 }}>Nhập email dùng để đăng ký tài khoản và chúng tôi sẽ gửi mã xác nhận đến email của bạn</Text>
                <Text style={styles.informationText}>Email :</Text>
                <Input
                    value={email}
                    onChangeText={setEmail}
                    placeholder='Nhập email'
                    inputContainerStyle={{ borderBottomWidth : 0, height : 50 }}
                    containerStyle= {styles.input}
                />
                <Button
                    style={[styles.btn]}
                    color={PRIMARY_COLOR}
                    onPress={() => nextBtnHandler()}
                        >Xác nhận</Button> 
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container : {
        flex : 1,
        backgroundColor : PRIMARY_COLOR_WHITE,
    },
    topContainer : {
        height : FULL_HEIGHT * 0.3 / 4,
        backgroundColor : PRIMARY_COLOR,
        borderBottomLeftRadius : 25,
        borderBottomRightRadius : 25,
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
    input :{ 
        borderWidth : 1 , 
        borderRadius : 10, 
        height : 50, 
        width : FULL_WIDTH - 40, 
        margin : 10,
        borderColor : '#a6aaad',
    },
})
