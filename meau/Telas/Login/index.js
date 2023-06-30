import React, { useState, useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  SafeAreaView,
  KeyboardAvoidingView,
  TouchableOpacity,
  Platform,
} from "react-native";
import { Octicons, Ionicons, Entypo } from "@expo/vector-icons";
import {
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
import { auth } from "../../service/firebase";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import { ScrollView } from "react-native-gesture-handler";

export function StatusUser() {
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setLoggedIn(true);
      } else {
        setLoggedIn(false);
      }
    });

    return () => unsubscribe();
  }, []);
  return loggedIn;
}

export default function Login() {
  const navigation = useNavigation();
  const [loggedIn, setLoggedIn] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setLoggedIn(true);
        saveUser(user);
      } else {
        setLoggedIn(false);
        clearUser();
      }
    });

    return () => unsubscribe();
  }, []);

  const saveUser = async (user) => {
    try {
      await AsyncStorage.setItem("user", JSON.stringify(user));
    } catch (error) {
      console.log("Erro ao salvar usuário:", error);
    }
  };

  const clearUser = async () => {
    try {
      await AsyncStorage.removeItem("user");
    } catch (error) {
      console.log("Erro ao remover usuário:", error);
    }
  };

  async function Logar() {
    if (email === "" || password === "") {
      alert("Preencha todos os campos");
      return;
    }

    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;
      console.log("Usuário logado:", user);
      saveUser(user);
      navigation.reset({
        index: 0,
        routes: [{ name: "Desenvolvimento de Aplicativos" }],
      });
    } catch (error) {
      alert(error.message);
    }
  }

  const handleEmailChange = (value) => {
    setEmail(value);
  };

  const handlePasswordChange = (value) => {
    setPassword(value);
  };

  async function sair() {
    try {
      await signOut(auth);
      console.log("Usuário deslogado");
      clearUser();
    } catch (error) {
      console.log("Erro ao deslogar usuário:", error);
    }
  }

  return (
    <ScrollView>
      <SafeAreaView style={styles.container}>
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={styles.container}
        >
          <View style={styles.retangulo1} />
          <View style={styles.retanguloLogin}>
            <TouchableOpacity onPress={() => {}}>
              <View style={styles.iconMenu}>
                <Octicons name="three-bars" size={24} />
              </View>
            </TouchableOpacity>
            <Text style={styles.textoLogin}>Login</Text>
          </View>
          <View style={styles.textInputContainer}>
            <TextInput
              style={[styles.textInput, email ? styles.textInputFilled : null]}
              placeholder="Nome de usuário"
              placeholderTextColor="#bdbdbd"
              value={email}
              onChangeText={handleEmailChange}
            />
            <View style={styles.separatorLine} />
            <TextInput
              style={[
                styles.textInput,
                password ? styles.textInputFilled : null,
              ]}
              placeholder="Senha"
              placeholderTextColor="#bdbdbd"
              value={password}
              onChangeText={handlePasswordChange}
              secureTextEntry
            />
            <View style={styles.separatorLine} />
          </View>

          <View style={styles.botaoEntrar}>
            <TouchableOpacity onPress={() => Logar()}>
              <Text style={styles.textoBotaoEntrar}>ENTRAR</Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity style={styles.botaoFacebook}>
            <Ionicons
              name="logo-facebook"
              size={16}
              style={styles.iconFacebook}
            />
            <Text style={styles.textoBotaoFacebook}>ENTRAR COM FACEBOOK</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.botaoGoogle}>
            <Entypo name="google-" size={16} style={styles.iconGoogle} />
            <Text style={styles.textoBotaoGoogle}>ENTRAR COM GOOGLE</Text>
          </TouchableOpacity>

          <StatusBar style="auto" />
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
  retanguloLogin: {
    width: 360,
    height: 56,
    backgroundColor: "#cfe9e5",
    flexDirection: "row",
    alignItems: "center",
  },
  textoLogin: {
    fontFamily: "Roboto_500Medium",
    fontSize: 20,
    color: "#434343",
    position: "absolute",
    left: 36,
    top: 18,
    marginLeft: 37,
  },
  iconMenu: {
    marginLeft: 16,
    marginBottom: 16,
    marginTop: 16,
    color: "#434343",
  },
  textInputContainer: {
    width: 360,
    marginTop: 50,
    paddingHorizontal: 5,
  },
  textInput: {
    marginTop: 20,
    fontFamily: "Roboto_400Regular",
    fontSize: 14,
    color: "#bdbdbd",
  },
  textInputFilled: {
    color: "#434343",
  },
  separatorLine: {
    marginTop: 8,
    width: 312,
    height: 0.8,
    backgroundColor: "#e6e7e8",
  },
  botaoEntrar: {
    marginTop: 52,
    width: 232,
    height: 40,
    borderWidth: 2,
    backgroundColor: "#88c9bf",
    borderColor: "#88c9bf",
    justifyContent: "center",
    alignItems: "center",
  },
  textoBotaoEntrar: {
    fontFamily: "Roboto_400Regular",
    fontSize: 12,
    color: "#434343",
  },
  botaoFacebook: {
    marginTop: 72,
    justifyContent: "center",
    alignItems: "center",
    width: 232,
    height: 40,
    borderWidth: 2,
    borderColor: "#194f7c",
    backgroundColor: "#194f7c",
    fontFamily: "Roboto_400Regular",
    flexDirection: "row",
  },
  textoBotaoFacebook: {
    color: "#f7f7f7",
    fontFamily: "Roboto_400Regular",
    fontSize: 12,
  },
  iconFacebook: {
    marginRight: 8,
    color: "#f7f7f7",
  },
  botaoGoogle: {
    marginTop: 8,
    justifyContent: "center",
    alignItems: "center",
    width: 232,
    height: 40,
    borderWidth: 2,
    borderColor: "#f15f5c",
    backgroundColor: "#f15f5c",
    fontFamily: "Roboto_400Regular",
    flexDirection: "row",
  },
  textoBotaoGoogle: {
    color: "#f7f7f7",
    fontFamily: "Roboto_400Regular",
    fontSize: 12,
  },
  iconGoogle: {
    marginRight: 8,
    color: "#f7f7f7",
  },
});
