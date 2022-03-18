import React, {useEffect, useState} from 'react';

import { StatusBar } from 'expo-status-bar';
import { Formik } from 'formik';

import {
    StyledContainer,
    InnerContainer,
    PageLogo,
    PageTitle,
    SubTitle,
    StyledFormArea,
    RightIcon,
    LeftIcon,
    StyledInputLabel,
    StyledTextInput,
    StyledButton,
    ButtonText,
    Colors,
    MsgBox,
    Line,
    ExtraText,
    ExtraView,
    TextLink,
    TextLinkContent
}from './../components/styles';

import {View, ActivityIndicator} from 'react-native';
import axios from 'axios';

import {Octicons, Ionicons, Fontisto} from '@expo/vector-icons';

import KeyboardAvoidingWrapper from '../components/keyboardAvoidingWrapper';
import { navigation } from '@react-navigation/native';

import * as Google from 'expo-google-app-auth';

const {brand, darkLight, primary} = Colors;

const Login = ({navigation}) =>{
    const [hidePassword, setHidePassword] = useState(true);
    const [message, setMessage] = useState(null);
    const [messageType, setMessageType] = useState(null);
    const [googleSubmitting, setGoogleSubmitting] = useState(false);

    useEffect(()=>{

    },[message])

    const handleLogin = (credentials, setSubmitting)=>{
        handleMessage(null);
        const url = "https://boiling-gorge-09849.herokuapp.com/user/signin";

        axios
        .post(url,credentials)
        .then((response)=>{
            const result = response.data;
            const {message, status, data} = result;

            if(status !== 'SUCCESS'){
                handleMessage(message,status);
            }else{
                navigation.navigate('Welcome',{...data[0]});
            }
            setSubmitting(false);
        })
        .catch(error =>{
            console.log(error.JSON());
            setSubmitting(false);
            handleMessage("An error occured. Check your Network and try again");
        })
    }

    const handleMessage = (message, type = 'FAILED') =>{
        setMessage(message);
        setMessageType(type);
    }

    const handleGoogleSignIn = () =>{
        setGoogleSubmitting(true);
       
        const config = { 
            androidClientId: `507049783673-74rge73n6kf5smsaj7iag4lqguf052n3.apps.googleusercontent.com`,
            scopes: ['profile','email']
        };
    
        Google
            .logInAsync(config)
            .then((result)=>{
                const {type, user} = result;
                
                if(type == 'success'){
                    const {email, name, photoUrl} = user;
                    handleMessage('Google signin successful','SUCCESS');

                    setTimeout(() =>{ 
                    handleMessage(null);
                    navigation.navigate('Welcome', {email, name, photoUrl})
                    }, 1000);
                    
                }else{
                    handleMessage('Google signin was cancelled');
                }
                setGoogleSubmitting(false);
            })
            .catch(error=>{
                console.log(error);
                handleMessage('An error occured. Check your network and try again');
                setGoogleSubmitting(false);
            })
    };

     

    return (
    <KeyboardAvoidingWrapper>
       <StyledContainer>
           <StatusBar style="dark" />
           <InnerContainer>
               <PageLogo resizeMode="cover" source={require('../assets/logo.jpg')}/>
               <PageTitle>TLD Write</PageTitle>
               <SubTitle>Account Login</SubTitle>
           
            <Formik
             initialValues={{email: '', password:''}}
             onSubmit={(values,{setSubmitting})=>{
                if(values.email == '' || values.password == ''){
                    handleMessage('Please fill all the fields');
                    setSubmitting(false);
                } else{
                    handleLogin(values, setSubmitting);
                }
            }}
            >
            {({handleChange, handleBlur, handleSubmit, values, isSubmitting}) => (
                <StyledFormArea>
                        <MyTextInput
                            label="Email Address"
                            icon="mail"
                            placeholder="andyj@gmail.com"
                            placeholderTextColor={darkLight}
                            onChangeText={handleChange('email')}
                            onBlur={handleBlur('email')}
                            value={values.email}
                            keyboardType="email-address"
                        />  

                        <MyTextInput
                            label="Password"
                            icon="lock"
                            placeholder="***********"
                            placeholderTextColor={darkLight}
                            onChangeText={handleChange('password')}
                            onBlur={handleBlur('password')}
                            value={values.password}
                            secureTextEntry={hidePassword}
                            hidePassword={hidePassword}
                            setHidePassword={setHidePassword}
                            isPassword
                        />
                        <MsgBox type={messageType}>{message}</MsgBox>
                        {!isSubmitting?<StyledButton onPress={handleSubmit}>
                            <ButtonText>Login</ButtonText>
                        </StyledButton>:null}

                        {isSubmitting ? 
                        <StyledButton disabled={true}>
                            <ActivityIndicator size="large" color={primary}/>
                        </StyledButton> : null}
                        <Line />


                        {!googleSubmitting?
                            (<StyledButton google onPress={handleGoogleSignIn}>
                                <Fontisto name="google" color={primary} size={25}/>
                                <ButtonText google>Sign in with Google</ButtonText>
                            </StyledButton>):null
                        }

                        {googleSubmitting?
                            (<StyledButton google disabled>
                                 <ActivityIndicator size="large" color={primary}/>
                             </StyledButton>):null
                        }

                        <ExtraView>
                            <ExtraText>Don't have an account already?</ExtraText>
                            <TextLink onPress={()=>navigation.navigate('Signup')}>
                                <TextLinkContent>Signup</TextLinkContent>
                            </TextLink>
                        </ExtraView>
                </StyledFormArea>
            )}
           </Formik>
           </InnerContainer>
       </StyledContainer>
    </KeyboardAvoidingWrapper>
    );
}

const MyTextInput = ({label, icon, isPassword, hidePassword, setHidePassword, ...props}) =>{
    return (
        <View>
          <LeftIcon> 
            <Octicons name={icon} size={30} color={brand}/>
          </LeftIcon>
         <StyledInputLabel>{label}</StyledInputLabel>
         <StyledTextInput {...props} />
         {isPassword ? 
         (<RightIcon onPress={()=>setHidePassword(!hidePassword)}>
            <Ionicons 
                name={hidePassword ? 'md-eye-off':'md-eye'}
                size={30} 
                color={darkLight}/>
         </RightIcon>):null}
        </View>
    )
}


export default Login;