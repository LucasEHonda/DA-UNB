import React, { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput, SafeAreaView, KeyboardAvoidingView, TouchableOpacity, ScrollView} from 'react-native';
import { Octicons, Feather } from '@expo/vector-icons';
import { Platform } from 'react-native';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../service/firebase';
import { db } from '../../service/firebase';
import { addDoc, collection, deleteDoc, getDocs } from 'firebase/firestore';

export default function RegistrarUsuario() {
  

  async function createUser(user){
    const user_ = await addDoc(userCollectionRef, user)
  }
  async function getUsers(){
    const data = await getDocs(userCollectionRef)
    console.log(data.docs.map((doc) =>  ({...doc.data(), id: doc.id})))
  }
  async function deleteUser(user_id){
    const user_ = await deleteDoc(userCollectionRef, user_id)
  }

  const userCollectionRef = collection(db, "users")
  useEffect(()=>{
    getUsers()
  }, [])

  
  return (
    <ScrollView>
      <SafeAreaView style={styles.container}>
        <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.container}>
          <View style={styles.retangulo1} />

          <View style={styles.retanguloMenu}>
            <TouchableOpacity onPress={() => {}}>
              <View style={styles.iconMenu}>
                <Octicons name="three-bars" size={24} />
              </View>
            </TouchableOpacity>
            <Text style={styles.textoMenu}>Meus Pets</Text>
          </View>
          <View style={styles.separatorLine} />
          <View >
          <View style={styles.retanguloNomePet}>
          <Text style={styles.textoNomePet}>Nome do Pet</Text>
          </View>
          <View style={styles.retanguloFoto}>
          <Text style={styles.textoFoto}>FOTO DE PERFIL</Text>
          </View>
          <View style={styles.retanguloinformacoes}>
          <Text style={styles.textoinformacoes}>Interessados</Text>
          </View>
          </View>

          
         <StatusBar style="auto" />

        </KeyboardAvoidingView>
      </SafeAreaView>
    </ScrollView>
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
    backgroundColor: '#589b9b',
  },
  
  retanguloMenu: {
    width: 360,
    height: 56,
    backgroundColor: '#88c9bf',
    flexDirection: 'row',
    alignItems: 'center',
  },
    textoMenu: {
    fontFamily: 'Roboto_500Medium',
    fontSize: 16,
    color: '#434343',
    position: 'absolute',
    left: 36,
    top: 18,
    marginLeft: 37,
    
  },
  
  retanguloNomePet: {
    backgroundColor: '#cfe9e5',
    width: 344,
    height: 27,
  },

  textoNomePet: {
    fontSize: 16,
    color: '#757575',
    fontFamily: 'Roboto_500Medium',
  },

  iconMenu: {
    marginLeft: 16,
    marginBottom: 16,
    marginTop: 16,
    color: '#434343',
  },
 
  retanguloFoto: {
    width: 344,
    height: 183,
    backgroundColor: '#e6e7e7',
    justifyContent: 'center',
    alignItems: 'center',
  },

  textoFoto: {
    marginRight: 150,
    fontFamily: 'Roboto_400Regular',
    color: '#cfe9e5',
  },
  retanguloinformacoes: {
    alignItems: 'center',
    width: 344,
    height: 54,
  },
  
  textoinformacoes: {
    marginBottom: 48,
    fontSize: 14,
    color: '#757575',
    fontFamily: 'Roboto_400Regular',
  },

  containerInfosProfile: {
    marginTop: 28,

  },
  informacoesProfile: {
    marginRight: 160,
    fontFamily: 'Roboto_400Regular',
    color: '#cfe9e5',
  },

  containerDescricao: {
    marginTop: 16,
    width: 328,
    height: 80,
    color: '#cfe9e5',
    backgroundColor: '#cfe9e5',
    borderWidth: 4,
    borderColor: '#cfe9e5',
    alignItems: 'center',

  },
  textoDescricao: {
    fontSize: 14,
    fontFamily: 'Roboto_400Regular',
    color: '#434343',
  },
  containerInfos: {
    marginTop: 28,
  },
   
    
  separatorLine: {
    marginTop: 8,
    width: 312,
    height: 0.8,
    backgroundColor: '#e6e7e8',
  },
  
  
  iconCamera: {
    marginTop: 44,
  },
  

});
   
