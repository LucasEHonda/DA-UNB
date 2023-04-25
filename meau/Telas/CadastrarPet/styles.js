import React from 'react';
import styled from 'styled-components/native';

/* VIEW */
export const Container = styled.SafeAreaView`
    background-color: #58BD97;
    width: 100%;
    justify-content: center;
    align-items: center;
    flex: 1;
`;

export const ScrollViewPet = styled.ScrollView`
    width: 100%;
    height: 100%;
`;

export const InputArea = styled.View`
    width: 100%;
    padding: 20px;
    justify-content: center;
    align-items: center;
`;

export const ViewArea = styled.View`
    width: 100%;  
    flex: 1;
    justify-content: center;
    align-items: center;
`;

export const ViewAreaPicker = styled.View`
    flex: 1;
    width: 100%;
    margin-bottom: 20px;
    justify-content: center;
`;

export const ViewAreaSwitch = styled.View`
    flex: 1;
    align-items: center;
    flex-direction: row;
    margin-left: 20px;
`;

export const SwitchText = styled.Text`
    font-size: 16px;
    color: #000000;
`;

export const ViewAllRadioButton = styled.View`
    align-items: center;
    flex-direction: row;
    justify-content: space-around;
`;

export const ViewRadioButton = styled.View`
    align-items: center;
    flex-direction: row;
`;

export const RadioButtonText = styled.Text`
    font-size: 16px;
    color: #000000;
`;

export const CustomViewPicture = styled.View`
    flex: 1;
    margin: 5px;
    margin-bottom: 30px;
`;

/* TEXT */

export const SimpleText = styled.Text`
    font-size: 20px;
    color: #000000;
    margin-top: 20px;
`;

export const SimpleTextBold = styled.Text`
    font-size: 18px;
    /* text-align: center; */
    color: #000000;
    margin-left: 10px;
    margin-top: 10px;
    font-weight: bold;
`;

export const TitleTextBold = styled.Text`
    font-size: 22px;
    color: #000000;
    margin-bottom: 20px;
    font-weight: bold;
    text-align: center;
`;

export const WelcomeSign = styled.Text`
    font-size: 24px;
    color: #000000;
    margin-top: 60px;
`;

export const CustomButtonText = styled.Text`
    font-size: 18px;
    color: #000000;
`;

export const SignMessageButtonText = styled.Text`
    font-size: 16px;
    color: #000000;
`;

export const SignMessageButtonTextBold = styled.Text`
    font-size: 16px;
    color: #000000;
    font-weight: bold;
    margin-left: 5px;
`;

/* BUTTON */

export const CustomButton = styled.TouchableOpacity`
    width: 100%;
    background-color: #fff;
    border-radius: 30px;
    justify-content: center;
    align-items: center;
    height: 60px;
    margin-bottom: 20px;
`;

export const MessageButton = styled.TouchableOpacity`
    flex-direction: row;
    justify-content: center;
    margin-top: 50px;
    margin-bottom: 20px;
`;

export const CustomButtonPicture = styled.TouchableOpacity`
    width: 100%;
    background-color: #fff;
    justify-content: center;
    align-items: center;
    height: 60px;
    border-radius: 10px;  
`;

/* IMAGE */

export const PetPicture = styled.Image`
    width: 150px;
    height: 150px;  
    border-radius: 20px;
    margin: 5px ;
`;

export const LoadingIcon = styled.ActivityIndicator`
    flex: 1;
    margin-top: 50px;
    margin-bottom: 50px
`;
