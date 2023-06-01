import{createDrawerNavigator} from '@react-navigation/drawer';
import Principal from '../Telas/Principal';
import Login from '../Telas/Login';
import CadastrarPet from '../Telas/CadastroPet';
import CadastrarPessoa from '../Telas/CadastroPessoal_Ops';
import RegistrarUsuario from '../Telas/CadastroPessoal_Registro';
import 'react-native-gesture-handler';


const Drawer = createDrawerNavigator();


export default function Rotas(){
  
 return(
  <Drawer.Navigator initialRouteName="Desenvolvimento de Aplicativos" >
    <Drawer.Screen name="Desenvolvimento de Aplicativos" component={Principal} 
    options={{headerShown:false}}/>
    <Drawer.Screen  name="Login" component={Login}/>
    <Drawer.Screen  name="Cadastrar Pet" component={CadastrarPet}/>
    <Drawer.Screen  name="Cadastrar Pessoa" component={CadastrarPessoa}/>
     <Drawer.Screen  name="Registrar Usuario" component={RegistrarUsuario}/>
  </Drawer.Navigator> 
 )
}