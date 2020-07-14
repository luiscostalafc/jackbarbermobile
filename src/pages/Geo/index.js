import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import {
	View,
	ActivityIndicator,
	StyleSheet,
	Platform,
	Alert,
} from 'react-native';

import { PERMISSIONS, request } from 'react-native-permissions';
import Geolocation from '@react-native-community/geolocation';
import MapView, { Marker } from 'react-native-maps';
// @react-native-community/geolocation
import Geocoder from 'react-native-geocoding';
import Icon from 'react-native-vector-icons/MaterialIcons';

import markerImage from '../../assets/logo1.png';
import api from '../../services/api';

import { SubmitButton, Form, FormInput } from './styles';

Geocoder.init('AIzaSyCehC1yRfumAO8cYDZEQBC98kYFJdXWG_w');

function Geo() {
	const [loading, setLoading] = useState(true);
	const [points, setPoints] = useState([]);
	const [location, setLocation] = useState([]);
	const [show, setShow] = useState(false);

	const [region, setRegion] = useState({
		latitude: 0,
		longitude: 0,
		latitudeDelta: 0.0143,
		longitudeDelta: 0.0134,
		location: null,
	});
	const user = useSelector((state) => state.user.profile);

	request(
		Platform.select({
			android: PERMISSIONS.ANDROID.ACESS_FINE_LOCATION,
			ios: PERMISSIONS.IOS.LOCATION_WHEN_IN_USE,
		})
	);

	useEffect(() => {
		Geolocation.getCurrentPosition(
			async ({ coords: { latitude, longitude } }) => {
				const response = await Geocoder.from({ latitude, longitude });
				const address = response.results[0].formatted_address;
				const shortAddress = address.substring(address);

				setRegion({
					...region,
					latitude,
					longitude,
				});
				setLoading(false);
				setLocation(shortAddress);
			},
			(error) => {
				console.log(error);
			},
			{ enableHighAccuracy: true, maximumAge: 10000, timeout: 1000 }
		);
	}, []);

	useEffect(() => {
		async function getData() {
			try {
				const { data } = await api.get(`/points`, {
					params: region,
				});

				setPoints(data);
			} catch (err) {
				console.log(err);
			}
		}

		if (region) getData();
	}, [region]);

	function renderPoints() {
		return points.map((point) => (
			<Marker
				image={markerImage}
				key={point.id}
				coordinate={{
					latitude: parseFloat(point.latitude),
					longitude: parseFloat(point.longitude),
				}}
				title={point.name}
			/>
		));
	}

	async function handleAddAddress() {
		await api.post('addresses', {
			user_id: user.id,
			street: location,
		});
		setShow(true);
	}

	return (
		<View style={styles.container}>
			{loading ? (
				<ActivityIndicator size="large" />
			) : (
				<MapView
					initialRegion={{
						latitude: region.latitude,
						longitude: region.longitude,
						latitudeDelta: 0.01,
						longitudeDelta: 0.01,
					}}
					style={styles.map}
					showsUserLocation
					loadingEnabled
				>
					{renderPoints()}
					<>
						<Marker
							coordinate={{
								latitude: parseFloat(region.latitude),
								longitude: parseFloat(region.longitude),
							}}
							title="Sua posição atual"
						/>
					</>
				</MapView>
			)}

			{show ? (
				<View />
			) : (
				<>
					<Form>
						<FormInput
							autoCorrect={false}
							autoCapitalize="none"
							value={location}
							onChangeText={setLocation}
						/>
						<SubmitButton onPress={handleAddAddress}>
							Confirme seu endereço
						</SubmitButton>
					</Form>
				</>
			)}
		</View>
	);
}
Geo.navigationOptions = {
	tabBarLabel: 'Localização',
	tabBarIcon: ({ tintColor }) => (
		<Icon name="directions-run" size={20} color={tintColor} />
	),
};

export default Geo;

const styles = StyleSheet.create({
	container: {
		...StyleSheet.absoluteFill,
		backgroundColor: '#323239',
		alignItems: 'center',
		justifyContent: 'center',
	},

	map: {
		...StyleSheet.absoluteFillObject,
	},
});
