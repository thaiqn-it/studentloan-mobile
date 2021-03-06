import React, {useRef,useState,useEffect,useContext} from 'react'
import { StyleSheet, Text, View,Animated, Image,TouchableOpacity } from 'react-native'
import { FULL_HEIGHT, FULL_WIDTH, PRIMARY_COLOR, PRIMARY_COLOR_WHITE,PRIMARY_COLOR_BLACK } from '../constants/styles'
import HeaderBar from '../components/HeaderBar';
import * as Animatable from 'react-native-animatable';
import * as ImagePicker from 'expo-image-picker';
import { ActivityIndicator, Button } from 'react-native-paper';
import { Overlay,Input } from 'react-native-elements';
import { Feather,Ionicons,FontAwesome5,Fontisto } from '@expo/vector-icons';
import { AppContext } from '../contexts/App';
import DateTimePicker from '@react-native-community/datetimepicker';
import moment from 'moment';
import getEnvVars from '../constants/env';
import { investorApi } from '../apis/investor';
import AppLoading from '../components/AppLoading'
import { SafeAreaView } from 'react-native-safe-area-context';
import { notificationApi } from '../apis/notification';
import { userApi } from '../apis/user';
import * as Notifications from 'expo-notifications';

export default function Verify({ navigation }) {
    const { user, setUser, getUser } = useContext(AppContext);

    const [modalVisible, setModalVIsible] = useState(false);
    const [type,setType] = useState(null)
    const [frontCard,setFrontCard] = useState(null)
    const [backCard,setBackCard] = useState(null)
    const [isLoading,setIsLoading] = useState(false)

    const [userStatus,setUserStatus] = useState('')

    const view1 = useRef(null)
    const view2 = useRef(null)

    const loadUser = () => {
        async function load() {
          const data = await getUser();
          setUser({
            type: "LOAD",
            data,
          });
          setUserStatus(data.status)
        }       
        load();
      };

    useEffect(() => {
      loadUser()
    }, [])
     
    useEffect(() => {  
        const subscription = Notifications.addNotificationReceivedListener(notification => {
            loadUser()
        });
        return () => subscription.remove();
    }, [])

    const openCamera = async () => {
        hideModal()
        let result = await ImagePicker.launchCameraAsync()
        if (!result.cancelled) {
            if (type === 'frontCard') {
                setFrontCard(result)
            } else if (type === 'backCard') {
                setBackCard(result)
            }
        }       
    }

    const openLibrary = async () => {
        hideModal()
        let result = await ImagePicker.launchImageLibraryAsync()
        if (!result.cancelled) {
            if (type === 'frontCard') {
                setFrontCard(result)
            } else if (type === 'backCard') {
                setBackCard(result)
            }
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

    const CitizenImageView = () => {
        return(
            <Animatable.View ref={view1} style={styles.containerInfo}>
                    <Text style={{ fontSize : 18 , fontWeight : 'bold',alignSelf : 'center', marginTop : 10}}>???nh c??n c?????c c??ng d??n/ CMND</Text>
                    <TouchableOpacity style={styles.idCardContainer} 
                                      onPress={() => {
                                        showModal()
                                        setType('frontCard')
                                      }}>
                        {
                            frontCard !== null 
                            ? 
                            (
                                <Image source={{ uri : frontCard.uri }} style={{ height : 220 , width : 310,borderRadius : 20 }} />   
                            )
                            :
                            (
                                <Image source={require('../assets/front.png')} />   
                            )
                        }   
                    </TouchableOpacity>
                    <Text style={{ fontSize : 15 ,alignSelf : 'center', marginTop : 5}}>M???t tr?????c</Text>   
                    <TouchableOpacity style={styles.idCardContainer}
                                      onPress={() => {
                                        showModal()
                                        setType('backCard')
                                      }}>
                        {
                            backCard !== null 
                            ? 
                            (
                                <Image source={{ uri : backCard.uri }} style={{ height : 220 , width : 310,borderRadius : 20  }} />   
                            )
                            :
                            (
                                <Image source={require('../assets/back.png')} /> 
                            )
                        }
                    </TouchableOpacity>
                    <Text style={{ fontSize : 15 ,alignSelf : 'center', marginTop : 5}}>M???t sau</Text> 
                    <View style={{ alignSelf : 'flex-end', justifyContent : 'flex-end', flex : 1, margin : 10, marginBottom : 20}}>                      
                        <Button
                            disabled={(frontCard === null || backCard === null) ? true : false}
                            style={styles.buttonClick}
                            color={PRIMARY_COLOR}
                            onPress={() => {
                                view1.current.transitionTo({ translateX : - FULL_WIDTH })
                                view2.current.transitionTo({ translateX : - FULL_WIDTH })
                            }}
                        >Ti???p theo</Button> 
                    </View>
                </Animatable.View>
        )
    }

    const InformationView = () => {
        const [citizenId,setCitizedId] = useState('')
        const [citizenCardCreatedDate,setCitizenCardCreatedDate] = useState(new Date())
        const [citizenCardCreatedPlace,setCitizenCardCreatedPlace] = useState('')
        const [datePicker, setDatePicker] = useState(false);

        const hideDatePicker = () => {
            setDatePicker(false)
        };
        const showDatePicker = () => {
            setDatePicker(true)
        };

        const createFormData = () => {
            const data = new FormData();

            let frontCardLocalUri = frontCard.uri;
            let backCardLocalUri = backCard.uri;

            let frontCardFileName = frontCardLocalUri.split("/").pop();
            let backCardFileName = backCardLocalUri.split("/").pop();
            
            let backMatch = /\.(\w+)$/.exec(backCardFileName);
            let backType = backMatch ? `image/${backMatch[1]}` : `image`;
        
            data.append("file", {
              name: backCardFileName,
              type: backType,
              uri: Platform.OS === "ios" ? localUri.replace("file://", "") : backCardLocalUri,
            });

            let frontMatch = /\.(\w+)$/.exec(frontCardFileName);
            let frontType = frontMatch ? `image/${frontMatch[1]}` : `image`;
        
            data.append("file", {
              name: frontCardFileName,
              type: frontType,
              uri: Platform.OS === "ios" ? localUri.replace("file://", "") : frontCardLocalUri,
            });
            
            return data;
        };

        const uploadImage = async () => {
            const { API_URI } = getEnvVars();
            try {
                const res = await fetch(`${API_URI}/image/upload`, {
                method: "POST",
                body: createFormData(),
                headers: {
                    "Content-Type": "multipart/form-data",
                },
                }).then((res) => {
                    return res.json();
                })
                return res;
            } catch (err) {
                console.log(err);
            }
        };

        const save = async () => {
            setIsLoading(true)      
            let frontCardLocalUri = frontCard.uri;
            let frontCardFileName = frontCardLocalUri.split("/").pop();

            try {
                const res = await uploadImage();    
                let frontCard = ''
                let backCard = ''

                res.forEach(item => {
                    if (item.url.includes(frontCardFileName)) {
                        frontCard = item.url
                    } else {
                        backCard = item.url
                    }
                })

                const data = {
                    citizenCardCreatedDate,
                    citizenCardCreatedPlace,
                    citizenId,
                    frontCitizenCardImageUrl :  frontCard,
                    backCitizenCardImageUrl : backCard
                }
                await investorApi.update(data)

                const adminRes = await userApi.getAllAdmin()
                const admins = adminRes.data
                admins.forEach(async item => {
                    await notificationApi.create({
                        userId : item.id,
                        redirectUrl : `/dashboard/investor/${user.id}`,
                        description : "Ng?????i d??ng g???i th??ng tin x??c th???c.",
                        isRead : false,
                        type : 'USER',
                        status : 'ACTIVE'
                    })
                })          
                
            } catch (error) {
                console.log(error);
            } finally{
                loadUser()
                setIsLoading(false)
            }
            
        }

        const DatePicker = () => {
            const onChange = (event, selectedDate) => {
                const currentDate = selectedDate || citizenCardCreatedDate;
    
                hideDatePicker()
                setCitizenCardCreatedDate(currentDate);
            };
    
            return(
                <View>
                { 
                datePicker && 
                    (
                        <DateTimePicker    
                            testID="dateTimePicker"
                            value={new Date()}
                            mode='date'
                            is24Hour={true}
                            display="default"
                            onChange={onChange}
                        />
                    )
                }
                </View>
            )
        }

        return(
            <Animatable.View ref={view2} style={[styles.containerInfo, { padding : 10}]}>
                <DatePicker />
                <AppLoading isLoading={isLoading}/>
                    <Text style={{ fontSize : 18 , fontWeight : 'bold',alignSelf : 'center', marginBottom : 40}}>Th??ng tin c??n c?????c c??ng d??n/ CMND</Text> 
                    <Text style={styles.informationText}>S??? CMND/C??n c?????c c??ng d??n :</Text>
                    <Input
                        keyboardType='numeric'
                        value={citizenId}
                        onChangeText={value => setCitizedId(value)}
                        placeholder='Nh???p s??? CMND/C??n c?????c c??ng d??n'
                        inputContainerStyle={{ borderBottomWidth : 0, height : 50 }}
                        containerStyle= {styles.input}
                    />
                    <Text style={styles.informationText}>N??i ????ng k?? :</Text>
                    <Input
                        value={citizenCardCreatedPlace}
                        onChangeText={value => setCitizenCardCreatedPlace(value)}
                        placeholder='Nh???p n??i ????ng k??'
                        inputContainerStyle={{ borderBottomWidth : 0, height : 50 }}
                        containerStyle= {styles.input}
                    />
                    <Text style={styles.informationText}>Ng??y :</Text>
                    <TouchableOpacity style={styles.datePicker} onPress={() => {
                            showDatePicker()
                        }}>
                            <View style={{ justifyContent : 'center', flex : 1}}>
                                <Text style={{ color : PRIMARY_COLOR_BLACK, fontSize : 20, marginLeft : 10}}>{moment(citizenCardCreatedDate).format("DD/MM/YYYY")}</Text>
                            </View>
                            <Fontisto name="date" size={25} color='#a6aaad' style={{ alignSelf : 'center', marginRight : 10}} />
                        </TouchableOpacity>
                    <View style={{ flexDirection : 'row', position : 'absolute', bottom : 10, alignSelf : 'center'}}>                      
                            <Button
                                style={[styles.buttonClick, { margin : 20 }]}
                                color={PRIMARY_COLOR}
                                onPress={() => {
                                    view1.current.transitionTo({ translateX : 0 })
                                    view2.current.transitionTo({ translateX : 0 })
                                }}
                            >Tr?????c</Button> 
                            <Button
                                disabled={(citizenId === null || citizenCardCreatedPlace === null || citizenId === '' || citizenCardCreatedPlace === '') ? true : false}
                                style={[styles.buttonClick, { margin : 10 }]}
                                color={PRIMARY_COLOR}
                                onPress={() => {
                                    save()
                                }}
                            >X??c nh???n</Button>  
                    </View>         
                </Animatable.View>
        )
    }

    const VerifyView = () => (
        <View style={{ justifyContent : 'center', flex : 1,alignItems : 'center' }}>
            <Image source={require('../assets/verified.png')} style={{ height : FULL_HEIGHT / 2.5, width : FULL_WIDTH / 1.3  }}/>
            <Text style={{ fontWeight : 'bold', fontSize : 18, textAlign : 'center', marginTop : 30 }}>Th??ng tin c???a b???n ???? ???????c x??c th???c th??nh c??ng.</Text>
        </View>
    )

    const BanView = () => (
        <View style={{ justifyContent : 'center', flex : 1,alignItems : 'center' }}>
            <Image source={require('../assets/banned.png')} style={{ height : FULL_HEIGHT / 2.5, width : FULL_WIDTH / 1.3  }}/>
            <Text style={{ fontWeight : 'bold', fontSize : 18, textAlign : 'center', marginTop : 30 }}>T??i kho???n c???a b???n d?? v??? ch???n. Vui l??ng li??n h??? v???i qu???n tr??? vi??n ????? bi???t th??m chi ti???t.</Text>
        </View>
    )

    const PendingView = () => (
        <View style={{ justifyContent : 'center', flex : 1,alignItems : 'center' }}>
            <Image source={require('../assets/userpending.png')} style={{ height : FULL_HEIGHT / 2.5, width : FULL_WIDTH / 1.3  }}/>
            <Text style={{ fontWeight : 'bold', fontSize : 18, textAlign : 'center', marginTop : 30 }}>Th??ng tin c???a b???n ??ang ???????c ch??ng t??i x??c th???c. Vui l??ng tr??? l???i sau.</Text>
        </View>
    )

    return (
        <SafeAreaView style={{ flex : 1, backgroundColor : PRIMARY_COLOR_WHITE }}>
             <View style={styles.topContainer}>
                <View style={{ padding : 10,flexDirection : 'row', zIndex : 200, justifyContent : 'center' }}>     
                    <TouchableOpacity
                        style={{ flexDirection : 'row', alignSelf : 'center', position : 'absolute', left : 20, alignItems : 'center' }}
                        onPress={() => {
                        navigation.goBack(); 
                        }}
                    >
                        <FontAwesome5
                            name={"chevron-left"}
                            size={20}
                            style={{ width: 30 }}
                            color={"white"}
                        />     
                    </TouchableOpacity>     
                    <Text style={{ fontSize : 20, color : PRIMARY_COLOR_WHITE, alignSelf : 'center'}}>X??c th???c</Text>   
                    </View>
                </View>
                <ModalPicker />
            {
                userStatus === 'UNVERIFIED'
                ?
                (
                    <View style={{ flexDirection : 'row' }}>         
                        <CitizenImageView />
                        <InformationView />
                    </View>
                )
                :
                (    
                    userStatus === 'PENDING'
                    ?
                    (
                        <PendingView />
                    )
                    :
                    (
                        userStatus === "BAN"
                        ?
                        (
                            <BanView />
                        )
                        :
                        (
                            userStatus === "VERIFIED"
                            ?
                            (
                                <VerifyView />
                            )
                            :
                            (
                                <ActivityIndicator color={PRIMARY_COLOR} size="large"/>
                            )               
                        )  
                    )                       
                )
            }            
        </SafeAreaView>
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
        height : FULL_HEIGHT / 1.15,
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
        backgroundColor : PRIMARY_COLOR_WHITE,
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
    },
    topContainer : {
        height : FULL_HEIGHT * 0.3 / 4,
        backgroundColor : PRIMARY_COLOR,
        borderBottomLeftRadius : 25,
        borderBottomRightRadius : 25,
    },
    input :{ 
        borderWidth : 1 , 
        borderRadius : 10, 
        height : 50, 
        width : FULL_WIDTH - 60, 
        margin : 10,
        borderColor : '#a6aaad',
    },
    informationText : {
        marginLeft : 10,
        fontSize : 16
    },
    datePicker : {
        height : 50, 
        width : FULL_WIDTH - 60,  
        borderWidth : 1,
        borderColor : '#a6aaad',
        alignSelf : 'center',
        borderRadius : 10,
        flexDirection : 'row',
        margin : 10,
    },
})
