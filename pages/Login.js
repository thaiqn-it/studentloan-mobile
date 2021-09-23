import React,{ useState } from 'react'
import { 
    StyleSheet, 
    Text,
    View,
    ImageBackground,
    KeyboardAvoidingView,
} from 'react-native'
import { Icon } from 'react-native-elements/dist/icons/Icon'
import { Button,Input } from "react-native-elements";
import {
    FULL_HEIGHT,
    FULL_WIDTH,
    PRIMARY_COLOR,
    PRIMARY_FONT,
    PRIMARY_FONT_BOLD
} from "../constants/styles";

export default function Login() {
    const [email, setEmail] = useState("");
    const [password,setPassword] = useState("")
    const [showPassword,setShowPassword] = useState(false)
    return (
        <View style={styles.container}>
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
                    <Text style={{...styles.text, fontSize : 35}}>Welcome</Text>
                    <Text style={{ fontSize : 15,fontFamily : PRIMARY_FONT }}>
                        Don't have an account ?
                        <Text style={{ color : 'red' , fontStyle : 'italic',fontFamily : PRIMARY_FONT }}>
                            {' '}
                            Register now
                        </Text>
                    </Text>
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
                        <Text style={{...styles.text,
                                        color:'gray',
                                        paddingBottom : 20,
                                        fontSize : 15,
                                        alignSelf : 'flex-end'
                            }}>
                            Forgot password
                        </Text>
                        <Button
                            title={"Login"}
                            buttonStyle={styles.btnLogin}
                            titleStyle={{
                                fontFamily: PRIMARY_FONT,
                            }}
                        />
                        <Text
                            h4
                            style={{
                                textAlign: "center",
                                marginVertical: 10,
                                fontFamily: PRIMARY_FONT,
                            }}
                            >
                            ----- Or -----
                        </Text>                      
                        <View style={styles.socialLoginBtn}>
                            <Icon
                                style={{ padding : 10 }}
                                type = "entypo"
                                name = "facebook-with-circle"
                                color = "#3b5998"
                                size = {50}
                            />    
                            <Icon
                                style={{ padding : 10 }}
                                type = "font-awesome-5"
                                name = "google-plus"
                                color = "#DD4D3F"
                                size = {50}
                            />               
                        </View>                   
                    </KeyboardAvoidingView>
                </View>            
            </View>  
        </View>
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
    inputContainer: {
        borderBottomColor: PRIMARY_COLOR,      
    },
    btnLogin : {
        width : 200,
        borderRadius : 25,
        alignSelf : 'center',
        padding: 15,
        backgroundColor: PRIMARY_COLOR,
    },
    socialLoginBtn : {
        flexDirection : 'row',
        alignSelf : 'center',
        justifyContent : 'space-around'
    },
})
