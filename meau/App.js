import { StatusBar } from 'react-native';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import Rotas from '../meau/Rotas'; 



export default function App() {
  return (
    <NavigationContainer> 
      <StatusBar backgroundColor="#38A69D" barStyle="light-content"/>  
    <Rotas/> 
    </NavigationContainer>
  ); 
}





