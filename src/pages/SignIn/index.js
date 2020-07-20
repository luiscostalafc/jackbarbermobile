import React, { useRef, useState, useEffect } from 'react';
import { Image, View, Linking } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import PropTypes from 'prop-types';

import {
	PERMISSIONS,
	request,
	checkNotifications,
} from 'react-native-permissions';
import logo from '../../assets/logo.png';
import Background from '../../components/Background';
import { signInRequest } from '../../store/modules/auth/actions';

import {
	Container,
	Form,
	FormInput,
	SubmitButton,
	SignLink,
	SignLinkText,
	ForgotPassword,
	ForgotPasswordText,
} from './styles';

export default function SignIn({ navigation }) {
	const dispatch = useDispatch();
	const passwordRef = useRef();

	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [permission, setPermission] = useState('');

	const loading = useSelector((state) => state.auth.loading);

	function handleSubmit() {
		dispatch(signInRequest(email, password));
	}

	useEffect(() => {
		const permissions = request(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION).then(
			(result) => {
				if (result === 'denied') {
					checkNotifications().then(({ status, settings }) => {
						console.log(status);
					});
				}
			}
		);
		setPermission(permissions);
	}, []);

	return (
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
						onSubmitEditing={() => passwordRef.current.focus()}
						value={email}
						onChangeText={setEmail}
					/>
					<FormInput
						icon="lock-outline"
						secureTextEntry
						placeholder="Sua senha secreta"
						ref={passwordRef}
						returnKeyType="send"
						onSubmitEditing={handleSubmit}
						value={password}
						onChangeText={setPassword}
					/>

					<SubmitButton loading={loading} onPress={handleSubmit}>
						Acessar
					</SubmitButton>
				</Form>

				<ForgotPassword onPress={() => navigation.navigate('ForgotPassword')}>
					<ForgotPasswordText>Esqueci minha senha</ForgotPasswordText>
				</ForgotPassword>

				<SignLink onPress={() => navigation.navigate('SignUp')}>
					<SignLinkText
						style={{
							justifyContent: 'center',
							alignItems: 'center',
							marginTop: 8,
						}}
					>
						Criar conta gratuita
					</SignLinkText>
				</SignLink>

				<View style={{ height: 12 }} />

				<SignLink>
					<SignLinkText
						style={{
							justifyContent: 'center',
							alignItems: 'center',
						}}
						onPress={() =>
							Linking.openURL('https://nifty-jennings-1795d9.netlify.app/')
						}
					>
						Administração
					</SignLinkText>
				</SignLink>

				<View style={{ height: 15 }} />

				<SignLink>
					<SignLinkText
						style={{
							color: '#EEDD82',
							justifyContent: 'center',
							alignItems: 'center',
							fontSize: 18,
						}}
						onPress={() => Linking.openURL('https://salaojack.com/')}
					>
						Visite nosso site!
					</SignLinkText>
				</SignLink>
			</Container>
		</Background>
	);
}

SignIn.propTypes = {
	navigation: PropTypes.shape({
		navigate: PropTypes.func,
	}).isRequired,
};
