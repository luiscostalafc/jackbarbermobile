import React, { useRef, useState } from 'react';
import { ScrollView } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import logo from '../../assets/logo.png';
import Background from '../../components/Background';
import { signUpRequest } from '../../store/modules/auth/actions';
import { phoneNumber } from '../../services/mask';

import {
	Container,
	Form,
	FormInput,
	SubmitButton,
	SignLink,
	SignLinkText,
	Image,
} from './styles';

export default function SignUp({ navigation }) {
	const dispatch = useDispatch();

	const emailRef = useRef();
	const passwordRef = useRef();
	const phoneRef = useRef();

	const [name, setName] = useState('');
	const [phone, setPhone] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');

	const loading = useSelector((state) => state.auth.loading);

	function handleSubmit() {
		dispatch(signUpRequest(name, phone, email, password));
	}

	return (
		<ScrollView>
			<Background>
				<Container>
					<Image source={logo} />

					<Form>
						<FormInput
							icon="person-outline"
							autoCorrect={false}
							autoCapitalize="none"
							placeholder="Nome completo"
							returnKeyType="next"
							onSubmitEditing={() => phoneRef.current.focus()}
							value={name}
							onChangeText={setName}
						/>

						<FormInput
							icon="smartphone"
							keyboardType="number-pad"
							autoCorrect={false}
							ref={phoneRef}
							autoCapitalize="none"
							placeholder="Seu número com DDD"
							returnKeyType="next"
							onSubmitEditing={() => emailRef.current.focus()}
							value={phoneNumber(phone)}
							onChangeText={setPhone}
						/>

						<FormInput
							icon="mail-outline"
							keyboardType="email-address"
							autoCorrect={false}
							autoCapitalize="none"
							placeholder="Digite seu e-mail"
							ref={emailRef}
							returnKeyType="next"
							onSubmitEditing={() => passwordRef.current.focus()}
							value={email}
							onChangeText={setEmail}
						/>

						<FormInput
							icon="lock-outline"
							secureTextEntry
							placeholder="Sua senha secreta"
							ref={passwordRef}
							yar
							returnKeyType="send"
							onSubmitEditing={handleSubmit}
							value={password}
							onChangeText={setPassword}
						/>

						<SubmitButton loading={loading} onPress={handleSubmit}>
							Criar conta
						</SubmitButton>
					</Form>

					<SignLink onPress={() => navigation.navigate('SignIn')}>
						<SignLinkText>Já tenho conta</SignLinkText>
					</SignLink>
				</Container>
			</Background>
		</ScrollView>
	);
}
