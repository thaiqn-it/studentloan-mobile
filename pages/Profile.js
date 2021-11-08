import React, {useRef,useState,useEffect} from 'react'
import { StyleSheet, Text, View,ScrollView,TouchableOpacity, Image} from 'react-native'
import { FULL_HEIGHT, FULL_WIDTH, PRIMARY_COLOR, PRIMARY_COLOR_BLACK, PRIMARY_COLOR_WHITE } from '../constants/styles'
import { Ionicons,Entypo,Fontisto } from '@expo/vector-icons';
import { Input } from 'react-native-elements';
import { Button, RadioButton } from 'react-native-paper';
import DateTimePicker from '@react-native-community/datetimepicker';
import moment from 'moment';

export default function Profile({ navigation }) {
    const [viewSelected,setViewSelected] = useState(1);
    const [date, setDate] = useState(moment(new Date()).format("DD/MM/YYYY"))
    const [modalVisible, setModalVIsible] = useState(false);

    const showModal = () => setModalVIsible(true);
    const hideModal = () => setModalVIsible(false);

    const onChange = (event, selectedDate) => {
        const currentDate = selectedDate || date;

        hideModal()
        setDate(moment(currentDate).format("DD/MM/YYYY"));
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
    const PersonalInformation = () => {
        return(
            <ScrollView style={styles.viewContent} showsVerticalScrollIndicator={false}>
            <View style={{ backgroundColor : PRIMARY_COLOR_WHITE , elevation : 5}}>
                <TouchableOpacity activeOpacity={1} style={styles.imagePicker}>
                    <Ionicons name="person" size={100} color="gray" />
                    <View style={styles.cameraIcon}>
                        <Entypo name="camera" size={25} color={"white"} />
                    </View>        
                </TouchableOpacity>

                <Text style={styles.informationText}>First Name :</Text>
                <Input
                    placeholder='Input Information'
                    inputContainerStyle={{ borderBottomWidth : 0, height : 50 }}
                    containerStyle= {styles.input}
                />
                <Text style={styles.informationText}>Last Name :</Text>
                <Input
                    placeholder='Input Information'
                    inputContainerStyle={{ borderBottomWidth : 0, height : 50 }}
                    containerStyle= {styles.input}
                />
                <Text style={styles.informationText} >Phone :</Text>
                <Input
                    placeholder='Input Information'
                    inputContainerStyle={{ borderBottomWidth : 0, height : 50 }}
                    containerStyle= {styles.input}
                />
                <Text style={styles.informationText}>Email :</Text>
                <Input
                    placeholder='Input Information'
                    inputContainerStyle={{ borderBottomWidth : 0, height : 50 }}
                    containerStyle={styles.input}
                />
                <Text style={styles.informationText}>Date of Birth :</Text>
                <TouchableOpacity style={styles.datePicker} onPress={() => {
                    showModal()
                }}>
                    <View style={{ justifyContent : 'center', flex : 1}}>
                        <Text style={{ color : PRIMARY_COLOR_BLACK, fontSize : 20, marginLeft : 10}}>{date}</Text>
                    </View>
                    <Fontisto name="date" size={25} color='#a6aaad' style={{ alignSelf : 'center', marginRight : 10}} />
                </TouchableOpacity>
                <Text style={styles.informationText}>Gender :</Text>
                <RadioButton.Group>
                    <View style={{ flexDirection : 'row', marginVertical : 10 }}>
                        <View style={{ flexDirection : 'row', alignItems : 'center'}}>
                            <RadioButton value="male" />
                            <Text style={{ fontSize : 15 }}>Male</Text>                     
                        </View>
                        <View style={{ flexDirection : 'row', alignItems : 'center', marginLeft : 10 }}>
                            <RadioButton value="female"/>
                            <Text style={{ fontSize : 15 }}>Female</Text>                      
                        </View>
                        <View style={{ flexDirection : 'row', alignItems : 'center', marginLeft : 10}}>
                            <RadioButton value="other" />
                            <Text style={{ fontSize : 15 }}>Other</Text>                
                        </View>
                    </View>
                    </RadioButton.Group>
            </View>
            <View style={{ backgroundColor : PRIMARY_COLOR_WHITE , elevation : 5, marginTop : 10, paddingTop : 10, marginBottom : FULL_HEIGHT / 12.5}}>
                <Text style={styles.informationText}>Province :</Text>
                <Input
                    placeholder='Input Information'
                    inputContainerStyle={{ borderBottomWidth : 0, height : 50 }}
                    containerStyle={styles.input}
                />
                <Text style={styles.informationText}>District :</Text>
                <Input
                    placeholder='Input Information'
                    inputContainerStyle={{ borderBottomWidth : 0, height : 50 }}
                    containerStyle={styles.input}
                />
                <Text style={styles.informationText} >Commune :</Text>
                <Input
                    placeholder='Input Information'
                    inputContainerStyle={{ borderBottomWidth : 0, height : 50 }}
                    containerStyle={styles.input}
                />
                <Text style={styles.informationText}>Apartment number :</Text>
                <Input
                    placeholder='Input Information'
                    inputContainerStyle={{ borderBottomWidth : 0, height : 50 }}
                    containerStyle={styles.input}
                />
            </View>
        </ScrollView>
        )
    }

    const Other = () => {
        return(
            <ScrollView style={[styles.viewContent,{ height : FULL_HEIGHT }]} showsVerticalScrollIndicator={false}>
                <View style={{ backgroundColor : PRIMARY_COLOR_WHITE , elevation : 5,paddingTop : 10 , height : FULL_HEIGHT - 100}}>
                    <Text style={styles.informationText}>Identity Card Number :</Text>
                    <Input
                        placeholder='Input Information'
                        inputContainerStyle={{ borderBottomWidth : 0, height : 50 }}
                        containerStyle={styles.input}
                    />
                    <Text style={styles.informationText}>Issued on :</Text>
                    <Input
                        placeholder='Input Information'
                        inputContainerStyle={{ borderBottomWidth : 0, height : 50 }}
                        containerStyle={styles.input}
                    />
                    <Text style={styles.informationText} >Issued by :</Text>
                    <Input
                        placeholder='Input Information'
                        inputContainerStyle={{ borderBottomWidth : 0, height : 50 }}
                        containerStyle={styles.input}
                    />
                    <Text style={styles.informationText}>Expired in :</Text>
                    <Input
                        placeholder='Input Information'
                        inputContainerStyle={{ borderBottomWidth : 0, height : 50 }}
                        containerStyle={styles.input}
                    />
                </View>
            </ScrollView>
    )
}



    return (
        <View style={{ height : '100%'}}>
            <View style={{ flexDirection : 'row', marginTop : 50, marginHorizontal : 10 }}>
                <TouchableOpacity style={[viewSelected === 1 ? [styles.tab,{ borderBottomWidth : 0, backgroundColor : PRIMARY_COLOR_WHITE }] : [styles.tab,{ backgroundColor : '#dadee3'}]]}
                                  onPress={() => setViewSelected(1)}>
                    <Text style={styles.tabText}>Personal Information</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[viewSelected === 2 ? [styles.tab,{ borderBottomWidth : 0, backgroundColor : PRIMARY_COLOR_WHITE }] : [styles.tab,{ backgroundColor : '#dadee3'}]]}
                                  onPress={() => setViewSelected(2)}>
                    <Text style={styles.tabText}>Other</Text>
                </TouchableOpacity>
                <View style={{ borderBottomWidth : 1, width : FULL_WIDTH - 300 - 20 }}/>
            </View>
            {
                viewSelected === 1 
                ?
                <PersonalInformation />
                :
                <Other />
            }
            <View
                style={[styles.btnContainer]}
            >    
                <Button
                    style={[styles.btnInvest]}
                    color={PRIMARY_COLOR}
        
                        >Update</Button> 
            </View>
            <DatePicker />
        </View>
    )
}

const styles = StyleSheet.create({
    tab : {
        width : 150,
        height : 50,
        borderWidth : 1,
        alignItems : 'center',
        justifyContent : 'center',
        borderColor : '#a6aaad'
    },
    viewContent : {
        borderRightWidth : 1,
        borderLeftWidth : 1,
        marginHorizontal : 10,
        borderColor : '#a6aaad',
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
        width : FULL_WIDTH - 40, 
        margin : 10,
        borderColor : '#a6aaad'
    },
    datePicker : {
        height : 50, 
        width : FULL_WIDTH - 40, 
        borderWidth : 1,
        borderColor : '#a6aaad',
        alignSelf : 'center',
        borderRadius : 10,
        flexDirection : 'row',
        marginVertical : 10
        
    }
})
