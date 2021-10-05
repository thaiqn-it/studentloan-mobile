import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

export default function DetailPost({route}) {
    const {name, school} = route.params;
    return (
        <View>
            <Text>
                Name: {name}
                School: {school}
            </Text>
        </View>
    )
}

const styles = StyleSheet.create({})