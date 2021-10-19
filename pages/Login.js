import React,{ useState,useEffect } from 'react'
import { 
    StyleSheet, 
    Text,
    View,
    ImageBackground,
    KeyboardAvoidingView,
    TouchableOpacity,
    Alert
} from 'react-native'
import { Icon } from 'react-native-elements/dist/icons/Icon'
import { Button,Input } from "react-native-elements";
import { useNavigation } from "@react-navigation/native";
import {
    FULL_HEIGHT,
    FULL_WIDTH,
    PRIMARY_COLOR,
    PRIMARY_FONT,
    PRIMARY_FONT_BOLD,
    PRIMARY_FONT_ITALIC
} from "../constants/styles";
import { userApi } from '../apis/user';
import * as SecureStore from "expo-secure-store";
import { JWT_TOKEN_KEY, resetJWTToken } from '../constants';
import { loadToken } from '../apis';
import * as Facebook from "expo-facebook";
import * as Google from 'expo-google-app-auth';
import AppLoading from '../components/AppLoading';

export default function Login() {
    const navigation = useNavigation()
    const [email, setEmail] = useState("");
    const [password,setPassword] = useState("")
    const [showPassword,setShowPassword] = useState(false)
    const [isLoading,setIsLoading] = useState(false)

    useEffect(() => {
        resetJWTToken().then(async (token) => {
          if (token) {
            await loadToken();
            //navigation.navigate("HomeTab");
          }
        });
      }, []);

    const loginHandler = async (navigation) => {
        try {
            const res = await userApi.login(email, password);
            await SecureStore.setItemAsync(JWT_TOKEN_KEY, res.data.token);
            await loadToken();

            navigation.navigate("HomeTab");
          } catch (err) {
            Alert.alert("Login Status", "Wrong email or password");
          }
    }

    const loginByFb = async () => {
        try {
          await Facebook.initializeAsync({
            appId: "294847198832563",
          });
          const { token,type } = await Facebook.logInWithReadPermissionsAsync({
            permissions: ['public_profile', 'email'],
          });
          if (type === 'success') {
            const res = await userApi.loginByFb({
                access_token: token,
            });
            if (res.data.isNew) {
                navigation.navigate("Register", {
                    fb_access_token : token,
                    userFb : res.data.user
                });
            } else {
                await SecureStore.setItemAsync(JWT_TOKEN_KEY, res.data.token);
                await loadToken();
                navigation.navigate("HomeTab");
            } 
          }            
        } catch ({ message }) {
            setIsLoading(false)
            Alert.alert("Login Status", `Fail to login with Facebook`);
        }
      };

    const loginByGoogle = async () => {
        const config = {
            androidClientId: `159839076180-emidldpf136iq47aivk0huhvf689c6m5.apps.googleusercontent.com`,
        };
        try {
            setIsLoading(true)
            const { accessToken,type  } = await Google.logInAsync(config);
            if( type === 'success' ) {
                const res = await userApi.loginByGoogle({
                    access_token: accessToken,
                });
                if (res.data.isNew) {
                    navigation.navigate("Register", {
                        gg_access_token : accessToken,
                        userFb : res.data.user
                    });
                } else {
                    await SecureStore.setItemAsync(JWT_TOKEN_KEY, res.data.token);
                    await loadToken();
                    navigation.navigate("HomeTab");
                } 
            }         
            setIsLoading(false)
        } catch (error) {
            setIsLoading(false)
            Alert.alert("Login Status", `Fail to login with Google`);
        }
          
    }

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
            <AppLoading isLoading={isLoading}/>
            <View style={styles.bottomView}>
                <View style={{ padding : 40 }}>
                    <Text style={{...styles.text, fontSize : 35}}>Welcome</Text>
                    <View style={{ flexDirection : 'row', alignItems : 'center',fontSize : 15 }}>
                        <Text style={{ fontFamily : PRIMARY_FONT }}>
                            Don't have an account ?                  
                        </Text>
                        <TouchableOpacity onPress={() => navigation.navigate('Register')}>
                            <Text style={{ color : 'red' , fontFamily : PRIMARY_FONT_ITALIC }}>
                                {' '}
                                Register now
                            </Text>
                        </TouchableOpacity>                                     
                    </View>
                    <KeyboardAvoidingView
                        style={{
                            marginTop: 20,
                        }}
                    >
                        <Input
                            placeholder={"Email"}
                            inputContainerStyle={styles.inputContainer}
                            onChangeText={setEmail}
                            value={email}
                            />
                        <Input
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
                        <TouchableOpacity onPress={() => navigation.navigate('Forgot')}>
                            <Text style={{...styles.text,
                                            color:'gray',
                                            paddingBottom : 20,
                                            fontSize : 15,
                                            alignSelf : 'flex-end'
                                }}>
                                Forgot password
                            </Text>
                        </TouchableOpacity>
                        <Button
                            title={"Login"}
                            buttonStyle={styles.btnLogin}
                            titleStyle={{
                                fontFamily: PRIMARY_FONT,
                            }}
                            onPress={() => loginHandler(navigation)}
                        />
                        <Text
                            h4
                            style={{
                                textAlign: "center",
                                marginVertical: 5,
                                fontFamily: PRIMARY_FONT,
                            }}
                            >
                            ----- Or -----
                        </Text>                      
                        <View style={styles.socialLoginBtn}>
                            <TouchableOpacity onPress={loginByFb}>
                                <Icon
                                    style={{ padding : 10 }}
                                    type = "entypo"
                                    name = "facebook-with-circle"
                                    color = "#3b5998"
                                    size = {52}
                                />   
                            </TouchableOpacity>                                   
                            <TouchableOpacity onPress={loginByGoogle}>
                                <Icon
                                    style={{ padding : 10 }}
                                    type = "font-awesome-5"
                                    name = "google-plus"
                                    color = "#DD4D3F"
                                    size = {50}
                                />
                            </TouchableOpacity>                                          
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
        width : FULL_WIDTH / 1.5,
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
