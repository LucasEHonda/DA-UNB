import React, { useContext } from "react";
import styled from 'styled-components/native';

const TabArea = styled.View`
    height: 60px;
    flex-direction: row;
    background-color: #fff;
`

const TabItemCenter = styled.TouchableHighlight`
    align-items: center;
    justify-content: center;
    height: 70px;
    width: 70px;
    border-radius: 35px;
    margin-top: -20px;
    border: 3px solid;
    background-color: #fff;
`;

const TabSmallItem = styled.TouchableOpacity`
    align-items: center;
    justify-content: center;
    flex: 1;
`;

const SmallImage = styled.Image`
    width: 25px;
    height: 25px;
`;

const LargeImage = styled.Image`
    width: 30px;
    height: 30px;
`;




export default ({ state, navigation }) => {

    const goTo = (screenName) => {
        navigation.navigate(screenName)
    }

    return (
        <TabArea>
            <TabSmallItem onPress={() => goTo("Perfil")}>
                <SmallImage style={{ opacity: state.index === 0 ? 1 : 0.5 }} source={require("../../assets/Icons/profile.png")} />
            </TabSmallItem>

            <TabSmallItem onPress={() => goTo("Meus Pets")} >
                <SmallImage style={{ opacity: state.index === 1 ? 1 : 0.5 }} source={require("../../assets/Icons/mypets.png")} />
            </TabSmallItem>

            <TabItemCenter onPress={() => goTo("Inicio")} underlayColor="#fff">
                <LargeImage  style={{ opacity: state.index === 2 ? 1 : 0.5 }} source={require("../../assets/Icons/home.png")} />
            </TabItemCenter>

            <TabSmallItem onPress={() => goTo("Cadastrar Pet")}>
                <SmallImage style={{ opacity: state.index === 3 ? 1 : 0.5 }} source={require("../../assets/Icons/add.png")} />
            </TabSmallItem>

            <TabSmallItem onPress={() => goTo("Configurações")}>
                <SmallImage style={{ opacity: state.index === 4 ? 1 : 0.5 }} source={require("../../assets/Icons/gear.png")} />
            </TabSmallItem>
        </TabArea>
    );
};