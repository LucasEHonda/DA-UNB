import React, { useEffect, useState } from 'react';
import { Image } from 'react-native';
import { StyleSheet, Text, View, SafeAreaView, KeyboardAvoidingView, TouchableOpacity, ScrollView } from 'react-native';
import { Octicons, Feather, MaterialIcons } from '@expo/vector-icons';
import { Platform } from 'react-native';
import { db } from '../../service/firebase';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { userFromStorage } from '../../utils/userFromStorage';
import { useNavigation } from '@react-navigation/native';



export default function PetsAdotar() {
  const navigation = useNavigation();
  const [pets, setPets] = useState([]);
  

  async function getPetsByUser() {
    const user = await userFromStorage();
    const querySnapshot = await getDocs(query(petCollectionRef, where("owner", "!=" , user.uid)));
    setPets(querySnapshot.docs.map((doc) => doc.data()));
  }

  const petCollectionRef = collection(db, "pets");
  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      getPetsByUser();
    });

    return unsubscribe;
  }, [navigation]);




  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.container}>
        <View style={styles.retangulo1} />

        <View style={styles.retanguloMenu}>
          <TouchableOpacity onPress={() => {}}>
            <View style={styles.iconMenu}>
              <Octicons name="three-bars" size={24} />
            </View>
          </TouchableOpacity>
          <Text style={styles.textoMenu}>Adotar</Text>
          <TouchableOpacity onPress={() => {}}>
            <View style={styles.iconLupa}>
              <Feather name="search" size={24} />
            </View>
          </TouchableOpacity>
        </View>
        <View style={styles.separatorLine} />
        <ScrollView>
            {pets.map((pet) => (
              <View key={pet._id}>
                
                <View style={styles.retanguloNomePet}>
                  <Text style={styles.textoNomePet}>{pet.name}</Text>
                  <MaterialIcons name="favorite-outline" size={24} style={styles.iconError}/>
                 
                </View>
                
                <TouchableOpacity onPress={() => navigation.navigate('Dados Pets Adotar', { pet })}>
                  <View style={styles.retanguloFoto}>
                    <Image source={{ uri: pet.fileLink }} style={styles.petImage} />
                  </View>
                </TouchableOpacity>

                <View style={styles.retanguloinformacoes}>
                  <Text style={styles.textoinformacoes}>NOVOS INTERESSADOS</Text>
                  
                  
                  
                </View>
              </View>
            ))}
        </ScrollView>
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
    backgroundColor: '#f7a800',
  },

  retanguloMenu: {
    width: 360,
    height: 56,
    backgroundColor: '#ffd358',
    flexDirection: 'row',
    alignItems: 'center',
  },
  textoMenu: {
    fontFamily: 'Roboto_500Medium',
    fontSize: 20,
    color: '#434343',
    position: 'absolute',
    left: 36,
    top: 18,
    marginLeft: 37,
  },

  retanguloNomePet: {
    backgroundColor: '#ffee29b',
    width: 344,
    height: 27,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
    borderWidth: 1,
    borderColor: '#d1d1d1',
    borderRadius: 4, // opcional: adiciona bordas arredondadas
  },

  textoNomePet: {
    fontSize: 16,
    color: '#757575',
    fontFamily: 'Roboto_500Medium',
    marginRight: 15,
  },
  iconError: {
    marginLeft: 15, 
  },


  iconMenu: {
    marginLeft: 16,
    marginBottom: 16,
    marginTop: 16,
    color: '#434343',
  },
  iconLupa: {
    marginLeft: 274,
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
    borderWidth: 1,
    borderColor: '#d1d1d1',
    borderRadius: 4, // opcional: adiciona bordas arredondadas

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
    borderWidth: 1,
    borderColor: '#d1d1d1',
    borderRadius: 4, // opcional: adiciona bordas arredondadas
    marginBottom: 8,
  },

  textoinformacoes: {
    marginBottom: 48,
    fontSize: 12,
    color: '#757575',
    fontFamily: 'Roboto_400Regular',
    marginTop: 8,

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
  petImage: {
    width: 344,
    height: 183,
  },

});
