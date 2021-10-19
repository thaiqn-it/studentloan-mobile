import React,{ useState,useEffect } from 'react'
import { StyleSheet, Text, View } from 'react-native'

export default function Timer({ changeResend }) {
    const [secondsLeft,setSecondsLeft] = useState(900)

    useEffect(() => {
        secondsLeft > 0 ? changeResend(true) : changeResend(false)
        const timer = secondsLeft > 0 && setInterval(() => setSecondsLeft(secondsLeft - 1), 1000)
        return () => clearInterval(timer)
    }, [secondsLeft])

    const clockiky = () => {
        let mins = Math.floor(secondsLeft / 60 % 60)
        let seconds = Math.floor(secondsLeft % 60)

        let displayMins = mins < 10 ? `0${mins}` : mins
        let displaySeconds = seconds < 10 ? `0${seconds}` : seconds

        return{
            displayMins,
            displaySeconds
        }
    }

    return (
        <View style={styles.container}>
            <Text style={styles.time}>
                { clockiky().displayMins } : { clockiky().displaySeconds }
            </Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container : {
        flex : 0.3,
        justifyContent : 'center',
        alignItems : 'center'
    },
    time : {
        color : 'red',
        fontSize : 20,
    }
})
