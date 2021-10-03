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
import { useNavigation } from "@react-navigation/native";

export default function Register() {
    const navigation = useNavigation()
    const [email, setEmail] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [password,setPassword] = useState("")
    const [confirmPassword,setConfirmPassword] = useState("")
    const [showPassword,setShowPassword] = useState(false)
    const [showConfirmPassword,setShowConfirmPassword] = useState(false)

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
            <View style={styles.bottomView}>
                <View style={{ padding : 40 }}>
                    <Text style={{...styles.text, fontSize : 35}}>Register</Text>
                    <KeyboardAvoidingView
                        style={{
                            marginTop: 20,
                        }}
                    >
                        <Input
                            style={ styles.text }
                            placeholder={"Email"}
                            inputContainerStyle={styles.inputContainer}
                            onChangeText={setEmail}
                            value={email}
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
                        <Button
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
        color : '#00BFA6',
        fontFamily : PRIMARY_FONT
    },
    btnRegister : {
        marginTop : 10,
        width : 200,
        borderRadius : 25,
        alignSelf : 'center',
        padding: 15,
        backgroundColor: PRIMARY_COLOR,
    },
    
})
