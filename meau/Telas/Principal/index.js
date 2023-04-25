import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View,  SafeAreaView, Image, TouchableOpacity } from 'react-native';
import{ImageBackground} from 'react-native';
import { useNavigation } from '@react-navigation/native';


export default function Principal() {
  const navigation = useNavigation();
  
  return (
    <SafeAreaView style={styles.container}>
      <ImageBackground source={'./assets/Malha.png'} 
       resizeMode="cover" 
       style={{width:'100%'}}>
        </ImageBackground>
      


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
       <Text style={styles.textoADOTAR}>AJUDAR </Text>
      </TouchableOpacity>
           
      
      
      <TouchableOpacity 
      style={styles.AJUDAR}> 
       <Text style={styles.textoAJUDAR}>AJUDAR </Text>
      </TouchableOpacity>

      
      <TouchableOpacity 
      style={styles.CADASTRO} onPress ={()=>navigation.navigate('Cdastrar Pet')}> 
       <Text style={styles.textoCADASTRO}> CADASTRAR ANIMAL </Text>
      </TouchableOpacity>

      
      <TouchableOpacity 
      style={styles.lOGIN} 
      onPress ={()=>navigation.navigate('Login')}> 
       <Text style={styles.textoLogin}> login </Text>
      </TouchableOpacity>
      
      
      
      <View style={styles.IMAGE}>
      <Image 
           
         source = {('./assets/marca.png')}
         style = {{width:'100%'}}
         resizeMode="contain"
         color= '#88c9bf'/>
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
  Ola: {
    marginTop:56,
    justifyContent: 'center',
    alignItems: 'center',
  },
  TextoOla: {
    fontFamily: 'Courgette Regular',
    fontSize: 72,
    color: '#ffd358',
  },

  Bemvindo: {
    marginTop: '52',
    width: '48',
  },

  textoBemvindo: {
    fontFamily: 'Roboto Regular ',
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
    fontFamily: 'Roboto Regular',
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
    fontFamily: 'Roboto Regular',
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
    fontFamily: 'Roboto Regular',
    fontSize: 12,
    color: '#434343',
    
  },

  lOGIN: {
    marginTop: 44,
    justifyContent: 'center',
    alignItems: 'center'
  },
  textoLogin: {
    fontFamily: 'Roboto Regular',
    fontSize: 16,
    color: '#88c9bf',
  },

  IMAGE: {
  marginTop: 28,
  marginBottom: 1,
  width: 122,
  height: 44,
  alignItems: 'center'
   },
  

});
