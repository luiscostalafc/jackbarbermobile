import React from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs';

import Dashboard from '../pages/Dashboard';
import Geo from '../pages/Geo';

import Confirm from '../pages/New/Confirm';
import SelectDateTime from '../pages/New/SelectDateTime';
import SelectProvider from '../pages/New/SelectProvider';

import Profile from '../pages/Profile';
import SignIn from '../pages/SignIn';
import SignUp from '../pages/SingUp';

import Serviços from './app.routes.tsx';

export default (signedIn = false) =>
	createAppContainer(
		createSwitchNavigator(
			{
				Sign: createSwitchNavigator({
					SignIn,
					SignUp,
				}),

				App: createBottomTabNavigator(
					{
						Geo,
						New: {
							screen: createStackNavigator(
								{
									Serviços,
									SelectProvider,
									SelectDateTime,
									Confirm,
								},
								{
									defaultNavigationOptions: {
										headerTitleAlign: 'center',
										headerTransparent: true,
										headerTintColor: '#fff',
										headerLeftContainerStyle: {
											marginLeft: 20,
										},
									},
								}
							),
							navigationOptions: {
								tabBarVisible: false,
								tabBarLabel: 'Agendar',
								tabBarIcon: (
									<Icon
										name="add-circle-outline"
										size={20}
										color="rgba(255, 255, 255, 0.6)"
									/>
								),
							},
						},
						Dashboard,
						Profile,
					},

					{
						resetOnBlur: true,
						tabBarOptions: {
							keyboardHidesTabBar: true,
							activeTintColor: '#ebb400',
							inactiveTintColor: 'rgba(255, 255, 255, 0.6)',
							style: {
								backgroundColor: '#323239',
							},
						},
					}
				),
			},
			{
				initialRouteName: signedIn ? 'App' : 'Sign',
			}
		)
	);
