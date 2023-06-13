import React, { useEffect, useState } from 'react';
import { Image } from 'react-native';
import { StyleSheet, Text, View, SafeAreaView, KeyboardAvoidingView, TouchableOpacity, ScrollView } from 'react-native';
import { Octicons, Feather, MaterialIcons, AntDesign, Entypo} from '@expo/vector-icons';
import { Platform } from 'react-native';
import { db } from '../../service/firebase';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { userFromStorage } from '../../utils/userFromStorage';
import { useNavigation } from '@react-navigation/native';



export default function DadosPet() {
  const navigation = useNavigation();
  const [pets, setPets] = useState([]);



  async function getPetsByUser() {
    const user = await userFromStorage();
    const querySnapshot = await getDocs(query(petCollectionRef, where("owner", "==", user.uid)));
    setPets(querySnapshot.docs.map((doc) => doc.data()));
  }

  const petCollectionRef = collection(db, "pets");
  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      getPetsByUser();
    });

    return unsubscribe;
  }, [navigation]);

  const handlePetDetails = (pet) => {
    navigation.navigate('Dados Pets', { pet });
  }

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.container}>
        <View style={styles.retangulo1} />

        <View style={styles.retanguloMenu}>
          <TouchableOpacity onPress={() => {}}>
            <View style={styles.iconArrow}>
            <AntDesign name="arrowleft" size={24} />
            </View>
          </TouchableOpacity>

          <Text style={styles.textoMenu}>srsdf</Text>

          <TouchableOpacity onPress={() => {}}>
            <View style={styles.iconShare}>
                <Entypo name="share" size={24} />
            </View>
          </TouchableOpacity>

        </View>
        <View style={styles.separatorLine} />
        <ScrollView>
            {pets.map((pet) => (
                <View key={pet._id}>
                <TouchableOpacity onPress={() => handlePetDetails(pet)}>
                    <View style={styles.retanguloNomePet}>
                    <Text style={styles.textoNomePet}>{pet.name}</Text>
                    <MaterialIcons name="error" size={24} style={styles.iconError}/>
                    </View>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => handlePetDetails(pet)}>
                    <View style={styles.retanguloFoto}>
                    <Image source={{ uri: pet.fileLink }} style={styles.petImage} />
                    </View>
                </TouchableOpacity>

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
    backgroundColor: '#88c9bf',
  },

  retanguloMenu: {
    width: 360,
    height: 56,
    backgroundColor: '#cfe9e5',
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

  iconArrow: {
    marginLeft: 16,
    marginBottom: 16,
    marginTop: 16,
    color: '#434343',
  },
  iconShare: {
    marginLeft: 274,
    marginBottom: 16,
    marginTop: 16,
    color: '#434343',
  },
})
