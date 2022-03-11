import React, { useState } from 'react'
import { 
    StyleSheet, 
    Text, 
    View,
    Alert,
    KeyboardAvoidingView,
} from 'react-native'
import { Button } from 'react-native-elements';
import { FULL_HEIGHT, FULL_WIDTH, PRIMARY_COLOR, PRIMARY_FONT } from '../constants/styles'
import { LOCK_LOTTIE } from '../constants/files'
import LottieView from 'lottie-react-native';
import {
    CodeField,
    Cursor,
    useBlurOnFulfill,
    useClearByFocusCell,
} from 'react-native-confirmation-code-field';
import Timer from '../components/Timer';
import { userApi } from '../apis/user';
import { investorApi } from '../apis/investor';
import * as SecureStore from "expo-secure-store";
import { JWT_TOKEN_KEY, resetJWTToken } from '../constants';
import { loadToken } from '../apis';
import AppLoading from '../components/AppLoading';

const CELL_COUNT = 6;

const nextBtnHandler = (navigation) => {
    navigation.navigate("ChangePassword")
}

export default function Verification({ navigation, route }) {
    const { secret,fb_access_token,phoneNumber,user,gg_access_token } = route.params;
    const [ isResend, setIsResend ] = useState(true)
    const [value, setValue] = useState('');
    const [isLoading,setIsLoading] = useState(false)
    const ref = useBlurOnFulfill({value, cellCount: CELL_COUNT});
    const [props, getCellOnLayoutHandler] = useClearByFocusCell({
      value,
      setValue,
    });
    let userData = null
    const ConfirmBtnHandler = async () => {
        setIsLoading(true)
        if (!isResend) {
            
        } else {
            const res= await userApi.verifyOTP({
                token : value,
                secret : secret
            })
            if (res.data.isValid) {
                if (user !== undefined) {
                    if (fb_access_token !== undefined) {
                        userData = await userApi.registerByFb({
                            access_token : fb_access_token,
                            phoneNumber : phoneNumber,
                            type : 'INVESTOR',
                            password : user.password
                        })                       
                    } else if (gg_access_token !== undefined) {
                        userData = await userApi.registerByGog({
                            access_token : gg_access_token,
                            phoneNumber : phoneNumber,
                            type : 'INVESTOR',
                            password : user.password
                        })  
                    } else {
                        userData = await userApi.register({
                            email : user.email,
                            phoneNumber : phoneNumber,
                            type : 'INVESTOR',
                            password : user.password
                    })
                    }

                    if (userData.data.id) {
                        await investorApi.create({                
                            userId : userData.data.id,
                            profileUrl : userData.data.profileUrl,
                            firstName : user.firstName,
                            lastName : user.lastName
                        })
                
                        let tokenRes = "";
                        if (fb_access_token !== undefined) {
                            tokenRes = await userApi.loginByFb({
                                access_token : fb_access_token
                            })
                        } else if (gg_access_token !== undefined) {
                            tokenRes = await userApi.loginByGoogle({
                                access_token : gg_access_token
                            })
                        } else {
                            tokenRes = await userApi.login(user.email,user.password)
                        }
                        await SecureStore.setItemAsync(JWT_TOKEN_KEY, tokenRes.data.token);
                        await loadToken();
                        navigation.navigate("HomeTab")
                    }
                } else {
                    navigation.navigate("Forgot")
                }          
            } else {
                setIsLoading(false)
                Alert.alert("Wrong code")
            }
            setIsLoading(false)
        }   
    }

    return (
        <View style={styles.container}>          
            <View>
                <LottieView source={LOCK_LOTTIE} style={styles.lottie} autoPlay loop/>
            </View>    
            <Text style={styles.text}>Please enter your verification code</Text> 
            <KeyboardAvoidingView
                    style={{
                        marginTop: 20,
                    }}
                >
                <CodeField
                    ref={ref}
                    {...props}
                    // Use `caretHidden={false}` when users can't paste a text value, because context menu doesn't appear
                    value={value}
                    onChangeText={setValue}
                    cellCount={CELL_COUNT}
                    rootStyle={styles.codeFieldRoot}
                    keyboardType="number-pad"
                    textContentType="oneTimeCode"
                    renderCell={({index, symbol, isFocused}) => (
                    <Text
                        key={index}
                        style={[styles.cell, isFocused && styles.focusCell]}
                        onLayout={getCellOnLayoutHandler(index)}>
                        {symbol || (isFocused ? <Cursor /> : null)}
                    </Text>
                    )}
                />       
                <Timer changeResend={(result) => setIsResend(result)}/>
                <AppLoading isLoading={isLoading}/>
                <Button
                    disabled={isResend}
                    title={"Resend OTP"}
                    buttonStyle={styles.btnNext}
                    titleStyle={{
                        fontFamily: PRIMARY_FONT,
                    }}
                    onPress={() => nextBtnHandler(navigation)}
                />
                <Button
                    title={"Confirm"}
                    buttonStyle={styles.btnNext}
                    titleStyle={{
                        fontFamily: PRIMARY_FONT,
                    }}
                    onPress={ConfirmBtnHandler}
                />
            </KeyboardAvoidingView>
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
        marginTop : 20,
        padding: 15,
        backgroundColor: PRIMARY_COLOR,
    },
    codeFieldRoot: {marginTop: 10},
    cell: {
        margin : 10,
        width: 40,
        height: 40,
        lineHeight: 38,
        fontSize: 24,
        textAlign: 'center',
        borderWidth : 1,
        borderColor : 'gray',
        borderRadius : 2, 
    },
    focusCell: {
        borderColor: 'red',
    },
})

