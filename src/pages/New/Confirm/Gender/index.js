import React from 'react';

import { TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

import Background from '../../../../components/Background';

import navigations from '../../../../services/navigations';

import { Container, AvatarMan, AvatarWoman, SubmitButton } from './styles';

export default function Gender() {
	return (
		<Background>
			<Container>
				<AvatarWoman source={require('../../../../assets/images/woman.jpeg')} />
				<SubmitButton
					onPress={() => {
						navigations.navigate('WomanServices');
					}}
				>
					ELLA
				</SubmitButton>
				<AvatarMan
					source={require('../../../../assets/images/servico_man.jpeg')}
				/>
				<SubmitButton
					onPress={() => {
						navigations.navigate('ManServices');
					}}
				>
					ELLE
				</SubmitButton>
			</Container>
		</Background>
	);
}

Gender.navigationOptions = ({ navigation }) => ({
	title: 'Serviços',
	headerLeft: () => (
		<TouchableOpacity
			onPress={() => {
				navigation.navigate('Dashboard');
			}}
		>
			<Icon name="chevron-left" size={20} color="#fff" />
		</TouchableOpacity>
	),
});
