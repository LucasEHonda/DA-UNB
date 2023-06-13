import React from 'react';
import { StyleSheet, Text, View, SafeAreaView, KeyboardAvoidingView, TouchableOpacity, ScrollView, Image } from 'react-native';
import { MaterialIcons, AntDesign, Entypo} from '@expo/vector-icons';
import { Platform } from 'react-native';




export default function DadosPet( {route}) {
    const { pet } = route.params;

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

          <Text style={styles.nomePet}>{pet.name}</Text>

          <TouchableOpacity onPress={() => {}}>
            <View style={styles.iconShare}>
                <Entypo name="share" size={24} />
            </View>
          </TouchableOpacity>
        </View>

        <View>
            <Image source={{ uri: pet.fileLink }} style={styles.petImage} />
            
        </View>
        <View>
            <Text style={styles.nomePet2}>{pet.name}</Text>
        </View>



        

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
  nomePet: {
    fontFamily: 'Roboto_500Medium',
    fontSize: 20,
    color: '#434343',
    position: 'absolute',
    left: 36,
    top: 18,
    marginLeft: 37,
  },
  nomePet2: {
    fontFamily: 'Roboto_500Medium',
    fontSize: 16,
    color: '#434343',
    marginRight: 280,
    marginTop: 16,
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
  petImage: {
    width: 360,
    height: 184,
  },
})
