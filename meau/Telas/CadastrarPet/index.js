import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput, SafeAreaView, TouchableOpacity } from 'react-native';
import { AntDesign } from '@expo/vector-icons';

export default function CadastrarPet() {
  const [selectedOption, setSelectedOption] = useState(null);

  const handleOptionSelect = (option) => {
    setSelectedOption(option);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.retangulo1} />
      <View style={styles.retanguloCadastroAnimal}>
        <AntDesign name="arrowleft" size={24} style={styles.iconArrow} />
        <Text style={styles.textoCadastroAnimal}>Cadastro do Animal</Text>
      </View>

      <View style={styles.Mensagem}>
        <Text style={styles.textoMensagem}>Tenho interesse em cadastrar o animal para:</Text>
      </View>

      <View style={styles.botoesContainer}>
        <TouchableOpacity style={styles.BotaoADOCAO}>
          <Text style={styles.textoBotaoADOCAO}>ADOÇÃO</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.BotaoAJUDA}>
          <Text style={styles.textoBotaoAJUDA}>AJUDA</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.MensagemADOCAO}>
        <Text style={styles.textoMensagemADOCAO}>Adoção</Text>
      </View>

      <View style={styles.NomeAnimal}>
        <Text style={styles.textoNomeAnimal}>NOME ANIMAL</Text>
      </View>

      <View style={styles.inputNomeAnimal}>
        <TextInput
          style={styles.textoinputNomeAnimal}
          placeholder="Nome do animal"
          placeholderTextColor="#bdbdbd"
        />
        </View>

        <View style={styles.divisoria} />

      <View style={styles.FotosAnimal}>
        <Text style={styles.textoFotosAnimal}>FOTOS DO ANIMAL</Text>
      </View>

      <View style={styles.Especie}>
        <Text style={styles.textoEspecie}>ESPÉCIE</Text>
      </View>

      <View style={styles.configContainer}>
        <TouchableOpacity
          style={[styles.optionButton, selectedOption === 'opcao1' && styles.selectedOption]}
          onPress={() => handleOptionSelect('opcao1')}
        >
          {selectedOption === 'opcao1' && <AntDesign name="checkcircle" size={24} style={styles.iconSelected} />}
          <Text style={styles.optionText}>Cachorro</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.optionButton, selectedOption === 'opcao2' && styles.selectedOption]}
          onPress={() => handleOptionSelect('opcao2')}
        >
          {selectedOption === 'opcao2' && <AntDesign name="checkcircle" size={24} style={styles.iconSelected} />}
          <Text style={styles.optionText}>Gato</Text>
        </TouchableOpacity>
      </View>



      <View style={styles.Sexo}>
        <Text style={styles.textoSexo}>SEXO</Text>
      </View>
      

      <View style={styles.Porte}>
        <Text style={styles.textoPorte}>PORTE</Text>
      </View>

      <View style={styles.Especie}>
        <Text style={styles.textoIdade}>IDADE</Text>
      </View>

      <View style={styles.Temperamento}>
        <Text style={styles.textoTemperamento}>TEMPERAMENTO</Text>
      </View>

      <View style={styles.Saude}>
        <Text style={styles.textoSaude}>SAÚDE</Text>
      </View>

      <View style={styles.Exigencias}>
        <Text style={styles.textoExigencias}>EXIGÊNCIAS PARA ADOÇÃO</Text>
      </View>

      <View style={styles.Sobre}>
        <Text style={styles.textoSobre}>SOBRE O ANIMAL</Text>
      </View>
      





      <StatusBar style="auto" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fafafa',
    alignItems: 'center',
    justifyContent: 'center',
  },
  retangulo1: {
    width: 360,
    height: 24,
    backgroundColor: '#f7a800',
  },
  retanguloCadastroAnimal: {
    width: 360,
    height: 56,
    backgroundColor: '#ffd358',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  textoCadastroAnimal: {
    fontFamily: 'Roboto_500Medium',
    fontSize: 20,
    color: '#434343',
    position: 'absolute',
    left: 36,
    top: 18,
    marginLeft: 37,
  },
  iconArrow: {
    position: 'absolute',
    color: '#434343',
    left: 16,
    top: 18,
  },
  Mensagem: {
    marginBottom: 16,
    marginTop: 16,
  },
  textoMensagem: {
    fontSize: 14,
    color: '#757575',
    fontFamily: 'Roboto_400Regular',
  },
  botoesContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 24,
  },
  BotaoADOCAO: {
    width: 100,
    height: 40,
    borderWidth: 2,
    borderColor: '#ffd358',
    backgroundColor: '#ffd358',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 50,

  },
  textoBotaoADOCAO: {
    color: '#434343',
    fontSize: 12,
    fontFamily: 'Roboto_400Regular',
  },
  BotaoAJUDA: {
    width: 100,
    height: 40,
    borderWidth: 2,
    borderColor: '#f1f2f2',
    backgroundColor: '#f1f2f2',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 50,
  },
  textoBotaoAJUDA: {
    color: '#434343',
    fontSize: 12,
    fontFamily: 'Roboto_400Regular',
  },
  MensagemADOCAO: {
    marginTop: 24,
    marginRight: 270,
    marginLeft: 24,
  },
  textoMensagemADOCAO: {
    fontSize: 16,
    fontFamily: 'Roboto_500Medium',
    color: '#434343',
  },
  NomeAnimal: {
    marginTop: 20,
    marginRight: 240,
    marginLeft: 24,
  },
  textoNomeAnimal: {
    fontSize: 12,
    fontFamily: 'Roboto_400Regular',
    color: '#f7a800',
  },
  inputNomeAnimal: {
    width: 312,
    marginTop: 8,
    marginLeft: 24,
    marginTop: 20,
    paddingHorizontal: 8,
    borderWidth: 1,
    borderColor: '#fafafa',
    fontFamily: 'Roboto_400Regular',
  },
  divisoria: {
    marginTop: 8,
    width: 312,
    height: 0.8,
    backgroundColor: '#e6e7e8',
  },
  FotosAnimal: {
    marginTop: 20,
    marginRight: 240,
    marginLeft: 24,
  },
  textoFotosAnimal: {
    fontSize: 12,
    fontFamily: 'Roboto_400Regular',
    color: '#f7a800',
  },
  configContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  optionButton: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#757575',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 100,
    flexDirection: 'row',
  },
  optionText: {
    fontFamily: 'Roboto_400Regular',
    color: '#757575',
    fontSize: 14,
    marginLeft: 100,
  },
  selectedOption: {
    backgroundColor: '#757575',
  },
  iconSelected: {
    color: '#fff',
  },
  Especie: {
    marginTop: 20,
    marginRight: 240,
    marginLeft: 24,
  },
  textoEspecie: {
    fontSize: 12,
    fontFamily: 'Roboto_400Regular',
    color: '#f7a800',
  },
  Sexo: {
    marginTop: 20,
    marginRight: 240,
    marginLeft: 24,
  },
  textoSexo: {
    fontSize: 12,
    fontFamily: 'Roboto_400Regular',
    color: '#f7a800',
  },
  Porte: {
    marginTop: 20,
    marginRight: 240,
    marginLeft: 24,
  },
  textoPorte: {
    fontSize: 12,
    fontFamily: 'Roboto_400Regular',
    color: '#f7a800',
  },
  Idade: {
    marginTop: 20,
    marginRight: 240,
    marginLeft: 24,
  },
  textoIdade: {
    fontSize: 12,
    fontFamily: 'Roboto_400Regular',
    color: '#f7a800',
  },
  Temperamento: {
    marginTop: 20,
    marginRight: 240,
    marginLeft: 24,
  },
  textoTemperamento: {
    fontSize: 12,
    fontFamily: 'Roboto_400Regular',
    color: '#f7a800',
  },
  Saude: {
    marginTop: 20,
    marginRight: 240,
    marginLeft: 24,
  },
  textoSaude: {
    fontSize: 12,
    fontFamily: 'Roboto_400Regular',
    color: '#f7a800',
  },
  Exigencias: {
    marginTop: 20,
    marginRight: 240,
    marginLeft: 24,
  },
  textoExigencias: {
    fontSize: 12,
    fontFamily: 'Roboto_400Regular',
    color: '#f7a800',
  },
  Sobre: {
    marginTop: 20,
    marginRight: 240,
    marginLeft: 24,
  },
  textoSobre: {
    fontSize: 12,
    fontFamily: 'Roboto_400Regular',
    color: '#f7a800',
  },

});
