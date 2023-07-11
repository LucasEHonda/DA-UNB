import React, { useEffect } from "react";
import {
  StyleSheet,
  View,
  SafeAreaView,
  Image,
  ImageBackground,
} from "react-native";
import Malha from "./images/Meau_malha.png";
import Logo from "./images/Meau_marca.png";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/native";

export default function Introducao() {
  const navigation = useNavigation();

  useEffect(() => {
    // Define o tempo em que a tela será trocada (em milissegundos)
    const transitionTime = 1000;

    // Navega para outra tela após o tempo definido
    const timeout = setTimeout(() => {
      navigation.navigate("Desenvolvimento de Aplicativos");
    }, transitionTime);

    // Limpa o timeout quando o componente for desmontado
    return () => clearTimeout(timeout);
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <ImageBackground source={Malha} resizeMode="cover" style={styles.malha}>
        <View style={styles.ContainerImage}>
          <Image source={Logo} style={styles.LogoImage} />
        </View>
      </ImageBackground>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#88c9bf",
  },
  malha: {
    opacity: 0.45,
    width: "100%",
    height: "100%",
  },
  ContainerImage: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  LogoImage: {
    // Trocar para branco
    width: 276,
    height: 100,
  },
});
