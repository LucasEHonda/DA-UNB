import { createDrawerNavigator } from "@react-navigation/drawer";
import Principal from "../Telas/Principal";
import Login, { Status12 } from "../Telas/Login";
import CadastrarPet from "../Telas/CadastroPet";
import CadastrarPessoa from "../Telas/CadastroPessoal_Ops";
import RegistrarUsuario from "../Telas/CadastroPessoal_Registro";
import "react-native-gesture-handler";
import MeusPets1 from "../Telas/MeusPets";
import DadosPet from "../Telas/DadosPet";
import PetsAdotar from "../Telas/AdotarPets";
import DadosPetsAdotar from "../Telas/DadosPetsAdotar";

const Drawer = createDrawerNavigator();

function createDrawerNavigator1() {
  if (Status12() == false) {
    return (
      <Drawer.Navigator initialRouteName="Desenvolvimento de Aplicativos">
        <Drawer.Screen
          name="Desenvolvimento de Aplicativos"
          component={Principal}
        />
        <Drawer.Screen name="Cadastro Login" component={CadastrarPessoa} />
        <Drawer.Screen name="Login" component={Login} />
        <Drawer.Screen name="Registrar Usuario" component={RegistrarUsuario} />
      </Drawer.Navigator>
    );
  } else {
    return (
      <Drawer.Navigator initialRouteName="Desenvolvimento de Aplicativos">
        <Drawer.Screen
          name="Desenvolvimento de Aplicativos"
          component={Principal}
        />
        <Drawer.Screen name="Cadastro Login" component={CadastrarPessoa} />
        <Drawer.Screen name="Login" component={Login} />
      </Drawer.Navigator>
    );
  }
}

export default function Rotas() {
  if (Status12() == true) {
    return (
      <Drawer.Navigator>
        <Drawer.Screen
          options={{ headerShown: false }}
          name="Tela Principal"
          component={createDrawerNavigator1}
        />
        <Drawer.Screen name="Cadastrar Pet" component={CadastrarPet} />
        <Drawer.Screen name="Meus Pets" component={MeusPets1} />
        <Drawer.Screen name="Dados Pets" component={DadosPet} />
        <Drawer.Screen name="Pets Adotar" component={PetsAdotar} />
        <Drawer.Screen name="Dados Pets Adotar" component={DadosPetsAdotar} />
      </Drawer.Navigator>
    );
  } else {
    return (
      <Drawer.Navigator>
        <Drawer.Screen
          options={{ headerShown: false }}
          name="Tela Principal"
          component={createDrawerNavigator1}
        />
      </Drawer.Navigator>
    );
  }
}
