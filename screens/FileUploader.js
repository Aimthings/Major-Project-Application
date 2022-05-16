import React from "react";

import {
  StyledContainer,
  StyledButton,
  ButtonText,
  InnerContainer,
  PageLogo,
  PageTitle,
}from '../components/styles';


export default function FileUploader({navigation}) {

  const navigateToUploader=(endpoint)=>{
      navigation.navigate('Welcome',{
        endpoint 
    })
  }

  return (
      <StyledContainer FileUploader>
        <InnerContainer>

        <PageTitle welcome>
          TLD Write
        </PageTitle>

        <PageLogo resizeMode="cover" source={require('../assets/logo.jpg')} />
      
        <StyledButton onPress={()=>navigateToUploader('speechtotext')} FileUploader>
            <ButtonText FileUploader>Speech To Text</ButtonText>
        </StyledButton>
        <StyledButton onPress={()=>navigateToUploader('textsummarisation')} FileUploader>
            <ButtonText FileUploader>Summarise Transcript</ButtonText>
        </StyledButton>
        <StyledButton onPress={()=>navigateToUploader('meetingsummarisation')} FileUploader>
            <ButtonText FileUploader>Summarise Meeting</ButtonText>
        </StyledButton>

        </InnerContainer>
      </StyledContainer>
  );
}
