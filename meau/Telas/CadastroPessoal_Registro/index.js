import React, { useState } from "react";
import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  SafeAreaView,
  KeyboardAvoidingView,
  TouchableOpacity,
  ScrollView,
  Image,
} from "react-native";
import { Octicons, Feather } from "@expo/vector-icons";
import { Platform } from "react-native";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../service/firebase";
import { db } from "../../service/firebase";
import { addDoc, collection, updateDoc, doc } from "firebase/firestore";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { storage } from "../../service/firebase";
import { useNavigation } from "@react-navigation/native";

export default function RegistrarUsuario() {
  const navigation = useNavigation();

  const [nome, setNome] = useState("");
  const [idade, setIdade] = useState("");
  const [estado, setEstado] = useState("");
  const [cidade, setCidade] = useState("");
  const [endereco, setEndereco] = useState("");
  const [telefone, setTelefone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmationPassword, setconfirmationPassword] = useState("");
  const [username, setUsername] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);
  const [file, setFile] = useState(null);

  const handleUpload2 = async (event) => {
    const file = event.target.files[0];

    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      const imageUrl = reader.result;
      setSelectedImage(imageUrl);
    };
    reader.readAsDataURL(file);
    setFile(file);
  };

  const handleUpload = async (user) => {
    if (!nome) {
      alert("Preencha o campo 'nome'");
      return;
    }
    const fileNameParts = file.name.split(".");

    const storageRef = ref(
      storage,
      `${user.id}/profile.${fileNameParts[fileNameParts.length - 1]}`
    );
    const uploadTask = uploadBytesResumable(storageRef, file);
    return new Promise((resolve, reject) => {
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log(progress);
        },
        (error) => {
          console.log("deu ruim", error);
          reject(error);
        },
        async () => {
          const fileLink = await getDownloadURL(uploadTask.snapshot.ref);
          resolve(fileLink);
        }
      );
    });
  };

  const handleNomeChange = (value) => {
    setNome(value);
  };

  const handleIdadeChange = (value) => {
    setIdade(value);
  };

  const handleEstadoChange = (value) => {
    setEstado(value);
  };

  const handleCidadeChange = (value) => {
    setCidade(value);
  };

  const handleEnderecoChange = (value) => {
    setEndereco(value);
  };

  const handleTelefoneChange = (value) => {
    setTelefone(value);
  };

  const handleEmailChange = (value) => {
    setEmail(value);
  };

  const handlePasswordChange = (value) => {
    setPassword(value);
  };

  const handleconfirmationPasswordChange = (value) => {
    setconfirmationPassword(value);
  };

  const handleUsernameChange = (value) => {
    setUsername(value);
  };

  async function criarUser() {
    if (email === "" || password === " ") {
      alert("Preencha todos os campos");
      return;
    }

    try {
      const user = await createUserWithEmailAndPassword(auth, email, password);
      const docUser = {
        id: user.user.uid,
        name: nome,
        username,
        address: endereco,
        age: idade,
        cellphone: telefone,
        city: cidade,
        createdAt: "now",
        modifiedAt: "now",
        email,
        state: estado,
      };
      const user_ = await addDoc(userCollectionRef, docUser);
      await AsyncStorage.setItem("user", JSON.stringify(user.user));
      const profileLink = await handleUpload(docUser);
      await updateDoc(doc(db, "users", user_.id), { ...docUser, profileLink });
      navigation.navigate("Meus Pets");
    } catch (error) {
      alert(error.code);
      return;
    }
  }

  const userCollectionRef = collection(db, "users");

  return (
    <ScrollView>
      <SafeAreaView style={styles.container}>
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={styles.container}
        >
          <View style={styles.retangulo1} />

          <View style={styles.retanguloCadastro}>
            <TouchableOpacity onPress={() => {}}>
              <View style={styles.iconMenu}>
                <Octicons name="three-bars" size={24} />
              </View>
            </TouchableOpacity>
            <Text style={styles.textoCadastro}>Cadastro Pessoal </Text>
          </View>

          <View style={styles.containerDescricao}>
            <Text style={styles.textoDescricao}>
              As informações preenchidas serão divulgadas {"\n"}apenas para a
              pessoa com a qual você realizar{"\n"} o processo de adoção e/ou
              apadrinhamento,
              {"\n"}
              {"\t"}após a formalização do processo.
            </Text>
          </View>

          <View style={styles.containerInfos}>
            <Text style={styles.informacoesPessoais}>INFORMAÇÕES PESSOAIS</Text>
          </View>

          <View style={styles.textInputContainer}>
            <TextInput
              style={[styles.textInput, nome !== "" && styles.textInputFilled]}
              placeholder="Nome completo"
              placeholderTextColor="#bdbdbd"
              onChangeText={handleNomeChange}
            />
            <View style={styles.separatorLine} />

            <TextInput
              style={[styles.textInput, idade !== "" && styles.textInputFilled]}
              placeholder="Idade"
              placeholderTextColor="#bdbdbd"
              onChangeText={handleIdadeChange}
            />
            <View style={styles.separatorLine} />

            <TextInput
              style={[styles.textInput, email !== "" && styles.textInputFilled]}
              placeholder="E-mail"
              placeholderTextColor="#bdbdbd"
              onChangeText={handleEmailChange}
            />
            <View style={styles.separatorLine} />

            <TextInput
              style={[
                styles.textInput,
                estado !== "" && styles.textInputFilled,
              ]}
              placeholder="Estado"
              placeholderTextColor="#bdbdbd"
              onChangeText={handleEstadoChange}
            />
            <View style={styles.separatorLine} />

            <TextInput
              style={[
                styles.textInput,
                cidade !== "" && styles.textInputFilled,
              ]}
              placeholder="Cidade"
              placeholderTextColor="#bdbdbd"
              onChangeText={handleCidadeChange}
            />
            <View style={styles.separatorLine} />

            <TextInput
              style={[
                styles.textInput,
                endereco !== "" && styles.textInputFilled,
              ]}
              placeholder="Endereço"
              placeholderTextColor="#bdbdbd"
              onChangeText={handleEnderecoChange}
            />
            <View style={styles.separatorLine} />

            <TextInput
              style={[
                styles.textInput,
                telefone !== "" && styles.textInputFilled,
              ]}
              placeholder="Telefone"
              placeholderTextColor="#bdbdbd"
              onChangeText={handleTelefoneChange}
            />
            <View style={styles.separatorLine} />
          </View>

          <View style={styles.containerInfosProfile}>
            <Text style={styles.informacoesProfile}>INFORMAÇÕES DE PERFIL</Text>
          </View>

          <View style={styles.textInputContainer}>
            <TextInput
              style={[
                styles.textInput,
                username ? styles.textInputFilled : null,
              ]}
              placeholder="Nome de usuário"
              placeholderTextColor="#bdbdbd"
              value={username}
              onChangeText={handleUsernameChange}
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
            <TextInput
              style={[
                styles.textInput,
                confirmationPassword ? styles.textInputFilled : null,
              ]}
              placeholder="Confirmação de senha"
              placeholderTextColor="#bdbdbd"
              value={confirmationPassword}
              onChangeText={handleconfirmationPasswordChange}
              secureTextEntry
            />
            <View style={styles.separatorLine} />

            <View style={styles.containerFotoProfile}>
              <Text style={styles.textoFotoProfile}>FOTO DE PERFIL</Text>
            </View>

            <View style={styles.containerFoto}>
              {selectedImage ? (
                <Image
                  source={{ uri: selectedImage }}
                  style={styles.imagemUpload}
                  resizeMode="contain"
                />
              ) : (
                <label htmlFor="fileInput">
                  <View style={styles.retanguloFoto}>
                    <View style={styles.iconCamera}>
                      <Feather name="plus-circle" size={24} color="#757575" />
                    </View>
                    <Text style={styles.textoRetanguloFoto}>
                      adicionar fotos
                    </Text>
                  </View>
                </label>
              )}
              <input
                type="file"
                id="fileInput"
                style={{ display: "none" }}
                onChange={handleUpload2}
              />
            </View>

            <TouchableOpacity style={styles.BotaoCADASTRO} onPress={criarUser}>
              <Text style={styles.textoBotaoCADASTRO}>FAZER CADASTRO</Text>
            </TouchableOpacity>
          </View>

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
  iconMenu: {
    marginLeft: 16,
    marginBottom: 16,
    marginTop: 16,
    color: "#434343",
  },
  containerDescricao: {
    marginTop: 16,
    width: 328,
    height: 80,
    color: "#cfe9e5",
    backgroundColor: "#cfe9e5",
    borderWidth: 4,
    borderColor: "#cfe9e5",
    alignItems: "center",
  },
  textoDescricao: {
    fontSize: 14,
    fontFamily: "Roboto_400Regular",
    color: "#434343",
  },
  containerInfos: {
    marginTop: 28,
  },
  informacoesPessoais: {
    marginRight: 150,
    fontFamily: "Roboto_400Regular",
    color: "#cfe9e5",
  },

  textInputContainer: {
    width: 360,
    paddingHorizontal: 5,
  },
  textInput: {
    fontFamily: "Roboto_400Regular",
    fontSize: 14,
    color: "#bdbdbd",
    marginTop: 30,
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
  containerInfosProfile: {
    marginTop: 28,
  },
  informacoesProfile: {
    marginRight: 160,
    fontFamily: "Roboto_400Regular",
    color: "#cfe9e5",
  },
  containerFotoProfile: {
    marginBottom: 32,
    marginTop: 28,
  },
  textoFotoProfile: {
    marginRight: 150,
    fontFamily: "Roboto_400Regular",
    color: "#cfe9e5",
  },
  containerFoto: {
    marginTop: 16,
    alignItems: "center",
  },
  imagemUpload: {
    width: 200,
    height: 200,
    marginBottom: 16,
  },
  retanguloFoto: {
    width: 312,
    height: 128,
    backgroundColor: "#f1f2f2",
    justifyContent: "center",
    alignItems: "center",
  },
  textoRetanguloFoto: {
    marginBottom: 48,
    fontSize: 14,
    color: "#757575",
    fontFamily: "Roboto_400Regular",
  },
  iconCamera: {
    marginTop: 44,
  },
  BotaoCADASTRO: {
    marginTop: 32,
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
});
