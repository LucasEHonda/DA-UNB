import React, { useEffect, useState } from "react";
import { Image } from "react-native";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  KeyboardAvoidingView,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { AntDesign, Entypo, MaterialIcons } from "@expo/vector-icons";
import { FAB } from 'react-native-paper';
import { Platform } from "react-native";
import { db } from "../../service/firebase";
import { collection, getDocs, query, where } from "firebase/firestore";
import { userFromStorage } from "../../utils/userFromStorage";
import { useNavigation } from "@react-navigation/native";

export default function DadosPet({ route }) {
  const navigation = useNavigation();
  const [user, setUser] = useState([]);
  const { pet } = route.params;

  const userCollectionRef = collection(db, "users");
  async function getUser() {
    const user_ = await userFromStorage();
  
    const querySnapshot = await getDocs(
      query(userCollectionRef, where("id", "==", user_.uid))
    );
    return querySnapshot.docs.map((doc) => doc.data())[0];
  }

  useEffect(async () => {
    setUser(await getUser());
  }, []);
  return (
    <ScrollView>
      <SafeAreaView style={styles.container}>
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={styles.container}
        >
          <View style={styles.retangulo1} />

          <View style={styles.retanguloMenu}>
            <TouchableOpacity onPress={() => navigation.navigate("Meus Pets")}>
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
      
            <TouchableOpacity>
              <View style={styles.retanguloFoto}>
                <Image source={{ uri: pet.fileLink }} style={styles.petImage} />
                <FAB
                  style = {styles.floatingButton}
                  small
                  icon = {({ size, color }) => (
                    <MaterialIcons name="edit" size={24} color="#434343" />
                  )}
                  onPress = {() => console.log('Funciona')}
                />
              </View>
            </TouchableOpacity>

            <View style={styles.retanguloNome}>
              <Text style={styles.textoNome}>{pet.name}</Text>
            </View>


            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>SEXO</Text>
              <Text style={styles.infoLabel}>PORTE</Text>
              <Text style={styles.infoLabel}>IDADE</Text>
            </View>

            <View style={styles.infoRow}>
              <Text style={styles.infoValue}>{pet.gender}</Text>
              <Text style={styles.infoValue}>{pet.size}</Text>
              <Text style={styles.infoValue}>{pet.age}</Text>
            </View>

            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>LOCALIZAÇÃO</Text>
            </View>
            <View style={styles.infoRow}>
              <Text style={styles.infoValue}>
                {user.address?.toLowerCase()}
              </Text>
            </View>


            <View style={styles.separatorLine}/>

            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>CASTRADO</Text>
              <Text style={styles.infoLabel}>VERMIFUGADO</Text>
            </View>

            <View style={styles.infoRow}>
              <Text style={styles.infoValue}>{pet.health.includes("castrado") ? "Sim" : "Não"}</Text>
              <Text style={styles.infoValue}>{pet.health.includes("vermifugado") ? "Sim" : "Não"}</Text>
            </View>


              <View style={styles.infoRow}>
                <Text style={styles.infoLabel}>VACINADO</Text>
                <Text style={styles.infoLabel}>DOENÇAS</Text>
              </View>

              <View style={styles.infoRow}>
                <Text style={styles.infoValue}>
                  {pet.health.includes("vacinado") ? "Sim" : "Não"}
                </Text>
                <Text style={styles.infoValue}>Nenhuma</Text>
              </View>

            <View style={styles.separatorLine} />


            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>TEMPERAMENTO</Text>
            </View>
            <View style={styles.infoRow}>
              <Text style={styles.infoValue}>{pet.temperament.join(", ")}</Text>
            </View>

            <View style={styles.separatorLine} />


            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>
                O {pet.name.toUpperCase()} PRECISA DE
              </Text>
            </View>

            <View style={styles.separatorLine} />

            
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>EXIGÊNCIAS DO DOADOR</Text>
            </View>
            <View style={styles.infoRow}>
              <Text style={styles.infoValue}>{pet.needs.join(", ")}</Text>
            </View>

            <View style={styles.separatorLine} />

            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>MAIS SOBRE {pet.name.toUpperCase()}</Text>
            </View>
            <View style={styles.infoRow}>
              <Text style={styles.infoValue}>{pet.profileDesciption}</Text>
            </View>

            <View style={styles.containerButtom}>
              < TouchableOpacity 
                style={[styles.Buttom, { marginRight: 16 }]}>
                <Text style={styles.textButtom}>VER INTERESSADOS</Text>
              </TouchableOpacity>

              < TouchableOpacity 
                style={styles.Buttom}>
                <Text style={styles.textButtom}>REMOVER PET</Text>
              </TouchableOpacity>
            </View>
          
        </KeyboardAvoidingView>
      </SafeAreaView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fafafa",
    alignItems: "center",
    justifyContent: "center",
  },

  retangulo1: {
    width: 360,
    height: 24,
    backgroundColor: "#88c9bf",
  },

  retanguloMenu: {
    width: 360,
    height: 56,
    backgroundColor: "#cfe9e5",
    flexDirection: "row",
    alignItems: "center",
  },

  textoMenu: {
    fontFamily: "Roboto_500Medium",
    fontSize: 20,
    color: "#434343",
    position: "absolute",
    left: 36,
    top: 18,
    marginLeft: 37,
  },
  retanguloFoto: {
    position: 'relative',
    width: 360, 
    height: 184, 
  },
  petImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  floatingButton: {
    position: 'absolute',
    right: 16,
    bottom: -25,
    borderRadius: 28,
    backgroundColor: '#fafafa',
  },


  petImage: {
    width: 360,
    height: 184,
  },

  iconArrow: {
    marginLeft: 16,
    marginBottom: 16,
    marginTop: 16,
    color: "#434343",

  },
  iconShare: {
    marginLeft: 274,
    marginBottom: 16,
    marginTop: 16,
    color: "#434343",

  },

  retanguloNome:{
    justifyContent: 'flex-start',
    marginTop: 16,
    marginBottom: 16,
    marginLeft: 40,
    width: 360,
    },

  
    textoNome: {
      fontFamily: 'Roboto_500Medium',
      alignItems: 'right',
      fontSize: 16,
      color: '#434343',
  
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
      color: '#589b9b',
      fontFamily: 'Roboto_500Medium',
      marginBottom: 8,
    },
    infoValue: {
      fontSize: 14,
      color: '#757575',
      alignItems: 'flex-start',
      fontFamily: 'Roboto_500Medium',
    },
    separatorLine: {
        width: 328,
        height: 0.8,
        backgroundColor: "#e0e0e0",
        marginTop: 16,
        marginBottom: 16,
    },
    containerButtom: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
    },
    Buttom: {
      justifyContent: 'center',
      alignItems: 'center',
      width: 148,
      height: 40,
      borderWidth: 2,
      borderColor: '#88c9bf',
      backgroundColor: '#88c9bf',
      marginBottom: 28,
      marginTop: 28,
      borderRadius: 4,
    },
    textButtom: {
      fontSize: 12,
      fontFamily: 'Roboto_500Medium',
      color: '#757575',
    },

});
