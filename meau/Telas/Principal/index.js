import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  Image,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Octicons } from "@expo/vector-icons";
import LogoSrc from "./images/Meau_marca_2.png";
import React, { useState, useEffect } from "react";
import { userFromStorage } from "../../utils/userFromStorage";
import { signOut } from "firebase/auth";
import { auth } from "../../service/firebase";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ScrollView } from "react-native-gesture-handler";

export default function Principal() {
  const navigation = useNavigation();
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const clearUser = async () => {
    try {
      await AsyncStorage.removeItem("user");
    } catch (error) {
      console.log("Erro ao remover usuário:", error);
    }
  };
  async function sair() {
    try {
      await signOut(auth);
      console.log("Usuário deslogado");
      clearUser();
      navigation.reset({
        index: 0,
        routes: [{ name: "Cadastro Login" }],
      });
    } catch (error) {
      console.log("Erro ao deslogar usuário:", error);
    }
  }

  useEffect(() => {
    const fetchUserFromStorage = async () => {
      try {
        const storedUser = await userFromStorage();
        setUser(storedUser);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserFromStorage();
  }, []);

  if (isLoading) {
    return (
      <View style={styles.container}>
        <Text>Loading...</Text>
      </View>
    );
  }
  return (
    <ScrollView>
      <SafeAreaView style={styles.container}>
        <TouchableOpacity onPress={() => navigation.openDrawer()}>
          <View style={styles.Menu}>
            <Octicons name="three-bars" size={24} color="#88c9bf" />
          </View>
        </TouchableOpacity>

        <View style={styles.Ola}>
          <Text style={styles.TextoOla}>Olá!</Text>
        </View>

        <View style={styles.Bemvindo}>
          <Text style={styles.textoBemvindo}>Bem vindo ao Meau!</Text>

          <Text style={styles.textoBemvindo}>
            Aqui você pode adotar, doar e ajudar
          </Text>

          <Text style={styles.textoBemvindo}>cães, gatos com facilidade.</Text>

          <Text style={styles.textoBemvindo}> Qual o seu interesse?</Text>
        </View>

        {user !== null ? (
          <TouchableOpacity
            style={styles.ADOTAR}
            onPress={() => navigation.navigate("Pets Adotar")}
          >
            <Text style={styles.textoADOTAR}>ADOTAR </Text>
          </TouchableOpacity>
        ) : (
          <></>
        )}

        {user !== null ? (
          <TouchableOpacity
            style={styles.CADASTRO}
            onPress={() => navigation.navigate("Cadastrar Pet")}
          >
            <Text style={styles.textoCADASTRO}> CADASTRAR ANIMAL </Text>
          </TouchableOpacity>
        ) : (
          <></>
        )}

        {user === null ? (
          <TouchableOpacity
            style={styles.CADASTRO}
            onPress={() => navigation.navigate("Cadastro Login")}
          >
            <Text style={styles.textoCADASTRO}>login</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            style={styles.CADASTRO}
            onPress={() => navigation.navigate("Meus Pets")}
          >
            <Text style={styles.textoCADASTRO}>MEUS PETS</Text>
          </TouchableOpacity>
        )}
        {user === null ? (
          <></>
        ) : (
          <TouchableOpacity style={styles.CADASTRO} onPress={sair}>
            <Text style={styles.textoCADASTRO}>SAIR</Text>
          </TouchableOpacity>
        )}

        <View>
          <Image source={LogoSrc} style={styles.logoImage} />
        </View>

        <StatusBar style="auto" />
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
  Menu: {
    marginTop: 12,
    marginRight: 300,
  },

  Ola: {
    marginTop: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  TextoOla: {
    fontFamily: "Courgette_400Regular",
    fontSize: 72,
    color: "#ffd358",
  },

  Bemvindo: {
    marginTop: 52,
    width: "48",
  },

  textoBemvindo: {
    fontFamily: "Roboto_400Regular",
    fontSize: 16,
    color: "#757575",
    textAlign: "center",
    justifyContent: "center",
    alignSelf: "center",
  },

  ADOTAR: {
    marginTop: 48,
    justifyContent: "center",
    alignItems: "center",
    width: 232,
    height: 40,
    borderWidth: 2,
    borderColor: "#ffd358",
    backgroundColor: "#ffd358",
  },

  textoADOTAR: {
    fontFamily: "Roboto_400Regular",
    fontSize: 12,
    color: "#434343",
  },

  AJUDAR: {
    marginTop: 12,
    justifyContent: "center",
    alignItems: "center",
    width: 232,
    height: 40,
    backgroundColor: "#ffd358",
    borderWidth: 2,
    borderColor: "#ffd358",
  },

  textoAJUDAR: {
    fontFamily: "Roboto_400Regular",
    fontSize: 12,
    color: "#434343",
  },

  CADASTRO: {
    marginTop: 12,
    justifyContent: "center",
    alignItems: "center",
    width: 232,
    height: 40,
    backgroundColor: "#ffd358",
    borderWidth: 2,
    borderColor: "#ffd358",
  },

  textoCADASTRO: {
    fontFamily: "Roboto_400Regular",
    fontSize: 12,
    color: "#434343",
  },

  LOGIN: {
    marginTop: 44,
    justifyContent: "center",
    alignItems: "center",
  },
  textoLogin: {
    fontFamily: "Roboto_400Regular",
    fontSize: 16,
    color: "#88c9bf",
  },

  logoImage: {
    marginTop: 68,
    marginBottom: 32,
    width: 122,
    height: 44,
  },
});
