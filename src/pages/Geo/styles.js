import styled, { css } from 'styled-components/native';
import { Platform } from 'react-native';
import Input from '../../components/Input';
import Button from '../../components/Button';

export const LocationBox = styled.View`
	background: #fff;
	shadow-color: #000;
	shadow-offset: 0 0;
	shadow-opacity: 0.1;
	elevation: 1;
	border-radius: 3px;
	flex-direction: row;

	${Platform.select({
		ios: css`
			margin-top: 20px;
		`,
		android: css`
			margin-top: 20px;
			margin-left: 20px;
		`,
	})}
`;

export const LocationText = styled.Text`
	margin: 8px 10px;
	font-size: 14px;
	color: #333;
`;

export const SubmitButton = styled(Button)`
	align-self: stretch;
	margin-top: 20px;
	background-color: #ebb400;
	color: #fff;
`;

export const Form = styled.ScrollView.attrs({
	showsVerticalScrollIndicator: false,
	contentContainerStyle: { padding: 15 },
})`
	align-self: stretch;
`;

export const FormInput = styled(Input)`
	margin-bottom: 10px;
	background-color: #999;
`;
