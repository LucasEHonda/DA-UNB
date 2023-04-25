import React, { useState } from 'react'
import {
  Container,
  SimpleText,
  InputArea,
  CustomButton,
  CustomButtonText,
  ScrollViewSignUp,
  TitleText,

} from './styles'

import SignInput from '../../components/SignInput'
import { useNavigation } from '@react-navigation/native'
// import { auth, db, storage } from "../../../firebase";
export default function Registro2(){

  const navigation = useNavigation();

  const [fone, setFoneField] = useState('');
  const [city, setCityField] = useState('');
  const [adress, setAdressField] = useState('');
  const [birth, setBirthField] = useState('');

  const user = auth.currentUser;

  const handleUpdateClick = () => {
    auth
    const colect = db.collection("UserData")
    const myDoc = colect.doc(auth.currentUser?.uid)
    handleUpload(auth.currentUser?.photoURL)

    const data = {
      "id": auth.currentUser?.uid,
      "email": auth.currentUser?.email,
      "nome": auth.currentUser?.displayName,
      "fotoUsuario": auth.currentUser?.photoURL,
      "telefone": fone,
      "cidade": city,
      "endereco": adress,
      "dataNascimento": birth,
    }

    myDoc.set(data)
      .then(() => {
        alert("Sua conta foi criada!")
        navigation.reset({
          routes: [{ name: 'RoutesTab' }]
        });
      }).catch(error => alert(error.message))
  }

  async function handleUpload(file) {
    console.log("-----> Eu sou o file", file);
    const blob = await (await fetch("file://" + file)).blob();
    const uploadTask = storage
      .ref("profilePicture/" + auth.currentUser?.uid + "/")
      .put(blob, { contentType: file.type });

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        console.log("Upload Image");
        let progress = snapshot.bytesTransferred / snapshot.totalBytes
        if (progress === 1) {
          console.log(progress);
          setTimeout(function () {
            getUrlImage(auth.currentUser?.uid);
          }, 2000);
        }
      },
      (error) => {
        console.log(error);
      }
    );
  }

  const getUrlImage = (idUser) => {
    const colect = db.collection("UserData");
    const myDoc = colect.doc(idUser);
    let imageRef = storage.ref("profilePicture/" + idUser + "/");
    console.log(">>>>>>>>>>>> GET URL");
    imageRef
      .getDownloadURL()
      .then((url) => {
        user.updateProfile({
          photoURL: url
        }).then(() => {
          console.log(">>>>>>>>> URL", url);
        }).catch((error) => {
          console.log(">>>>>>>>> ERRO", error);
        });
        myDoc
          .update({ fotoUsuario: url })
          .then(() => {
            console.log("Imagem atualizada");
          })
          .catch((error) => alert(error.message));
      })
      .catch((e) => console.log("getting downloadURL of image error => ", e));

    console.log(idUser);
  };

  return (
    <Container>

      <ScrollViewSignUp
        contentContainerStyle={{ flexGrow: 1 }}
      >

        <InputArea>

          <TitleText>Etapa 2 de 2</TitleText>

          <SignInput
            placeholder="Telefone"
            value={fone}
            onChangeText={t => setFoneField(t)}
            keyboardType={'phone-pad'}
          />

          <SignInput
            placeholder="Cidade"
            value={city}
            onChangeText={t => setCityField(t)}
          />

          <SignInput
            placeholder="Endereço"
            value={adress}
            onChangeText={t => setAdressField(t)}
          />

          <SignInput
            placeholder="Data de nascimento"
            value={birth}
            onChangeText={t => setBirthField(t)}
          />

          <CustomButton onPress={handleUpdateClick}>
            <CustomButtonText>Cadastrar</CustomButtonText>
          </CustomButton>

          <SimpleText>Email: {auth.currentUser?.email}</SimpleText>

        </InputArea>

      </ScrollViewSignUp>

    </Container>
  );
}
