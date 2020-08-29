import React, { useState } from 'react';
import { ScrollView, Alert } from 'react-native';

import api from '../../services/api';

import logo from '../../assets/logo.png';
import Background from '../../components/Background';
import navigations from '../../services/navigations';

import {
	Container,
	Form,
	FormInput,
	SubmitButton,
	SignLink,
	SignLinkText,
	Image,
} from './styles';

export default function ForgotPassword({ navigation }) {
	const [email, setEmail] = useState('');

	async function handleSubmit() {
		try {
			await api.post(
				'forgot',
				{
					email,
				},
				navigations.navigate('SignIn')
			);
			setEmail(email);
			Alert.alert(
				'Confira seu e-mail! 📨',
				'Uma senha provisória foi enviada para o seu e-mail. Você deverá utiliza-la para fazer login e depois alterá-la no menu "Profile"'
			);
		} catch (err) {
			console.err('Algo deu errado');
		}
	}

	return (
		<ScrollView>
			<Background>
				<Container>
					<Image source={logo} />

					<Form>
						<FormInput
							icon="mail-outline"
							keyboardType="email-address"
							autoCorrect={false}
							autoCapitalize="none"
							placeholder="Digite seu e-mail"
							returnKeyType="next"
							value={email}
							onChangeText={setEmail}
						/>

						<SubmitButton onPress={handleSubmit}>Confirmar</SubmitButton>
					</Form>

					<SignLink onPress={() => navigation.navigate('SignIn')}>
						<SignLinkText>Voltar</SignLinkText>
					</SignLink>
				</Container>
			</Background>
		</ScrollView>
	);
}
