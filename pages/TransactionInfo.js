import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { FULL_WIDTH, PRIMARY_COLOR, PRIMARY_COLOR_WHITE } from '../constants/styles'
import { AntDesign } from '@expo/vector-icons';

export default function TransactionInfo() {
    return (
        <View>
            <View style={styles.topContainer}>
                <View style={{ flexDirection : 'row', justifyContent: 'space-between', alignItems : 'center'}}>
                    <Text style={{ fontSize : 17, margin : 10 }}>DEPOSIT</Text>
                    <Text style={{ fontSize : 20, fontWeight : 'bold', marginHorizontal : 10}}>+29309999$</Text>
                </View>
                <View style={{ flexDirection : 'row', backgroundColor : '#47ffb3', margin : 10, borderRadius : 10, paddingHorizontal : 10 }}>
                    <View style={{ alignSelf : 'center', backgroundColor : '#03A678', borderRadius : 15}}>
                        <AntDesign name="check" size={20} color="white" />
                    </View>             
                    <Text style={{ fontSize : 17, margin : 10, opacity : 0.6 }}>Success !</Text>
                </View>
                <View style={{ flexDirection : 'row', justifyContent : 'space-between', margin : 10}}>
                    <Text style={styles.leftText}>Transaction on</Text>
                    <Text style={styles.rightText}>20/10/2023</Text>
                </View>
                <View style={styles.line}/>
                <View style={{ flexDirection : 'row', justifyContent : 'space-between', margin : 10 }}>
                    <Text style={styles.leftText}>From</Text>
                    <Text style={styles.rightText}>Paypal Payment</Text>
                </View>
                <View style={styles.line}/>
                <View style={{ flexDirection : 'row', justifyContent : 'space-between', margin : 10 }}>
                    <Text style={styles.leftText}>To</Text>
                    <Text style={styles.rightText}>Wallet</Text>
                </View>
                <View style={styles.line}/>
                <View style={{ flexDirection : 'row', justifyContent : 'space-between', margin : 10 }}>
                    <Text style={styles.leftText}>Fee</Text>
                    <Text style={styles.rightText}>2$</Text>
                </View>
            </View>
            <View style={styles.descriptionContainer}>
                <Text style={{ fontSize : 17, margin : 10 }}>DESCRIPTION</Text>
                <View style={styles.line}/>
                <Text style={{ fontSize : 15, margin : 10 }}>Deposit to my wallet</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    topContainer : {
        margin : 10,
        elevation : 5,
        backgroundColor : PRIMARY_COLOR_WHITE,
        borderRadius : 10,
        marginTop : 50
    },
    line : { 
        borderBottomWidth : 1, 
        borderBottomColor : '#dadee3',
        width : FULL_WIDTH / 1.1, 
        alignSelf : 'center',
    },
    leftText : {
        fontSize : 16,
        opacity : 0.6
    },
    rightText : {
        fontSize : 15,
        fontWeight : 'bold'
    },
    descriptionContainer : {
        margin : 10,
        elevation : 5,
        backgroundColor : PRIMARY_COLOR_WHITE,
        borderRadius : 10,
    }
})
