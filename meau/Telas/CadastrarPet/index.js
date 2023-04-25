import React, { useEffect, useState } from "react";
import "react-native-get-random-values";
import { v4 as uuidv4 } from "uuid";
import {
  Container,
  InputArea,
  ViewArea,
  ViewAreaPicker,
  ViewAreaSwitch,
  ScrollViewPet,
  CustomButton,
  CustomButtonText,
  CustomViewPicture,
  SimpleTextBold,
  SwitchText,
  ViewRadioButton,
  ViewAllRadioButton,
  PetPicture,
  RadioButtonText,
  LoadingIcon
} from "./styles";
// import ButtonRequest from "../../components/ButtonRequest";
import PetInput from "../../components/PetInput";
import { useNavigation } from "@react-navigation/native";
import { Alert } from "react-native";
// import { auth, db, storage } from "../../../firebase";
import * as ImagePicker from "expo-image-picker";
import Header from "../../components/Header";
import { Switch, RadioButton, TextInput } from 'react-native-paper';

export default function CadastrarPet (){
  const navigation = useNavigation();

  const [name, setNameField] = useState("Pet");
  const [sex, setSexField] = useState("Macho");
  const [specie, setSpecieField] = useState("Cachorro");
  const [size, setSizeField] = useState("Pequeno");
  const [age, setAgeField] = useState("Filhote");
  const [adoptionStatus, setAdoptionStatus] = useState(false);
  const [avatar, setAvatar] = useState();
  const [fileName, setFileName] = useState("ImagemPet");
  const [descripton, setDescripton] = useState("");
  const [petProfilePicture, setPetProfilePicture] = useState();
  const [loading, setLoading] = useState(false)
  const [screenLoading, setScreenLoading] = useState(true);
  const [isSwitchOn, setIsSwitchOn] = useState()
  const idPet = uuidv4();

  // const handleRegisterClick = () => {
  //   auth;
  //   const colect = db.collection("Pet");
  //   const myDoc = colect.doc(idPet);
  //   const fotoPet = petProfilePicture ? petProfilePicture : "https://static.thenounproject.com/png/703110-200.png"

  //   const data = {
  //     donoId: auth.currentUser?.uid,
  //     nome: name,
  //     sexo: sex,
  //     especie: specie,
  //     porte: size,
  //     idade: age,
  //     fotoPet: fotoPet,
  //     id: idPet,
  //     fileNamePicture: fileName,
  //     statusAdocao: adoptionStatus,
  //     descripton: descripton
  //   };

  //   myDoc
  //     .set(data)
  //     .then(() => {
  //       alert("Lista de Animais atualizada com sucesso!");
  //       navigation.navigate("Meus Pets");
  //     })
  //     .catch((error) => alert(error.message));
  // };

  const handleCancelClick = () => {
    auth;
    navigation.navigate("Inicio");
  };

  const handlePictureResgister = () => {
    Alert.alert(
      "Selecione",
      "Informe de onde você quer pegar a foto",
      [
        {
          text: "Galeria",
          onPress: () => pickImageFromGalery(),
          style: "default",
        },
        {
          text: "Camera",
          onPress: () => pickImageFromCamera(),
          style: "default",
        },
      ],
      {
        cancelable: true,
        onDismiss: () => console.log("----> Ação cancelada"),
      }
    );
  };

  const pickImageFromGalery = async () => {
    console.log("-----> Clicou na Galeria");
    const options = {
      noData: true,
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
    };

    let result = await ImagePicker.launchImageLibraryAsync(options);

    handleUpload(result.uri);
  };

  const pickImageFromCamera = async () => {
    console.log("-----> Clicou na Camera");

    const options = {
      noData: true,
      saveToPhotos: true,
      mediaType: 'photo',
      includeBase64: false,
      allowsEditing: true,
    };

    let result = await ImagePicker.launchCameraAsync(options);

    handleUpload(result.uri);
  };

  async function handleUpload(file) {
    const fileName = uuidv4();
    setFileName(fileName);
    const donoID = auth.currentUser?.uid;
    const blob = await (await fetch("file://" + file)).blob();
    // console.log("----> Eu sou Blob", blob)
    const uploadTask = storage
      .ref("profilePetPicture/" + donoID + "/" + fileName)
      // .ref("profilePetPicture/" + donoID + "/" + fileName)
      .put(blob);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        console.log("Upload Image");
        setLoading(true)
        let progress = snapshot.bytesTransferred / snapshot.totalBytes
        if (progress === 1) {
          console.log(progress);
          setTimeout(function () {
            getUrlImage(donoID, fileName);
          }, 1000);
        }
      },
      (error) => {
        console.log(error);
      }
    );
  }

  const getUrlImage = (donoID, fileName) => {
    let imageRef = storage.ref("profilePetPicture/" + donoID + "/" + fileName)
    imageRef
      .getDownloadURL()
      .then((url) => {
        setAvatar(url)
        setPetProfilePicture(url);
        setLoading(false)
      })
      .catch((e) => console.log("getting downloadURL of image error => ", e));
  };

  useEffect(() => {
    setScreenLoading(false)
  }, []);
  return (
    <Container>
      <Header
        title={"Cadastrar Pet"}
      />

      {screenLoading ? (<LoadingIcon size="large" color="black" />) :
        (<ScrollViewPet>
          <InputArea>

            <PetInput
              placeholder="Nome do pet"
              onChangeText={(t) => setNameField(t)}
            />

            <ViewArea>
              {avatar && (
                <CustomViewPicture>
                  <PetPicture source={{ uri: petProfilePicture }} />
                </CustomViewPicture>
              )}

            </ViewArea>

            {/* <ButtonRequest
              title={"Adicionar foto do pet"}
              onPress={handlePictureResgister}
              isLoading={loading}
            >

            </ButtonRequest> */}

            <ViewAreaPicker>

              <SimpleTextBold>Selecione o sexo do animal</SimpleTextBold>
              <RadioButton.Group
                onValueChange={value => setSexField(value)}
                value={sex}
              >
                <ViewAllRadioButton>
                  <ViewRadioButton>
                    <RadioButton value="Macho" color={"black"} />
                    <RadioButtonText>Macho</RadioButtonText>
                  </ViewRadioButton>

                  <ViewRadioButton>
                    <RadioButton value="Fêmea" color={"black"} />
                    <RadioButtonText>Fêmea</RadioButtonText>
                  </ViewRadioButton>
                </ViewAllRadioButton>
              </RadioButton.Group>

              <SimpleTextBold>Selecione a espécie do animal</SimpleTextBold>
              <RadioButton.Group
                onValueChange={value => setSpecieField(value)}
                value={specie}
              >
                <ViewAllRadioButton>
                  <ViewRadioButton>
                    <RadioButton value="Cachorro" color={"black"} />
                    <RadioButtonText>Cachorro</RadioButtonText>
                  </ViewRadioButton>

                  <ViewRadioButton>
                    <RadioButton value="Gato" color={"black"} />
                    <RadioButtonText>Gato</RadioButtonText>
                  </ViewRadioButton>
                </ViewAllRadioButton>
              </RadioButton.Group>

              <SimpleTextBold>Selecione o porte do animal</SimpleTextBold>
              <RadioButton.Group
                onValueChange={value => setSizeField(value)}
                value={size}
              >
                <ViewAllRadioButton>
                  <ViewRadioButton>
                    <RadioButton value="Pequeno" color={"black"} />
                    <RadioButtonText>Pequeno</RadioButtonText>
                  </ViewRadioButton>

                  <ViewRadioButton>
                    <RadioButton value="Médio" color={"black"} />
                    <RadioButtonText>Médio</RadioButtonText>
                  </ViewRadioButton>

                  <ViewRadioButton>
                    <RadioButton value="Grande" color={"black"} />
                    <RadioButtonText>Grande</RadioButtonText>
                  </ViewRadioButton>
                </ViewAllRadioButton>
              </RadioButton.Group>

              <SimpleTextBold>Selecione a idade do animal</SimpleTextBold>
              <RadioButton.Group
                onValueChange={value => setAgeField(value)}
                value={age}
              >
                <ViewAllRadioButton>
                  <ViewRadioButton>
                    <RadioButton value="Filhote" color={"black"} />
                    <RadioButtonText>Filhote</RadioButtonText>
                  </ViewRadioButton>

                  <ViewRadioButton>
                    <RadioButton value="Adulto" color={"black"} />
                    <RadioButtonText>Adulto</RadioButtonText>
                  </ViewRadioButton>

                  <ViewRadioButton>
                    <RadioButton value="Idoso" color={"black"} />
                    <RadioButtonText>Idoso</RadioButtonText>
                  </ViewRadioButton>
                </ViewAllRadioButton>
              </RadioButton.Group>

              <TextInput
                label='Descrição do pet'
                value={descripton}
                onChangeText={text => setDescripton(text)}
                style={{ marginTop: 10 }}
                multiline={true}
                theme={{ colors: { primary: "black" } }}
                selectionColor={'black'}
              />

              <SimpleTextBold>Animal para adoção?</SimpleTextBold>
              <ViewAreaSwitch>
                <Switch
                  value={isSwitchOn}
                  onValueChange={(itemValue) => (setIsSwitchOn(itemValue), setAdoptionStatus(itemValue))}
                  color={"black"}
                />
                {!!isSwitchOn ? <SwitchText >Disponível</SwitchText> : <SwitchText>Não disponível</SwitchText>}
              </ViewAreaSwitch>

            </ViewAreaPicker>

            {/* <CustomButton onPress={handleRegisterClick}> */}
            <CustomButton onPress={{}}>
              <CustomButtonText>Cadastrar pet</CustomButtonText>
            </CustomButton>

            <CustomButton onPress={handleCancelClick}>
              <CustomButtonText>Cancelar</CustomButtonText>
            </CustomButton>
          </InputArea>
        </ScrollViewPet>)}

    </Container>
  );
};
