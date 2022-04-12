import { 
  useFonts, 
  Roboto_400Regular,
  Roboto_400Regular_Italic, 
  Roboto_700Bold
} from '@expo-google-fonts/roboto';
import React from 'react';
import { ActivityIndicator, StatusBar } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from "@react-navigation/native";
import AppStack from "./pages/stacks/AppStack";
import AppProvider from './contexts/App';
import { PRIMARY_COLOR } from './constants/styles';
import * as Linking from 'expo-linking'

console.disableYellowBox = true;  

export default function App() {
  let [fontsLoaded] = useFonts({
    Roboto_400Regular,
    Roboto_400Regular_Italic, 
    Roboto_700Bold
  });

  const prefix = Linking.makeUrl("/")

  const linking = {
    prefixes : [prefix],
    config : {
        screens : {
          DetailPost : "detailPost/:id",
       }
    },
    // getStateFromPath(path, config) {
    //   const defaultState = getStateFromPathDefault(path, config)
    //   // add first page to routes, then you will have a back btn
    //   const { routes } = defaultState
    //   const firstRouteName= 'Home'
    //   if (routes && routes.length === 1 && routes[0].name !== firstRouteName) {
    //     defaultState.routes.unshift({ name: firstRouteName})
    //   }
    //   return defaultState
    // },
  }

  if (!fontsLoaded) {
    return <ActivityIndicator />;
  }
  return (
    <AppProvider>
      <SafeAreaProvider>
        <NavigationContainer linking={linking}>
          <AppStack />
        </NavigationContainer>
      </SafeAreaProvider>
    </AppProvider>
  );
}

