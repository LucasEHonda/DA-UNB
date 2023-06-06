import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View,  SafeAreaView, TouchableOpacity, Image} from 'react-native' 
import { useNavigation } from '@react-navigation/native';
import { Octicons } from '@expo/vector-icons';
import LogoSrc from "./images/Meau_marca_2.png";



export default function Principal() {
  const navigation = useNavigation();
  
  return (
    <SafeAreaView style={styles.container}>

      <TouchableOpacity onPress={() => { }}>
        <View style={styles.Menu}>
          <Octicons name="three-bars" size={24} color="#88c9bf" />
        </View>
      </TouchableOpacity>

      <View style={styles.Ola}>
      <Text style={styles.TextoOla}>Olá!</Text>
      </View>

      <View style={styles.Bemvindo}>
      <Text style={styles.textoBemvindo}>Bem vindo ao Meau!
      </Text>

      <Text style={styles.textoBemvindo}>Aqui você pode adotar, doar e ajudar 
      </Text>

      <Text style={styles.textoBemvindo}>cães, gatos com facilidade.
      </Text>

      <Text style={styles.textoBemvindo}> Qual o seu interesse? 
      </Text>
      
      </View>

      <TouchableOpacity 
      style={styles.ADOTAR}> 
       <Text style={styles.textoADOTAR}>ADOTAR </Text>
      </TouchableOpacity>
           
      
      <TouchableOpacity 
      style={styles.AJUDAR} >
       <Text style={styles.textoAJUDAR}>AJUDAR </Text>
      </TouchableOpacity>

      
      <TouchableOpacity 
      style={styles.CADASTRO} 
      onPress ={()=>navigation.navigate('Cadastrar Pet')}> 
       <Text style={styles.textoCADASTRO}> CADASTRAR ANIMAL </Text>
      </TouchableOpacity>

      
      <TouchableOpacity 
      style={styles.LOGIN} 
      onPress ={()=>navigation.navigate('Cadastro Login')}> 
       <Text style={styles.textoLogin}> login </Text>
      </TouchableOpacity>

      <View>
        <Image source={LogoSrc} style={styles.logoImage} />
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
  Menu: {
    marginTop: 12,
    marginRight: 300,

  },

  Ola: {
    marginTop: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  TextoOla: {
    fontFamily: 'Courgette_400Regular',
    fontSize: 72,
    color: '#ffd358',
  },

  Bemvindo: {
    marginTop: 52,
    width: '48',
  },

  textoBemvindo: {
    fontFamily: 'Roboto_400Regular',
    fontSize: 16,
    color: '#757575',
    textAlign: 'center',
    justifyContent: 'center',
    alignSelf:'center',
    
  },

    ADOTAR: {
    marginTop: 48,
    justifyContent: 'center',
    alignItems: 'center',
    width: 232,
    height: 40,
    borderWidth: 2,
    borderColor:'#ffd358',
    backgroundColor: '#ffd358',

  },

  textoADOTAR: {
    fontFamily: 'Roboto_400Regular',
    fontSize: 12,
    color: '#434343',
    
  },

  AJUDAR: {
    marginTop: 12,
    justifyContent: 'center',
    alignItems: 'center',
    width: 232,
    height: 40,
    backgroundColor: '#ffd358',
    borderWidth: 2,
    borderColor:'#ffd358',
  },

  textoAJUDAR: {
    fontFamily: 'Roboto_400Regular',
    fontSize: 12,
    color: '#434343',
    
  },

  CADASTRO: {
    marginTop: 12,
    justifyContent: 'center',
    alignItems: 'center',
    width: 232,
    height: 40,
    backgroundColor: '#ffd358',
    borderWidth: 2,
    borderColor:'#ffd358',
  },
  
  textoCADASTRO: {
    fontFamily: 'Roboto_400Regular',
    fontSize: 12,
    color: '#434343',
    
  },

  LOGIN: {
    marginTop: 44,
    justifyContent: 'center',
    alignItems: 'center'
  },
  textoLogin: {
    fontFamily: 'Roboto_400Regular',
    fontSize: 16,
    color: '#88c9bf',
  },

  logoImage: {
    marginTop: 68,
    marginBottom: 32,
    width: 122,
    height: 44,
  },


});