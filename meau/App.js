import { StatusBar } from 'react-native';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import Rotas from '../meau/Rotas';

import {
  useFonts,
  Roboto_500Medium,
  Roboto_400Regular,

} from "@expo-google-fonts/roboto";

import {Courgette_400Regular} from "@expo-google-fonts/courgette";


export default function App() {
  const[fontLoaded] = useFonts({
    Roboto_400Regular,
    Roboto_500Medium,
    Courgette_400Regular
  });

  if(!fontLoaded) {
    return null;
  }




  return (
    <NavigationContainer> 
      <StatusBar backgroundColor="#38A69D" barStyle="light-content"/>  
    <Rotas/> 
    </NavigationContainer>
  ); 
}





