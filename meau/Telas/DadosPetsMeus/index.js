import React, { useEffect, useState } from 'react';
import { Image } from 'react-native';
import { StyleSheet, Text, View, SafeAreaView, KeyboardAvoidingView, TouchableOpacity, ScrollView } from 'react-native';
import { AntDesign, Entypo } from '@expo/vector-icons';
import { Platform } from 'react-native';
import { db } from '../../service/firebase';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { userFromStorage } from '../../utils/userFromStorage';
import { useNavigation } from '@react-navigation/native';

export default function DadosPet({ route }) {
  const navigation = useNavigation();
  const [user, setUser] = useState([]);
  const { pet } = route.params;
  
  const userCollectionRef = collection(db, "users");
  async function getUser() {
    const user_ = await userFromStorage()
    
    const querySnapshot = await getDocs(query(userCollectionRef, where("id", "==", user_.uid)));
    return querySnapshot.docs.map((doc) => doc.data())[0]
  }

  useEffect(async () => {
    setUser(await getUser());
  }, []);
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

          <Text style={styles.textoMenu}>{pet.name}</Text>

          <TouchableOpacity onPress={() => {}}>
            <View style={styles.iconShare}>
              <Entypo name="share" size={24} />
            </View>
          </TouchableOpacity>
        </View>

        <View style={styles.separatorLine} />

        <ScrollView>
          <TouchableOpacity>
            <View style={styles.retanguloFoto}>
              <Image source={{ uri: pet.fileLink }} style={styles.petImage} />
            </View>
          </TouchableOpacity>

          <View style={styles.infoContainer}>
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Sexo:</Text>
              <Text style={styles.infoValue}>{pet.gender}</Text>
              <Text style={styles.infoLabel}>Porte:</Text>
              <Text style={styles.infoValue}>{pet.size}</Text>
              <Text style={styles.infoLabel}>Idade:</Text>
              <Text style={styles.infoValue}>{pet.age}</Text>
            </View>
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Localização:</Text>
              <Text style={styles.infoValue}>{user.address?.toLowerCase()}</Text>
            </View>
          </View>

          <View style={styles.separatorLine} />

          <View style={styles.infoContainer}>
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Castrado:</Text>
              <Text style={styles.infoValue}>{pet.health.includes("castrado") ? "Sim" : "Não"}</Text>
              <Text style={styles.infoLabel}>Vermifugado:</Text>
              <Text style={styles.infoValue}>{pet.health.includes("vermifugado") ? "Sim" : "Não"}</Text>
            </View>
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Vacinado:</Text>
              <Text style={styles.infoValue}>{pet.health.includes("vacinado") ? "Sim" : "Não"}</Text>
              <Text style={styles.infoLabel}>Doenças:</Text>
              <Text style={styles.infoValue}>Nenhuma</Text>
            </View>
          </View>

          <View style={styles.separatorLine} />

          <View style={styles.infoContainer}>
            <Text style={styles.infoLabel}>Temperamento:</Text>
            <Text style={styles.infoValue}>{pet.temperament.join(", ")}</Text>
          </View>

          <View style={styles.separatorLine} />

          <View style={styles.infoContainer}>
            <Text style={styles.infoValue}>O {pet.name} precisa de: Ajuda financeira e alimento</Text>
          </View>

          <View style={styles.separatorLine} />

          <View style={styles.infoContainer}>
            <Text style={styles.infoLabel}>Exigências do doador:</Text>
            <Text style={styles.infoValue}>{pet.needs.join(", ")}</Text>
          </View>

          <View style={styles.separatorLine} />

          <View style={styles.infoContainer}>
            <Text style={styles.infoValue}>Mais sobre {pet.name}:</Text>
            <Text style={styles.infoValue}>{pet.profileDesciption}</Text>
          </View>
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

  retanguloFoto: {
    width: 344,
    height: 183,
    backgroundColor: '#e6e7e7',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#d1d1d1',
    borderRadius: 4,
  },

  petImage: {
    width: 344,
    height: 183,
  },

  infoContainer: {
    paddingHorizontal: 20,
    paddingVertical: 10,
  },

  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },

  infoLabel: {
    fontSize: 16,
    color: '#757575',
    fontFamily: 'Roboto_500Medium',
  },

  infoValue: {
    fontSize: 16,
    color: '#434343',
  },

  separatorLine: {
    height: 1,
    backgroundColor: '#ccc',
    marginVertical: 10,
  },

  iconShare:
  { 
    marginLeft: 287,
    paddingVertical:20,
    }
});
