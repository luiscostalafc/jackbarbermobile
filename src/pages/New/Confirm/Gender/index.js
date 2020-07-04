import React from 'react';

import { TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

import Background from '../../../components/Background';

import { Container, AvatarMan, AvatarWoman, SubmitButton } from './styles';
import navigations from '../../../services/navigations';

export default function Gender() {
	return (
		<Background>
			<Container>
				<AvatarWoman
					source={require('../../../assets/images/woman_service.jpeg')}
				/>
				<SubmitButton
					onPress={() => {
						navigations.navigate('Dashboard');
					}}
				>
					Jack Hair
				</SubmitButton>
				<AvatarMan
					source={require('../../../assets/images/man_service.jpeg')}
				/>
				<SubmitButton
					onPress={() => {
						navigations.navigate('DashboardCartMan');
					}}
				>
					Jack Barber
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
