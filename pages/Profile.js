import React, {useRef,useState,useEffect,useContext} from 'react'
import { StyleSheet, Text, View,ScrollView,TouchableOpacity, Image,Alert } from 'react-native'
import { FULL_HEIGHT, FULL_WIDTH, PRIMARY_COLOR, PRIMARY_COLOR_BLACK, PRIMARY_COLOR_WHITE, SECONDARY_COLOR } from '../constants/styles'
import { Ionicons,Entypo,Fontisto,FontAwesome5,Feather  } from '@expo/vector-icons';
import { Input,Overlay, useTheme } from 'react-native-elements';
import { Button, RadioButton } from 'react-native-paper';
import DateTimePicker from '@react-native-community/datetimepicker';
import moment from 'moment';
import { AppContext } from '../contexts/App';
import * as ImagePicker from 'expo-image-picker';
import getEnvVars from '../constants/env';
import { userApi } from '../apis/user';
import AppLoading from '../components/AppLoading'
import { SafeAreaView } from 'react-native-safe-area-context';

export default function Profile({ navigation }) {
    const { user, setUser, getUser } = useContext(AppContext);

    const [viewSelected,setViewSelected] = useState(1);
    const [date, setDate] = useState(moment(new Date()).format("DD/MM/YYYY"))
    const [modalVisible, setModalVIsible] = useState(false);
    const [imagePickerVisible, setImagePickerVisible] = useState(false);

    const [firstName,setFirstName] = useState(null)
    const [lastName,setLastName] = useState('')
    const [phone,setPhone] = useState('')
    const [email,setEmail] = useState('')
    const [address,setAddress] = useState('')
    const [image,setImage] = useState(null)

    const [isLoading,setIsLoading] = useState(false)

    useEffect(() => {
        setFirstName(user.firstName)
        setLastName(user.lastName)
        setAddress(user.address)
        setEmail(user.email)
        setPhone(user.phoneNumber)
        setDate(user.birthDate)
      }, []);

      const openCamera = async () => {
        hideImagePicker()
        let result = await ImagePicker.launchCameraAsync()
        if (!result.cancelled) {
            setImage(result);
        }
    }

    const loadUser = () => {
        async function load() {
          const data = await getUser();
          setUser({
            type: "LOAD",
            data,
          });
        }
        load();
      };

    const openLibrary = async () => {
        hideImagePicker()
        let result = await ImagePicker.launchImageLibraryAsync()
        if (!result.cancelled) {
            setImage(result);
        }
    }
    const hideModal = () => setModalVIsible(false);
    const showModal = () => setModalVIsible(true);

    const hideImagePicker = () => setImagePickerVisible(false);
    const showImagePicker= () => setImagePickerVisible(true);

    const createFormData = () => {
        const data = new FormData();
        let localUri = image.uri;
        let filename = localUri.split("/").pop();
    
        let match = /\.(\w+)$/.exec(filename);
        let type = match ? `image/${match[1]}` : `image`;
    
        data.append("file", {
          name: filename,
          type: type,
          uri: Platform.OS === "ios" ? localUri.replace("file://", "") : localUri,
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
            return res.url;
        } catch (err) {
            console.log(err);
        }
    };

    const ModalPicker = () => {
        return(    
            <Overlay isVisible={imagePickerVisible} onBackdropPress={hideImagePicker} overlayStyle={{borderRadius : 10, height : 200, width : FULL_WIDTH - 40}}>
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

    const save = async () => {
        setIsLoading(true)      
        try {
            let url = user.profileUrl
            if (image !== null) {
                url = await uploadImage();       
            }   
            const data = {
                firstName,
                lastName,
                address,
                birthDate: date,
                profileUrl: url,
            }; 
            await userApi.update(data)
        } catch (error) {
            console.log(error);
        } finally{
            loadUser()
            setIsLoading(false)
            Alert.alert(
                "Thành công",
                "Bạn đã cập nhật tài khoản thành công.",
                [
                  { text: "Xác nhận", onPress : () => navigation.navigate("Setting")}
                ]
              );
        }
        
    }

    const onChange = (event, selectedDate) => {
        const currentDate = selectedDate || date;

        hideModal()
        setDate(currentDate);
      };
    
    const DatePicker = () => {
        return(
            <View>
            { 
            modalVisible && 
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
                <Text style={{ fontSize : 20, color : PRIMARY_COLOR_WHITE, alignSelf : 'center'}}>Thông tin tài khoản</Text>   
                </View>
            </View>
            {/* <View style={{ flexDirection : 'row', marginTop : 10, justifyContent : 'center', backgroundColor : '#F6F5FF', paddingVertical : 10, marginHorizontal : 20, borderRadius : 10 }}>
                <TouchableOpacity style={[viewSelected === 1 ? [styles.tab,{ backgroundColor : SECONDARY_COLOR }] : [styles.tab,{ backgroundColor : '#F6F5FF'}]]}
                                  onPress={() => setViewSelected(1)}>
                    <Text style={[viewSelected === 1 ? [ styles.tabText, { color : PRIMARY_COLOR_WHITE } ] : [styles.tabText, { color : PRIMARY_COLOR_BLACK }]]}>Thông tin cơ bản</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[viewSelected === 2 ? [styles.tab,{backgroundColor : SECONDARY_COLOR }] : [styles.tab,{ backgroundColor : '#F6F5FF' }]]}
                                  onPress={() => setViewSelected(2)}>
                    <Text style={[viewSelected === 2 ? [ styles.tabText, { color : PRIMARY_COLOR_WHITE } ] : [styles.tabText, { color : PRIMARY_COLOR_BLACK }]]}>Giấy tờ cá nhân</Text>
                </TouchableOpacity>
            </View> */}
            <View style={{ height : FULL_HEIGHT * 2.5 / 3 }}>
                <ScrollView style={styles.viewContent} showsVerticalScrollIndicator={false}>
                    <View style={{ backgroundColor : PRIMARY_COLOR_WHITE , elevation : 5, paddingBottom : 20}}>
                        <TouchableOpacity activeOpacity={1} style={styles.imagePicker} onPress={() => showImagePicker()}>
                            {
                                !user.profileUrl
                                ?
                                (   
                                    <Ionicons name="person" size={100} color="gray" />               
                                )
                                : 
                                (
                                    image !== null 
                                    ?
                                    (
                                        <Image source={{ uri : image.uri }} style={{ height : 137 , width : 137, borderRadius : 80  }}/>
                                    )
                                    :
                                    (
                                        <Image source={{ uri : user.profileUrl }} style={{ height : 135 , width : 135, borderRadius : 80  }}/>
                                    )
                                )
                            }

                            <View style={styles.cameraIcon}>
                                <Entypo name="camera" size={25} color={"white"} />
                            </View>        
                        </TouchableOpacity>

                        <Text style={styles.informationText}>Họ :</Text>
                        <Input
                            value={firstName}
                            onChangeText={value => setFirstName(value)}
                            placeholder='Nhập họ'
                            inputContainerStyle={{ borderBottomWidth : 0, height : 50 }}
                            containerStyle= {styles.input}
                        />
                        <Text style={styles.informationText}>Tên :</Text>
                        <Input
                            value={lastName}
                            onChangeText={value => setLastName(value)}
                            placeholder='Nhập tên'
                            inputContainerStyle={{ borderBottomWidth : 0, height : 50 }}
                            containerStyle= {styles.input}
                        />
                        <Text style={styles.informationText} >Số điện thoại :</Text>
                        <Input
                            value={phone}
                            disabled
                            // placeholder='Input Information'
                            inputContainerStyle={{ borderBottomWidth : 0, height : 50 }}
                            containerStyle= {styles.input}
                        />
                        <Text style={styles.informationText}>Email :</Text>
                        <Input
                            value={email}
                            disabled
                            onChangeText={value => setEmail(value)}
                            placeholder='Nhận email'
                            inputContainerStyle={{ borderBottomWidth : 0, height : 50 }}
                            containerStyle={styles.input}
                        />
                        <Text style={styles.informationText}>Địa chỉ :</Text>
                        <Input
                            value={address}
                            onChangeText={value => setAddress(value)}
                            placeholder='Nhập địa chỉ'
                            inputContainerStyle={{ borderBottomWidth : 0, height : 50 }}
                            containerStyle={styles.input}
                        />
                        <Text style={styles.informationText}>Ngày sinh :</Text>
                        <TouchableOpacity style={styles.datePicker} onPress={() => {
                            showModal()
                        }}>
                            <View style={{ justifyContent : 'center', flex : 1}}>
                                <Text style={{ color : PRIMARY_COLOR_BLACK, fontSize : 20, marginLeft : 10}}>{moment(date).format("DD/MM/YYYY")}</Text>
                            </View>
                            <Fontisto name="date" size={25} color='#a6aaad' style={{ alignSelf : 'center', marginRight : 10}} />
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            </View>              
            <View
                style={[styles.btnContainer]}
            >    
                <Button
                    style={[styles.btnInvest]}
                    color={PRIMARY_COLOR}
                    onPress={() => save()}
                        >Cập nhật</Button> 
            </View>
            <DatePicker />
            <ModalPicker />
            <AppLoading isLoading={isLoading}/>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    tab : {
        width : 150,
        height : 50,
        alignItems : 'center',
        justifyContent : 'center',
        borderRadius : 15,
    },
    viewContent : {
        height : 100
    },
    tabText : {
        fontSize : 15,
        fontWeight : '600'
    },
    imagePicker : { 
        height : 140, 
        width : 140, 
        borderWidth : 2, 
        borderRadius : 140, 
        alignItems : 'center',
        alignSelf : 'center',
        justifyContent : 'center',
        borderColor : PRIMARY_COLOR,
        marginTop : 10,
        backgroundColor : PRIMARY_COLOR_WHITE
    },
    cameraIcon : {
        position : 'absolute', 
        bottom : 10, 
        right : -5, 
        backgroundColor : PRIMARY_COLOR, 
        height : 40,
        width : 40,
        borderRadius : 40, 
        borderWidth : 2, 
        borderColor : PRIMARY_COLOR_WHITE,
        alignItems : 'center',
        justifyContent : 'center'
    },
    informationText : {
        marginLeft : 10,
        fontSize : 16
    },
    btnInvest : {
        width : FULL_WIDTH / 1.4,
        borderRadius : 5,
        borderWidth : 1.2,
        alignSelf : 'center',
        borderColor : PRIMARY_COLOR,
    },
    btnContainer : {
        backgroundColor: "white",
        padding: 10,
        position: "absolute",
        bottom: 0,
        left: 0,
        right : 0,
        elevation : 10,
    },
    input :{ 
        borderWidth : 1 , 
        borderRadius : 10, 
        height : 50, 
        width : FULL_WIDTH - 20, 
        margin : 10,
        borderColor : '#a6aaad',
    },
    datePicker : {
        height : 50, 
        width : FULL_WIDTH - 20,  
        borderWidth : 1,
        borderColor : '#a6aaad',
        alignSelf : 'center',
        borderRadius : 10,
        flexDirection : 'row',
        margin : 10,
    },
    topContainer : {
        height : FULL_HEIGHT * 0.3 / 4,
        backgroundColor : PRIMARY_COLOR,
        borderBottomLeftRadius : 25,
        borderBottomRightRadius : 25,
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
})
