import { 
  useFonts, 
  Roboto_400Regular,
  Roboto_400Regular_Italic, 
  Roboto_700Bold
} from '@expo-google-fonts/roboto';
import React from 'react';
import { ActivityIndicator } from 'react-native';
import { SafeAreaProvider } from "react-native-safe-area-context/src/SafeAreaContext";
import { NavigationContainer } from "@react-navigation/native";
import AppStack from "./pages/stacks/AppStack";

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
    <SafeAreaProvider>
      <NavigationContainer>
        <AppStack />
      </NavigationContainer>
    </SafeAreaProvider>
  );
}

