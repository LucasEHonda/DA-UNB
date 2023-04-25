import React from 'react';
import styled from 'styled-components/native';

/* VIEW */

export const Container = styled.SafeAreaView`
    background-color: #58BD97;
    width: 100%;
    flex: 1;
`;

export const ScrollViewSignUp = styled.ScrollView`
    width: 100%;
    height: 100%;
    /* justify-content: stretch; */
`;

export const InputArea = styled.View`
    width: 100%;
    height: 100%;
    justify-content: center;
    align-items: center;
    padding: 20px;
`;

export const ViewArea = styled.View`
    width: 100%;
    justify-content: center;
    align-items: center;
`;

/* TEXT */

export const TitleText = styled.Text`
    font-size: 22px;
    color: #000000;
    margin-top: 20px;
    margin-bottom: 20px;
    font-weight: bold;
    text-align: center;
`;

export const WelcomeSign = styled.Text`
    font-size: 24px;
    color: #000000;
    margin-top: 20px;
    font-weight: bold;
`;

export const SimpleText = styled.Text`
    font-size: 18px;
    color: #000000;
    margin-top: 20px;
    margin-bottom: 20px;
    text-align: center;
`;

export const SimpleTextImg = styled.Text`
    font-size: 18px;
    color: #000000;
    margin-bottom: 20px;
    text-align: center;
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
    height: 60px;
    border-radius: 30px;
    background-color: #fff;
    border-radius: 30px;
    justify-content: center;
    align-items: center;
`;

export const SignMessageButton = styled.TouchableOpacity`
    flex-direction: row;
    justify-content: center;
    margin-top: 50px;
    margin-bottom: 20px;
`;

export const ContentImg = styled.TouchableOpacity`
    width: 120px;
    height: 120px;
    border-radius: 100px;
    border-radius: 100px;  
    margin-bottom: 20px;
    align-items: center;
    justify-content: center;
`;

/* IMAGE */

export const Avatar = styled.Image`
    width: 120px;
    height: 120px;
    border-radius: 100px;
`;





