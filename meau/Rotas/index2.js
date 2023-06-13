import{createNativeStackNavigator} from '@react-navigation/native-stack';
import Principal from '../Telas/Principal';
import Login from '../Telas/Login';
import CadastrarPet from '../Telas/CadastroPet';
import CadastrarPessoa from '../Telas/CadastroPessoal_Ops';
import RegistrarUsuario from '../Telas/CadastroPessoal_Registro';
import DadosPet from '../Telas/DadosPet';




const Stack = createNativeStackNavigator();


export default function Rotas(){
  
 return(
 <Stack.Navigator>
    <Stack.Screen name="Desenvolvimento de Aplicativos" component={Principal}/>
    <Stack.Screen  name="Login" component={Login}/>
    <Stack.Screen  name="Cadastrar Pet" component={CadastrarPet}/>
    <Stack.Screen  name="Cadastrar Pessoa" component={CadastrarPessoa}/>
    <Stack.Screen  name="Registrar Usuario" component={RegistrarUsuario}/>
    <Stack.Screen  name="Dados Pets" component={DadosPet}/>

      




 </Stack.Navigator>
 )
}