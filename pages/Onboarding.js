import React, { useEffect,useRef,useState } from 'react'
import { 
    StyleSheet,
    Text, 
    View,
    FlatList,
    Animated,
    TouchableOpacity
} from 'react-native'
import Svg, { G,Circle } from 'react-native-svg'
import { AntDesign } from '@expo/vector-icons'
import { useNavigation } from "@react-navigation/native";

import OnboardingItem from '../components/OnboardingItem'
import Paginator from '../components/Paginator'
import { PRIMARY_COLOR, PRIMARY_COLOR_WHITE } from '../constants/styles'
import onboardingData from '../data/onboardingData'

const NextButton = ({ percent,scrollTo }) => {
    const size = 120;
    const strokeWidth = 2;
    const center = size / 2;
    const radius = size / 2 - strokeWidth / 2;
    const circumference = 2 * Math.PI * radius
    const progressAnimation = useRef(new Animated.Value(0)).current
    const progressRef = useRef(null)

    const animation = (toValue) => {
        return Animated.timing(progressAnimation, {
            toValue,
            duration : 200,
            useNativeDriver : true
        }).start()
    }

    useEffect(() => {
        animation(percent)
    }, [percent])

    useEffect(() => {
        progressAnimation.addListener((value) => {
            const strokeDashoffset = circumference - (circumference * value.value) / 100

            if(progressRef?.current) {
                progressRef.current.setNativeProps({
                    strokeDashoffset,
                })
            }
        }, [percent]);

        return () => {
            progressAnimation.removeAllListeners()
        }
    },[])

    return(
        <View style={styles.container}>
            <Svg width={size} height={size}>
                <G rotation="-90" origin={center}>
                    <Circle stroke="#E6E7E8" cx={center} cy={center} r={radius} strokeWidth={strokeWidth}/>
                    <Circle
                        ref={progressRef}
                        stroke={PRIMARY_COLOR}
                        cx={center} 
                        cy={center} 
                        r={radius} 
                        strokeWidth={strokeWidth}
                        strokeDasharray={circumference}
                    />
                </G>
            </Svg>
            <TouchableOpacity onPress={scrollTo} style={styles.button} activeOpacity={0.6}>
                <AntDesign name="arrowright" size={30} color="#fff"/>
            </TouchableOpacity>
        </View>
    )
}

export default function Onboarding() {
    const [ currentIndex, setCurrentIndex ] = useState(0);
    const scrollX = useRef(new Animated.Value(0)).current;
    const sildeRef = useRef(null)
    const navigation = useNavigation()

    const viewableItemsChanged = useRef(({ viewableItems }) => {
        setCurrentIndex(viewableItems[0].index)
    }).current

    const viewConfig = useRef({ viewAreaCoveragePercentThreshold : 50 }).current

    const scrollTo = () => {
        if (currentIndex < onboardingData.length - 1) {
            sildeRef.current.scrollToIndex({ index : currentIndex + 1})
        } else {
            navigation.navigate("Login")
        }
    }

    return (
        <View style={styles.container}>
            <View style={{ flex : 3 }}>
                <FlatList data={onboardingData}
                        renderItem={({ item }) => <OnboardingItem  item={item}/>}
                        horizontal
                        pagingEnabled
                        showsHorizontalScrollIndicator={false}
                        bounces={false}
                        keyExtractor={(item) => item.id}
                        onScroll={Animated.event([{ nativeEvent : { contentOffset : { x : scrollX }}}], {
                            useNativeDriver : false,
                        })}
                        scrollEventThrottle={32}
                        onViewableItemsChanged={viewableItemsChanged}
                        viewabilityConfig={viewConfig}
                        ref={sildeRef}
                        />
            </View>
            <Paginator data={onboardingData} scrollX={scrollX}/>
            <NextButton scrollTo={scrollTo} percent={(currentIndex + 1) * (100 / onboardingData.length)}/>
        </View>
    )
}

const styles = StyleSheet.create({
    container : {
        flex : 1,
        justifyContent : 'center',
        alignItems : 'center',
        backgroundColor : PRIMARY_COLOR_WHITE
    },
    button : {
        position : 'absolute',
        backgroundColor : PRIMARY_COLOR,
        borderRadius : 100,
        padding : 20
    }
})
