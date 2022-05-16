import React,{useState} from "react";
import { ScrollView, StyleSheet } from "react-native";

import {
  StyledContainer,
  StyledButton,
  ButtonText,
  ExtraText,
  InnerContainer,
  StyledButtonParent,
  PageLogo,
  PageTitle,
  ExtraView,
  SubTitle,
}from './../components/styles';

import * as DocumentPicker from "expo-document-picker";

const SPEECH_TO_TEXT = 'Speech To Text Converter';
const SPEECH_TO_TEXT_SUB='Transcript Form';
const TRANSCRIPT_SUMMARISE= 'Transcript Summariser';
const SUMMARISER_SUB='Summary';
const MEETING_SUMMARISE= 'Meeting Summariser';

export default function Welcome({route,navigation}) {

  const [singleFile, setSingleFile] = useState(null);
  const [isDataPending,setDataPending]=useState(false);
  const [text,setText]=useState(null);
  
  const {endpoint} = route.params;

  let title= SPEECH_TO_TEXT;
  let imageSource=require('../assets/mic.png');
  let subtitle=SUMMARISER_SUB;

  if(endpoint==='textsummarisation'){
    title=TRANSCRIPT_SUMMARISE;
    imageSource=require('../assets/summary.jpg')
  }else if(endpoint==='meetingsummarisation'){
    title=MEETING_SUMMARISE;
    imageSource=require('../assets/logo.jpg')
  }else{
    subtitle=SPEECH_TO_TEXT_SUB;
  }
 
  const uploadFile = async () => {
    // Check if any file is selected or not
    if (singleFile != null) {
      
      const {mimeType,name,size,uri}=singleFile;
      const file={
        type:mimeType,
        name,
        size,
        uri
      }
      
      const data = new FormData();
      data.append('file',file);
           
    try{
      setDataPending(true);
      let response= await fetch(
        `http://172.31.66.18:8080/${endpoint}`,
        {
          method:'post',
          body:data,
          headers: {
            'content-type': 'multipart/form-data'
          }
        },
      )
      .then( response =>response.json())
      .then( function(data){
        if(data)
        {
          const content = data;
          alert('Respone received');
          setDataPending(false);
          setText(content)
        } else {

          alert('Please Select File first');
          throw new Error(response);

        }  
       })
      }catch(e) {
        if (e.response && e.response.data) {

            alert(e.response.data.message); // some reason error message
        } else {

            console.log(e);
        }
      }
  };
}

  const selectFile = async () => {
    // Opening Document Picker to select one file
    try {
        let res = await DocumentPicker.getDocumentAsync({});
    
        setSingleFile(res);
        alert("File selected, Click on upload to upload the file to server");

      } catch (err) {

        setSingleFile(null);
      }
  };

  const clearText =()=>{

    setText(null);
    setSingleFile(null);
    setDataPending(false);
  }

  return (
      <StyledContainer welcome>
        <InnerContainer>

        <PageTitle welcome>{title}</PageTitle>
          
        <PageLogo resizeMode="cover" source={imageSource} welcome/>
        <StyledButtonParent disabled>
            <StyledButton onPress={selectFile} welcome>
                <ButtonText>Select File</ButtonText>
            </StyledButton>
            <StyledButton onPress={uploadFile} disabled={!singleFile} welcome>
                <ButtonText>Upload File</ButtonText>
            </StyledButton>
            <StyledButton onPress={clearText} disabled={!text} welcome>
                <ButtonText >Reset</ButtonText>
            </StyledButton>       
        </StyledButtonParent>

        <StyledButtonParent transcript>
        <SubTitle welcome>
          {subtitle}
        </SubTitle>
        </StyledButtonParent>

        <ExtraView>
        {isDataPending?
          <ExtraText processing>
            Please wait data is processing
            </ExtraText>:null}    
          <ScrollView style={styles.scrollView}>
          {text?<ExtraText>
            {text}
          </ExtraText>:null}
          </ScrollView>
        </ExtraView>

        </InnerContainer>
      </StyledContainer>
  );
}

const styles = StyleSheet.create({
  scrollView:{
    height: 350
  }
})