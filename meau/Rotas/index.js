import { createDrawerNavigator } from "@react-navigation/drawer";
import "react-native-gesture-handler";
import Principal from "../Telas/Principal";
import Login, { StatusUser } from "../Telas/Login";
import CadastrarPet from "../Telas/CadastroPet";
import CadastrarPessoa from "../Telas/CadastroPessoal_Ops";
import RegistrarUsuario from "../Telas/CadastroPessoal_Registro";
import RegistrarPets from "../Telas/MeusPets";
import DadosPet from "../Telas/DadosPet";
import DadosPetsAdotar from "../Telas/DadosPetsAdotar";
import PetsAdotar from "../Telas/PetsAdotar";
import Introducao from "../Telas/Introducao";
import RemoverPet from "../Telas/RemoverPet";
import CadastrarPet2 from "../Telas/CadastroPet2";

const Drawer = createDrawerNavigator();

function createDrawerNavigator1() {
  if (StatusUser() == false) {
    return (
      <Drawer.Navigator initialRouteName = "Introducao">
        <Drawer.Screen name = "Introducao" component = {Introducao} />
        <Drawer.Screen name = "Desenvolvimento de Aplicativos" component = {Principal} />
        <Drawer.Screen name = "Cadastro Login" component = {CadastrarPessoa} />
        <Drawer.Screen name = "Login" component = {Login} />
        <Drawer.Screen name = "Registrar Usuario" component = {RegistrarUsuario} />
      </Drawer.Navigator>
    );
  } else {
    return (
      <Drawer.Navigator initialRouteName="Desenvolvimento de Aplicativos">
        <Drawer.Screen
          name="Desenvolvimento de Aplicativos"
          component={Principal}
        />
        {/* <Drawer.Screen name="Cadastro Login" component={CadastrarPessoa} />
        <Drawer.Screen name="Login" component={Login} /> */}
        
        <Drawer.Screen name="Meus Pets" component={RegistrarPets} />
        <Drawer.Screen name="Pets Adotar" component={PetsAdotar} />

      </Drawer.Navigator>
    );
  }
}

export default function Rotas() {
  if (StatusUser() == true) {
    return (
      <Drawer.Navigator>
        <Drawer.Screen
          options={{ headerShown: false }}
          name="Tela Principal"
          component={createDrawerNavigator1}
        />
        <Drawer.Screen name="Cadastrar Pet" component={CadastrarPet} />
        <Drawer.Screen name="Meus Pets" component={RegistrarPets} />
        <Drawer.Screen name="Pets Adotar" component={PetsAdotar} />
        <Drawer.Screen name="Dados Pets" component={DadosPet} />
        <Drawer.Screen name="Dados Pets Adotar" component={DadosPetsAdotar} />
        <Drawer.Screen name="Remover Pet" component={RemoverPet} />
        <Drawer.Screen name="Cadastrar Pet 2" component={CadastrarPet2} />
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