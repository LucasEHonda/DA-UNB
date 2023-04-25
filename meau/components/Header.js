import React from "react";
import styled from 'styled-components/native';
import { useNavigation } from "@react-navigation/native";

const Container = styled.SafeAreaView`
    height: 50px;
    width: 100%;
`

const StatusBar = styled.StatusBar`
    background-color: #fff;
`

const HeaderArea = styled.View`
    flex: 1;
    background-color: #fff;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    border-bottom-color: black;
    border-bottom-width: 0.2px;     
`

const ButtonChat = styled.TouchableOpacity`
    width: 50px;
    height: 50px;
    margin-right: 20px;
    justify-content: center;
    align-items: center;
`

const Title = styled.Text`
    font-size: 20px;
    font-weight: bold;
    text-align: center;
`;

const Icon = styled.Image`
    width: 20px;
    height: 20px;
`;


export default ({ title }) => {
    const navigation = useNavigation();

    const handleHome = () => {
        navigation.navigate("Inicio")
    }

    return (
        <Container>
            <StatusBar backgroundColor="black" />

            <HeaderArea onPress={() => handleHome()}>
                <Title>{title}</Title>
            </HeaderArea>

        </Container>

    );
};