import React, { useEffect, useState } from 'react';
import { Image } from 'react-native';
import { StyleSheet, Text, View, SafeAreaView, KeyboardAvoidingView, TouchableOpacity, ScrollView } from 'react-native';
import { AntDesign, Entypo } from '@expo/vector-icons';
import { Platform } from 'react-native';
import { db } from '../../service/firebase';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { userFromStorage } from '../../utils/userFromStorage';
import { useNavigation } from '@react-navigation/native';

export default function DadosPetsAdotar({ route }) {
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

                      
        <View style={styles.retanguloFoto}>
              <Image source={{ uri: pet.fileLink }} style={styles.petImage} />
        </View>
                       

        <View style={styles.retanguloNome}>
          <Text style={styles.textoNome}>{pet.name}</Text>
        </View>

        <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>SEXO:</Text>
              <Text style={styles.infoLabel}>PORTE:</Text>
              <Text style={styles.infoLabel}>IDADE:</Text>
        </View>

        <View style={styles.infoRow}>
              <Text style={styles.infoValue}>{pet.gender}</Text>
              <Text style={styles.infoValue}>{pet.size}</Text>
              <Text style={styles.infoValue}>{pet.age}</Text>
        </View>
        <View style={styles.separatorLine} />
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>LOCALIZAÇÃO:</Text>
            </View>
              <View style={styles.infoRow}>
              <Text style={styles.infoValue}>{user.address?.toLowerCase()}</Text>
            </View>
          

          <View style={styles.separatorLine} />

          
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>CADASTRO:</Text>
              <Text style={styles.infoLabel}>VERMIFUGADO:</Text>
            </View>
            <View style={styles.infoRow}>
              <Text style={styles.infoValue}>{pet.health.includes("castrado") ? "Sim" : "Não"}</Text>
              <Text style={styles.infoValue}>{pet.health.includes("vermifugado") ? "Sim" : "Não"}</Text>
            </View>
          
            <View style={styles.separatorLine} />
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>VACINADO:</Text>
              <Text style={styles.infoLabel}>DOENÇAS:</Text>
              
            </View>
          
            <View style={styles.infoRow}>
              <Text style={styles.infoValue}>{pet.health.includes("vacinado") ? "Sim" : "Não"}</Text>
              <Text style={styles.infoValue}>{pet.health.includes("vacinado") ? "Sim" : "Não"}</Text>
            </View>

           <View style={styles.separatorLine} />
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>TEMPERAMENTO:</Text>
            <Text style={styles.infoValue}>{pet.temperament.join(", ")}</Text>
          </View>

                    
          <View style={styles.separatorLine} />
          
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>EXIGÊNCIAS DO DOADOR:</Text>
            </View>
            <View style={styles.infoRow}>
            <Text style={styles.infoValue}>{pet.needs.join(", ")}</Text>
          </View>

          <View style={styles.separatorLine} />
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>MAIS SOBRE {pet.name}:</Text>
            </View>
            <View style={styles.infoRow}>
            <Text style={styles.infoValue}>{pet.profileDesciption}</Text>
          </View>

          <TouchableOpacity
          style={styles.CADASTRO}
          onPress={() => navigation.navigate('Meus Pets')}
        >
          <Text style={styles.textoCADASTRO}>PRETENDO ADOTAR</Text>
        </TouchableOpacity>
        
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
    fontSize: 16,
    color: '#434343',
    position: 'absolute',
    left: 36,
    top: 18,
    marginLeft: 37,
  },

  retanguloFoto: {
    width: 360,
    height: 183,
    backgroundColor: '#e6e7e7',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#d1d1d1',
    borderRadius: 4,
  },


  retanguloNome:{
  justifyContent: 'flex-start',
  marginTop: 10,
  marginLeft: 40,
  width: 360,
  marginBottom: 8,
  },


  textoNome: {
    fontFamily: 'Roboto_500Medium',
    alignItems: 'right',
    fontSize: 16,
    color: '#434343',
    
  },
 
  petImage: {
    width: 344,
    height: 183,
  },

  infoContainer: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    paddingStart:20,
  },

  infoRow: {
    width: 360,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
    paddingStart:38,
    marginRight:30,
      },

  infoLabel: {
    fontSize: 14,
    color: '#f7a800',
    fontFamily: 'Roboto_500Medium',
  },

  infoValue: {
    fontSize: 14,
    color: '#757575',
    alignItems: 'flex-start',
    fontFamily: 'Roboto_500Medium',
  },

  separatorLine: {
    height: 1,
    width:328,
    color: '#e0e0e0',
    marginVertical: 5,
  },

  separatorLine1: {
    height: 1,
    backgroundColor: '#ccc',
  },

  iconShare:
  { 
    marginLeft: 287,
    paddingVertical:20,
    },

    CADASTRO: {
      marginTop: 12,
      justifyContent: 'center',
      alignItems: 'center',
      width: 232,
      height: 40,
      backgroundColor: '#ffd358',
      borderWidth: 2,
      borderColor:'#ffd358',
    },

    textoCADASTRO: {
      fontFamily: 'Roboto_400Regular',
      fontSize: 12,
      color: '#434343',
    }
}); 

