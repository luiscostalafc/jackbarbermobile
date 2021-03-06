import React, { useEffect, useState } from 'react';
import { TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

import api from '../../../services/api';

import Background from '../../../components/Background';

import { Container, Provider, ProvidersList, Avatar, Name } from './styles';

export default function SelectProviderMan({ navigation }) {
	const [providers, setProviders] = useState([]);

	useEffect(() => {
		async function loadProviders() {
			const response = await api.get('/providers/man');
			setProviders(response.data);
		}
		loadProviders();
	}, []);

	return (
		<Background>
			<Container>
				<ProvidersList
					data={providers}
					keyExtractor={(provider) => String(provider)}
					renderItem={({ item: provider }) => (
						<Provider
							onPress={() =>
								navigation.navigate('SelectDateTime', { provider })
							}
						>
							<Avatar
								source={{
									uri: provider.avatar
										? provider.avatar.path
										: `https://api.adorable.io/avatar/50/${provider.name}.png`,
								}}
							/>
							<Name>{provider.name}</Name>
						</Provider>
					)}
				/>
			</Container>
		</Background>
	);
}

SelectProviderMan.navigationOptions = ({ navigation }) => ({
	title: 'Selecione o prestador',
	headerLeft: () => (
		<TouchableOpacity
			onPress={() => {
				navigation.navigate('Dashboard');
			}}
		>
			<Icon name="chevron-left" size={20} color="#FFF" />
		</TouchableOpacity>
	),
});
