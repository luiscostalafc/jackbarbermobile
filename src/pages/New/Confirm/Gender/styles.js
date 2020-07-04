import styled from 'styled-components/native';

import Button from '../../../components/Button';

export const Container = styled.View`
	flex: 1;
	padding: 0 30px;

	justify-content: center;
	align-items: center;
`;

export const AvatarWoman = styled.Image`
	width: 250px;
	height: 120px;
	border-radius: 20px;
`;

export const AvatarMan = styled.Image`
	width: 250px;
	height: 120px;
	margin-top: 20px;
	border-radius: 20px;
`;

export const SubmitButton = styled(Button)`
	align-self: stretch;
	margin-top: 12px;
`;
