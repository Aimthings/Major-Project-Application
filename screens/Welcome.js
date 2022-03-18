import React from "react";

import {
  StyledContainer,
  StyledButton,
  ButtonText,
  Line,
  ExtraView,
}from './../components/styles';// import Voice, {
//   SpeechResultsEvent,
//   SpeechErrorEvent,
// } from "@react-native-voice/voice";

export default function Welcome({navigation}) {
  // const [results, setResults] = useState([]);
  // const [isListening, setIsListening] = useState(false);

  // useEffect(() => {
  //   function onSpeechResults(e) {
  //     setResults(e.value ?? []);
  //   }
  //   function onSpeechError(e) {
  //     console.error(e);
  //   }
  //   Voice.onSpeechError = onSpeechError;
  //   Voice.onSpeechResults = onSpeechResults;
  //   return function cleanup() {
  //     Voice?.destroy().then(Voice.removeAllListeners);
  //   };
  // }, []);

  // async function toggleListening() {
  //   try {
  //     if (isListening) {
  //       await Voice?.stop();
  //       setIsListening(false);
  //     } else {
  //       setResults([]);
  //       await Voice?.start("en-US");
  //       setIsListening(true);
  //     }
  //   } catch (e) {
  //     console.error(e);
  //   }
  // }

  return (   
        <StyledContainer welcome>
            <StyledButton>
              <ButtonText>Speech Recognisation</ButtonText>
            </StyledButton>
            <StyledButton>
              <ButtonText>Text Summarisation</ButtonText>
            </StyledButton>
          <Line/>
          <ExtraView>
            <StyledButton onPress={()=>{
              navigation.navigate('Login');
            }}>
          <ButtonText>Logout</ButtonText> 
            </StyledButton>
            </ExtraView>
      </StyledContainer>
  );
}
