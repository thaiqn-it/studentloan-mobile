import React,{ useState,useEffect,useRef } from 'react'
import { 
    StyleSheet, 
    Text,
    View,
    ImageBackground,
    KeyboardAvoidingView,
    TouchableOpacity,
    Alert,
    Image
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
import Constants from 'expo-constants';
import * as Notifications from 'expo-notifications';


export default function Login() {
    const navigation = useNavigation()
    const [email, setEmail] = useState("");
    const [password,setPassword] = useState("")
    const [showPassword,setShowPassword] = useState(false)
    const [isLoading,setIsLoading] = useState(false)
    const USER_TYPE = 'INVESTOR'

    const [pushToken, setPushToken] = useState('');
    const [notification, setNotification] = useState(false);
    const notificationListener = useRef();
    const responseListener = useRef();

    Notifications.setNotificationHandler({
        handleNotification: async () => ({
          shouldShowAlert: true,
          shouldPlaySound: false,
          shouldSetBadge: false,
        }),
    });

    
    useEffect(() => {
        registerForPushNotificationsAsync().then(token => setPushToken(token));
        // getLastNotification().then(result => Alert.alert("he",`${result}`))
        
        Notifications.setNotificationHandler(true)
        // notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
        //   setNotification(notification);
        //   alert(notification);
        // });
    
        // responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
        //   console.log(response);
        //   alert(response);
        // });
    
        return () => {
        //   Notifications.removeNotificationSubscription(notificationListener.current);
        //   Notifications.removeNotificationSubscription(responseListener.current);
        };
      }, []);

    useEffect(() => {
        resetJWTToken().then(async (token) => {
          if (token) {
            await loadToken();
            navigation.navigate("HomeTab");
          }
        });
      }, []);

    // async function getLastNotification() {
    // let result = await Notifications.getLastNotificationResponseAsync()
    // const url = result?.notification;
    // return JSON.stringify(url)
    // }

    async function registerForPushNotificationsAsync() {
    let token;
    if (Constants.isDevice) {
        const { status: existingStatus } = await Notifications.getPermissionsAsync();
        let finalStatus = existingStatus;
        if (existingStatus !== 'granted') {
        const { status } = await Notifications.requestPermissionsAsync();
            finalStatus = status;
        }
        if (finalStatus !== 'granted') {
            alert('Failed to get push token for push notification!');
        return;
        }
        token = (await Notifications.getDevicePushTokenAsync()).data;

    } else {
        alert('Must use physical device for Push Notifications');
    }
    
    if (Platform.OS === 'android') {
        Notifications.setNotificationChannelAsync('default', {
            name: 'default',
            importance: Notifications.AndroidImportance.MAX,
            vibrationPattern: [0, 250, 250, 250],
            lightColor: '#FF231F7C',
        });
    }
    
        return token;
    }

    const updatePushToken = async (token) => {
        await userApi.update({
            pushToken : token
        })
    }
      
    const loginHandler = async (navigation) => {
        try {
            const res = await userApi.login(email, password,USER_TYPE);

            await SecureStore.setItemAsync(JWT_TOKEN_KEY, res.data.token);
            await loadToken();  
            await updatePushToken(pushToken)
            navigation.navigate("HomeTab");
          } catch (err) {
            Alert.alert("Đăng nhập thất bại", "Hãy kiểm tra lại thông tin đăng nhập của bạn");
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
                type : USER_TYPE
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
            Alert.alert("Đăng nhập thất bại", `Không thể đăng nhập bằng tài khoản này`);
        }
      };

    const loginByGoogle = async () => {
        const config = {
            androidClientId: `761167549872-on8eml3rec49ipp2g82lbrla9opeg8nd.apps.googleusercontent.com`,
        };
        try {
            setIsLoading(true)
            const { accessToken,type  } = await Google.logInAsync(config);
            if( type === 'success' ) {
                const res = await userApi.loginByGoogle({
                    access_token: accessToken,
                    type : USER_TYPE
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
            Alert.alert("Đăng nhập thất bại", `Không thể đăng nhập bằng tài khoản này`);
        }
          
    }

    return (
        <View style={styles.container}>
            <ImageBackground source={{uri : 'https://wallpaperaccess.com/full/1155050.jpg'}}
                             style={{
                                 height : FULL_HEIGHT / 2.5
                             }}>
                <View style={styles.logo}>
                    <Image source={require('../assets/logo.png')} style={{ height : 100, width : 100  }}/>
                    <Text style={styles.appName}>Student Loan</Text>
                </View>               
            </ImageBackground>   
            <AppLoading isLoading={isLoading}/>
            <View style={styles.bottomView}>
                <View style={{ padding : 40 }}>
                    <Text style={{...styles.text, fontSize : 35}}>Welcome</Text>
                    <View style={{ flexDirection : 'row', alignItems : 'center',fontSize : 15 }}>
                        <Text style={{ fontFamily : PRIMARY_FONT }}>
                            Chưa có tài khoản ?                  
                        </Text>
                        <TouchableOpacity onPress={() => navigation.navigate('Register')}>
                            <Text style={{ color : 'red' , fontFamily : PRIMARY_FONT_ITALIC }}>
                                {' '}
                                Đăng ký ngay
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
                            placeholder={"Mật khẩu"}
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
                                Quên mật khẩu
                            </Text>
                        </TouchableOpacity>
                        <Button
                            title={"Đăng nhập"}
                            buttonStyle={styles.btnLogin}
                            titleStyle={{
                                fontFamily: PRIMARY_FONT,
                            }}
                            onPress={() => loginHandler(navigation)}
                        />
                        {/* <Text
                            h4
                            style={{
                                textAlign: "center",
                                marginVertical: 5,
                                fontFamily: PRIMARY_FONT,
                            }}
                            >
                            ----- Hoặc -----
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
                        </View>                    */}
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
        marginTop : 30
    },
    socialLoginBtn : {
        flexDirection : 'row',
        alignSelf : 'center',
        justifyContent : 'space-around'
    },
})
