import React, { useState } from 'react'
import { 
    StyleSheet, 
    Text, 
    View,
    ImageBackground,
} from 'react-native'
import { Image,Input,Button } from 'react-native-elements';
import { FULL_HEIGHT, PRIMARY_COLOR, PRIMARY_FONT } from '../constants/styles'
import { LOCK_LOTTIE } from '../constants/files'
import { useNavigation } from "@react-navigation/native";
import LottieView from 'lottie-react-native';
import {
    CodeField,
    Cursor,
    useBlurOnFulfill,
    useClearByFocusCell,
} from 'react-native-confirmation-code-field';

const CELL_COUNT = 6;

const nextBtnHandler = (navigation) => {
    navigation.navigate("ChangePassword")
}


export default function Verification() {
    const navigation = useNavigation()
    const [email, setEmail] = useState("");

    const [value, setValue] = useState('');
    const ref = useBlurOnFulfill({value, cellCount: CELL_COUNT});
    const [props, getCellOnLayoutHandler] = useClearByFocusCell({
      value,
      setValue,
    });

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
                <Text style={styles.text}>Please enter your verification code</Text> 
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
                <Button
                    title={"Next"}
                    buttonStyle={styles.btnNext}
                    titleStyle={{
                        fontFamily: PRIMARY_FONT,
                    }}
                    onPress={() => nextBtnHandler(navigation)}
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
        elevation: 0.5,      
    },
    focusCell: {
        borderColor: 'red',
    },
})

