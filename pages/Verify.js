import React, {useRef,useState,useEffect} from 'react'
import { StyleSheet, Text, View,Animated, Image,TouchableOpacity } from 'react-native'
import { FULL_HEIGHT, FULL_WIDTH, PRIMARY_COLOR, PRIMARY_COLOR_WHITE } from '../constants/styles'
import HeaderBar from '../components/HeaderBar';
import * as Animatable from 'react-native-animatable';
import * as ImagePicker from 'expo-image-picker';
import { Button } from 'react-native-paper';
import { Overlay } from 'react-native-elements';
import { Feather,Ionicons  } from '@expo/vector-icons';

export default function Verify({ navigation }) {
    const [modalVisible, setModalVIsible] = useState(false);
    const scrollY = useRef(new Animated.Value(0)).current;
    const [type,setType] = useState(null)
    const [selectedView,setSelectedView] = useState(1)
    const [portrait,setPortrait] = useState(null)
    const [frontCard,setFrontCard] = useState(null)
    const [backCard,setBackCard] = useState(null)

    const view1 = useRef(null)
    const view2 = useRef(null)
    
    const button1 = useRef(null)
    const button2 = useRef(null)

    const openCamera = async () => {
        hideModal()
        let result = await ImagePicker.launchCameraAsync()
        if (type === 'portrait') {
            setPortrait(result)
        } else if (type === 'frontCard') {
            setFrontCard(result)
        } else if (type === 'backCard') {
            setBackCard(result)
        }
    }

    const openLibrary = async () => {
        hideModal()
        let result = await ImagePicker.launchImageLibraryAsync()
        if (type === 'portrait') {
            setPortrait(result)
        } else if (type === 'frontCard') {
            setFrontCard(result)
        } else if (type === 'backCard') {
            setBackCard(result)
        }
    }
    const hideModal = () => setModalVIsible(false);
    const showModal = () => setModalVIsible(true);

    const ModalPicker = () => {
        return(    
            <Overlay isVisible={modalVisible} onBackdropPress={hideModal} overlayStyle={{borderRadius : 10, height : 200, width : FULL_WIDTH - 40}}>
                <Text style={{ margin : 15, alignSelf : 'center',fontSize : 17}}>Upload your image</Text>
                <View style={{ flexDirection : 'row', justifyContent : 'space-around' }}>
                    <TouchableOpacity style={styles.iconPicker} onPress={() => openCamera()}>                  
                        <Feather name="camera" size={25} color={PRIMARY_COLOR_WHITE}/>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.iconPicker} onPress={() => openLibrary()}>
                        <Ionicons name="library-outline" size={25} color={PRIMARY_COLOR_WHITE}/>
                    </TouchableOpacity>
                </View>
            </Overlay>
        )
    }

    return (
        <View style={{ height : FULL_HEIGHT }}>
            <HeaderBar 
                scrollY={scrollY} 
                navigation={navigation} 
            />
            <ModalPicker />
            <View style={{ flexDirection : 'row', marginTop : FULL_HEIGHT / 8, alignSelf : 'flex-end' }}>
                <Animatable.View ref={button1} style={[styles.buttonTab, {marginLeft : 10,flex : 1}]}>            
                    <Text style={styles.tabText}>1</Text>                
                </Animatable.View>
                <Animatable.View ref={button2} style={styles.buttonTab}>               
                    <Text style={styles.tabText}>2</Text>                
                </Animatable.View>
            </View>
            <View style={{ flexDirection : 'row' }}>
                <Animatable.View ref={view1} style={[styles.containerInfo, { padding : 10}]}>
                    <Text style={{ fontSize : 18 , fontWeight : 'bold',alignSelf : 'center'}}>Portrait</Text> 
                    <TouchableOpacity style={styles.portraitContainer}
                                      onPress={() => {
                                          showModal()
                                          setType('portrait')
                                      }}>
                        {
                            portrait !== null
                            ?
                            (
                                <Image source={{ uri : portrait.uri }} style={{ height : 200 , width : 100 }}/>  
                            )
                            :
                            (
                                <Image source={require('../assets/photo.png')} />  
                            )
                        }     
                    </TouchableOpacity> 
                    <View style={{ alignSelf : 'flex-end', justifyContent : 'flex-end', flex : 1, margin : 10, marginBottom : 20}}>                      
                        <Button
                            disabled={portrait === null ? true : false}
                            style={styles.buttonClick}
                            color={PRIMARY_COLOR}
                            onPress={() => {
                                button2.current.transitionTo({ translateX : -(FULL_WIDTH - 130) })
                                view1.current.transitionTo({ translateX : - FULL_WIDTH })
                                view2.current.transitionTo({ translateX : - FULL_WIDTH })
                            }}
                        >Next</Button> 
                    </View>         
                </Animatable.View>
                <Animatable.View ref={view2} style={styles.containerInfo}>
                    <Text style={{ fontSize : 18 , fontWeight : 'bold',alignSelf : 'center'}}>Identity card</Text>
                    <TouchableOpacity style={styles.idCardContainer} 
                                      onPress={() => {
                                        showModal()
                                        setType('frontCard')
                                      }}>
                        {
                            frontCard !== null 
                            ? 
                            (
                                <Image source={{ uri : frontCard.uri }} style={{ height : 180 , width : 100 }} />   
                            )
                            :
                            (
                                <Image source={require('../assets/front.png')} />   
                            )
                        }   
                    </TouchableOpacity>
                    <Text style={{ fontSize : 15 ,alignSelf : 'center'}}>The front of the identity card</Text>   
                    <TouchableOpacity style={styles.idCardContainer}
                                      onPress={() => {
                                        showModal()
                                        setType('backCard')
                                      }}>
                        {
                            backCard !== null 
                            ? 
                            (
                                <Image source={{ uri : backCard.uri }} style={{ height : 180 , width : 100 }} />   
                            )
                            :
                            (
                                <Image source={require('../assets/back.png')} /> 
                            )
                        }
                    </TouchableOpacity>
                    <Text style={{ fontSize : 15 ,alignSelf : 'center'}}>The back of the identity card</Text> 
                    <View style={{ flexDirection : 'row', justifyContent : 'space-between', flex : 1, margin : 10}}>
                        <Button
                            style={styles.buttonClick}
                            color={PRIMARY_COLOR}
                            onPress={() => {
                                button2.current.transitionTo({ translateX : 0 })
                                view1.current.transitionTo({ translateX : 0 })
                                view2.current.transitionTo({ translateX : 0 })
                            }}
                        >Previous</Button> 
                        <Button
                            disabled={(frontCard === null || backCard === null) ? true : false}
                            style={styles.buttonClick}
                            color={PRIMARY_COLOR}
                            onPress={() => {
                                button2.current.transitionTo({ translateX : -(FULL_WIDTH - 130) })
                                view1.current.transitionTo({ translateX : - FULL_WIDTH })
                                view2.current.transitionTo({ translateX : - FULL_WIDTH })
                            }}
                        >Confirm</Button> 
                    </View> 
                </Animatable.View>
            </View>
            
        </View>
    )
}

