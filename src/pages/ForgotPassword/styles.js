import styled from 'styled-components/native';

import { Platform } from 'react-native';

import Button from '../../components/Button';
import Input from '../../components/Input';

export const Container = styled.KeyboardAvoidingView.attrs({
	enabled: Platform.OS === 'ios',
	behavior: 'padding',
})`
	flex: 1;
	justify-content: center;
	align-items: center;
	padding: 0px 30px;
	margin-bottom: 80px;
`;

export const Form = styled.View`
	align-self: stretch;
	margin-top: 50px;
`;
export const Image = styled.Image`
	margin-top: 100px;
`;

export const FormInput = styled(Input)`
	margin-bottom: 10px;
`;

export const SubmitButton = styled(Button)`
	margin-top: 10px;
`;

export const SignLink = styled.TouchableOpacity`
	margin-top: 10px;
`;

export const SignLinkText = styled.Text`
	padding: 5px;
	color: #fff;
	font-weight: bold;
	font-size: 16px;
`;
