import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput, SafeAreaView, TouchableOpacity, Image, ScrollView  } from 'react-native';
import { AntDesign, Feather, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { ref, uploadBytesResumable  } from 'firebase/storage';
import { storage } from '../../service/firebase';
import { db } from '../../service/firebase';
import { addDoc, collection } from 'firebase/firestore';
import { userFromStorage } from '../../utils/userFromStorage';



const Checkbox = ({ label, selected, onPress }) => {
  return (
    <TouchableOpacity onPress={onPress} style={{ flexDirection: 'row', alignItems: 'center', marginRight: 20 }}>
      {selected ? (
        <Ionicons name="ios-checkmark-circle" size={24} color="#757575" />
      ) : (
        <Ionicons name="ios-radio-button-off" size={24} color="#757575" />
      )}
      <Text style={{ marginLeft: 3, fontFamily: 'Roboto_400Regular', fontSize: 14, color: '#757575' }}>
        {label}
      </Text>
    </TouchableOpacity>
  );
};

const Checkbox2 = ({ label, selected, onPress }) => {
  return (
    <TouchableOpacity onPress={onPress} style={[styles.checkboxContainer, selected && styles.checkboxSelected]}>
      {selected ? (
        <Ionicons name="checkbox" size={24} color="#757575" />
      ) : (
        <MaterialCommunityIcons name="checkbox-blank-outline" size={24} color="#757575" />
      )}
      <Text style={styles.checkboxText}>{label}</Text>
    </TouchableOpacity>
  );
};

export default function CadastrarPet() {

  const [especie, setEspecie] = useState('');
  const [sexo, setSexo] = useState('');
  const [idade, setIdade] = useState('');
  const [porte, setPorte] = useState('');
  const [temperamentos, setTemperamentos] = useState([]);
  const [saude, setSaude] = useState([]);
  const [nomeAnimal, setNomeAnimal] = useState('');
  const [descricao, setDescricao] = useState('');
  const [exigenciasAdocao, setExigenciasAdocao] = useState([]);
  const [acompanhamentoPosAdocao, setAcompanhamentoPosAdocao] = useState(false);
  const [opcaoSelecionada, setOpcaoSelecionada] = useState('');
  const [progresso, setProgresso] = useState(0);
  const [file, setFile] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);



  const handleEspecieSelection = (selectedEspecie) => {
    setEspecie(selectedEspecie === especie ? '' : selectedEspecie);
  };
  const handleSexoSelection = (selectedSexo) => {
    setSexo(selectedSexo === sexo ? '' : selectedSexo);
  };
  const handleIdadeSelection = (selectedIdade) => {
    setIdade(selectedIdade === idade ? '' : selectedIdade);
  };
  const handlePorteSelection = (selectedPorte) => {
    setPorte(selectedPorte === porte ? '' : selectedPorte);
  };

  const handleTemperamentoSelection = (selectedTemperamento) => {
    if (temperamentos.includes(selectedTemperamento)) {
      setTemperamentos(temperamentos.filter((temperamento) => temperamento !== selectedTemperamento));
    } else {
      setTemperamentos([...temperamentos, selectedTemperamento]);
    }
  };

  const handleSaudeSelection = (selectedSaude) => {
    if (saude.includes(selectedSaude)) {
      setSaude(saude.filter((opcao) => opcao !== selectedSaude));
    } else {
      setSaude([...saude, selectedSaude]);
    }
  };

  const handleExigenciaAdocaoSelection = (exigencia) => {
    if (exigenciasAdocao.includes(exigencia)) {
      setExigenciasAdocao(exigenciasAdocao.filter((opcao) => opcao !== exigencia));
    } else {
      setExigenciasAdocao([...exigenciasAdocao, exigencia]);
    }
  };

  const handleAcompanhamentoPosAdocaoSelection = () => {
    setAcompanhamentoPosAdocao(!acompanhamentoPosAdocao);
    setOpcaoSelecionada('');
  };

  const handleOpcaoSelecionada = (opcao) => {
    if (acompanhamentoPosAdocao) {
      setOpcaoSelecionada(opcao);
    }
  };

  const handleNomeAnimalChange = (value) => {
    setNomeAnimal(value);
  };
  
  const handleDescricaoChange = (value) => {
    setDescricao(value);
  };

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
  
  const handleUpload = async (petId) => {
    if (!nomeAnimal){
      alert("Preencha o campo 'nome'")
      return
    }
    const user = await userFromStorage();
    const fileNameParts = file.name.split('.');

    const storageRef = ref(storage, `${user.uid}/${nomeAnimal}_${petId}.${fileNameParts[fileNameParts.length - 1]}`);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      'state_changed',
      (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setProgresso(progress);
      },
      (error) => {
        console.log('deu ruim', error);
      },
      async () => {
        console.log('deu bom');
      }
    );
  };

  const petCollectionRef = collection(db, "pets")
  async function createPet(_){
    const user = await userFromStorage()
    const pet = {
      name: nomeAnimal,
      specie: especie,
      gender: sexo,
      age: idade,
      size: porte,
      temperament: temperamentos,
      health: saude,
      needs: exigenciasAdocao,
      owner: user.uid,
      profileDesciption: descricao
    }
    const pet_ = await addDoc(petCollectionRef, pet)
    handleUpload(pet_.id)
  }

  return (
    <ScrollView>
      <SafeAreaView style={styles.container}>
        
        <View style={styles.retangulo1} />
        <View style={styles.retanguloCadastroAnimal}>
          <TouchableOpacity onPress={() => { }}>
              <View style={styles.iconArrow}>
                <AntDesign name="arrowleft" size={24} style={styles.iconArrow} />
              </View>
            </TouchableOpacity>
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
            value={nomeAnimal}
            onChangeText={handleNomeAnimalChange}
          />
          </View>

          <View style={styles.divisoria} />

        <View style={styles.FotosAnimal}>
          <Text style={styles.textoFotosAnimal}>FOTOS DO ANIMAL</Text>
        </View>

        <View style={styles.containerFoto}>
          {selectedImage ? (
            <Image source={{ uri: selectedImage }} style={styles.imagemUpload} resizeMode="contain" />
          ) : (
            <label htmlFor="fileInput">
              <View style={styles.retanguloFoto}>
                <View style={styles.iconCamera}>
                  <Feather name="plus-circle" size={24} color="#757575" />
                </View>
                <Text style={styles.textoRetanguloFoto}>adicionar fotos</Text>
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

        {/* Barra de progresso */}
        <View style={styles.progressBar}>
          <View style={{ flex: 1, width: `${progresso}%`, height: 4, backgroundColor: "#ffd358" }} />
        </View>

        <View style={styles.Especie}>
          <Text style={styles.textoEspecie}>ESPÉCIE</Text>
        </View>


        <View style={styles.checkboxWrapper}>
          <Checkbox label="Cachorro" selected={especie === 'Cachorro'} onPress={() => handleEspecieSelection('Cachorro')} />
          <Checkbox label="Gato" selected={especie === 'Gato'} onPress={() => handleEspecieSelection('Gato')} />
        </View>
        

        <View style={styles.Sexo}>
          <Text style={styles.textoSexo}>SEXO</Text>
        </View>
        
        <View style={styles.checkboxWrapper}>
          <Checkbox label="Macho" selected={sexo === 'Macho'} onPress={() => handleSexoSelection('Macho')} />
          <Checkbox label="Fêmea" selected={sexo === 'Fêmea'} onPress={() => handleSexoSelection('Fêmea')} />
        </View>

        <View style={styles.Porte}>
          <Text style={styles.textoPorte}>PORTE</Text>
        </View>

        <View style={styles.checkboxWrapper}>
          <Checkbox label="Pequeno" selected={porte === 'Pequeno'} onPress={() => handlePorteSelection('Pequeno')} />
          <Checkbox label="Médio" selected={porte === 'Médio'} onPress={() => handlePorteSelection('Médio')} />
          <Checkbox label="Grande" selected={porte === 'Grande'} onPress={() => handlePorteSelection('Grande')} />
        </View>

        <View style={styles.Idade}>
          <Text style={styles.textoIdade}>IDADE</Text>
        </View>

        <View style={styles.checkboxWrapper}>
          <Checkbox label="Filhote" selected={idade === 'Filhote'} onPress={() => handleIdadeSelection('Filhote')} />
          <Checkbox label="Adulto" selected={idade === 'Adulto'} onPress={() => handleIdadeSelection('Adulto')} />
          <Checkbox label="Idoso" selected={idade === 'Idoso'} onPress={() => handleIdadeSelection('Idoso')} />
        </View>

        <View style={styles.Temperamento}>
          <Text style={styles.textoTemperamento}>TEMPERAMENTO</Text>
        </View>

        
        <View style={styles.checkboxRow}>
          <Checkbox2
            label="Brincalhão"
            selected={temperamentos.includes('Brincalhão')}
            onPress={() => handleTemperamentoSelection('Brincalhão')}
          />
          <Checkbox2
            label="Tímido"
            selected={temperamentos.includes('Tímido')}
            onPress={() => handleTemperamentoSelection('Tímido')}
          />
          <Checkbox2
            label="Calmo"
            selected={temperamentos.includes('Calmo')}
            onPress={() => handleTemperamentoSelection('Calmo')}
          />
        </View>

        <View style={styles.checkboxRow}>
          <Checkbox2
            label="Guarda"
            selected={temperamentos.includes('Guarda')}
            onPress={() => handleTemperamentoSelection('Guarda')}
          />
          <Checkbox2
            label="Amoroso"
            selected={temperamentos.includes('Amoroso')}
            onPress={() => handleTemperamentoSelection('Amoroso')}
          />
          <Checkbox2
            label="Preguiçoso"
            selected={temperamentos.includes('Preguiçoso')}
            onPress={() => handleTemperamentoSelection('Preguiçoso')}
          />
        </View>
        

        <View style={styles.Saude}>
          <Text style={styles.textoSaude}>SAÚDE</Text>
        </View>

        
        <View style={styles.checkboxRow}>
          <Checkbox2
            label="Vacinado"
            selected={saude.includes('Vacinado')}
            onPress={() => handleSaudeSelection('Vacinado')}
          />
          <Checkbox2
            label="Vermifugado"
            selected={saude.includes('Vermifugado')}
            onPress={() => handleSaudeSelection('Vermifugado')}
          />
        </View>
        <View style={styles.checkboxRow}>
          <Checkbox2
            label="Castrado"
            selected={saude.includes('Castrado')}
            onPress={() => handleSaudeSelection('Castrado')}
          />
          <Checkbox2
            label="Doente"
            selected={saude.includes('Doente')}
            onPress={() => handleSaudeSelection('Doente')}
          />
        </View>
    
        <View style={styles.inputDoencas}>
          <TextInput
            style={styles.textoinputDoencas}
            placeholder="Doenças do animal"
            placeholderTextColor="#bdbdbd"
          />
          </View>

          <View style={styles.divisoria} />

        <View style={styles.Exigencias}>
          <Text style={styles.textoExigencias}>EXIGÊNCIAS PARA ADOÇÃO</Text>
        </View>

        <View style={styles.checkboxRow}>
        <Checkbox2
          label="Termo de adoção"
          selected={exigenciasAdocao.includes('Termo de adoção')}
          onPress={() => handleExigenciaAdocaoSelection('Termo de adoção')}
        />
        <Checkbox2
          label="Fotos da casa"
          selected={exigenciasAdocao.includes('Fotos da casa')}
          onPress={() => handleExigenciaAdocaoSelection('Fotos da casa')}
        />
      </View>

      <View style={styles.checkboxRow}>
        <Checkbox2
          label="Visita prévia ao animal"
          selected={exigenciasAdocao.includes('Visita prévia ao animal')}
          onPress={() => handleExigenciaAdocaoSelection('Visita prévia ao animal')}
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
          selected={opcaoSelecionada === '1 mês'}
          onPress={() => handleOpcaoSelecionada('1 mês')}
          disabled={!acompanhamentoPosAdocao}
        />
        <Checkbox2
          label="3 meses"
          selected={opcaoSelecionada === '3 meses'}
          onPress={() => handleOpcaoSelecionada('3 meses')}
          disabled={!acompanhamentoPosAdocao}
        />
        <Checkbox2
          label="6 meses"
          selected={opcaoSelecionada === '6 meses'}
          onPress={() => handleOpcaoSelecionada('6 meses')}
          disabled={!acompanhamentoPosAdocao}
        />
      </View>
    



























        <View style={styles.Sobre}>
          <Text style={styles.textoSobre}>SOBRE O ANIMAL</Text>
        </View>
        
        <View style={styles.inputSobre}>
          <TextInput
            style={styles.textoInputSobre}
            placeholder="Compartilhe a história do animal"
            placeholderTextColor="#bdbdbd"
            value={descricao}
            onChangeText={handleDescricaoChange}

          />
          </View>
          <View style={styles.divisoria} />

          <TouchableOpacity onPress={(form) => {
    createPet(form);
  }}  style={styles.BotaoFINALIZAR}>
            <Text style={styles.textoBotaoFINALIZAR}>COLOCAR PARA ADOÇÃO</Text>
          </TouchableOpacity>

        <StatusBar style="auto" />
      </SafeAreaView>
    </ScrollView>
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
    marginLeft: 12,
    color: '#434343',
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
    fontSize: 14,
    width: 312,
    marginTop: 8,
    marginLeft: 24,
    marginRight: 24,
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
    marginLeft: 24,
    marginRight: 240,
  },
  textoFotosAnimal: {
    fontSize: 12,
    fontFamily: 'Roboto_400Regular',
    color: '#f7a800',
  },
  containerFoto: {
    marginTop: 16,
    alignItems: 'center',
  },
  retanguloFoto: {
    width: 312,
    height: 128,
    backgroundColor: '#f1f2f2',
    justifyContent: 'center',
    alignItems: 'center',
  },
  textoRetanguloFoto: {
    marginBottom: 48,
    fontSize: 14,
    color: '#757575',
    fontFamily: 'Roboto_400Regular',
  },
  iconCamera: {
    marginTop: 44,
  
  },
  
  Especie: {
    marginTop: 20,
    marginRight: 260,
    marginLeft: 24,
  },
  textoEspecie: {
    fontSize: 12,
    fontFamily: 'Roboto_400Regular',
    color: '#f7a800',
  },
  checkboxWrapper: {
    flex: 1,
    marginTop: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    marginBottom: 5,
    
  },

  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 15,
    marginTop: -2,
  },

  checkboxText: {
    marginLeft: 3,
    fontFamily: 'Roboto_400Regular',
    fontSize: 14,
    color: '#757575',
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
  checkboxRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  checkboxRow2: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    marginLeft: 40,
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

  inputDoencas: {
    fontSize: 14,
    width: 312,
    marginTop: 8,
    marginLeft: 24,
    marginRight: 24,
    marginTop: 20,
    paddingHorizontal: 8,
    borderWidth: 1,
    borderColor: '#fafafa',
    fontFamily: 'Roboto_400Regular',
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
  inputSobre: {
    fontSize: 14,
    width: 312,
    marginTop: 8,
    marginLeft: 24,
    marginRight: 24,
    marginTop: 20,
    paddingHorizontal: 8,
    borderWidth: 1,
    borderColor: '#fafafa',
    fontFamily: 'Roboto_400Regular',
  },
  textoInputSobre: {
    fontSize: 14,
    fontFamily: 'Roboto_400Regular',
    color: '#bdbdbd',

  },
  BotaoFINALIZAR: {
    width: 232,
    height: 40,
    borderWidth: 2,
    borderColor: '#ffd358',
    backgroundColor: '#ffd358',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 24,
    marginBottom: 24,
  },
  textoBotaoFINALIZAR: {
    fontFamily: 'Roboto_400Regular',
    fontSize: 12,
    color: '#434343',
  },
  progressBar: {
    width: "100%",
    height: 4,
    backgroundColor: "#f1f2f2",
    marginTop: 8,
  },
  imagemUpload: {
    width: 200,
    height: 200,
    marginBottom: 16,
  },

});