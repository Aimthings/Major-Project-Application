import React, {useState} from 'react';

import { StatusBar } from 'expo-status-bar';
import { Formik } from 'formik';

import {
    StyledContainer,
    InnerContainer,
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
    TextLinkContent,
    Padding
}from './../components/styles';

import {View, ActivityIndicator} from 'react-native';

import axios from 'axios';

import KeyboardAvoidingWrapper from '../components/keyboardAvoidingWrapper';

import {Octicons, Ionicons} from '@expo/vector-icons';

const {primary, brand, darkLight} = Colors;

const Signup = ({navigation}) =>{
    const [hidePassword, setHidePassword] = useState(true);
    const [message, setMessage] = useState();
    const [messageType, setMessageType] = useState();

    const handleSignup = (credentials, setSubmitting)=>{
        handleMessage(null);
        const url = "https://boiling-gorge-09849.herokuapp.com/user/signup";

        axios
        .post(url,credentials)
        .then((response)=>{
            const result = response.data;
            const {message, status, data} = result;

            if(status !== 'SUCCESS'){
                handleMessage(message, status);
            }else{
                navigation.navigate('Welcome',{...data});
            }
            setSubmitting(false);
        })
        .catch(error =>{
            console.log(error.JSON());
            setSubmitting(false);
            handleMessage("An error occured. Check your Network and try again");
        });
    };

    const handleMessage = (message, type = 'FAILED') =>{
        setMessage(message);
        setMessageType(type);
    }
    
    return (
    <KeyboardAvoidingWrapper>
       <StyledContainer signup={true}>
           <StatusBar style="dark" />
           <InnerContainer>
               {/*<PageLogo resizeMode="cover" source={}/>*/}
               <PageTitle>TLD Write</PageTitle>
               <SubTitle>Account Signup</SubTitle>
            <Formik
             initialValues={{name:'',email: '', password:'', confirmpassword:''}}
             onSubmit={(values,{setSubmitting})=>{

                if(values.email == '' || values.password == '' || values.name == '' || values.confirmpassword == ''){
                    handleMessage('Please fill all the fields');
                    setSubmitting(false);
                }else if(values.password !== values.confirmpassword){
                    handleMessage('Password do not match');
                    setSubmitting(false);
                }
                else{
                    handleSignup(values, setSubmitting);
                } 
            }}
            >
            {({handleChange, handleBlur, handleSubmit, values, isSubmitting}) => (
                <StyledFormArea>
                        <MyTextInput
                         label="UserName"
                         icon="person"
                         placeholder="Harry Potter"
                         placeholderTextColor={darkLight}
                         onChangeText={handleChange('name')}
                         onBlur={handleBlur('name')}
                         value={values.name}
                        />

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

                        <MyTextInput
                            label="Confirm Password"
                            icon="lock"
                            placeholder="***********"
                            placeholderTextColor={darkLight}
                            onChangeText={handleChange('confirmpassword')}
                            onBlur={handleBlur('confirmpassword')}
                            value={values.confirmpassword}
                            secureTextEntry={hidePassword}
                            hidePassword={hidePassword}
                            setHidePassword={setHidePassword}
                            isPassword
                        />

                        <MsgBox type={messageType}>{message}</MsgBox>

                        {!isSubmitting?<StyledButton onPress={handleSubmit}>
                            <ButtonText>Signup</ButtonText>
                        </StyledButton>:null}

                        {isSubmitting ? <StyledButton disabled={true}>
                            <ActivityIndicator size="large" color={primary}/>
                        </StyledButton> : null}

                        <Line/>
                        <ExtraView>
                            <ExtraText>Already have an account?</ExtraText>
                            <TextLink onPress={()=>navigation.navigate('Login')}>
                                <TextLinkContent>Login</TextLinkContent>
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
                color={darkLight}
            />
         </RightIcon>):null}
        </View>
    )
}


export default Signup;