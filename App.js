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

console.disableYellowBox = true;  

export default function App() {
  let [fontsLoaded] = useFonts({
    Roboto_400Regular,
    Roboto_400Regular_Italic, 
    Roboto_700Bold
  });
  if (!fontsLoaded) {
    return <ActivityIndicator />;
  }
  return (
    <AppProvider>
      <SafeAreaProvider>
        <NavigationContainer>
          <AppStack />
        </NavigationContainer>
      </SafeAreaProvider>
    </AppProvider>
  );
}

