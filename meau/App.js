import { StatusBar } from 'react-native';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import Rotas from '../meau/Rotas'; 
import AppLoading from 'expo-app-loading';

import {
  useFonts,
  Roboto_500Medium,
  Roboto_400Regular,

} from "@expo-google-fonts/roboto";

import {Courgette_400Regular} from "@expo-google-fonts/courgette";


export default function App() {
  const [fontsLoaded] = useFonts({
    Roboto_400Regular,
    Roboto_500Medium,
    Courgette_400Regular
    
  })

  if(!fontsLoaded) {
    <AppLoading />
  }


  return (
    <NavigationContainer> 
      <StatusBar backgroundColor="#38A69D" barStyle="light-content"/>  
    <Rotas/> 
    </NavigationContainer>
  ); 
}





