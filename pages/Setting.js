import React, { useContext,useEffect,useState } from 'react'
import { 
    StyleSheet, 
    Text, 
    View,
    Animated,
} from 'react-native'
import { 
    Avatar, 
    ListItem 
} from "react-native-elements";
import { FULL_HEIGHT, PRIMARY_COLOR, PRIMARY_COLOR_BLACK, PRIMARY_COLOR_WHITE, PRIMARY_FONT } from '../constants/styles'
import { Feather } from '@expo/vector-icons'
import { Icon } from 'react-native-elements';
import { useCollapsibleHeader } from 'react-navigation-collapsible';
import { AppContext } from '../contexts/App';

const OPTIONS = [
    {
        option: "Profile",
        icon: "account-circle",
        screen: "Profile",
        type : "material",
        color: "orange",
        size : 22
    },
    {
        option: "Transaction",
        icon: "bank-transfer",
        screen: "Information",
        type : "material-community",
        color: "#4ec4f7",
        size : 20
    },
    {
        option: "Privacy & Security",
        icon: "privacy-tip",
        screen: "Information",
        type : "material",
        color: "gray" ,
        size : 21
    },
    {
        option: "About",
        icon: "infocirlceo",
        screen: "Information",
        type : "antdesign",
        color: "gray",
        size : 20
    },
    {
      option: "Logout",
      icon: "logout",
      type : "antdesign",
      color : 'red',
      size : 20
    },
  ];

export default function Setting({navigation}) {
    const { user, setUser, getUser } = useContext(AppContext);
    const [ name, setName ] = useState(null);
    const [ email, setEmail ] = useState(null);
    const [ phone, setPhone ] = useState(null);
    const [ address,setAddress ] = useState(null)
    const optionHadleClick = (item) => {
        item.option === "Logout" ? logout() : navigation.navigate(item.screen);
    };

    const logout = async () => {
        
    };

    const loadUser = () => {
        async function load() {
          const data = await getUser();
          setUser({
            type: "LOAD",
            data: data,
          });
        }
        load();
      };
      
      useEffect(() => {
        setName(user.Student.firstName + " " + user.Student.lastName)
        setPhone(user.phoneNumber)
        setEmail(user.email)
      }, []);

    const {
        onScroll /* Event handler */,
        containerPaddingTop /* number */,
        scrollIndicatorInsetTop /* number */,
      } = useCollapsibleHeader(
          {
            navigationOptions: {
                headerStyle: { backgroundColor: PRIMARY_COLOR, height: 80 } /* Optional */,

              },
              config: {
                collapsedColor: 'red' /* Optional */,
                useNativeDriver: true /* Optional, default: true */,
                elevation: 4 /* Optional */,
                disableOpacity: true /* Optional, default: false */,
              },
          }
      );
    return (
        <Animated.ScrollView 
            style={{ backgroundColor : PRIMARY_COLOR_WHITE }} 
            onScroll={onScroll}
            onScrollBeginDrag={onScroll}
            onScrollEndDrag={onScroll}
            contentContainerStyle={{ paddingTop: containerPaddingTop }}
            scrollIndicatorInsets={{ top: scrollIndicatorInsetTop }}>
            <View style={[styles.topContainer,{ height : FULL_HEIGHT / 3.5}]}>
                <View style={{ flexDirection: "row", padding : 5 }}>           
                    <Avatar
                        rounded
                        size={90}
                        source={{
                            uri: "https://i.pinimg.com/originals/51/f6/fb/51f6fb256629fc755b8870c801092942.png",
                        }}
                    />     
                    <View>
                        <Text style={styles.lbName}>{name}</Text>
                        <Text
                             style={{ color : PRIMARY_COLOR_BLACK, marginLeft: 20, marginTop: 5, marginRight : 70 }}
                            >
                            Quận 9 , TP Ho Chi Minh
                        </Text>
                    </View>
                </View>     
                <View>
                    <View style={{ flexDirection: "row", padding : 10, alignItems:'center' }}>
                        <Feather name="phone" size={24} color="black" />
                        <Text style={{ marginLeft : 20, color : 'black'}}>
                            {phone}
                        </Text>
                    </View>
                    <View style={{ flexDirection: "row", padding : 10, alignItems:'center' }}>
                        <Feather name="mail" size={24} color="black" />
                        <Text style={{ marginLeft : 20, color : 'black'}}>
                            {email}
                        </Text>
                    </View>                  
                </View> 
            </View>      
            <View style={styles.bottomContainer}>
                {OPTIONS.map((item, i) => (
                    <ListItem
                        onPress={() => optionHadleClick(item)}     
                        containerStyle={{paddingLeft : 40}}    
                        key={i}            
                    >
                        <Icon
                            name={item.icon}
                            type={item.type}
                            color="white"
                            size={item.size}
                            containerStyle={{ 
                                borderWidth : 2, 
                                backgroundColor : item.color, 
                                borderRadius : 25, 
                                borderColor: item.color 
                            }}
                        />
                        <ListItem.Content>
                            <ListItem.Title style={{ 
                                color:'black',
                                fontFamily:PRIMARY_FONT, 
                                marginLeft : 10,
                                fontSize : 16
                            }}>
                                {item.option}
                            </ListItem.Title>
                        </ListItem.Content>
                        <ListItem.Chevron 
                            size={20} 
                            color="black"
                            style={{ marginRight : 20 }}
                        />
                    </ListItem>
                ))}
            </View>
        </Animated.ScrollView>
    )
}

const styles = StyleSheet.create({
    topContainer: {
        margin : 15,
        backgroundColor: '#F2F5FA',
        justifyContent: "center",
        padding : 20,
        elevation : 5,
        borderRadius : 15,
    },
    lbName: {
        fontWeight: "bold",
        fontSize: 20,
        marginLeft: 20,
        fontFamily : PRIMARY_FONT,
        color : PRIMARY_COLOR_BLACK,
        marginRight : 70
    },
    bottomContainer: {
        backgroundColor: "white",
        marginTop: 10,
        height: "100%",
    },
})
