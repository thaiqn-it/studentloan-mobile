import React from 'react'
import { StyleSheet, Text, View,Animated } from 'react-native'
import { FULL_WIDTH, PRIMARY_COLOR, PRIMARY_COLOR_BLACK } from '../constants/styles'

export default function Paginator({ data,scrollX }) {
    return (
        <View style={{ flexDirection : 'row' ,height : 64 }}>
            {   
                data.map((_, i) => {
                    const inputRange = [(i - 1) * FULL_WIDTH, i * FULL_WIDTH, (i + 1) * FULL_WIDTH];

                    const dotWidth = scrollX.interpolate({
                        inputRange,
                        outputRange : [10,20,10],
                        extrapolate : 'clamp'
                    })

                    const opacity = scrollX.interpolate({
                        inputRange,
                        outputRange : [0.3,1,0.3],
                        extrapolate : 'clamp'
                    })

                    return <Animated.View style={[styles.dot, { width : dotWidth,opacity }]} key={i}/>
                }) 
            }
        </View>
    )
}

const styles = StyleSheet.create({
    dot : {
        height : 10,
        borderRadius : 5,
        backgroundColor : PRIMARY_COLOR,
        marginHorizontal : 10,
    }
})
 