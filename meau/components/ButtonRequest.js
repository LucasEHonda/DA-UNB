import React from 'react';
import styled from 'styled-components';

const ButtonRequest = styled.TouchableOpacity`
    width: 100%;
    background-color: #fff;
    justify-content: center;
    align-items: center;
    height: 60px;
    border-radius: 10px;  
`;

const Title = styled.Text`
    font-size: 20px;
`;

const IconLoading = styled.ActivityIndicator`
`;

export default ({ title, onPress, isLoading }) => {
    return (
        <ButtonRequest onPress={onPress}>
            {isLoading? (<IconLoading size="small" color="black"/>) : (<Title>{title}</Title>)}
        </ButtonRequest>
    );
}

// , value, onChangeText, password
// secureTextEntry={password}

// value={value}
// onChangeText={onChangeText}