const styles = StyleSheet.create({
    buttonTab : {    
        marginRight : 10
    },
    tabText : {
        height : 50, 
        width : 50, 
        borderRadius : 50,     
        backgroundColor : PRIMARY_COLOR,
        fontSize : 17,
        fontWeight : 'bold',
        textAlign : 'center',
        textAlignVertical : 'center'
    },
    containerInfo : {
        marginTop : 10,
        height : FULL_HEIGHT / 1.3,
        width : FULL_WIDTH - 20,
        backgroundColor : PRIMARY_COLOR_WHITE,
        borderRadius : 10,
        margin : 10,
        elevation : 5,
    },
    buttonClick: {
        width : FULL_WIDTH / 2.8,
        borderRadius : 5,
        borderWidth : 1.2,
        alignSelf : 'center',
        borderColor : PRIMARY_COLOR,
        backgroundColor : PRIMARY_COLOR_WHITE
    },
    iconPicker : {
        height : 100, 
        width : 100, 
        elevation : 5, 
        alignSelf : 'center', 
        alignItems : 'center', 
        backgroundColor: PRIMARY_COLOR,
        justifyContent : 'space-around',
        borderRadius : 100,
    },
    portraitContainer : {
        alignItems : 'center', 
        marginTop : 20, 
        backgroundColor : 
        PRIMARY_COLOR_WHITE, 
        padding : 15, 
        borderRadius : 20, 
        elevation : 5 
    },
    idCardContainer : {
        alignItems : 'center',
        marginTop : 20, 
        backgroundColor : PRIMARY_COLOR_WHITE, 
        borderRadius : 20, 
        elevation : 5, 
        marginHorizontal : 30
    }
})
