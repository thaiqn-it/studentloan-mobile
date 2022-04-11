import React from 'react'
import { 
    StyleSheet, 
    Text, 
    View,
    Image, 
} from 'react-native'
import { FULL_WIDTH, PRIMARY_COLOR, PRIMARY_COLOR_BLACK, PRIMARY_COLOR_WHITE, PRIMARY_FONT, PRIMARY_FONT_BOLD } from '../constants/styles'

export default function OnboardingItem({ item }) {
    return (
        <View style={[styles.container, { width : FULL_WIDTH }]}>
            <Image source={{ uri : item.image }}
                   style={[styles.image, { width : FULL_WIDTH - 20 , resizeMode : 'contain' }]}/>
            <View style={{ flex : 0.3 }}>
                <Text style={styles.title}>{item.title}</Text>
                <Text style={styles.description}>{item.description}</Text>
            </View>        
        </View>
    )
}
 
const styles = StyleSheet.create({
    container : {
        flex : 1,
        alignItems : 'center',
        justifyContent : 'center',
    },
    image : {
        flex : 0.7,
        justifyContent : 'center',
        alignItems : 'center',
    },
    title : {
        fontSize : 28,
        marginTop : 10,
        marginBottom : 10,
        color : PRIMARY_COLOR,
        textAlign : 'center',
        fontFamily : PRIMARY_FONT_BOLD,
    },
    description : {
        color : PRIMARY_COLOR_BLACK,
        textAlign : "center",
        paddingHorizontal : 20,
        fontFamily : PRIMARY_FONT,
    }
})
