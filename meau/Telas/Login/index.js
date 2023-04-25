import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput, SafeAreaView } from 'react-native';


export default function Login() {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.retangulo1} />
      <View style={styles.retanguloLogin}>
        <Text style={styles.textoLogin}>Login</Text>
      </View>
      <View style={{
        width: 360,
        marginTop: 50,
        paddingVertical: '10px',
        paddingLeft: '5px',
      }}>
        <TextInput
          style={styles.textoContainer}
          placeholder="Nome de usuário"
        />
        <View style={styles.retangulo3} />
        <TextInput
          style={styles.textoContainer}
          placeholder="Senha"
        />
        <View style={styles.retangulo3} />
      </View>
      <View style={styles.retangulo5}>
        <Text style={styles.textoRetangulo}>ENTRAR</Text>
      </View>
      <View style={styles.retanguloFacebook}>
        <Text style={styles.textoFacebook}>ENTRAR COM FACEBOOK</Text>
      </View>
      <View style={styles.retanguloGoogle}>
        <Text style={styles.textoGoogle}>ENTRAR COM GOOGLE</Text>
      </View>
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
  },
  textoLogin: {
    fontFamily: 'Arial',
    fontSize: 20,
    color: '#434343',
    textAlign: 'start',
    paddingTop: 18,
    marginLeft: 65,
  },

  textoContainer: {
    marginTop: 20,
    fontFamily: 'Arial',
    fontSize: 14,
    color: '#bdbdbd',
  },
  retangulo3: {
    marginTop: 8,
    width: '100%',
    height: 0.8,
    backgroundColor: '#e6e7e8',
  },
  textoContainer2: {
    marginTop: 20,
    fontFamily: 'Arial',
    fontSize: 14,
    color: '#bdbdbd',
  },
  retangulo4: {
    marginTop: 8,
    width: 312,
    height: 0.8,
    backgroundColor: '#e6e7e8',
  },
  retangulo5: {
    marginTop: 10,
    width: 232,
    height: 40,
    borderWidth: 2,
    backgroundColor: '#88c9bf',
    borderColor: '#88c9bf',
    justifyContent: 'center',
    alignItems: 'center',
  },
  textoRetangulo: {
    fontFamily: 'Arial',
    fontSize: 12,
    color: '#434343',
  },
  retanguloFacebook: {
    marginTop: 72,
    width: 232,
    height: 40,
    borderWidth: 2,
    backgroundColor: '#194f7c',
    borderColor: '#194f7c',
    justifyContent: 'center',
    alignItems: 'center',
  },
  textoFacebook: {
    fontFamily: 'Arial',
    fontSize: 12,
    color: '#f7f7f7',
  },
  retanguloGoogle: {
    marginTop: 8,
    width: 232,
    height: 40,
    borderWidth: 2,
    backgroundColor: '#f15f5c',
    borderColor: '#f15f5c',
    justifyContent: 'center',
    alignItems: 'center',
  },
  textoGoogle: {
    fontFamily: 'Arial',
    fontSize: 12,
    color: '#f7f7f7',
  },

});




