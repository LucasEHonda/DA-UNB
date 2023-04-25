import React, { useState } from 'react'
import { Alert } from 'react-native'
import * as ImagePicker from 'expo-image-picker';
import { auth, storage } from '../../firebase'
import styled from 'styled-components/native';
/* VIEW */
const Container = styled.SafeAreaView`
    background-color: #58BD97;
    flex: 1;
    justify-content: center;
    align-items: center;
`;

const ContentImg = styled.TouchableOpacity`
    height: 120px; 
    width: 120px; 
    border-radius: 100px;  
    margin-bottom: 20px;
`;

/* IMAGE */

const Avatar = styled.Image`
    width: 120px;
    height: 120px;
    border-radius: 100px;
    
`;

export default () => {

  const idUser = auth.currentUser.uid;

  const [avatar, setAvatar] = useState();



  const handleImageUser = () => {
    Alert.alert(
      "Selecione",
      "Informe de onde você quer pegar a foto",
      [
        {
          text: "Galeria",
          onPress: () => pickImageFromGalery(),
          style: "default"
        },
        {
          text: "Camera",
          onPress: () => pickImageFromCamera(),
          style: "default"
        }
      ],
      {
        cancelable: true,
        onDismiss: () => console.log('----> Ação cancelada')
      }
    )
  }

  const pickImageFromGalery = async () => {
    console.log("-----> Clicou na Galeria")
    const options = {
      noData: true,
      selectionLimit: 1, // Se deixar 1, será permitido apenas uma foto e 0 várias
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
    }

    let result = await ImagePicker.launchImageLibraryAsync(options)

    setAvatar({ uri: result.uri })
    
    handleUpload(result.uri)
  }


  const pickImageFromCamera = async () => {
    console.log("-----> Clicou na Camera")

    const options = {
      noData: true,
    }

    let result = await ImagePicker.launchCameraAsync(options)
    setAvatar({ uri: result.uri })
    
    handleUpload(result.uri)

  }

  async function handleUpload(file) {
    console.log("-----> Eu sou o file", file)
    const blob = await (await fetch('file://' + file)).blob()
    // console.log("----> Eu sou Blob", blob)
    const uploadTask = storage.ref(idUser + '/').put(blob, {contentType: file.type})

    uploadTask.on('state_changed', (snapshot) => {
      console.log("Upload Image")
    }, (error) => {
      console.log(error)
    })
  }

  return (
    <Container>
          <ContentImg onPress={() => handleImageUser()}>
            <Avatar
              source={{ uri: avatar ? avatar.uri : "https://sdama.org/wp-content/themes/sama/img/fallback-profile.jpg" }}
            />
          </ContentImg>
    </Container>
  );
}