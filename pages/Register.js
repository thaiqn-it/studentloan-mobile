import React, { useEffect, useState} from 'react'
import { 
    StyleSheet, 
    View,
    Text,
    ScrollView,
    ImageBackground,
    KeyboardAvoidingView,
    TouchableOpacity,
} from 'react-native'
import {
    FULL_HEIGHT,
    FULL_WIDTH,
    PRIMARY_COLOR,
    PRIMARY_FONT,
    PRIMARY_FONT_BOLD
} from "../constants/styles";
import { Icon } from 'react-native-elements/dist/icons/Icon'
import { Button,Input } from "react-native-elements";
import AppLoading from '../components/AppLoading';

export default function Register({ navigation, route }) {
    const [email, setEmail] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [password,setPassword] = useState("")
    const [confirmPassword,setConfirmPassword] = useState("")
    const [showPassword,setShowPassword] = useState(false)
    const [showConfirmPassword,setShowConfirmPassword] = useState(false)
    const [isEmailDisabled,setIsEmailDisabled] = useState(false);
    const [isLoading,setIsLoading] = useState(false)

    useEffect(() => {
        if (route.params !== undefined) {
            const userFb = route.params.userFb
            setEmail(userFb.email)
            setIsEmailDisabled(true)
            setFirstName(userFb.first_name)
            setLastName(userFb.last_name)
        }
    }, [])

    const btnRegisterHandler = () => {
        setIsLoading(true)
        const user = {
            email,
            password,
            firstName,
            lastName,  
        }
        if (route.params === undefined) {
            navigation.navigate("RegisterPhone", {
                user
            })
        } else if (route.params.gg_access_token !== undefined)  {
            navigation.navigate("RegisterPhone", {
                gg_access_token : route.params.gg_access_token,
                user
            })
        } else {
            navigation.navigate("RegisterPhone", {
                fb_access_token : route.params.fb_access_token,
                user
            })
        }
        setIsLoading(false)    
    }
    
    return (
        <ScrollView style={styles.container}>
            <ImageBackground source={{uri : 'https://wallpaperaccess.com/full/1155050.jpg'}}
                             style={{
                                 height : FULL_HEIGHT / 2.5
                             }}>
                <View style={styles.logo}>
                    <Icon   name='heartbeat'
                            type='font-awesome'
                            color='#fff'
                            size={100}/>
                    <Text style={styles.appName}>Student Loan</Text>
                </View>               
            </ImageBackground>
            <AppLoading isLoading={isLoading}/>
            <View style={styles.bottomView}>
                <View style={{ padding : 40 }}>
                    <Text style={{ color : PRIMARY_COLOR, fontFamily : PRIMARY_FONT, fontSize : 35}}>Register</Text>
                    <KeyboardAvoidingView
                        style={{
                            marginTop: 20,
                        }}
                    >
                        <Input
                            disabled={isEmailDisabled}
                            style={ styles.text }
                            placeholder={"Email"}
                            inputContainerStyle={styles.inputContainer}
                            onChangeText={setEmail}
                            value={email}
                            />
                        <Input
                            style={ styles.text }
                            placeholder={"First Name"}
                            inputContainerStyle={styles.inputContainer}
                            onChangeText={setFirstName}
                            value={firstName}
                            />
                        <Input
                            style={ styles.text }
                            placeholder={"Last Name"}
                            inputContainerStyle={styles.inputContainer}
                            onChangeText={setLastName}
                            value={lastName}
                        />
                        <Input
                            style={ styles.text }
                            secureTextEntry={!showPassword}
                            inputContainerStyle={styles.inputContainer}
                            placeholder={"Password"}
                            onChangeText={setPassword}
                            value={password}
                            rightIcon={{
                                type: "font-awesome-5",
                                name: showPassword ? "eye" : "eye-slash",
                                onPress: (e) => {
                                    setShowPassword(!showPassword);
                                },
                            }}
                        />
                        <Input
                            style={ styles.text }
                            secureTextEntry={!showConfirmPassword}
                            inputContainerStyle={styles.inputContainer}
                            placeholder={"Confirm password"}
                            onChangeText={setConfirmPassword}
                            value={confirmPassword}
                            rightIcon={{
                                type: "font-awesome-5",
                                name: showConfirmPassword ? "eye" : "eye-slash",
                                onPress: (e) => {
                                    setShowConfirmPassword(!showConfirmPassword);
                                },
                            }}
                        />
                        
                        <Button
                            onPress={btnRegisterHandler}
                            title={"Register"}
                            buttonStyle={styles.btnRegister}
                            titleStyle={{
                                fontFamily: PRIMARY_FONT,
                            }}
                        />    
                        <TouchableOpacity onPress={() => navigation.navigate("Login")}>
                            <Text style={{...styles.text,
                                            color: PRIMARY_COLOR,
                                            paddingTop : 30,
                                            fontSize : 15,
                                            alignSelf : 'center'
                                }}
                                >
                                Back to login
                            </Text>         
                        </TouchableOpacity>     
                    </KeyboardAvoidingView>
                </View>
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container : {
        flex : 1,
        backgroundColor : '#fff',
    },
    logo : {
        flex : 1,
        justifyContent : 'center',
        alignItems : 'center',
    },
    appName : {
        color : '#ffffff',
        fontSize : 30,  
        textTransform : 'uppercase',
        fontFamily : PRIMARY_FONT_BOLD
    },
    bottomView : {
        flex : 1.5,
        backgroundColor : '#fff',
        bottom : 50,
        borderTopStartRadius : 50,
        borderTopEndRadius : 50,
    },
    text : {
        fontFamily : PRIMARY_FONT
    },
    btnRegister : {
        marginTop : 10,
        width : FULL_WIDTH / 1.5,
        borderRadius : 25,
        alignSelf : 'center',
        padding: 15,
        backgroundColor: PRIMARY_COLOR,
    },
    
})
