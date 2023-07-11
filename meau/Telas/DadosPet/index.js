import React, { useEffect, useState } from "react";
import { Image, TextInput, Picker } from "react-native";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  KeyboardAvoidingView,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import {
  AntDesign,
  Entypo,
  MaterialIcons,
  MaterialCommunityIcons,
  Ionicons,
} from "@expo/vector-icons";
import { FAB } from "react-native-paper";
import { Platform } from "react-native";
import { db } from "../../service/firebase";
import {
  collection,
  getDocs,
  query,
  where,
  updateDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";
import { userFromStorage } from "../../utils/userFromStorage";
import { useNavigation } from "@react-navigation/native";
import { storage } from "../../service/firebase";
import { ref, deleteObject } from "firebase/storage";

export default function DadosPet({ route }) {
  const navigation = useNavigation();
  const [user, setUser] = useState([]);
  const { pet } = route.params;
  const [isEditMode, setIsEditMode] = useState(false);
  const [name, setName] = useState(pet.name);
  const [gender, setGender] = useState(pet.gender);
  const [size, setSize] = useState(pet.size);
  const [age, setAge] = useState(pet.age);
  const [temperamentos, setTemperamentos] = useState(pet.temperament);
  const [saude, setSaude] = useState(pet.health);
  const [exigenciasAdocao, setExigenciasAdocao] = useState(pet.needs);
  const [acompanhamentoPosAdocao, setAcompanhamentoPosAdocao] = useState(false);
  const [opcaoSelecionada, setOpcaoSelecionada] = useState("");
  const [profileDesciption, setProfileDesciption] = useState(
    pet.profileDesciption
  );
  const [readyToPublisher, setReadyToPublisher] = useState(
    pet.readyToPublisher
  );

  const handleSaudeSelection = (selectedSaude) => {
    if (saude.includes(selectedSaude)) {
      setSaude(saude.filter((opcao) => opcao !== selectedSaude));
    } else {
      setSaude([...saude, selectedSaude]);
    }
  };
  const handleAcompanhamentoPosAdocaoSelection = () => {
    setAcompanhamentoPosAdocao(!acompanhamentoPosAdocao);
    setOpcaoSelecionada("");
  };
  const handleExigenciaAdocaoSelection = (exigencia) => {
    if (exigenciasAdocao.includes(exigencia)) {
      setExigenciasAdocao(
        exigenciasAdocao.filter((opcao) => opcao !== exigencia)
      );
    } else {
      setExigenciasAdocao([...exigenciasAdocao, exigencia]);
    }
  };
  const handleOpcaoSelecionada = (opcao) => {
    if (acompanhamentoPosAdocao) {
      setOpcaoSelecionada(opcao);
    }
  };

  const Checkbox2 = ({ label, selected, onPress }) => {
    return (
      <TouchableOpacity
        onPress={onPress}
        style={[styles.checkboxContainer, selected && styles.checkboxSelected]}
      >
        {selected ? (
          <Ionicons name="checkbox" size={24} color="#757575" />
        ) : (
          <MaterialCommunityIcons
            name="checkbox-blank-outline"
            size={24}
            color="#757575"
          />
        )}
        <Text style={styles.checkboxText}>{label}</Text>
      </TouchableOpacity>
    );
  };

  const handleTemperamentoSelection = (selectedTemperamento) => {
    if (temperamentos.includes(selectedTemperamento)) {
      setTemperamentos(
        temperamentos.filter(
          (temperamento) => temperamento !== selectedTemperamento
        )
      );
    } else {
      setTemperamentos([...temperamentos, selectedTemperamento]);
    }
  };

  const userCollectionRef = collection(db, "users");
  async function getUser() {
    const user_ = await userFromStorage();

    const querySnapshot = await getDocs(
      query(userCollectionRef, where("id", "==", user_.uid))
    );
    const user__ = querySnapshot.docs.map((doc) => doc.data())[0];
    setUser(user__);
  }

  useEffect(() => {
    getUser();
  }, []);

  const handleEditButtonClick = () => {
    const newIseditMode = isEditMode ? false : true;
    setIsEditMode(newIseditMode);
    console.log(isEditMode);
  };

  const handleSaveButtonClick = () => {
    const newPet = {
      name,
      specie: pet.specie,
      gender,
      age,
      size,
      temperament: temperamentos,
      health: saude,
      needs: exigenciasAdocao,
      owner: pet.owner,
      profileDesciption,
      readyToPublisher,
    };
    updateDoc(doc(db, "pets", pet.id), { ...newPet });
    setIsEditMode(false);
  };

  async function handleRemovePet() {
    try {
      const storageRef = ref(storage, pet.fileLink);
      await deleteObject(storageRef);
    } catch (error) {
      console.error("Erro ao excluir o arquivo: ", error);
      return;
    }
    await deleteDoc(doc(db, "pets", pet.id));
    navigation.navigate("Remover Pet");
  }

  return (
    <ScrollView>
      <SafeAreaView style={styles.container}>
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={styles.container}
        >
          <View style={styles.retangulo1} />

          <View style={styles.retanguloMenu}>
            <TouchableOpacity
              style={styles.iconArrow}
              onPress={() => navigation.navigate("Meus Pets")}
            >
              <AntDesign name="arrowleft" size={24} />
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
                style={styles.floatingButton}
                small
                icon={({ size, color }) => (
                  <MaterialIcons name="edit" size={24} color="#434343" />
                )}
                onPress={handleEditButtonClick}
              />
            </View>
          </TouchableOpacity>

          <View style={styles.retanguloNome}>
            {isEditMode ? (
              <TextInput
                style={styles.textoNome}
                value={name}
                onChangeText={setName}
              />
            ) : (
              <Text style={styles.textoNome}>{name}</Text>
            )}
            {isEditMode ? (
              <>
                <Picker
                  style={{
                    width: 100,
                    height: 30,
                    fontFamily: "Roboto_500Medium",
                  }}
                  selectedValue={readyToPublisher}
                  onValueChange={setReadyToPublisher}
                >
                  <Picker.Item label="Sim" value={true} />
                  <Picker.Item label="Não" value={false} />
                </Picker>
              </>
            ) : (
              <></>
            )}
          </View>

          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>SEXO</Text>
            <Text style={styles.infoLabel}>PORTE</Text>
            <Text style={styles.infoLabel}>IDADE</Text>
          </View>

          <View style={styles.infoRow}>
            {isEditMode ? (
              <>
                <Picker
                  style={{
                    width: 100,
                    height: 30,
                    fontFamily: "Roboto_500Medium",
                  }}
                  selectedValue={gender}
                  onValueChange={setGender}
                >
                  <Picker.Item label="Macho" value="macho" />
                  <Picker.Item label="Fêmea" value="fêmea" />
                </Picker>
                <Picker
                  style={{
                    width: 100,
                    height: 30,
                    fontFamily: "Roboto_500Medium",
                  }}
                  selectedValue={size}
                  onValueChange={setSize}
                >
                  <Picker.Item label="Pequeno" value="pequeno" />
                  <Picker.Item label="Médio" value="médio" />
                  <Picker.Item label="Grande" value="grande" />
                </Picker>
                <Picker
                  style={{
                    width: 100,
                    height: 30,
                    fontFamily: "Roboto_500Medium",
                  }}
                  selectedValue={age}
                  onValueChange={setAge}
                >
                  <Picker.Item label="Filhote" value="filhote" />
                  <Picker.Item label="Adulto" value="adulto" />
                  <Picker.Item label="Idoso" value="idoso" />
                </Picker>
              </>
            ) : (
              <>
                <Text style={styles.infoValue}>{gender}</Text>
                <Text style={styles.infoValue}>{size}</Text>
                <Text style={styles.infoValue}>{age}</Text>
              </>
            )}
          </View>

          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>LOCALIZAÇÃO</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.infoValue}>{user.address?.toLowerCase()}</Text>
          </View>

          <View style={styles.separatorLine} />

          {isEditMode ? (
            <>
              <View style={styles.checkboxRow}>
                <Checkbox2
                  label="Vacinado"
                  selected={saude.includes("Vacinado")}
                  onPress={() => handleSaudeSelection("Vacinado")}
                />
                <Checkbox2
                  label="Vermifugado"
                  selected={saude.includes("Vermifugado")}
                  onPress={() => handleSaudeSelection("Vermifugado")}
                />
              </View>
              <View style={styles.checkboxRow}>
                <Checkbox2
                  label="Castrado"
                  selected={saude.includes("Castrado")}
                  onPress={() => handleSaudeSelection("Castrado")}
                />
                <Checkbox2
                  label="Doente"
                  selected={saude.includes("Doente")}
                  onPress={() => handleSaudeSelection("Doente")}
                />
              </View>
              <View style={styles.separatorLine} />
            </>
          ) : (
            <>
              {" "}
              <View style={styles.infoRow}>
                <Text style={styles.infoLabel}>CASTRADO</Text>
                <Text style={styles.infoLabel}>VERMIFUGADO</Text>
              </View>
              <View style={styles.infoRow}>
                <Text style={styles.infoValue}>
                  {pet.health.includes("castrado") ? "Sim" : "Não"}
                </Text>
                <Text style={styles.infoValue}>
                  {pet.health.includes("vermifugado") ? "Sim" : "Não"}
                </Text>
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
            </>
          )}

          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>TEMPERAMENTO</Text>
          </View>
          {isEditMode ? (
            <>
              <View style={styles.checkboxRow}>
                <Checkbox2
                  label="Brincalhão"
                  selected={temperamentos.includes("Brincalhão")}
                  onPress={() => handleTemperamentoSelection("Brincalhão")}
                />
                <Checkbox2
                  label="Tímido"
                  selected={temperamentos.includes("Tímido")}
                  onPress={() => handleTemperamentoSelection("Tímido")}
                />
                <Checkbox2
                  label="Calmo"
                  selected={temperamentos.includes("Calmo")}
                  onPress={() => handleTemperamentoSelection("Calmo")}
                />
              </View>

              <View style={styles.checkboxRow}>
                <Checkbox2
                  label="Guarda"
                  selected={temperamentos.includes("Guarda")}
                  onPress={() => handleTemperamentoSelection("Guarda")}
                />
                <Checkbox2
                  label="Amoroso"
                  selected={temperamentos.includes("Amoroso")}
                  onPress={() => handleTemperamentoSelection("Amoroso")}
                />
                <Checkbox2
                  label="Preguiçoso"
                  selected={temperamentos.includes("Preguiçoso")}
                  onPress={() => handleTemperamentoSelection("Preguiçoso")}
                />
              </View>
            </>
          ) : (
            <>
              <View style={styles.infoRow}>
                <Text style={styles.infoValue}>
                  {pet.temperament.join(", ")}
                </Text>
              </View>
            </>
          )}

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
          {isEditMode ? (
            <>
              <View style={styles.checkboxRow}>
                <Checkbox2
                  label="Termo de adoção"
                  selected={exigenciasAdocao.includes("Termo de adoção")}
                  onPress={() =>
                    handleExigenciaAdocaoSelection("Termo de adoção")
                  }
                />
                <Checkbox2
                  label="Fotos da casa"
                  selected={exigenciasAdocao.includes("Fotos da casa")}
                  onPress={() =>
                    handleExigenciaAdocaoSelection("Fotos da casa")
                  }
                />
              </View>

              <View style={styles.checkboxRow}>
                <Checkbox2
                  label="Visita prévia ao animal"
                  selected={exigenciasAdocao.includes(
                    "Visita prévia ao animal"
                  )}
                  onPress={() =>
                    handleExigenciaAdocaoSelection("Visita prévia ao animal")
                  }
                />
                <Checkbox2
                  label="Acompanhamento pós adoção"
                  selected={acompanhamentoPosAdocao}
                  onPress={handleAcompanhamentoPosAdocaoSelection}
                />
              </View>

              <View style={styles.checkboxRow}>
                <Checkbox2
                  label="1 mês"
                  selected={opcaoSelecionada === "1 mês"}
                  onPress={() => handleOpcaoSelecionada("1 mês")}
                  disabled={!acompanhamentoPosAdocao}
                />
                <Checkbox2
                  label="3 meses"
                  selected={opcaoSelecionada === "3 meses"}
                  onPress={() => handleOpcaoSelecionada("3 meses")}
                  disabled={!acompanhamentoPosAdocao}
                />
                <Checkbox2
                  label="6 meses"
                  selected={opcaoSelecionada === "6 meses"}
                  onPress={() => handleOpcaoSelecionada("6 meses")}
                  disabled={!acompanhamentoPosAdocao}
                />
              </View>
            </>
          ) : (
            <>
              <View style={styles.infoRow}>
                <Text style={styles.infoValue}>{pet.needs.join(", ")}</Text>
              </View>
            </>
          )}

          <View style={styles.separatorLine} />

          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>
              MAIS SOBRE {pet.name.toUpperCase()}
            </Text>
          </View>

          {isEditMode ? (
            <>
              <TextInput
                style={styles.textoNome}
                value={profileDesciption}
                onChangeText={setProfileDesciption}
              />{" "}
            </>
          ) : (
            <>
              <View style={styles.infoRow}>
                <Text style={styles.infoValue}>{pet.profileDesciption}</Text>
              </View>
            </>
          )}

          <View style={styles.containerButtom}>
            <TouchableOpacity
              style={[styles.Buttom, { marginRight: 16 }]}
              onPress={() =>
                navigation.navigate("Interessados", {
                  interested: pet.interested || [],
                })
              }
            >
              {isEditMode ? (
                <Text style={styles.textButtom} onPress={handleSaveButtonClick}>
                  ATUALIZAR PET
                </Text>
              ) : (
                <Text style={styles.textButtom}>VER INTERESSADOS</Text>
              )}
            </TouchableOpacity>

            <TouchableOpacity style={styles.Buttom} onPress={handleRemovePet}>
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
    position: "relative",
    width: 360,
    height: 184,
  },
  petImage: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  floatingButton: {
    position: "absolute",
    right: 16,
    bottom: -25,
    borderRadius: 28,
    backgroundColor: "#fafafa",
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

  retanguloNome: {
    justifyContent: "flex-start",
    marginTop: 16,
    marginBottom: 16,
    marginLeft: 40,
    width: 360,
  },

  textoNome: {
    fontFamily: "Roboto_500Medium",
    alignItems: "right",
    fontSize: 16,
    color: "#434343",
  },
  infoRow: {
    width: 360,
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
    paddingStart: 38,
    marginRight: 30,
  },
  infoLabel: {
    fontSize: 14,
    color: "#589b9b",
    fontFamily: "Roboto_500Medium",
    marginBottom: 8,
  },
  infoValue: {
    fontSize: 14,
    color: "#757575",
    alignItems: "flex-start",
    fontFamily: "Roboto_500Medium",
  },
  separatorLine: {
    width: 328,
    height: 0.8,
    backgroundColor: "#e0e0e0",
    marginTop: 16,
    marginBottom: 16,
  },
  containerButtom: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  Buttom: {
    justifyContent: "center",
    alignItems: "center",
    width: 148,
    height: 40,
    borderWidth: 2,
    borderColor: "#88c9bf",
    backgroundColor: "#88c9bf",
    marginBottom: 28,
    marginTop: 28,
    borderRadius: 4,
  },
  textButtom: {
    fontSize: 12,
    fontFamily: "Roboto_500Medium",
    color: "#757575",
  },
  Temperamento: {
    marginTop: 20,
    marginRight: 240,
    marginLeft: 24,
  },
  textoTemperamento: {
    fontSize: 12,
    fontFamily: "Roboto_400Regular",
    color: "#f7a800",
  },
  checkboxRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  checkboxRow2: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
    marginLeft: 40,
  },
});
