import{createNativeStackNavigator} from '@react-navigation/native-stack';
import Principal from '../Telas/Principal';
import Login from '../Telas/Login';

const Stack = createNativeStackNavigator();


export default function Rotas(){

   
 return(
 <Stack.Navigator>
    <Stack.Screen  
     name="Desenvolvimento de Aplicativos"
     component={Principal}
    />
    <Stack.Screen  
     name="Login"
     component={Login}
    />
 </Stack.Navigator>

 )

}