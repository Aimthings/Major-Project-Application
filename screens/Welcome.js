import React,{useState} from "react";
import { Text, TouchableOpacity, View } from "react-native";
import axios from "axios";

import {
  StyledContainer,
  StyledButton,
  ButtonText,
  Line,
  ExtraView,
  ExtraText,
  InnerContainer
}from './../components/styles';

import * as DocumentPicker from "expo-document-picker";
import KeyboardAvoidingWrapper from "../components/keyboardAvoidingWrapper";

export default function Welcome({navigation}) {
  const [singleFile, setSingleFile] = useState(null);
 
  const uploadFile = async () => {
    // Check if any file is selected or not
    if (singleFile != null) {
      // If file selected then create FormData
      const {mimeType,name,size,uri}=singleFile;
      const file={
        type:mimeType,
        name,
        size,
        uri
      }
      // Please change file upload URL
      const data = new FormData();
      console.log(data)
      data.append('file', file);
      
      const config = {
          headers: {
              'content-type':'application/x-www-form-urlencoded'
          }
      }
      // const getParams = (obj) => {
        // const params = new URLSearchParams();
        // console.log(params)
        // const keys = Object.keys(obj);
        // for(let k of keys){
        //     params.append(k, obj[k]);
        // }
        // return params;
      // }
     
    let endpoint = "speechtotext";
    let downloadName = endpoint === "speechtotext" ? "transcript" : "summary";
    
    try{
      // console.log(data.get('file'))
      const response = await axios.post(`http://172.31.66.18:8080/${endpoint}`, data, config);
  
      if(response?.data) {                
          const content = response.data.content;
          const filename = `${file.name.slice(0,-4)}_${downloadName}.txt`;

          const blob = new Blob([content], {
          type: "text/plain;charset=utf-8"
          });

          saveAs(blob, filename);
          alert('Upload Successful');

      } else {
          alert('Please Select File first');
          throw new Error(response);
      }  
    }catch(e) {
      if (e.response && e.response.data) {
          console.log(e.response.data.message); // some reason error message
      
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
        
        // Printing the log realted to the file
        // console.log('res : ' + JSON.stringify(res));
        // Setting the state to show single file attributes
        setSingleFile(res);
      } catch (err) {
        setSingleFile(null);
      }
  };

  return (
    <KeyboardAvoidingWrapper>
      <StyledContainer>
        <InnerContainer>
        <View style={{ alignItems: 'center' }}>
        <ExtraText style={{ fontSize: 30, textAlign: 'center' }}>
          React Native File Upload Example
        </ExtraText>
        <ExtraText
          style={{
            fontSize: 25,
            marginTop: 20,
            marginBottom: 30,
            textAlign: 'center',
          }}>
          www.aboutreact.com
        </ExtraText>
      </View>
      {singleFile != null ? (
        <ExtraText>
          File Name: {singleFile.name ? singleFile.name : ''}
          {'\n'}
          Type: {singleFile.type ? singleFile.type : ''}
          {'\n'}
          File Size: {singleFile.size ? singleFile.size : ''}
          {'\n'}
          URI: {singleFile.uri ? singleFile.uri : ''}
          {'\n'}
        </ExtraText>
      ) : null}
      <StyledButton onPress={selectFile}>
          <ButtonText>Select File</ButtonText>
      </StyledButton>
      <StyledButton onPress={uploadFile}>
          <ButtonText>Upload File</ButtonText>
      </StyledButton>
        </InnerContainer>
      </StyledContainer>
    </KeyboardAvoidingWrapper>
  );
}
