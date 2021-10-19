import React, { useRef, useState } from 'react'
import { 
    StyleSheet, 
    Text, 
    View,
    ImageBackground,
    Alert,
} from 'react-native'
import { Image,Input,Button } from 'react-native-elements';
import { FULL_HEIGHT, FULL_WIDTH, PRIMARY_COLOR, PRIMARY_FONT } from '../constants/styles'
import LottieView from 'lottie-react-native';
import { LOCK_LOTTIE } from '../constants/files'
import PhoneInput from "react-native-phone-number-input";
import { userApi } from '../apis/user';
import AppLoading from '../components/AppLoading';

export default function RegisterPhone({ navigation, route }) {
    const [phoneNumber, setPhoneNumber] = React.useState();
    const [formattedValue, setFormattedValue] = useState("");
    const [isLoading,setIsLoading] = useState(false)
    const phoneInput = useRef(null);
    const { fb_access_token,user,gg_access_token } = route.params;

    const nextBtnHandler = async () => {
        setIsLoading(true)
        if (phoneInput.current?.isValidNumber(formattedValue)) {
            const res = await userApi.sendOTP(formattedValue)

            if (res.data.secret !== undefined || res.data.secret !== null) {
                if (fb_access_token !== undefined) {
                    navigation.navigate("Verification", {
                        secret : res.data.secret,
                        fb_access_token : fb_access_token,
                        phoneNumber : formattedValue,
                        user : user
                    }) 
                } else if (gg_access_token !== undefined) {
                    navigation.navigate("Verification", {
                        secret : res.data.secret,
                        gg_access_token : gg_access_token,
                        phoneNumber : formattedValue,
                        user : user
                    }) 
                } else {
                    navigation.navigate("Verification", {
                        secret : res.data.secret,
                        phoneNumber : formattedValue,
                        user : user
                    }) 
                }           
            }
             
        } else {
            setIsLoading(true)
            Alert.alert("Verify Status", "Failed to verify OTP")
        }       
        setIsLoading(true)
    }

    return (
        <View style={styles.container}>         
                <View>
                    <LottieView source={LOCK_LOTTIE} style={styles.lottie} autoPlay loop/>
                </View>    
                <Text style={styles.text}>Please enter your phone to receive a verification code</Text> 
                <PhoneInput
                    ref={phoneInput}
                    defaultValue={phoneNumber}
                    defaultCode="VN"
                    layout="first"
                    onChangeText={(text) => {
                        setPhoneNumber(text)
                    }}
                    onChangeFormattedText={(text) => {
                        setFormattedValue(text);
                    }}
                    withShadow
                    autoFocus
                />
                <Button
                    title={"Next"}
                    buttonStyle={styles.btnNext}
                    titleStyle={{
                        fontFamily: PRIMARY_FONT,
                    }}
                    onPress = {nextBtnHandler}
                />
                <AppLoading isLoading={isLoading}/>
        </View>
    )
}

const styles = StyleSheet.create({
    container : {
        flex : 1,
        backgroundColor : '#fff',
        height : FULL_HEIGHT,
        alignItems : 'center'
    },
    lottie : {
        justifyContent : 'center',
        width: 150, 
        height: 150,
        marginTop : 50,
    },
    text : {
        marginTop : 50,
        margin : 30,
        color : 'black',
        fontSize : 15,
        fontFamily : PRIMARY_FONT,
        width : 300,
        textAlign : 'center'
    },
    inputContainer: {
        borderBottomColor: 'black',      
    },
    btnNext : {
        width : FULL_WIDTH / 1.5,
        borderRadius : 25,
        alignSelf : 'center',
        marginTop : 50,
        padding: 15,
        backgroundColor: PRIMARY_COLOR,
    },
})
