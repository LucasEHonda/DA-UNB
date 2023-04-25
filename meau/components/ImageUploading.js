import React from 'react';
import styled from 'styled-components';

const ButtonRequest = styled.View`
    width: 100%;
    height: 100%;
    align-items: center;
    justify-content: center;
    /* background-color: red; */
`;

const Avatar = styled.Image`
    width: 100%;
    height: 100%;
`;

const IconLoading = styled.ActivityIndicator`
`;

export default ({ urlPicture, isLoading }) => {
    return ( 
        <ButtonRequest >
            {isLoading ? (<IconLoading size="large" color="black" />) : (<Avatar source={{ uri: urlPicture }} />)}
        </ButtonRequest>
    );
}

// , value, onChangeText, password
// secureTextEntry={password}

// value={value}
// onChangeText={onChangeText}

