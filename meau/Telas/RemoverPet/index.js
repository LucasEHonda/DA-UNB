import React, { useState } from "react";
import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";
import { Octicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { ScrollView } from "react-native-gesture-handler";

export default function CadastrarPessoa() {
  const navigation = useNavigation();

  return (
    <ScrollView>
      <SafeAreaView style={styles.container}>
        <StatusBar style="auto" />

            <View style={styles.retangulo1} />
            <View style={styles.retanguloMenu}>
            <TouchableOpacity onPress={() => {}}>
                <View style={styles.iconMenu}>
                    <Octicons name="three-bars" size={24} /> 
                </View>
            </TouchableOpacity>
            <Text style={styles.textoMenu}>Remover Pet</Text>
            </View>

            <Text style={styles.textoCentral}>Pronto!</Text>

            <Text style={styles.textoConfirmacao}>O XXX foi removido da nossa lista {'\n'}com sucesso!</Text>

            <Text style={styles.textoInfos}>Porém, as conversas relacionadas à ele{'\n'}
                                                serão mantidas para o caso de você{'\n'}
                                                desejar manter contato. Caso deseje{'\n'}
                                            apagá-las, você pode realizar esta ação{'\n'}
                                                nas configurações no chat dos{'\n'}
                                                usuários relacionados à este pet. 
            </Text>

            <View style={styles.botaoSair}>
                <TouchableOpacity onPress={() => navigation.navigate("Meus Pets")}>
                <Text style={styles.textoBotaoSAIR}>VOLTAR À MEUS PETS </Text>
                </TouchableOpacity>
            </View>




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
  iconMenu: {
    marginLeft: 16,
    marginBottom: 16,
    marginTop: 16,
    color: "#434343",
  },
  textoCentral: {
    marginBottom: 52,
    marginTop: 52,
    fontFamily: "Courgette_400Regular",
    fontSize: 53,
    color: '#88c9bf',
  },
  textoConfirmacao: {
    fontFamily: "Roboto_400Regular",
    fontSize: 14,
    color: '#757575',
    marginBottom: 35,
  },
  textoInfos: {
    fontFamily: "Roboto_400Regular",
    fontSize: 14,
    color: '#757575',
    marginLeft: 52,
    marginRight: 52,
  },
  botaoSair: {
    width: 232,
    height: 40,
    borderWidth: 2,
    backgroundColor: "#88c9bf",
    borderColor: "#88c9bf",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 24,
    marginTop: 150,
    borderRadius: 4,
  },
  textoBotaoSAIR: {
    fontFamily: 'Roboto_400Regular',
    fontSize: 12,
    color: "#434343",
  },

});
