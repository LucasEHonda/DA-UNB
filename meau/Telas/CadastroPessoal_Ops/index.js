import React, { useState } from "react";
import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

export default function CadastrarPessoa() {
  const navigation = useNavigation();

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.retangulo1} />
      <View style={styles.retanguloCadastro}>
        <TouchableOpacity onPress={() => {}}>
          <View style={styles.iconArrow}>
            <AntDesign name="arrowleft" size={24} style={styles.iconArrow} />
          </View>
        </TouchableOpacity>
        <Text style={styles.textoCadastro}>Cadastro</Text>
      </View>

      <View style={styles.Ops}>
        <Text style={styles.TextoOps}>Ops!</Text>
      </View>

      <View style={styles.Mensagem}>
        <Text style={styles.textoMensagem}>
          Você não pode realizar esta ação{"\n"}
          sem possuir um cadastro.
        </Text>
      </View>

      <TouchableOpacity
        style={styles.BotaoCADASTRO}
        onPress={() => navigation.navigate("Registrar Usuario")}
      >
        <Text style={styles.textoBotaoCADASTRO}>FAZER CADASTRO</Text>
      </TouchableOpacity>

      <View style={styles.MensagemCadastro}>
        <Text style={styles.textoMensagemCadastro}>Já possui cadastro?</Text>
      </View>

      <TouchableOpacity
        style={styles.BotaoLOGIN}
        onPress={() => navigation.navigate("Login")}
      >
        <Text style={styles.textoBotaoLOGIN}>FAZER LOGIN</Text>
      </TouchableOpacity>

      <StatusBar style="auto" />
    </SafeAreaView>
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
  retanguloCadastro: {
    width: 360,
    height: 56,
    backgroundColor: "#cfe9e5",
    flexDirection: "row",
    alignItems: "center",
  },
  textoCadastro: {
    fontFamily: "Roboto_500Medium",
    fontSize: 20,
    color: "#434343",
    position: "absolute",
    left: 36,
    top: 18,
    marginLeft: 37,
  },
  iconArrow: {
    marginLeft: 12,
    color: "#434343",
  },
  Ops: {
    marginTop: 52,
    justifyContent: "center",
    alignItems: "center",
  },
  TextoOps: {
    fontFamily: "Courgette_400Regular",
    fontSize: 53,
    color: "#88c9bf",
  },
  Mensagem: {
    marginTop: 44,
  },
  textoMensagem: {
    fontFamily: "Roboto_400Regular",
    fontSize: 14,
    color: "#757575",
    textAlign: "center",
    justifyContent: "center",
    alignSelf: "center",
  },
  BotaoCADASTRO: {
    marginTop: 16,
    justifyContent: "center",
    alignItems: "center",
    width: 232,
    height: 40,
    borderWidth: 2,
    borderColor: "#88c9bf",
    backgroundColor: "#88c9bf",
    fontFamily: "Roboto_400Regular",
  },
  textoBotaoCADASTRO: {
    color: "#434343",
    fontFamily: "Roboto_400Regular",
    fontSize: 12,
  },
  BotaoLOGIN: {
    marginTop: 16,
    justifyContent: "center",
    alignItems: "center",
    width: 232,
    height: 40,
    borderWidth: 2,
    borderColor: "#88c9bf",
    backgroundColor: "#88c9bf",
    fontFamily: "Roboto_400Regular",
  },
  textoBotaoLOGIN: {
    color: "#434343",
    fontFamily: "Roboto_400Regular",
    fontSize: 12,
  },
  MensagemCadastro: {
    marginTop: 44,
  },
  textoMensagemCadastro: {
    color: "#757575",
    fontSize: 14,
  },
});
