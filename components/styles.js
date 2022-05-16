import styled from 'styled-components/native'
import Constants from 'expo-constants';

const StatusBarHeight = Constants.statusBarHeight;

export const Colors = {
    primary: '#ffffff',
    secondary: '#E5E7EB',
    tertiary: '#1F2937',
    darkLight: '#9CA3AF',
    brand: '#6D28D9',
    green: '#108981',
    red: '#EF4444',
}

const {primary, secondary, tertiary, darkLight, brand, green, red} = Colors;

export const StyledContainer = styled.View`
    flex: 1;
    padding: 25px;
    padding-top: ${StatusBarHeight + 30}px ;
    background-color: ${primary};

    ${(props) => props.signup ? `
        padding-top: ${StatusBarHeight + 70}px ;
    `:null}

    ${(props) => props.welcome ? `
    padding-top: ${StatusBarHeight + 80}px ;
    `:null}
 
    ${(props) => props.FileUploader ? `
    padding-top: ${StatusBarHeight + 60}px ;
    `:null}
    
`;

export const InnerContainer = styled.View`
    flex: 1;
    width: 100%;
    align-items: center;

    ${(props) => props.welcome ? `
    position: absolute;
    `:null}

`;

export const PageLogo = styled.Image`
    width: 250px;
    height: 170px;

    ${(props) => props.welcome ? `
    width: 90px;
    height: 90px;
    `:null}
`;

export const PageTitle = styled.Text`
    font-size: 30px;
    text-align: center;
    font-weight: bold;
    color: ${brand};
    padding: 10px;

    ${(props) => props.welcome ? `
        font-size: 30px;
    `:null}
`;

export const SubTitle = styled.Text`
    font-size: 20px;
    margin-bottom: 30px;
    letter-spacing: 1px;
    font-weight: bold;
    color: ${tertiary};

    ${(props) => props.welcome ? `
        margin:2% 0 1% 0;
        letter-spacing: 0.2px;
    `:null}

`;

export const StyledFormArea = styled.View`
    width: 90%;
`;

export const StyledTextInput = styled.TextInput`
    background-color: ${secondary};
    padding: 15px;
    padding-left: 55px;
    padding-right: 55px;
    border-radius: 5px;
    font-size: 16px;
    height: 60px;
    margin-vertical: 3px;
    margin-bottom: 10px;
    color: ${tertiary};
`;

export const StyledInputLabel = styled.Text`
    color: ${tertiary};
    font-size: 13px;
    text-align: left;
`;

export const LeftIcon = styled.View`
    left: 15px;
    top: 38px;
    position: absolute;
    z-index: 1;
`;

export const RightIcon = styled.TouchableOpacity`
    right: 15px;
    top: 38px;
    position: absolute;
    z-index: 1;
`;

export const StyledButton = styled.TouchableOpacity`
    padding: 15px;
    background-color: ${brand};
    justify-content: center;
    align-items: center;
    border-radius: 5px;
    margin-vertical: 5px;
    height: 60px;

    ${(props) => props.google == true ? `
    background-color: ${green};
    flex-direction: row;
    justify-content: center;
    `:null}

    ${(props) => props.welcome == true ? `
    padding:7px;
    height:40px;
    margin:10px 20px 2px 0px;
    `:null}

    ${(props) => props.FileUploader == true ? `
    margin:10%;
    height:10%;
    width:70%;
    `:null}

`;

export const StyledButtonParent = styled.TouchableOpacity`
    flex-direction:row;
    justify-content:space-between;
`;

export const ButtonText = styled.Text`
    color: ${primary};
    font-size: 16px;

    ${(props) => props.google == true ? `
    padding-left: 12px;
    `:null}

    ${(props) => props.FileUploader == true ? `
    font-size: 18px;
    font-weight:bold;
    `:null}
`;

export const MsgBox = styled.Text`
    text-align: center;
    font-size: 13px;
    color:${red};
`;

export const Line = styled.View`
    height: 1px;
    width: 100%;
    background-color: ${darkLight};
    margin-vertical: 10px;
`;

export const ExtraView = styled.View`
    justify-content: center;
    flex-direction: row;
    align-items: center;
    padding: 10px;
    margin-bottom:50%;
`;

export const ExtraText = styled.Text`
    justify-content: center;
    align-content: center;
    color: ${tertiary};
    font-size: 15px;

    ${(props) => props.processing == true ? `
    margin-bottom:40%;
    font-size:20px;
    font-weight:bold;
    color: ${red};
    `:null}

`;

export const TextLink = styled.TouchableOpacity`
    justify-content: center;
    align-items: center;   
`;

export const TextLinkContent = styled.Text`
    color: ${brand};
    font-size: 15px;
`;

export const WelcomeContainer = styled(InnerContainer)`
    padding: 25px;
    padding-top: 10px;
    justify-content: center;
`;

export const Avatar = styled.Image`
    width: 100px;
    height: 100px;
    margin: auto;
    border-radius: 50px;
    border-width: 2px;
    border-color: ${secondary};
    margin-bottom: 10px;
    margin-top: 10px;
`;

export const WelcomeImage = styled.Image`
    height: 50%;
    min-width: 100%;
`