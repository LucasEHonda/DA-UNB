import React, { useState } from 'react'
import * as ImagePicker from "expo-image-picker";
import { Alert } from "react-native";
import {
  Container,
  SimpleText,
  WelcomeSign,
  InputArea,
  CustomButton,
  CustomButtonText,
  SignMessageButton,
  SignMessageButtonText,
  SignMessageButtonTextBold,
  SimpleTextImg,
  ContentImg,
  Avatar,
  ScrollViewSignUp
} from './styles'

import SignInput from '../../components/SignInput'
import { useNavigation } from '@react-navigation/native'

// import { auth } from '../../../firebase'


export default function Registro1(){

  const navigation = useNavigation();

  const [email, setEmailField] = useState('');
  const [password, setPasswordField] = useState('');
  const [name, setName] = useState('');
  const [profilePicture, setProfilePicture] = useState('https://sdama.org/wp-content/themes/sama/img/fallback-profile.jpg');

  const handleSignUpClick = () => {
    auth
      .createUserWithEmailAndPassword(email, password)
      .then(userCredentials => {
        const user = userCredentials.user;
        user.updateProfile({
          displayName: name,
          photoURL: profilePicture
        })


        console.log("Resgistrado com email: ", user.email);
        navigation.navigate("SignUp_2")
      })
      .catch(error => alert(error.message))
  }
  // console.log(">>>>>>>>>>>>>> a", a);
  const handleBackClick = () => {
    navigation.reset({
      routes: [{ name: 'SignIn' }]
    });
  }

  const handleImageUser = () => {
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
      selectionLimit: 1, // Se deixar 1, será permitido apenas uma foto e 0 várias
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
    };

    let result = await ImagePicker.launchImageLibraryAsync(options);

    setProfilePicture(result.uri)

  };

  const pickImageFromCamera = async () => {
    console.log("-----> Clicou na Camera");

    const options = {
      noData: true,
    };

    let result = await ImagePicker.launchCameraAsync(options);

    setProfilePicture(result.uri)

  };

  return (
    <Container>

      <ScrollViewSignUp
        contentContainerStyle={{ flexGrow: 1 }}
      >

        <InputArea>

          <WelcomeSign>Faça seu cadastro!</WelcomeSign>

          <SimpleText>Etapa 1 de 2</SimpleText>

          <ContentImg onPress={() => handleImageUser()}>
            <Avatar source={{ uri: profilePicture }} />
          </ContentImg>

          <SimpleTextImg>Selecione um foto de perfil</SimpleTextImg>

          <SignInput
            placeholder="Nome"
            value={name}
            onChangeText={t => setName(t)}

          />

          <SignInput
            placeholder="Email"
            value={email}
            onChangeText={t => setEmailField(t)}
            keyboardType={'email-address'}
          />

          <SignInput
            placeholder="Senha"
            value={password}
            onChangeText={t => setPasswordField(t)}
            password={true}
          />

          <CustomButton onPress={handleSignUpClick}>
            <CustomButtonText>Continuar</CustomButtonText>
          </CustomButton>

          <SignMessageButton onPress={handleBackClick}>
            <SignMessageButtonText>Já possui uma conta?</SignMessageButtonText>
            <SignMessageButtonTextBold>Faça Login</SignMessageButtonTextBold>
          </SignMessageButton>

        </InputArea>

      </ScrollViewSignUp>

    </Container>
  );
}