import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput, SafeAreaView, KeyboardAvoidingView, TouchableOpacity, Alert } from 'react-native';
import { Platform } from 'react-native';
import { useState } from 'react';
import { signInWithEmailAndPassword,createUserWithEmailAndPassword, signOut } from "firebase/auth";
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../../src/service/firebase';


onAuthStateChanged(auth, (user) => {
  if (user) {setloggedIn(true);
    
  } else { setloggedIn(false);
    
  }
});


export default function Login() {
 const [email, setEmail] = useState('');
 const [password, setPassword] = useState('');

  async function criarUser()  {
    if(email === '' || password === ' '){
      alert('Preencha todos os campos')
      return;
    };

    await createUserWithEmailAndPassword(auth,email, password)
    .then(value=>{console.log("cadastrado \n" + value.user.uid)})
    .catch(error => console.log(error));

    
  };

  async function Logar ()  {
    if(email === '' || password === ' '){
    alert('Preencha todos os campos')
    return;
  };
    await signInWithEmailAndPassword(auth, email, password).then(value=>{
    console.log("Logado na conta")})
    .catch(error =>(alert(error.messagem)));
  };

  async function sair() {
    await signOut(auth).then(value => {console.log("Usuário deslogado")})
    .catch(error => console.log(error));
  }


  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}>
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
          placeholder="Email"
          value={email}
          onChangeText={value=>setEmail(value)}
        />
         <View style={styles.retangulo3} />
        <TextInput
          style={styles.textoContainer}
          placeholder="Senha"
          value={password}
          onChangeText={value=>setPassword(value)}
         secureTextEntry
        />
        <View style={styles.retangulo3} />
      </View>
      <View style={styles.retangulo5}>
        <TouchableOpacity onPress={()=> Logar () }>
        <Text style={styles.textoRetangulo}>ENTRAR</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.retangulo5}>
      <TouchableOpacity onPress={()=> criarUser()}>
        <Text style={styles.textoRetangulo}>REGISTRAR</Text>
        </TouchableOpacity>  
      </View>
      <View style={styles.retangulo5}>
      <TouchableOpacity onPress={()=> sair()}>
        <Text style={styles.textoRetangulo}>SAIR</Text>
        </TouchableOpacity>  
      </View>
      <View style={styles.retanguloFacebook}>
        <Text style={styles.textoFacebook}>ENTRAR COM FACEBOOK</Text>
      </View>
      <View style={styles.retanguloGoogle}>
        <Text style={styles.textoGoogle}>ENTRAR COM GOOGLE</Text>
      </View>
      <StatusBar style="auto" />
      </KeyboardAvoidingView>  
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
    marginTop: 56,
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




