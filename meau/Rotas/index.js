import{createNativeStackNavigator} from '@react-navigation/native-stack';
import Principal from '../Telas/Principal';
import Login from '../Telas/Login';
import CadastrarPet from '../Telas/CadastrarPet';
import Registro1 from '../Telas/SignUp/index_1'
import Registro2 from '../Telas/SignUp/index_2'

const Stack = createNativeStackNavigator();


export default function Rotas(){
  
 return(
 <Stack.Navigator>
    <Stack.Screen name="Desenvolvimento de Aplicativos" component={Principal}/>
    <Stack.Screen  name="Login" component={Login}/>
    <Stack.Screen  name="Cadastrar Pet" component={CadastrarPet}/>
    <Stack.Screen  name="SignUp_1" component={Registro1}/>
    <Stack.Screen  name="SignUp_2" component={Registro2}/>
 </Stack.Navigator>
 )
}