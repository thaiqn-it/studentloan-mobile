import React, { useState } from 'react'
import { 
    StyleSheet, 
    Text, 
    View,
    ImageBackground,
} from 'react-native'
import { Image,Input,Button } from 'react-native-elements';
import { FULL_HEIGHT, PRIMARY_COLOR, PRIMARY_FONT } from '../constants/styles'
import { useNavigation } from "@react-navigation/native";
import LottieView from 'lottie-react-native';
import { LOCK_LOTTIE } from '../constants/files'

const nextBtnHandler = (navigation) => {
    navigation.navigate("Verification")
}

export default function ForgotPassword() {
    const navigation = useNavigation()
    const [email, setEmail] = useState("");
    return (
        <View style={styles.container}>
             <ImageBackground source={{uri : 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSvKJYJtr8OJ0CvRLcGMybGThLQQsyWIugmRA&usqp=CAU'}}
                             style={{
                                 height : FULL_HEIGHT,
                                 alignItems : 'center'
                             }}>         
                <View>
                    <LottieView source={LOCK_LOTTIE} style={styles.lottie} autoPlay loop/>
                </View>    
                <Text style={styles.text}>Please enter your email address to receive a verification code</Text> 
                <Input
                    style={{ 
                        color : 'black',
                        fontFamily : PRIMARY_FONT ,
                        marginTop : 20,
                    }}
                    containerStyle={{width : 350}}
                    placeholder={"Email"}
                    inputContainerStyle={styles.inputContainer}
                    onChangeText={setEmail}
                    value={email}
                />
                <Button
                    title={"Next"}
                    buttonStyle={styles.btnNext}
                    titleStyle={{
                        fontFamily: PRIMARY_FONT,
                    }}
                    onPress = {() => nextBtnHandler(navigation)}
                />
            </ImageBackground>  
        </View>
    )
}

const styles = StyleSheet.create({
    container : {
        flex : 1,
        backgroundColor : '#fff',
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
        width : 200,
        borderRadius : 25,
        alignSelf : 'center',
        marginTop : 50,
        padding: 15,
        backgroundColor: PRIMARY_COLOR,
    },
})