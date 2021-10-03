import React from 'react'
import Spinner from 'react-native-loading-spinner-overlay';

export default function AppLoading({isLoading}) {
    return (
        <Spinner
            visible={isLoading}
            textContent={'Loading'}
            textStyle={{color : 'white'}}
        />
    )
}

