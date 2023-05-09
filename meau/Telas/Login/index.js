import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput, SafeAreaView, TouchableOpacity } from 'react-native';
import { Ionicons, Entypo } from '@expo/vector-icons';


export default function Login() {

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.retangulo1} />
      <View style={styles.retanguloLogin}>
        <Ionicons name="menu" size={24} style={styles.iconMenu} />
        <Text style={styles.textoLogin}>Login</Text>
      </View>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.textoContainer}
          placeholder="Nome de usuário"
          placeholderTextColor ="#bdbdbd"

        />
        <View style={styles.retangulo3} />
        <TextInput
          style={styles.textoContainer}
          placeholder="Senha"
          placeholderTextColor="#bdbdbd"
          secureTextEntry={true}
          caretHidden={true}
        />
        <View style={styles.retangulo3} />
      </View>

      <TouchableOpacity style={styles.botaoLogin}>
        <Text style={styles.textoBotaoLogin}>ENTRAR</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.botaoFacebook} >
        <Ionicons name="logo-facebook" size={16} style={styles.iconFacebook}/>
        <Text style={styles.textoBotaoFacebook}>ENTRAR COM FACEBOOK</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.botaoGoogle}>
        <Entypo name="google-" size={16}  style={styles.iconGoogle} />
        <Text style={styles.textoBotaoGoogle}>ENTRAR COM GOOGLE</Text>
      </TouchableOpacity>

      <StatusBar style="auto" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fafafa',
    alignItems: 'center',
    justifyContent: 'center',
  },
  retangulo1: {
    width: 360,
    height: 24,
    backgroundColor: '#88c9bf',
  },
  retanguloLogin: {
    width: 360,
    height: 56,
    backgroundColor: '#cfe9e5',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  textoLogin: {
    fontFamily: 'Roboto_500Medium',
    fontSize: 20,
    color: '#434343',
    position: 'absolute',
    left: 36,
    top: 18,
    marginLeft: 37,
  },
  iconMenu: {
    position: 'absolute',
    color: '#434343',
    left: 16,
    top: 18,
  },
  inputContainer: {
    width: 360,
    marginTop: 50,
    paddingVertical: 10,
    paddingLeft: 5,
    fontFamily: 'Roboto_400Regular'
  },
  textoContainer: {
    marginTop: 20,
    fontFamily: 'Roboto_400Regular',
    fontSize: 14,
    color: '#bdbdbd',
  },
  retangulo3: {
    marginTop: 8,
    width: '100%',
    height: 0.8,
    backgroundColor: '#e6e7e8',
  },
  botaoLogin: {
    marginTop: 52,
    justifyContent: 'center',
    alignItems: 'center',
    width: 232,
    height: 40,
    borderWidth: 2,
    borderColor: '#88c9bf',
    backgroundColor: '#88c9bf',
    fontFamily: 'Roboto_400Regular',
  },
  textoBotaoLogin: {
    color: '#434343',
    fontFamily: 'Roboto_400Regular',
    fontSize: 12,
  },
  botaoFacebook: {
    marginTop: 72,
    justifyContent: 'center',
    alignItems: 'center',
    width: 232,
    height: 40,
    borderWidth: 2,
    borderColor: '#194f7c',
    backgroundColor: '#194f7c',
    fontFamily: 'Roboto_400Regular',
    flexDirection: 'row',
  },
  textoBotaoFacebook: {
    color: '#f7f7f7',
    fontFamily: 'Roboto_400Regular',
    fontSize: 12,
  },
  iconFacebook: {
    marginRight: 8,
    color: '#f7f7f7',
  },
  botaoGoogle: {
    marginTop: 8,
    justifyContent: 'center',
    alignItems: 'center',
    width: 232,
    height: 40,
    borderWidth: 2,
    borderColor: '#f15f5c',
    backgroundColor: '#f15f5c',
    fontFamily: 'Roboto_400Regular',
    flexDirection: 'row',
  },
  textoBotaoGoogle: {
    color: '#f7f7f7',
    fontFamily: 'Roboto_400Regular',
    fontSize: 12,
  },
  iconGoogle: {
    marginRight: 8,
    color: '#f7f7f7',
  },
});




