import React, { useMemo, useEffect, useState } from 'react';
import { TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

import { formatRelative, parseISO } from 'date-fns';
import pt from 'date-fns/locale/pt';
import 'intl';
import 'intl/locale-data/jsonp/pt-BR';
import formatValue from '../../../util/formatValue.ts';

import api from '../../../services/api';
import navigations from '../../../services/navigations';

import Background from '../../../components/Background';

import { Container, Avatar, Name, Time, SubmitButton } from './styles';
import { useCart } from '../../../hooks/cart.tsx';

interface Product {
	id: string;
	name: string;
	image_url: string;
	price: number;
	gender: number;
	quantity: number;
}

export default function Confirm({ navigation }) {
	const provider = navigation.getParam('provider');
	const time = navigation.getParam('time');

	const { products } = useCart();

	const dateFormatted = useMemo(
		() => formatRelative(parseISO(time), new Date(), { locale: pt }),
		[time]
	);

	const cartTotal = useMemo(() => {
		const total = products.reduce(
			(totalValue, { price, quantity }) => totalValue + price * quantity,
			0
		);

		return formatValue(total);
	}, [products]);

	const totalItensInCart = useMemo(() => {
		const total = products.reduce(
			(totalQuantity, { quantity }) => totalQuantity + quantity,
			0
		);

		return total;
	}, [products]);

	async function handleAddAppointment() {
		await api.post(
			'appointments',
			{
				item: [
					{
						id: products.id,
						description: products.name,
						title: products.name,
						quantity: totalItensInCart,
						currency_id: 'BRL',
						unit_price: cartTotal,
					},
				],
				provider_id: provider.id,
				date: time,
			},
			navigations.navigate('Dashboard')
		);
	}

	return (
		<Background>
			<Container>
				<Avatar
					source={{
						uri: provider.avatar
							? provider.avatar.url
							: `https://api.adorable.io/avatar/50/${provider.name}.png`,
					}}
				/>

				<Name>{provider.name}</Name>

				<Time>{dateFormatted}</Time>

				<SubmitButton onPress={handleAddAppointment}>
					Confirmar agendamento
				</SubmitButton>
			</Container>
		</Background>
	);
}

Confirm.navigationOptions = ({ navigation }) => ({
	title: 'Confirmar agendamento',
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
