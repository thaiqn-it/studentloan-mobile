import { 
  useFonts, 
  TitilliumWeb_400Regular,
  TitilliumWeb_400Regular_Italic, 
  TitilliumWeb_600SemiBold
} from '@expo-google-fonts/titillium-web';
import React from 'react';
import { ActivityIndicator } from 'react-native';
import { SafeAreaProvider } from "react-native-safe-area-context/src/SafeAreaContext";
import { NavigationContainer } from "@react-navigation/native";
import AppStack from "./pages/stacks/AppStack";

console.disableYellowBox = true;  

export default function App() {
  let [fontsLoaded] = useFonts({
    TitilliumWeb_400Regular,
    TitilliumWeb_400Regular_Italic, 
    TitilliumWeb_600SemiBold
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

