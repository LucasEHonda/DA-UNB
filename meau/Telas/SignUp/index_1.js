import React, { useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput, SafeAreaView } from 'react-native';
import { db } from '../../service/firebase';
import { addDoc, collection, getDocs } from 'firebase/firestore';

export default function Registro1() {

  async function createUser(user){
    const user_ = await addDoc(userCollectionRef, user)
  }
  async function getUsers(){
    const data = await getDocs(userCollectionRef)
    console.log(data.docs.map((doc) =>  ({...doc.data(), id: doc.id})))
  }

  const userCollectionRef = collection(db, "users")
  useEffect(()=>{
  }, [])

  
  return (
    <SafeAreaView style={styles.container}>
      <View style={{
        width: 360,
        marginTop: 10,
        paddingVertical: '10px',
        paddingLeft: '5px',
      }}>
      <View style={styles.retangulo1} />
      <View style={styles.retanguloCadastro}>
        <Text style={styles.textoCadastro}>Cadastro Pessoal</Text>
      </View>

      
      <View style={styles.descricao}>
        <Text style={styles.textoDescricao}>As informações preenchidas serão divulgadas apenas para a pessoa com a qual você realizar
        o processo de adoção e/ou apadrinhamento, após a formalização do processo.</Text>
      </View>
      <View style={styles.textoInfo}>
        <Text style={styles.textoInfo}>INFORMAÇÕES PESSOAIS</Text>
      </View>
        <TextInput
          style={styles.textoContainer}
          placeholder="Nome completo"
        />
        <View style={styles.retangulo3} />
        <TextInput
          style={styles.textoContainer}
          placeholder="Idade"
        />
        <View style={styles.retangulo3} />
        <TextInput
          style={styles.textoContainer}
          placeholder="E-mail"
        />
        <View style={styles.retangulo3} />
        <TextInput
          style={styles.textoContainer}
          placeholder="Estado"
        />
        <View style={styles.retangulo3} />
        <TextInput
          style={styles.textoContainer}
          placeholder="Cidade"
        />
        <View style={styles.retangulo3} />
        <TextInput
          style={styles.textoContainer}
          placeholder="Endereço"
        />
        <View style={styles.retangulo3} />
        <TextInput
          style={styles.textoContainer}
          placeholder="Telefone"
        />
        <View style={styles.retangulo3} />
        <View style={styles.textoInfo2}>
        <Text style={styles.textoInfo2}>INFORMAÇÕES DE PERFIL</Text>
      </View>
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
  retanguloCadastro: {
    width: 360,
    height: 56,
    backgroundColor: '#cfe9e5',
  },
  textoCadastro: {
    fontFamily: 'Arial',
    fontSize: 20,
    color: '#434343',
    textAlign: 'start',
    paddingTop: 18,
    marginLeft: 65,
  },
  descricao: {
    marginTop: 16,
    width: 328,
    height: 80,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#cfe9e5',
    borderWidth: 4,
    borderColor: '#cfe9e5',
    marginBottom: 28,
  },
  textoDescricao: {
    fontFamily: 'Arial',
    fontSize: 14,
    color: '#434343',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'start',
  },
  textoInfo: {
    color: '#cfe9e5',
    marginBottom: 32,
  },
  textoInfo2: {
    color: '#cfe9e5',
    marginTop: 28,
    marginBottom: 32,
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

});